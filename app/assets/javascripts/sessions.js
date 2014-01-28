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

  }

  $('input[name="session[email]"]').focus()

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

  $('.signup-new').on('click', function(e) {
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

  $('.edit_user').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
      url: $(this).attr('action'),
      type: 'PUT',
      data: {user: {username: $('input[name="user[username]"]').val(),
              email: $('input[name="user[email]"]').val(),
              password: $('input[name="user[password]"]').val(),
              password_confirmation: $('input[name="user[password_confirmation]"]').val()}},
      success: function(data) {
        console.log("holla")
        $('.nav').remove()
        $('.container').remove()
        $('body').append(data)
      },
      error: function(data) {
        console.log(data)
      }
    })
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

  $('.profile-link').on('click', function(e) {
    e.preventDefault()
    var route = $(this).attr('href')
    $.get(route, function(data) {
      $('.container').remove()
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
    if ($('.playlist').length == 0) {
      R.player.pause()
    }
    $('.loading-dj').remove()
  })
})