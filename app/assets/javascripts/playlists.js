$(document).ready(function() {
	var newPlaylist = function(name) {
		R.request({
			method: "createPlaylist",
			content: {
				name: name,
				description: "This playlist was created by DJ SMS",
				tracks: "t32961632"
			},
			success: function(response) {
				playlistPost(response.result['shortUrl'], response.result['embedUrl'])
			},
			error: function(response) {
				console.log("error: " + response.message)
			}
		})
	}

	var playlistPost = function(shortUrl, embedUrl) {
		$.post('/playlists',
			{playlist: {title: $('input[name="playlist[title]"]').val(), 
										 embed_url: embedUrl}},
			function(data) {
				$('.container').remove()
			 	$('body').append(data)
			 	$('body').append('<iframe width="500" height="250" src="' + embedUrl + '" frameborder="0"></iframe>')
			}
		)
	}

	var togglePlayPause = function() {
		$('.play-visible').toggle()
		$('.pause-visible').toggle()
	}

	$('.create-playlist').on('click', function(e) {
		e.preventDefault()
		newPlaylist($('input[name="playlist[title]"]').val())
	})

	$('.pause-visible').toggle()

	$('.play-visible').on('click', function(){
		togglePlayPause()
	})

	$('.pause-visible').on('click', function(){
		togglePlayPause()
	})
})