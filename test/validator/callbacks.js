/**
 * Unit test for text code validation
 *
 * @author Nate Johnson
 */

describe("Callback Functionality", function() {

	var fixture,
		attributes,
		validator;

	beforeEach(function() {
		attributes = {
			type : 'text',
			name : 'age',
			value : '',
			'data-validator' : 'required'
		};
		
		fixture = $('<form/>');
		
		validator = fixture.validator({
			before : function() { }
		});
	});

	afterEach(function() {
		attributes = {};
	});

	it("callback executed before form validation", function() {
		spyOn(validator.options, 'before');
		fixture.validator('validate');
	});

});
