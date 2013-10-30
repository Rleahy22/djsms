class ContributorsController < ApplicationController

	def create
		if request.xhr?
			user = User.find(params[:user_id])
			contributor = user.contributors.create(params[:contributor])
			render json: contributor
		end
	end
end
