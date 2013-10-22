$(document).ready(function() {
	var activePlaylist = {}
	var ran = false
	var song = {}

	var newPlaylist = function(name) {
		R.request({
			method: "createPlaylist",
			content: {
				name: name,
				description: "This playlist was created by DJ SMS",
				tracks: ""
			},
			success: function(response) {
				playlistPost(response.result['key'])
				console.log(response.result)
			},
			error: function(response) {
				console.log("error: " + response.message)
			}
		})
	}

	var playlistPost = function(key) {
		$.post('/playlists',
			{playlist: {title: $('input[name="playlist[title]"]').val(), 
									rdio_id: key}},
			function(data) {
				$('.container').remove()
			 	$('body').append(data)
			}
		)
	}

	var searchRdio = function(query) {
		R.request({
			method: "search",
			content: {
				query: query,
				types: "track"
			},
			success: function(response) {
				console.log(response.result.results[0])
			}
		})
	}

	var togglePlayPause = function() {
		$('.play-visible').toggle()
		$('.pause-visible').toggle()
		R.player.togglePause()
	}

	var initPlayer = function() {
		if ($('.player').length != 0) {
			R.ready(function() {
				R.player.queue.addPlayingSource($('.playlist-data').data('playlistrdioid'))
			})
		}
	}

	var addSongToRdio = function(key) {
		R.request({
      method: "addToPlaylist",
      content: {playlist: $('.playlist-data').data('playlistrdioid'),
              	tracks: key
      },
      success: function(response) {
                console.log(response)
      },
      error: function(response) {
              console.log("error " + response.message)
      }
    })
	}

	var addSongToDJSMS = function(song) {
		$('.search-results').toggle()
    $('.search-results').append('<img src="' + song.icon + '" class="song-icon"><button id="add-song">Add Song</button><h3 class="song-info">' + song.name + ' - ' + song.artist + '</h3>')
		$('#add-song').on('click', function() {
			addSongToRdio(song.key)
			$.post('/songs', 
				{song: {query: $('input[name="song[query]"]').val(),
								key: song.key,
								name: song.name,
								artist: song.artist,
								icon: song.icon},
				 playlist: $('.playlist-data').data('playlistid')},
				function() {
						$('#song-list').append('<li class="playlist-song"><img src="' + song.icon + '" class="song-icon"><h3 class="song-info">' + song.name + ' - ' + song.artist + '</h3></li>')
						$('.search-results').toggle()
				}
			)
		})
	}

	$('.create-playlist').on('click', function(e) {
		e.preventDefault()
		newPlaylist($('input[name="playlist[title]"]').val())
	})

	$('.pause-visible').toggle()

	$('.play-visible').on('click', function() {
		togglePlayPause()
	})

	$('.pause-visible').on('click', function() {
		togglePlayPause()
	})

	$('.previous').on('click', function() {
		R.player.previous()
		var currentSong = $('.playing')
		// if (R.player.playingTrack().attributes.key == currentSong.previous().data('key'))
		currentSong.removeClass("playing")
		currentSong.prev().addClass("playing")
	})

	$('.next').on('click', function() {
		R.player.next()
		var currentSong = $('.playing')
		currentSong.removeClass("playing")
		currentSong.next().addClass("playing")
	})

	$('.view-playlist').on('click', function(e) {
		e.preventDefault()
		var route = $(this).attr('href')
		$.get(route, function(data) {
			$('.container').remove()
			$('body').append(data)
		})
	})

	$('#submit-search').on('click', function(e) {
		e.preventDefault()
		R.ready(function(){
      R.request({
        method: "search",
        content: {
                query: $('input[name="song[query]"]').val(),
                types: "track"
        },
        success: function(response) {
                song = response.result.results[0]
                addSongToDJSMS(song)
        },
        error: function(response) {
                console.log("error " + response.message)
        }
      })
    })
	})


	// $('#update').on('click', function(e) {
	// 	e.preventDefault()
	// 	var route = $(this).parent()[0].action.replace("http://localhost:3000", "")
	// 	console.log(route)
	// 	$.post(route, 
	// 		{playlist: {title: $('input[name="playlist[title]"]').val()}},
	// 		function(data) {
	// 			$('.container').remove()
	// 			$('body').append(data)
	// 		}
	// 	)
	// })

	initPlayer()

})