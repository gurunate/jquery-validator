/**
 * Unit test for URL validation
 *
 * @author Nate Johnson
 */

describe("URL Type Field Validation", function() {

	var fixture,
		attributes;

	beforeEach(function() {
		attributes = {
			type : 'text',
			name : 'url',
			value : 'http://www.github.com',
			'data-validator' : 'required url'
		};
		fixture = $('<form/>');
	});

	afterEach(function() {
		attributes = {};
	});

	it("URL should be required and valid", function() {
		fixture.append($('<input/>', attributes));
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});

	it("URL should be required and invalid", function() {
		attributes.value = 'notaurl';
		fixture.append($('<input/>', attributes));
		fixture.validator('validate');
		expect(fixture.validator('errors').length).not.toEqual(0);
	});

	it("URL should NOT be required and valid", function() {
		attributes['data-validator'] = 'url';
		fixture.append($('<input/>', attributes));
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});

	it("URL should NOT be required and empty (optional)", function() {
		attributes['data-validator'] = 'url';
		delete attributes.value;
		var l = $('<input/>', attributes);
		fixture.append(l);
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});
});
