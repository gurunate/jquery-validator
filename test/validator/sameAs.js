/**
 * Unit test for sameAs directive validation
 *
 * @author Nate Johnson
 */

describe("sameAs Functionality", function() {

	var fixture,
		attributes,
		validator;

	beforeEach(function() {
		attributes1 = {
			id : 'password1',
			type : 'password',
			name : 'password',
			class : 'password',
			value : 'kM85JZk8JSje',
			'data-validator' : 'required password'
		};
		
		attributes2 = {
			id : 'password2',
			type : 'password',
			name : 'password-confirm',
			value : 'kM85JZk8JSje',
			'data-validator' : "required password sameAs('#password1')"
		};
		
		fixture = $('<form/>').appendTo('body');
	});

	afterEach(function() {
		attributes = {};
		$('form').remove();
	});
	
	it("input fields should be required and equal to each other", function() {
		fixture.append($('<input />', attributes1));
		fixture.append($('<input />', attributes2));
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});
	
	it("input fields with multi-part selector should be required and equal to each other", function() {
		attributes1['name'] = 'pwd-pri';
		attributes2['data-validator'] = "required password sameAs('form [name=pwd-pri]')";
		
		fixture.append($('<input />', attributes1));
		fixture.append($('<input />', attributes2));
		
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});
});
