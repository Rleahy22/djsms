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
				playlistPost(response.result['embedUrl'])
			},
			error: function(response) {
				console.log("error: " + response.message)
			}
		})
	}

	var playlistPost = function(embedUrl) {
		$.post('/playlists',
			{playlist: {title: $('input[name="playlist[title]"]').val(), 
										 embed_url: embedUrl}},
			function(data) {
				$('.container').remove()
			 	$('body').append(data)
			 	$('body').append('<embed src="' + embedUrl + '" id=rdio-player">')
			}
		)
	}

	$('.create-playlist').on('click', function(e) {
		e.preventDefault()
		newPlaylist($('input[name="playlist[title]"]').val())
	})
})