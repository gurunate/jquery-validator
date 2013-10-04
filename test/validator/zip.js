/**
 * Unit test for zip code validation
 *
 * @author Nate Johnson
 */

describe("Zip Type Field Validation", function() {

	var fixture,
		attributes;

	beforeEach(function() {
		attributes = {
			type : 'text',
			name : 'zip',
			value : '55555',
			'data-validator' : 'required zip'
		};
		fixture = $('<form/>');
	});

	afterEach(function() {
		attributes = {};
	});

	it("zip should be required and is valid", function() {
		fixture.append($('<input/>', attributes));
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});

	it("zip should be required and is invalid", function() {
		attributes.value = 'notazip';
		fixture.append($('<input/>', attributes));
		fixture.validator('validate');
		expect(fixture.validator('errors').length).not.toEqual(0);
	});

	it("zip should NOT be required and is valid", function() {
		attributes['data-validator'] = 'zip';
		fixture.append($('<input/>', attributes));
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});

	it("zip should NOT be required and is empty (optional)", function() {
		attributes['data-validator'] = 'zip';
		delete attributes.value;
		var l = $('<input/>', attributes);
		fixture.append(l);
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});
});
