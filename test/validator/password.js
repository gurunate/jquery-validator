/**
 * Unit test for password code validation
 *
 * @author Nate Johnson
 */

describe("Password Type Field Validation", function() {

	var fixture,
		attributes;

	beforeEach(function() {
		attributes = {
			type : 'text',
			name : 'password',
			value : 'passW0rd',
			'data-validator' : 'required password'
		};
		fixture = $('<form/>');
	});

	afterEach(function() {
		attributes = {};
	});

	it("password should be required and is valid", function() {
		fixture.append($('<input/>', attributes));
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});

	it("password should be required and is invalid", function() {
		attributes.value = 'notapassword';
		fixture.append($('<input/>', attributes));
		fixture.validator('validate');
		console.log(fixture.validator('errors').length);
		expect(fixture.validator('errors').length).not.toEqual(0);
	});

	it("password should NOT be required and is valid", function() {
		attributes['data-validator'] = 'password';
		fixture.append($('<input/>', attributes));
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});

	it("password should NOT be required and is empty (optional)", function() {
		attributes['data-validator'] = 'password';
		delete attributes.value;
		var l = $('<input/>', attributes);
		fixture.append(l);
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});
});
