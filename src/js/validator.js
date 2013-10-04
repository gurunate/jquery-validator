/** 
 * validator - Form validation with jQuery
 * 
 * @author Nate Johnson
 * @version 0.2.0
 * @license Released under the MIT license
 */


(function($) {
	'use strict';
	
	var _this,
		types = {
			phone : {
				msg : 'Phone number is invalid.',
				pattern : '^(([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+$'
			},
			email : {
				msg : 'Email address is invalid.',
				pattern : '^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'
			},
			url : {
				msg : 'URL is invalid.',
				pattern : "(http|ftp|https)://[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?"
			},
			zip : {
				msg : 'Zip code is invalid.',
				pattern : '^[0-9]{5}(?:-[0-9]{4})?$'
			},
			password : {
				msg : 'Password is invalid.',
				pattern : "(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*"
			},
			digits : {
				msg : 'Digits are invalid.',
				pattern : '^[0-9]+$'
			},
			ssn : {
				msg : 'Social Security Number is invalid.',
				pattern : '/^([0-9]{3}[-]*[0-9]{2}[-]*[0-9]{4})*$/'
			}
		};

	// plugin implementation
	$.fn.extend({
		validator : function(options) {
			_this = this;
			_this.hasValidated = _this.hasValidated || false;
			
			if (typeof options === 'object' || typeof options === 'undefined') {
				
				// default options
				var defaults = {
					mode : 'prod',
					submit : true,
					success : null,
					error : null
				};

				// implement user options				
				_this.options = $.extend(defaults, options);
				
				/**
				 * Embed options as element data to:
				 * 1. Preserves options for API calls
				 * 2. Denotes element as active validator participant
				 */
				$(this).data('validator', this.options);

				// plug-in magic below
				return this.each(function() {
					$(this).on('submit', function(ev) {
						if (!_this.options.submit) {
							ev.preventDefault();
						}
						
						_this.validate($(this));
					});
				});
			} else {
				// API methods
				switch (options) {
					case 'validate':
						return _this.validate(this);
						break;

					case 'errors':
						return _this.getErrors(this);
						break;
				}
			}
		},
		isValid : function () {
			if (typeof this.errors === 'undefined') {
				this.validate($(this));
			}
			
			return (_this.errors.length <= 0);
		},
		/**
		 * Return validation errors.
		 * 
		 * @return {Array} errors 
		 */
		getErrors : function () {
			if (!_this.hasValidated) {
				if (_this.options.mode === 'dev') {
					console.warn('Errors method referenced before any validation.  Validation invoked for accuracy.');
				}
				_this.validate(this);
			}
			
			return _this.errors;
		},
		/**
		 * Validates the element
		 *
		 * @param {Object} element Target DOM element  
		 */
		validate : function (element) {
			_this.hasValidated = true;
			_this.errors = [];
			_this.warnings = [];
			_this.options = _this.options || element.data('validator');
			
			// add empty options warning
			if (!_this.options) {
				_this.warnings.push('No validator options.');
			}
			
			// iterate over all validator input fields
			element.find('[data-validator]').each(function(i, el) {
				var rules = $(el).attr('data-validator').split(' ');
				el.isRequired = false;
				
				// validate required fields
				if (rules.indexOf('required') >= 0) {
					el.isRequired = true;
					
					if (!isValidValue(el)) {
						_this.errors.push({
							msg : 'Required field',
							el : el
						});
					}
				}
				
				// validate field types
				$.each(rules, function(i, r) {
					// skip required validation, already prioritized
					if (r !== 'required') {
						if ((el.isRequired && !isValidType(r, el)) || 
							(isValidValue(el) && !isValidType(r, el))) { 
							_this.errors.push({
								msg : types[r].msg,
								el : el
							});
						}
					}
				});
				
			});

			// invoke callbacks
			if (typeof _this.options !== 'undefined') {
				if (_this.errors.length && typeof _this.options.error !== 'undefined' && typeof _this.options.error === 'function') {
					_this.options.error.call(_this, _this.errors);
					
				} else if (typeof _this.options.success !== 'undefined' && typeof _this.options.success === 'function') {
					_this.options.success.call(_this);
				}
			}
			return this;
		}
	});
	
	/**
	 * Value validation.
	 * 
	 * @param {Object} el Input field
	 * 
	 * @return {Boolean} validity status
	 */
	var isValidValue = function (el) {
		var retval = true;
		
		if ($(el).attr('type') === 'checkbox' || $(el).attr('type') === 'radio') {
			var hasChecked = false;
			$(el).parent().find('[name=' + $(el).attr('name') + ']').each(function(i, el) {
				if (!hasChecked && $(el).is(':checked')) {
					hasChecked = true;
				}
			});
			
			if (!hasChecked) {
				retval = false;
			}
		} else if ($(el).val() === '') {
			retval = false;
		}
		return retval;
	};
	
	/**
	 * Type validation.
	 * 
	 * @param {Object} type Input type
	 * @param {Object} el Input field
	 * 
	 * @return {Boolean} validity status
	 */
	var isValidType = function (type, el) {
		var pattern = new RegExp(types[type].pattern);
		return pattern.test($(el).val());
	};

})(jQuery);
