/**
 * Unit test for text code validation
 *
 * @author Nate Johnson
 */

describe("Custom Rule Validation", function() {

	var fixture,
		attributes;

	beforeEach(function() {
		attributes = {
			type : 'text',
			name : 'city-state',
			value : 'Chicago, IL',
			'data-validator' : 'required cityState'
		};
		fixture = $('<form/>');
		fixture.validator({
			rules : {
				cityState : {
					msg : 'Invalid city, state field.',
					rule : function(val) {
						if (val) {
							var arr = val.split(',');
							return (arr[0].length >= 1 && $.trim(arr[1]).length === 2);
						} else {
							return true;
						}
					}
				}
			}
		});
	});

	afterEach(function() {
		attributes = {};
	});

	it("city & state should be required and is valid ", function() {
		fixture.append($('<input/>', attributes));
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});

	it("city & state should be required and is invalid (no state)", function() {
		attributes.value = 'chicago';
		fixture.append($('<input/>', attributes));
		fixture.validator('validate');
		expect(fixture.validator('errors').length).not.toEqual(0);
	});

	it("city & state should be required and is invalid (no city)", function() {
		attributes.value = ', IL';
		fixture.append($('<input/>', attributes));
		fixture.validator('validate');
		expect(fixture.validator('errors').length).not.toEqual(0);
	});

	it("city & state should not be required and is valid (optional)", function() {
		attributes.value = 'Chicago, IL';
		attributes['data-validator'] = 'cityState';
		
		fixture.append($('<input/>', attributes));
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});
	
	it("city & state is empty but should not be required and is valid (optional)", function() {
		attributes.value = '';
		attributes['data-validator'] = 'cityState';
		
		fixture.append($('<input/>', attributes));
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});

	it("city & state should not be required and is invalid (optional)", function() {
		attributes.value = 'Chicago';
		attributes['data-validator'] = 'cityState';
		
		fixture.append($('<input/>', attributes));
		fixture.validator('validate');
		expect(fixture.validator('errors').length).not.toEqual(0);
	});
});
