/**
 * Unit test for required field validation
 *
 * @author Nate Johnson
 */

describe("Required Field Validation", function() {
	var fixture;

	beforeEach(function() {
		fixture = $('<form></form>');
	});
	
	it("input field should be required", function() {
		fixture.append('"<input type="text" name="name" value="Bill Smith" data-validator="required" />');
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});
	
	it("input field should not be required", function() {
		fixture.append('"<input type="text" name="name" value="" />');
		fixture.validator('validate');
		expect(fixture.validator('errors').length).not.toBeGreaterThan(0);
	});
});
