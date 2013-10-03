$(function() {
	
	$('form').validator({
		submit : false,
		success : function() {
			console.debug('form is valid');
		},
		error : function(errors) {
			console.debug(errors);
			$.each(errors, function(i, er){
				$(er.el).css('border', '1px solid red');
			});
		}
	});
	
	// $('form').validator('validate');
// 	
	// if ($('form').isValid()) {
		// console.log('Form is valid.');
	// } else {
		// console.log('Form is NOT valid.');
	// }
});
