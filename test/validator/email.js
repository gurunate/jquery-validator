/**
 * Unit test for email address validation
 *
 * @author Mark Feimer
 */

describe("Email Type Field Validation", function() {
  
  var fixture;
  var elOptions;

  beforeEach(function() {
    elOptions = {
      type: 'email',
      name: 'userEmail',
      value: 'user@google.com',
      'data-validator': 'required email'
    };
    fixture = $('<form></form>');
  });

  afterEach(function() {
    elOptions = {};
  });
  
  it("email should be required and valid", function() {
    var l = $('<input/>',elOptions);
    fixture.append(l);
    fixture.validator('validate');
    expect(fixture.validator('errors').length).toEqual(0);
  });

  it("email should be required and invalid", function() {
    elOptions.value = 'usergooglecom';
    var l = $('<input/>',elOptions);
    fixture.append(l);
    fixture.validator('validate');
    expect(fixture.validator('errors').length).not.toEqual(0);
  });

  it("email should NOT be required and valid", function() { 
    elOptions['data-validator'] = 'email';
    var l = $('<input/>',elOptions);
    fixture.append(l);
    fixture.validator('validate');
    expect(fixture.validator('errors').length).toEqual(0);
  });

  it("email should NOT be required and empty (optional)", function() {
    elOptions['data-validator'] = 'email';
    delete elOptions.value;
    var l = $('<input/>',elOptions);
    fixture.append(l);
    fixture.validator('validate');
    expect(fixture.validator('errors').length).toEqual(0);
  });
 
});
