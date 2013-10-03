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
	
	it("text field should be required", function() {
		fixture.append('"<input type="text" name="name" value="Bill Smith" data-validator="required" />');
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});
	
	it("text field should not be required", function() {
		fixture.append('"<input type="text" name="name" value="" />');
		fixture.validator('validate');
		expect(fixture.validator('errors').length).not.toBeGreaterThan(0);
	});
		
	it("textarea field should be required", function() {
		fixture.append('"<textarea name="address" data-validator="required">123 S Elm St</textarea>');
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});
	
	it("textarea field should not be required", function() {
		fixture.append('"<textarea name="address"></textarea>');
		fixture.validator('validate');
		expect(fixture.validator('errors').length).not.toBeGreaterThan(0);
	});
	
	/**
	 * TODO:
	 * 
	 * 1. checkboxes
	 * 2. textarea
	 * 3. radio buttons
	 *  
	 */
	
	it("a checkbox field should be required", function() {
		fixture.append(
			'"<input type="checkbox" name="color" value="red" data-validator="required" />' +
			'"<input type="checkbox" name="color" value="blue" />' +
			'"<input type="checkbox" name="color" value="green" checked />' +
			'"<input type="checkbox" name="color" value="yellow" />'
		);
		fixture.validator('validate');
		expect(fixture.validator('errors').length).isEqual(0);
	});
	
	it("checkbox field should be required", function() {
		fixture.append('"<input type="checkbox" name="terms" value="yes" data-validator="required" checked />');
		fixture.validator('validate');
		expect(fixture.validator('errors').length).isEqual(0);
	});
	
	it("a checkbox field should not be required", function() {
		fixture.append(
			'"<input type="checkbox" name="color" value="red" />' +
			'"<input type="checkbox" name="color" value="blue" />' +
			'"<input type="checkbox" name="color" value="green" />' +
			'"<input type="checkbox" name="color" value="yellow" />'
		);
		fixture.validator('validate');
		expect(fixture.validator('errors').length).isEqual(0);
	});
	
});
