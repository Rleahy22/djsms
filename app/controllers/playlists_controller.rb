class PlaylistsController < ApplicationController
	before_filter :signed_in_user, only: [:create, :destroy]
	before_filter :correct_user, only: [:destroy, :edit]

	def show
		@playlist = Playlist.find(params[:id])
		@current_user = current_user
		@correct_user = correct_user?
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
		@playlist.destroy
		redirect_to user_path(current_user)
	end

	def edit
	end

	private

		def correct_user
			@playlist = current_user.playlists.find_by_id(params[:id])
			redirect_to root_url if @playlist.nil?
		end

		def correct_user?
			current_user.playlists.find_by_id(params[:id])
		end
end
