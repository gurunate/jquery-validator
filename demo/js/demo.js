$(function() {
	
	var errors = [];
	$('form').validator({
		submit : false,
		success : function() {
			console.debug('form is valid');
		},
		error : function(errs) {
			errors = errs;
			$.each(errors, function(i, er){
				$(er.el).addClass('error');
			});
		}
	});
	
	$('button').on('click', function() {
		$.each(errors, function(i, er) {
			$(er.el).removeClass('error');
		});
		
		$('form').validator('validate');
	});

	// if ($('form').isValid()) {
		// console.log('Form is valid.');
	// } else {
		// console.log('Form is NOT valid.');
	// }
});
