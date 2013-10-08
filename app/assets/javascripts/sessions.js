$(document).ready(function() {
	var logIn = function() {
		$.post('/sessions',
			{session: {email: $('input[name="session[email]"]').val(), 
					 			 password: $('input[name="session[password]"]').val()}},
			function(data) {
			 	$('.container').remove()
			 	$('body').append(data)
			}
		)
	}
	$('.login').submit(function(e) {
		e.preventDefault()
		R.authenticate(function(auth) {
			if (auth === true) {
				logIn()
			}
		})
	})
})