/**
 * @author Nate Johnson 
 */

var moment = require("../../dist/js/*.js");

describe(" test required", function() {
	it(" can add, subtract, multiply, and divide positive integers", function() {
		var calc = new Calculator;
		expect(calc.add(2, 3)).toEqual(5);
		expect(calc.sub(8, 5)).toEqual(3);
		expect(calc.mult(4, 3)).toEqual(12);
		expect(calc.div(12, 4)).toEqual(3);
	});
});
