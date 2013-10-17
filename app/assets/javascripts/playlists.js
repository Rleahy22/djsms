$(document).ready(function() {
	var activePlaylist = {}

	var newPlaylist = function(name) {
		R.request({
			method: "createPlaylist",
			content: {
				name: name,
				description: "This playlist was created by DJ SMS",
				tracks: "t32961632"
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
				R.player.play({source: $('.playlist-data').data('playlistid')})
				activePlaylist = R.player.playingSource()
				console.log(activePlaylist.attributes.tracks.models)
				setTimeout(function() {R.player.togglePause()}, 500)
			})
		}
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
		var playlistUrl = $(this).attr('href')
		$.get(playlistUrl, function(data) {
			$('.container').remove()
			$('body').append(data)
		})
	})

	setTimeout(initPlayer, 2000)

	// R.player.play({source: $('.playlist-data').data('playlistid')})

	$('#song-list').append('<li class="playlist-song playing"><img src="http://rdio-b.cdn3.rdio.com/album/2/8/4/000000000032d482/5/square-200.jpg" class="song-icon"><h3 class="song-info">Katy Perry - Roar</h3></li>')
})