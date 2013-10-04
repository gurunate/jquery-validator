/**
 * Unit test for text code validation
 *
 * @author Nate Johnson
 */

describe("Text Type Field Validation", function() {

	var fixture,
		attributes;

	beforeEach(function() {
		attributes = {
			type : 'text',
			name : 'title',
			value : 'this a test title',
			'data-validator' : 'required text[5,20]'
		};
		fixture = $('<form/>');
	});

	afterEach(function() {
		attributes = {};
	});

	it("text should be required and is valid between 5 and 20 characters long", function() {
		fixture.append($('<input/>', attributes));
		fixture.validator('validate');
		expect(fixture.validator('errors').length).toEqual(0);
	});

	it("text should be required and is invalid (too short)", function() {
		attributes.value = 'asdf';
		fixture.append($('<input/>', attributes));
		fixture.validator('validate');
		expect(fixture.validator('errors').length).not.toEqual(0);
	});

	it("text should be required and is invalid (too long)", function() {
		attributes.value = 'Bacon ipsum dolor sit amet tenderloin andouille pork chop drumstick, ground round pig rump. Pastrami bresaola chuck, tenderloin meatloaf flank ribeye t-bone turducken filet mignon. Tongue shankle shoulder doner, bresaola flank short loin shank sirloin turducken spare ribs strip steak andouille. Strip steak rump fatback pork frankfurter short ribs chuck shankle ribeye kielbasa beef ribs pork loin drumstick pastrami ham. Ground round pork bacon boudin chicken ball tip kielbasa frankfurter tail ham bresaola shoulder hamburger ribeye fatback. Capicola flank leberkas, pork loin biltong turducken jerky cow t-bone.';
		fixture.append($('<input/>', attributes));
		fixture.validator('validate');
		expect(fixture.validator('errors').length).not.toEqual(0);
	});
});
