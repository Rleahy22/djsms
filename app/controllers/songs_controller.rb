class SongsController < ApplicationController

	def new
	end

	def create
		@song = Song.new(params[:song])
		@playlist = Playlist.find(params[:playlist])
		if @song.save
			@playlist.songs << @song
			flash[:succes] = "Song Added"
			redirect_to song_path(@song)
		else
			redirect_to current_user
		end
	end

	def show
		@song = Song.find(params[:id])
	end

	def destroy
		Song.find(params[:id]).destroy
		render nothing: true
	end
end
