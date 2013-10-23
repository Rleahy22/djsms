$(document).ready(function() {
	var apiReady = false

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

	if (apiReady == false) {
		$('body').css("cursor", "wait")
	}

	$('.login').submit(function(e) {
		e.preventDefault()
		$('.alert').remove()
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

	$('.nav-link').on('click', function(e) {
		e.preventDefault()
		var route = $(this).attr('href')
		$.get(route, function(data) {
			$('.container').remove()
			$('.playlist-container').remove()
			$('.edit-container').remove()
			$('body').append(data)
		})
	})

	$('#edit-playlist').on('click', function(e) {
		e.preventDefault()
		var route = $(this).attr('href')
		$.get(route, function(data) {
			$('.playlist-container').remove()
			$('body').append(data)
		})
	})

	if ($('#active').data('active') == true) {
		var userID = $('#active').data('user').id
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

	R.ready(function(){
		apiReady = true
		$('body').css("cursor", "auto")
	})
})