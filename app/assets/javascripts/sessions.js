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

	if ($('#active').data('active') == true) {
		console.log('hey')
		var userID = $('#active').data('user').id
		console.log(userID)
		$.get('users/' + userID, function(data) {
			$('.container').remove()
			$('body').append(data)
		})
		R.authenticate(function(auth) {
			if (auth === true) {
				logIn()
			}
		})
	}
})