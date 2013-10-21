class SongsController < ApplicationController

	def new
	end

	def create
		@song = Song.new(params[:song])
		if @song.save
			flash[:succes] = "Song Added"
			redirect_to song_path(@song)
		else
			redirect_to current_user
		end
	end

	def show
		@song = Song.find(params[:id])
	end
end
