class TextsController < ApplicationController

	def create
		content = params[:Body]
	  sender = params[:From]
	  index = content.index(' ')
	  playlist_id = content[0, index]
	  content = content[index + 1..-1]
	  playlist = Playlist.find(playlist_id)
	  @text = playlist.texts.create(content: content, sender: sender)
	end

	def index
		if request.xhr?
			texts = Text.all
			render json: texts
		else
			redirect_to '/'
		end
	end

	def destroy
		@text = Text.find(params[:id])
		@text.destroy
	end
end
