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
					console.warn('Errors called before validated.  Validating...');
				}
				_this.validate(this);
			}
			
			return _this.errors;
		},
		/**
		 * Validates the  
		 *
		 * @param {Object} element Target plugin element  
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
							
			// find all required inputs
			element.find('[data-validator~=required]').each(function(i, el) {
				
				if ($(el).attr('type') === 'checkbox' || $(el).attr('type') === 'radio') {
					var hasChecked = false;
					$(el).parent().find('[name=' + $(el).attr('name') + ']').each(function(i, el) {
						if (!hasChecked && $(el).is(':checked')) {
							hasChecked = true;
						}
					});
					
					if (!hasChecked) {
						_this.errors.push({
							msg : 'Required field',
							el : el
						});
					}
				} else if ($(el).val() === '') {
					_this.errors.push({
						msg : 'Required field',
						el : el
					});
				}
			});
			
			if (!_this.errors.length) {
				// find & validate all phone inputs
				element.find('[data-validator~=phone]').each(function(i, el) {
					if ($(el).attr('data-validator').match('required') && isValidPhoneNumber($(el).val()) || 
						($(el).val() && isValidPhoneNumber($(el).val()))) {
					
						_this.errors.push({
							msg : 'Invalid phone number',
							el : el
						});
					}
				});
			}
				
			if (!_this.errors.length) {
				// find & validate all email inputs
				element.find('[data-validator~=email]').each(function(i, el) {
					if ($(el).attr('data-validator').match('required') && isValidateEmailAddress($(el).val()) || 
						($(el).val() && isValidateEmailAddress($(el).val()))) {
						_this.errors.push({
							msg : 'Invalid email address',
							el : el
						});
					}
				});
			}
			
			if (!_this.errors.length) {
				// find & validate all URL inputs
				element.find('[data-validator~=url]').each(function(i, el) {
					if ($(el).attr('data-validator').match('required') && isValidURL($(el).val()) || 
						($(el).val() && isValidURL($(el).val()))) {
						_this.errors.push({
							msg : 'Invalid URL',
							el : el
						});
					}
				});
			}
			
			if (!_this.errors.length) {
				// find & validate all zip code inputs
				element.find('[data-validator~=zip]').each(function(i, el) {
					if ($(el).attr('data-validator').match('required') && isValidZipCode($(el).val()) || 
						($(el).val() && isValidZipCode($(el).val()))) {
						_this.errors.push({
							msg : 'Invalid zip code',
							el : el
						});
					}
				});
			}
			
			if (!_this.errors.length) {
				// find & validate all password inputs
				element.find('[data-validator~=password]').each(function(i, el) {
					if ($(el).attr('data-validator').match('required') && isValidPassword($(el).val()) || 
						($(el).val() && isValidPassword($(el).val()))) {
						_this.errors.push({
							msg : 'Invalid password',
							el : el
						});
					}
				});
			}
			
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
	 * Telephone number validation.
	 * 
	 * @param {Object} val Input value
	 * 
	 * @return {Boolean} validity status
	 */
	var isValidPhoneNumber = function (val) {
		// This regex will validate a 10-digit North American telephone number. Separators 
		// are not required, but can include spaces, hyphens, or periods. Parentheses 
		// around the area code are also optional.
		var pattern = new RegExp('^(([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+$');
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
		// This email regex is not fully RFC5322-compliant, but it will validate most 
		// common email address formats correctly.
		var pattern = new RegExp('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');
		return !pattern.test(val);
	};
	
	/**
	 * URL validation.
	 * 
	 * @param {Object} val Input value
	 * 
	 * @return {Boolean} validity status
	 */
	var isValidURL = function (val) {
		// This URL regex will validate most common URL formats correctly.
		var pattern = new RegExp("(http|ftp|https)://[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?");
		return !pattern.test(val);
	};
	
	/**
	 * Zip code validation.
	 * 
	 * @param {Object} val Input value
	 * 
	 * @return {Boolean} validity status
	 */
	var isValidZipCode = function (val) {
		// This regexp verifies US ZIP Codes, with an optional 4 number ZIP code extension.
		var pattern = new RegExp('^[0-9]{5}(?:-[0-9]{4})?$');
		return !pattern.test(val);
	};
	
	/**
	 * Password validation.
	 * 
	 * @param {Object} val Input value
	 * 
	 * @return {Boolean} validity status
	 */
	var isValidPassword = function (val) {
		// Test for a strong password with this regex. The password must contain one lowercase 
		// letter, one uppercase letter, one number, and be at least 6 characters long.
		var pattern = new RegExp("(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*");
		return !pattern.test(val);
	};
	
	/**
	 * Digits validation.
	 * 
	 * @param {Object} val Input value
	 * 
	 * @return {Boolean} validity status
	 */
	var isValidDigits = function (val) {
		// This regex will test for digits (whole numbers).
		var pattern = new RegExp('^[0-9]+$');
		return !pattern.test(val);
	};
	
	/**
	 * Social Security Number validation.
	 * 
	 * @param {Object} val Input value
	 * 
	 * @return {Boolean} validity status
	 */
	var isValidSocialSecurityNumber = function (val) {
		// If you need to validate US Social Security Numbers, use this regular expression
		var pattern = new RegExp('/^([0-9]{3}[-]*[0-9]{2}[-]*[0-9]{4})*$/');
		return !pattern.test(val);
	};

})(jQuery);
