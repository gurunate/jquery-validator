/** @license
 * validator - Form validation with jQuery
 * Author: Nate Johnson
 * Version: 0.1.0 (Nov 2012)
 * Released under the MIT license
 */

(function ($) {
	"use strict";

	var errors = '';

	$.fn.extend({
		validator: function (options) {

			if ((typeof options === 'object') || (options === undefined)) {
				var defaults = {
					flag: false,
					required: '',
					highlight: '',
					symbol: '*',
					footnote: '<p><span class="requiredFlag">*</span> <em>denotes a required field.</em></p>'
				}
				
				var $o = $.extend(defaults, options);
				
				if ($o.required != '') {
					insertClass("requiredFlag", $o.required);
				}
				
				if ($o.highlight != '') {
					insertClass("validator-highlight", $o.highlight);
				}
				
				if (options != undefined) {
					if (options.footnote != undefined) {
						$o.footnote = '<p><span class="requiredFlag">' + $o.symbol + '</span> <em>' + options.footnote + '</em></p>';
					
					} else if (options.symbol != '') {
						$o.footnote = $o.footnote.replace('*', $o.symbol);
					}
				}
	
				return this.each(function () {
					denote($(this), $o);
	
					var validatedOnce = false;
					$(this).submit(function () {
						validatedOnce = true;
						errors = checkValues($(this), $o);
						if (errors.length > 0) {
							if ($o.error === undefined) {
								showErrors(errors);
							} else if (typeof $o.error === 'function') {
								$o.error.call(this, errors);
							}
							return false;
						} else if ($o.rules != undefined) {
							return satisfiesRules($(this), $o);
						} else {
							if (($o.success != undefined) && (typeof $o.success === 'function')) {
								$o.success.call(this);
								
								if ($o.submit === undefined) {
									$o.submit = false;
								}
							}
							return $o.submit;
						}
					});
	
					$(this).bind('keyup', function () {
						if (validatedOnce) {
							errors = checkValues($(this), $o);
							
							if (($o.live != undefined) && (typeof $o.live === 'function')) {
								$o.live.call(this, errors);
							}
						}
					});
				});
			} else {
				switch(options) {
					case 'validate':
						return validate($(this));
						break;
						
					case 'getErrors':
						return getErrors();
						break;
				}
			}
		}
	});

	function denote($form, $o) {
		var hasRequired = false;
		$form.find(':input.required').each(function () {
			if ($(this).attr('id')) {
				var $label = $('label[for=' + $(this).attr('id') + ']'); 
				if ($label.parent().html().indexOf('class="requiredFlag"') < 0) {
					hasRequired = true;
					$label.after('<span class="requiredFlag">' + $o.symbol + '</span>');
				}
			}
		});

		if (hasRequired) {
			$form.append($o.footnote);
		}
	}

	function checkValues($form, $o) {
		var retval = new Array();

		$form.find(':input.required').each(
				function () {
					if ($(this).val() === '') {
						var label = $('label[for=' + $(this).attr('id') + ']').html();
						retval.push({
							id: $(this).attr('id'),
							label: label,
							message: '<strong>' + label + '</strong> field is required.'
						});
						$(this).addClass('validator-highlight');
					} else {
						$(this).removeClass('validator-highlight');
					}
				});

		var $last = '';
		$form.find(':input.required').filter('.password').each(
				function () {
					if (($last != '') && ($last.val() != $(this).val())) {
						retval.push({
							id: $(this).attr('id'),
							message: '<strong>' + $('label[for=' + $last.attr('id') + ']').html() + '</strong> and <strong>' + $('label[for=' + $(this).attr('id') + ']').html() + '</strong> are not equal.'
						});
						last.addClass('validator-highlight');
						$(this).addClass('validator-highlight');

						return;
					}

					$last = $(this);
				});

		return retval;
	}
	
	function validate(form) {
		errors = checkValues(form);
		
		form.bind('keyup', function () {
			checkValues($(this));
		});
		
		return (errors.length <= 0);
	}
	
	function getErrors() {
		return errors;
	}
	
	function insertClass(name, styles) {
		if ($('style').length < 1) {
			$('head').append('<style></style>');
		}
		
		var rules = '';
		for (s in styles) {
			rules += s + ': ' + styles[s] + ';'
		}
		
		$('style').append('.' + name + '{ ' + rules + ' }');
	}
	
	function showErrors(errors) {
		var msg = 'Correct the following to proceed:\n\n';
		for (var i=0; i<errors.length; i++) {
			msg += ' - ' + errors[i].label + ' field is required.\n';
		}
		alert(msg);
	}
	
	function satisfiesRules($form, $o) {
		if ($o.rules.length != undefined) {
			for (r=0; r<$o.rules.length; r++) {
				if (!isValidRule($form, $o.rules[r])) {
					return false;
				}
			}
		} else {
			return isValidRule($form, $o.rules);
		}
	}
	
	function isValidRule($form, $r) {
		switch($r.oper) {
			case 'not equal':
				
				$input1 = $form.find('#' + $r.input[0]);
				$input2 = $form.find('#' + $r.input[1]);
				if ($input1.val() != $input2.val()) {
					var label1 = $('label[for=' + $r.input[0] + ']').html();
					var label2 = $('label[for=' + $r.input[1] + ']').html();
					
					if (($r.error != undefined) && (typeof $r.error === 'function')) {
						$r.error.call(this, {
							id: [$r.input[0], $r.input[1]],
							label: [label1, label2],
							message: '<strong>' + label1 + '</strong> and <strong>' + label2 + '</strong> are not equal.'
						});
					}
					return false;
				} else if (($r.success != undefined) && (typeof $r.success === 'function')) {
					$r.success.call(this, errors);
				}
				break;
		}
		return true;
	}
	
})(jQuery);
