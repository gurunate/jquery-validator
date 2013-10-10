$(function() {
	
	var errors = [];
	$('form').validator({
		submit : false,
		before : function() {
			// reset error fields
			$.each(errors, function(i, er) {
				$(er.el).removeClass('error');
			});
		},
		success : function() {
			console.debug('form is valid');
		},
		error : function(errs) {
			errors = errs;
			$.each(errors, function(i, er){
				$(er.el).addClass('error');
			});
			
			errors[0].el.focus();
		},
		rules : {
			cityState : {
				msg : 'Invalid city state.',
				rule : function(val) {
					// TODO check if comma and state length
					return (val === 'test');
				}
			}
		}
	});

});
