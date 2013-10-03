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
			element.find('[data-validator~=required],[data-validator~=phone],[data-validator~=email]').each(function(i, el) {
				if ($(el).val() === '') {
					_this.errors.push({
						msg : 'Required field.',
						el : el
					});
				}
			});
			
			if (!_this.errors.length) {
				// find & validate all phone inputs
				element.find('[data-validator~=phone]').each(function(i, el) {
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
				element.find('[data-validator~=email]').each(function(i, el) {
					if (isValidateEmailAddress($(el).val())) {
						_this.errors.push({
							msg : 'Invalid email address.',
							name : $(el).attr('name'),
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
		// http://blog.stevenlevithan.com/archives/validate-phone-number
		var pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
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

})(jQuery);
