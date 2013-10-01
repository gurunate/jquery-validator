/**
 * Unit test for phone number validation 
 *
 * @author Mark Feimer
 */

describe("phone validator", function() {
  it("should be a valid phone number", function() {
    var testVal = $.validator().isValidPhoneNumber('555-555-1234');
    expect(testVal).toBe(true);
  });
  it("should not be a valid phone number", function() {
    var testVal = $.validator().isValidPhoneNumber('55-555-1234');
    expect(testVal).toBe(false);
  });
});
