$(document).ready(function() {
  var activePlaylist = {}
  var ran = false
  var song = {}
  var changed = false

  var Playlist = function(name, key) {
    this.name = name
    this.key = key

    this.create = function() {
      R.request({
        method: "createPlaylist",
        content: {
          name: this.name,
          description: "This playlist was created by DJ SMS",
          tracks: ""
        },
        success: function(response) {
          playlistPost(response.result['key'])
          this.key = response.result['key']
        },
        error: function(response) {
          console.log("error: " + response.message)
        }
      })
    }

    this.play = function() {
      if (ran == false) {
        R.player.play({source: this.key})
        $('.play-visible').toggle()
        $('.pause-visible').toggle()
        watchForSongChange()
        watchForSourceChange()
        ran = true
      } else {
        this.togglePlayPause()
      }
    }

    this.togglePlayPause = function() {
      R.player.togglePause()
      $('.play-visible').toggle()
      $('.pause-visible').toggle()
    }

    this.stop = function() {
      $('.play-visible').show()
      $('.pause-visible').hide()
      R.player.pause()
    }

    this.next = function() {
      R.player.next()
      if (R.player.playState() == 0) {
        R.player.pause()
      }
    }

    this.previous = function() {
      R.player.previous()
      if (R.player.playState() == 0) {
        R.player.pause()
      }
    }

    this.addSongToDJSMS = function(song) {
      $('.search-results').toggle()
      $('.search-results').append('<img src="' + song.icon + '" class="song-icon"><button id="add-song">Add Song</button><h3 class="song-info">' + song.name + ' - ' + song.artist + '</h3>')
      $('#add-song').on('click', function() {
        $('input[name="song[query]"]').val('')
        window.playlist.addSongToRdio(song.key, $('input[name="song[query]"]').val())
      })
    }

    this.addSongToRdio = function(key, query) {
      R.ready(function() {
        R.request({
          method: "addToPlaylist",
          content: {playlist: window.playlist.key,
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
              function(data) {
                var songID = data.id
                if ((song.name + ' - ' + song.artist).length <= 40) {
                  $('#song-list').append('<li class="playlist-song ' + song.key + '" data-songid="' + songID + '" data-songkey="' + song.key + '"><img src="' + song.icon + '" class="song-icon"><h3 class="song-info">' + song.name + ' - ' + song.artist + '</h3></li>')
                } else {
                  $('#song-list').append('<li class="playlist-song ' + song.key + '" data-songid="' + songID + '" data-songkey="' + song.key + '"><img src="' + song.icon + '" class="song-icon"><h3 class="song-info song-long">' + song.name + ' - ' + song.artist + '</h3></li>')
                }
                $('.search-results').hide()
              }
            )
            changed = true
          },
          error: function(response) {
            console.log("error " + response.message)
          }
        })
      })
    }
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
                  window.playlist.addSongToDJSMS(song)
                } else {
                  window.playlist.addSongToRdio(song.key, query)
                }
        },
        error: function(response) {
                console.log("error " + response.message)
        }
      })
    })
  }

  var watchForSongChange = function() {
    R.player.on("change:playingTrack", function(newSong) {
      var currentKey = newSong.attributes.key
      if (changed == true) {
        var trackPosition = R.player.sourcePosition()
        R.player.play({source: $('.playlist-data').data('playlistrdioid'), index: trackPosition})
        changed = false
      }
      $('.playing').removeClass("playing")
      $('.' + currentKey).addClass("playing")
      var index = $('.playing').index()
      $('#song-list').scrollTop(index * 59)
      $('#playing-marquee-left').html(newSong.attributes.name + ' - ' + newSong.attributes.artist)
      $('#playing-marquee-right').html(newSong.attributes.name + ' - ' + newSong.attributes.artist)
    });
  }

  var watchForSourceChange = function() {
    R.player.on("change:playingSource", function(newSource) {
      if (newSource.attributes.key != $('.playlist-data').data('playlistrdioid')) {
        window.playlist.stop()
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

  window.playlist = new Playlist($('#playlist-h1').text(), $('.playlist-data').data('playlistrdioid'))

  $('.create-playlist').on('click', function(e) {
    e.preventDefault()
    window.playlist = new Playlist($('input[name="playlist[title]"]').val())
    playlist.create()
    // newPlaylist($('input[name="playlist[title]"]').val())
  })

  $('.pause-visible').toggle()

  $('.play-visible').on('click', function() {
    window.playlist.play()
  })

  $('.pause-visible').on('click', function() {
    window.playlist.togglePlayPause()
  })

  $('.previous').on('click', function() {
    window.playlist.previous()
  })

  $('.next').on('click', function() {
    window.playlist.next()
  })

  $('.view-playlist').on('click', function(e) {
    e.preventDefault()
    var route = $(this).attr('href')
    $.get(route, function(data) {
      $('.container').remove()
      $('body').append(data)
    })
  })

  $('#delete-playlist').on('click', function(e) {
    e.preventDefault()
    var route = $(this).attr('href')
    R.request({
      method: "deletePlaylist",
      content: {
        playlist: window.playlist.key,
      },
      success: function(response) {
        $.ajax({
          url: route,
          type: 'DELETE',
          success: function() {
            window.location.href = '/'
          }
        })
      },
      error: function(response) {
      }
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

  $('#add-button').on('click', function(e) {
    e.preventDefault()
    console.log('hey')
    $('.add-friends').show()
  })

  $('#close').on('click', function(e) {
    e.preventDefault()
    $('.add-friends').hide()
  })

  $('#friend-submit').on('click', function(e) {
    e.preventDefault()
    $.post('/contributors',
      {contributor: {name: $('input[name="contributor[name]"]').val(),
                     phone_number: $('input[name="contributor[phone_number]"]').val()},
      user_id: $('.playlist-data').data('userid'),
      playlist_id: $('.playlist-data').data('playlistid')},
      function(data) {
        var phoneNumber = data.phone_number.replace(/\+1/, "")
        phoneNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
        $('#contrib-list').append('<li><h3 class="contrib-name">' + data.name + '</h3><h3 class="contrib-phone">' + phoneNumber + '</h3></li>')
      }
    )
  })
  // $('#update').on('click', function(e) {
  //  e.preventDefault()
  //  var route = $(this).parent()[0].action.replace("http://localhost:3000", "")
  //  console.log(route)
  //  $.post(route, 
  //    {playlist: {title: $('input[name="playlist[title]"]').val()}},
  //    function(data) {
  //      $('.container').remove()
  //      $('body').append(data)
  //    }
  //  )
  // })

  $('.player').on('dblclick', '.playlist-song', function() {
    R.player.play({source: $('.playlist-data').data('playlistrdioid'), index: $(this).index()})
    if (R.player.playState() == 0) {
      $('.play-visible').toggle()
      $('.pause-visible').toggle()
    }
    watchForSongChange()
    watchForSourceChange()
    ran = true
  })
  
  if ($('.player').length != 0) {
    setTimeout(function() {$('#playing-marquee-left').show()}, 5000)
    setTimeout(retrieveTexts, 10000)
  }


  $('.player').on("contextmenu", ".playlist-song", function(e) {
    var clickedSong = $(this)
    if (confirm("delete " + clickedSong.context.innerText + " from playlist?")) {
      var songID = clickedSong.data('songid')
      $.ajax({
        url: '/songs/' + songID,
        type: 'DELETE',
        success: function(result) {
          R.request({
            method: "removeFromPlaylist",
            content: {
                      playlist: $('.playlist-data').data('playlistrdioid'),
                      index: clickedSong.index(),
                      count: 1,
                      tracks: clickedSong.data('songkey')
            },
            success: function(response) {
            },
            error: function(response) {
            }
          })
          clickedSong.remove()
          changed = true
        }
      })
      return false
    }
  })
})