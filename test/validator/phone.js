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
	
	it("phone number should be required and valid without formatting", function() {
		fixture.append('<input type="tel" name="phone" value="1234567890" data-validator="required phone" />');
		
		fixture.validator('validate');
		
		expect(fixture.validator('errors').length).toEqual(0);
	});
	
	it("phone number should be required and valid with formatting", function() {
		fixture.append(
			'"<input type="tel" name="phone1" value="555-555-5555" data-validator="required phone" />' +
			'"<input type="tel" name="phone2" value="555.555.5555" data-validator="required phone" />' +
			'"<input type="tel" name="phone3" value="(555) 555-5555" data-validator="required phone" />' +
			'"<input type="tel" name="phone4" value="555 555 5555" data-validator="required phone" />'
		);
		
		fixture.validator('validate');
		
		expect(fixture.validator('errors').length).toEqual(0);
	});
	
	it("wrong phone number should be required and invalid", function() {
		fixture.append(
			'"<input type="tel" name="phone1" value="555-555-555" data-validator="required phone" />' +
			'"<input type="tel" name="phone2" value="abc-555.5555" data-validator="required phone" />' +
			'"<input type="tel" name="phone3" value="1234567" data-validator="required phone" />' +
			'"<input type="tel" name="phone4" value="+1 (800) 555-5555" data-validator="required phone" />'
		);
		
		fixture.validator('validate');
		
		expect(fixture.validator('errors').length).toBeGreaterThan(0);
	});
	
	it("phone number should be optional but valid when present", function() {
		fixture.append(
			'"<input type="tel" name="phone1" value="" data-validator="phone" />' +
			'"<input type="tel" name="phone2" value="555-555-5555a" data-validator="phone" />'
		);
		
		fixture.validator('validate');
		
		expect(fixture.validator('errors').length).toBeGreaterThan(0);
	});
});
