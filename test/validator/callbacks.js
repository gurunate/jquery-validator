/**
 * Unit test for callback validation
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
	});

	afterEach(function() {
		attributes = {};
	});

	it("before callback to be called on a valid form", function() {
		var validator = fixture.validator({
			before : function() { }
		});
		
		spyOn(validator.options, 'before');
		fixture.validator('validate');
		expect(validator.options.before).toHaveBeenCalled();
	});
	
	it("success callback to be called on a valid form", function() {
		var validator = fixture.validator({
			success : function() { }
		});
		
		spyOn(validator.options, 'success');
		fixture.validator('validate');
		expect(validator.options.success).toHaveBeenCalled();
	});
	
	it("error callback NOT to be called on a valid form", function() {
		var validator = fixture.validator({
			error : function() { }
		});
		
		spyOn(validator.options, 'error');
		fixture.validator('validate');
		expect(validator.options.error).not.toHaveBeenCalled();
	});
	
	it("error callback to be called on an invalid form", function() {
		fixture.append($('<input/>', attributes));
		
		var validator = fixture.validator({
			error : function() { }
		});
		
		spyOn(validator.options, 'error');
		fixture.validator('validate');
		expect(validator.options.error).toHaveBeenCalled();
	});

});
