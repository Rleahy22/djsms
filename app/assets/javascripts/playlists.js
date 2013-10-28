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

	var togglePlayPause = function() {
		R.player.togglePause()
		$('.play-visible').toggle()
		$('.pause-visible').toggle()
	}

	var stopPlayer = function() {
		$('.play-visible').show()
		$('.pause-visible').hide()
		R.player.pause()
	}

	var search = function(query, source) {
		R.ready(function(){
      R.request({
        method: "search",
        content: {
                query: query,
                types: "track"
        },
        success: function(response) {
                song = response.result.results[0]
                if (source == 'web') {
                	addSongToDJSMS(song)
                } else {
                	addSongToRdio(song.key, query)
                }
        },
        error: function(response) {
                console.log("error " + response.message)
        }
      })
    })
	}

	var addSongToRdio = function(key, query) {
		R.ready(function() {
			R.request({
	      method: "addToPlaylist",
	      content: {playlist: $('.playlist-data').data('playlistrdioid'),
	              	tracks: key
	      },
	      success: function(response) {
	        $.post('/songs', 
					{song: {query: query,
									key: song.key,
									name: song.name,
									artist: song.artist,
									icon: song.icon},
					 playlist: $('.playlist-data').data('playlistid')},
					function() {
						if ((song.name + ' - ' + song.artist).length <= 40) {
							$('#song-list').append('<li class="playlist-song ' + song.key + '"><img src="' + song.icon + '" class="song-icon"><h3 class="song-info">' + song.name + ' - ' + song.artist + '</h3></li>')
						} else {
							$('#song-list').append('<li class="playlist-song ' + song.key + '"><img src="' + song.icon + '" class="song-icon"><h3 class="song-info song-long">' + song.name + ' - ' + song.artist + '</h3></li>')
						}
						$('.search-results').toggle()
					}
					)
					if (R.player.playingSource().attributes.key == $('.playlist-data').data('playlistrdioid')) {
						var trackPosition = R.player.sourcePosition()
						var timePosition = R.player.position()
						if (R.player.playState() == 0) {
							R.player.play({source: $('.playlist-data').data('playlistrdioid'), index: trackPosition, initialPosition: timePosition})
							setTimeout(function(){R.player.pause()}, 2000)
						} else {
							R.player.play({source: $('.playlist-data').data('playlistrdioid'), index: trackPosition, initialPosition: timePosition})
						}
					}
	      },
	      error: function(response) {
	              console.log("error " + response.message)
	      }
	    })
		})
	}

	var addSongToDJSMS = function(song) {
		$('.search-results').toggle()
    $('.search-results').append('<img src="' + song.icon + '" class="song-icon"><button id="add-song">Add Song</button><h3 class="song-info">' + song.name + ' - ' + song.artist + '</h3>')
		$('#add-song').on('click', function() {
			$('input[name="song[query]"]').val('')
			addSongToRdio(song.key, $('input[name="song[query]"]').val())
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

	var retrieveTexts = function() {
		console.log('what')
		setTimeout(retrieveTexts, 10000)
		if ($('.playlist-data').data('playlistid') != null ) {
			$.get('playlist/' + $('.playlist-data').data('playlistid') + '/texts', function(data) {
				console.log(data)
				$.each(data, function(index, text) {
					$.ajax({
						url: '/texts/' + text.id,
						type: 'DELETE',
						success: function(result) {
							console.log("Result: " + result)
						}
					})
					textBody = text.content
					index = textBody.indexOf(' ')
					targetID = textBody.substring(0, index)
					searchQuery = textBody.substring(index + 1)
					search(searchQuery, 'text')
				})
			})
		}
	}

	var watchForPlayStateChange = function() {
		R.player.on("change:playState()", function() {
			if (R.player.playState() == 0) {
				$('.play-visible').show()
				$('.pause-visible').hide()
			} else {
				$('.play-visible').hide()
				$('.pause-visible').show()
			}
		})
	}

	var play = function() {
		if (ran == false) {
			R.player.play({source: $('.playlist-data').data('playlistrdioid')})
			$('.play-visible').toggle()
			$('.pause-visible').toggle()
			watchForSongChange()
			watchForSourceChange()
			watchForPlayStateChange()
			ran = true
		} else {
			togglePlayPause()
		}
	}

	$('.create-playlist').on('click', function(e) {
		e.preventDefault()
		newPlaylist($('input[name="playlist[title]"]').val())
	})

	$('.pause-visible').toggle()

	$('.play-visible').on('click', function() {
		play()
	})

	$('.pause-visible').on('click', function() {
		togglePlayPause()
	})

	$('.previous').on('click', function() {
		R.player.previous()
		if (R.player.playState() == 0) {
			R.player.pause()
		}
	})

	$('.next').on('click', function() {
		R.player.next()
		if (R.player.playState() == 0) {
			R.player.pause()
		}
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
		search($('input[name="song[query]"]').val(), 'web')
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

	$('.player').on('dblclick', '.playlist-song', function() {
		R.player.play({source: $('.playlist-data').data('playlistrdioid'), index: $(this).index()})
		if (R.player.playState() == 0) {
			$('.play-visible').toggle()
			$('.pause-visible').toggle()
		}
		watchForSongChange()
		watchForSourceChange()
		watchForPlayStateChange()
		ran = true
	})
	
	if ($('.player').length != 0) {
		setTimeout(function() {$('#playing-marquee-left').show()}, 5000)
		setTimeout(retrieveTexts, 10000)
	}

})