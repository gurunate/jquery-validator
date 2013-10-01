$(function() {
	
	$('form').validator({
		submit : false,
		success : function() {
			console.debug('form is valid');
		},
		error : function(errors) {
			console.debug('we have errors', errors);
		}
	});
	
	$('form').validator('validate');
	
	if ($('form').isValid()) {
		console.log('Form is valid.');
	} else {
		console.log('Form is NOT valid.');
	}
});
