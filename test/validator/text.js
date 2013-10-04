/**
 * Unit test for text code validation
 *
 * @author Nate Johnson
 */

xdescribe("Text Type Field Validation", function() {

	var fixture,
		attributes;

	beforeEach(function() {
		attributes = {
			type : 'text',
			name : 'title',
			value : 'this a test title',
			'data-validator' : 'required text'
		};
		fixture = $('<form/>');
	});

	afterEach(function() {
		attributes = {};
	});

	it("text should be required and is valid", function() {
		fixture.append($('<input/>', attributes));
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});

	it("text should be required and is invalid", function() {
		attributes.value = 'notatext';
		fixture.append($('<input/>', attributes));
		fixture.validator('validate');
		expect(fixture.validator('errors').length).not.toEqual(0);
	});

	it("text should NOT be required and is valid", function() {
		attributes['data-validator'] = 'text';
		fixture.append($('<input/>', attributes));
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});

	it("text should NOT be required and is empty (optional)", function() {
		attributes['data-validator'] = 'text';
		delete attributes.value;
		var l = $('<input/>', attributes);
		fixture.append(l);
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});
});
