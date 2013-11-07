/**
 * Unit test for email address validation
 *
 * @author Kevin Phillips
 */
describe("Incorrect Usage", function() {
  describe("Unsupported Rule", function() {
    
    var fixture;
    var elOptions;
   
    describe("default options", function(){
      beforeEach(function() {
        elOptions = {
          type: 'text',
          name: 'myTextInput',
          value: 'test me!',
          'data-validator': 'required myUndefinedRule'
        };
        fixture = $('<form></form>');
      });

      afterEach(function() {
        elOptions = {};
      });
      
      it("should fail to validate due to unsupported rule", function() {
        var l = $('<input/>',elOptions);
        fixture.append(l);
        fixture.validator('validate');
        expect(fixture.validator('errors').length).toEqual(0);
      }); 
    });

    describe("custom options", function(){
      beforeEach(function(){
        var validator = fixture.validator({
          mode: 'dev'    
        });
      });

      it("should fail to validate due to unsupported rule", function() {
        var l = $('<input/>',elOptions);
        fixture.append(l);
        fixture.validator('validate');
        expect(fixture.validator('errors').length).toEqual(0);
      }); 
    });  
  });

  describe("Validate Not Called", function() {
    describe("default options", function(){
      var fixture;
      var elOptions;
      
      beforeEach(function() {
        elOptions = {
          type: 'text',
          name: 'myTextInput',
          value: '',
          'data-validator': 'required'
        };
        fixture = $('<form></form>');
        
        // var validator = fixture.validator({
        //   // mode: 'dev'    
        // });
      });

      afterEach(function() {
        elOptions = {};
      });
        
      it("should automatically call validate", function() {
        var l = $('<input/>',elOptions);
        fixture.append(l);
        expect(fixture.validator('errors').length).toEqual(1);
      }); 
    });

    describe("custom options", function(){
      var fixture;
      var elOptions;
      
      beforeEach(function() {
        elOptions = {
          type: 'text',
          name: 'myTextInput',
          value: '',
          'data-validator': 'required'
        };
        fixture = $('<form></form>');
        
        var validator = fixture.validator({
          mode: 'dev'    
        });
      });

      afterEach(function() {
        elOptions = {};
      });
      
      it("should automatically call validate", function() {
        var l = $('<input/>',elOptions);
        fixture.append(l);
        expect(fixture.validator('errors').length).toEqual(1);
      }); 
    });
  });
});