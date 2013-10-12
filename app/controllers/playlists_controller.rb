class PlaylistsController < ApplicationController
	before_filter :signed_in_user, only: [:create, :destroy]

	def show
		@playlist = Playlist.find(params[:id])
	end

	def create
		@playlist = current_user.playlists.build(params[:playlist])
		if @playlist.save
			flash[:success] = "Playlist Created"
			redirect_to playlist_path(@playlist)
		else
			redirect_to user_path(current_user)
		end
	end

	def destroy
	end
end
