/** 
 * validator - Form validation with jQuery
 * 
 * @author Nate Johnson
 * @version 0.2.0
 * @license Released under the MIT license
 */

(function($) {
	'use strict';
	
	var _this;

	$.fn.extend({
		validator : function(options) {
			_this = this;
			
			if (typeof options === 'object' || typeof options === 'undefined') {
				
				// default options
				var defaults = {
					submit : true,
					success : null,
					error : null
				};

				// implement user options				
				this.options = $.extend(defaults, options);

				// plug-in magic below
				return this.each(function() {
					$(this).on('submit', function(ev) {
						if (!_this.options.submit) {
							ev.preventDefault();
						}
						
						validate($(this));
					});
				});
			} else {
				// API methods
				switch (options) {
					case 'validate':
						return validate(this);
						break;

					case 'errors':
						return getErrors(this);
						break;
				}
			}
		}
	});
	
	/**
	 * Validates the  
	 *
	 * @param {Object} element Target plugin element  
	 */
	var validate = function (element) {
		_this.errors = [];
						
		// find all required inputs
		element.find('[data-validator=required],[data-validator=phone],[data-validator=email]').each(function(i, el) {
			if ($(el).val() === '') {
				_this.errors.push({
					msg : 'Required field.',
					name : $(el).attr('name'),
					el : el
				});
			}
		});
		
		if (!_this.errors.length) {
			// find & validate all phone inputs
			element.find('[data-validator=phone]').each(function(i, el) {
				if (isValidPhoneNumber($(el).val())) {
					_this.errors.push({
						msg : 'Invalid phone number.',
						name : $(el).attr('name'),
						el : el
					});
				}
			});
		}
			
		if (!_this.errors.length) {
			// find & validate all email inputs
			element.find('[data-validator=email]').each(function(i, el) {
				if (isValidateEmailAddress($(el).val())) {
					_this.errors.push({
						msg : 'Invalid email address.',
						name : $(el).attr('name'),
						el : el
					});
				}
			});
		}
		
		if (_this.errors.length && typeof _this.options.error === 'function') {
			_this.options.error.call(_this, _this.errors);
			
		} else if (typeof _this.options.success === 'function') {
			_this.options.success.call(_this);
		}
		return this;
	};
	
	/**
	 * Telephone number validation.
	 * 
	 * @param {Object} val Input value
	 * 
	 * @return {Boolean} validity status
	 */
	var isValidPhoneNumber = function (val) {
		var pattern = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
		return !pattern.test(val);
	};
	
	/**
	 * Email address validation.
	 * 
	 * @param {Object} val Input value
	 * 
	 * @return {Boolean} validity status
	 */
	var isValidateEmailAddress = function (val) {
		var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
		return !pattern.test(val);
	};

	/**
	 * Return validation errors.
	 * 
	 * @return {Array} errors 
	 */
	var getErrors = function () {
		return _this.errors;
	};

})(jQuery);
