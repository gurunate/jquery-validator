# jQuery Validator plugin #

Quick and easy jQuery inline form validation.

##Example 1##

```javascript
$('#form1').validator();
```

##Example 2##

```javascript

// symbol:
// success:
// error:
// live:
// required:
// highlight:
// footnote:

$('#form2').validator({
  symbol: "&#9775;",
	success: function(){
		alert('Submit handled');
	},
	error: showErrors,
	live: function(errors) {
		if (errors.length) {
			showErrors(errors);
		} else {
			$('#errors').html("");
		}
	},
	required: {
		color: 'red',
		'font-weight': 'bold'
	},
	highlight: {
		border: '1px dotted red'
	},
	footnote: "this is required."
});

// Callback function 
function showErrors(errors) {
	var msg = "<p>You have some issues:</p><ul>";
	for (var i=0; i<errors.length; i++) {
		msg += "<li>" + errors[i].message + "</li>";
	}
	msg += "</ul>";
	
	$('#errors').html(msg);
}
```
##Example 3##

```javascript

// success: 
// required:
// highlight:
// rules:

$('#form3').validator({
	success: function(){
		alert('Submit handled');
		return false;
	},
	required: {
		color: 'purple',
		'font-weight': 'bold'
	},
	highlight: {
		border: '1px dotted purple'
	},
	rules: [
		{
			input: 'user_name',
			when: 'live',
			type: 'ajax',
			url: '/ajax/validator.php',
			success: function(){},
			error: function(){}
		}, 
		{
			input: [
				'password',
				'confirm'
			],
			oper: 'not equal',
			success: function() {
				alert('One small step for man.');
			},
			error: function(errors) {
				alert(errors.message);
			}
		}
	]
});
```