class SongsController < ApplicationController

  def new
  end

  def create
    if request.xhr?
      @song = Song.new(params[:song])
      @playlist = Playlist.find(params[:playlist])
      if @song.save
        @playlist.songs << @song
        flash[:succes] = "Song Added"
        render json: @song
      else
        redirect_to current_user
      end
    end
  end

  def show
    @song = Song.find(params[:id])
  end

  def destroy
    Song.find(params[:id]).destroy
    render nothing: true
  end
end
