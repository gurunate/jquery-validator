/**
 * Unit test for phone number validation
 *
 * @author Mark Feimer
 */

describe("phone validator", function() {
	it("should be a valid phone number", function() {
		var fixture = $('<form>"' +
			'"<input type="tel" name="phone1" value="555-555-5555" data-validator="phone" />' +
			'"<input type="tel" name="phone2" value="555.555.5555" data-validator="phone" />' +
			'"<input type="tel" name="phone3" value="1234567890" data-validator="phone" />' +
			'"<input type="tel" name="phone4" value="(555) 555-5555" data-validator="phone" />' +
			'</form>');
		
		fixture.validator('validate');
		
		expect(fixture.validator('errors').length).toBe(0);
	});
	
	it("should not be a valid phone number", function() {
		var fixture = $('<form>"' +
			'"<input type="tel" name="phone1" value="555-555-555" data-validator="phone" />' +
			'"<input type="tel" name="phone2" value="abc-555.5555" data-validator="phone" />' +
			'</form>');
		
		fixture.validator('validate');
		
		expect(fixture.validator('errors').length).toNotBe(0);
	});
});
