class ContributorsController < ApplicationController

	@client = Twilio::REST::Client.new ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN']

	def create
		if request.xhr?
			user = User.find(params[:user_id])
			number = params[:contributor][:phone_number].gsub(/\D/, '')
			number = "+1" << number
			puts number
			contributor = user.contributors.find_or_create_by_name_and_phone_number(
										params[:contributor][:name],
										number)
			playlist = Playlist.find(params[:playlist_id])
			if !(playlist.contributors.include?(contributor))
				playlist.contributors << contributor
				@client.account.sms.messages.create(
					from: ENV['TWILIO_NUMBER'],
					to: contributor.phone_number,
					body: "You have been invited to the playlist: #{playlist.title}.  To add a song to the playlist, response to this number with the song you want in the format \"#{playlist.id} (song name) - (song artist)\"")
			end
			render json: contributor
		end
	end
end
