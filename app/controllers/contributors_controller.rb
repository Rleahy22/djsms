class ContributorsController < ApplicationController

	def create
		if request.xhr?
			user = User.find(params[:user_id])
			contributor = user.contributors.find_or_create_by_name_and_phone_number(
										params[:contributor][:name],
										params[:contributor][:phone_number])
			playlist = Playlist.find(params[:playlist_id])
			if !(playlist.contributors.include?(contributor))
				playlist.contributors << contributor
			end
			render json: contributor
		end
	end
end
