/**
 * Unit test for  
 *
 * @author Nate Johnson
 */

describe("required field validation", function() {
	it("should be a required field", function() {
		var fixture = $('<form>"' +
			'"<input type="text" name="name" value="Bill Smith" data-validator="required" />' +
			'</form>');
		
		fixture.validator('validate');
		
		expect(fixture.validator('errors').length).toBe(0);
	});
});
