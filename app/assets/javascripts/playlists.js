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

	var stopPlayer = function() {
		$('.play-visible').show()
		$('.pause-visible').hide()
		R.player.pause()
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
			$('input[name="song[query]"]').val('')
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

	var watchForSongChange = function() {
		R.player.on("change:playingTrack", function(newSong) {
		  var currentKey = newSong.attributes.key
		  $('.playing').removeClass("playing")
		  $('.' + currentKey).addClass("playing")
		  $('#playing-marquee-left').html(newSong.attributes.name + ' - ' + newSong.attributes.artist)
		  $('#playing-marquee-right').html(newSong.attributes.name + ' - ' + newSong.attributes.artist)
		});
	}

	var watchForSourceChange = function() {
		R.player.on("change:playingSource", function(newSource) {
			if (newSource.attributes.key != $('.playlist-data').data('playlistrdioid')) {
				stopPlayer()
			}
		})
	}

	$('.create-playlist').on('click', function(e) {
		e.preventDefault()
		newPlaylist($('input[name="playlist[title]"]').val())
	})

	$('.pause-visible').toggle()

	$('.play-visible').on('click', function() {
		if (ran == false || R.player.playingSource() != $('.playlist-data').data('playlistrdioid')) {
			R.player.play({source: $('.playlist-data').data('playlistrdioid')})
			$('.play-visible').toggle()
			$('.pause-visible').toggle()
			watchForSongChange()
			watchForSourceChange()
			ran = true
		} else {
			togglePlayPause()
		}
	})

	$('.pause-visible').on('click', function() {
		togglePlayPause()
	})

	$('.previous').on('click', function() {
		R.player.previous()
	})

	$('.next').on('click', function() {
		R.player.next()
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
		if ($('.search-results').css('display') != 'none') {
			$('.search-results').toggle()
		}
		$('.search-results').html('')
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
	
	if ($('.player').length != 0) {
		alert('swag')
		setTimeout(function() {$('#playing-marquee-left').show()}, 5000)
	}
})