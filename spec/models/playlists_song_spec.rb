require 'spec_helper'

describe PlaylistsSong do

	before do
		@playlist_song = PlaylistsSong.new(playlist_id: 1, song_id: 1)
	end

	subject { @playlist_song }

	it { should respond_to(:playlist_id) }
	it { should respond_to(:song_id) }

	it { should be_valid }
end
