/**
 * Unit test for phone number validation
 *
 * @author Nate Johnson
 */

describe("Phone Type Field Validation", function() {
	
	var fixture;

	beforeEach(function() {
		fixture = $('<form></form>');
	});
	
	it("phone number should be a valid without formatting", function() {
		fixture.append('<input type="tel" name="phone" value="1234567890" data-validator="phone" />');
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});
	
	it("phone number should be a valid with formatting", function() {
		fixture.append(
			'"<input type="tel" name="phone1" value="555-555-5555" data-validator="phone" />' +
			'"<input type="tel" name="phone2" value="555.555.5555" data-validator="phone" />' +
			'"<input type="tel" name="phone4" value="(555) 555-5555" data-validator="phone" />' +
			'"<input type="tel" name="phone4" value="555 555 5555" data-validator="phone" />'
		);
		
		fixture.validator('validate');
		
		expect(fixture.validator('errors').length).toEqual(0);
	});
	
	it("wrong phone number should not be a valid", function() {
		fixture.append(
			'"<input type="tel" name="phone1" value="555-555-555" data-validator="phone" />' +
			'"<input type="tel" name="phone2" value="abc-555.5555" data-validator="phone" />' +
			'"<input type="tel" name="phone3" value="1234567" data-validator="phone" />' +
			'"<input type="tel" name="phone4" value="+1 (800) 555-5555" data-validator="phone" />'
		);
		
		fixture.validator('validate');
		
		expect(fixture.validator('errors').length).toBeGreaterThan(0);
	});
});
