class ContributorsController < ApplicationController

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
        client = generate_twilio
        client.account.sms.messages.create(
          from: ENV['TWILIO_NUMBER'],
          to: contributor.phone_number,
          body: "You've been added to the playlist #{playlist.title}. Text this number in the format:\n\"#{playlist.id} (song name) - (song artist)\" to add a song")
      end
      render json: contributor
    end
  end
end
