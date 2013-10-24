class TextsController < ApplicationController

	def create
		content = params[:Body]
	  sender = params[:From]
	  @text = Text.create(content: content, sender: sender)
	end

	def index
		@texts = Text.all
	end
end
