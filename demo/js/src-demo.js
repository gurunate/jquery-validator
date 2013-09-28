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
	
});
