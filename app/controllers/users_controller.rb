class UsersController < ApplicationController
  before_filter :signed_in_user, only: [:edit, :update]
  before_filter :correct_user, only: [:edit, :update]

  @twilio_account_sid = ENV['TWILIO_ACCOUNT_SID']
  @twilio_auth_token = ENV['TWILIO_AUTH_TOKEN']
    

  def index
    @users = User.paginate(page: params[:page])
  end

  def new
    @user = User.new
  end

  def show
    @user = User.find(params[:id])
    @current_user = current_user
    @playlists = @user.playlists.paginate(page: params[:page])
    @playlist = current_user.playlists.build if signed_in?
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      sign_in @user
      flash[:success] = "Welcome to DJ SMS"
      redirect_to @user
    else
      render 'new'
    end
  end

  def edit
  end

  def update
    if @user.update_attributes(params[:user])
      flash[:success] = "Profile Updated"
      redirect_to @user
    else
      render 'edit'
    end
  end

  private

    def correct_user
      @user = User.find(params[:id])
      redirect_to(signin_url) unless current_user?(@user)
    end
end
