class PlaylistsController < ApplicationController
	before_filter :signed_in_user, only: [:create, :destroy]
	before_filter :correct_user, only: [:destroy, :edit, :update]

	def show
		@playlist = Playlist.find(params[:id])
		@current_user = current_user
		@correct_user = correct_user?
		@song = Song.new
		@contributor = Contributor.new
	end

	def create
		@playlist = current_user.playlists.build(params[:playlist])
		if @playlist.save
			flash[:success] = "Playlist Created"
			redirect_to playlist_path(@playlist)
		else
			redirect_to current_user
		end
	end

	def destroy
		@playlist.destroy
		redirect_to user_path(current_user)
	end

	def edit
	end

	def update
		if @playlist.update_attributes(params[:playlist])
			flash[:success] = "Playlist Updated"
			redirect_to @playlist
		else
			redirect_to edit_playlist_path(@playlist)
		end
	end

	def texts
		if request.xhr?
			playlist = Playlist.find(params[:id])
			texts = playlist.texts.all
			render json: texts
		else
			redirect_to '/'
		end
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
