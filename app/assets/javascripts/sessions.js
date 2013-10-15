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

	var newUser = function() {
		$.get('/users/new', function(data) {
			$('.container').remove()
			$('body').append(data)
		})
	}

	$('.login').submit(function(e) {
		e.preventDefault()
		R.authenticate(function(auth) {
			if (auth === true) {
				logIn()
			}
		})
	})

	$('.sign-up').on('click', function(e) {
		e.preventDefault()
		newUser()
	})

	$('.signup-edit').on('click', function(e) {
		e.preventDefault()
		$.post('/users',
			{user: {username: $('input[name="user[username]"]').val(),
							email: $('input[name="user[email]"]').val(),
							password: $('input[name="user[password]"]').val(),
							password_confirmation: $('input[name="user[password_confirmation]"]').val(),}},
			function(data) {
				$('.container').remove()
				$('body').append(data)
			}							
		)
	})
})