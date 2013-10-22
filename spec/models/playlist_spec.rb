require 'spec_helper'

describe Playlist do

	let(:user) { FactoryGirl.create(:user) }
	before do
		@playlist = user.playlists.create!(title: "Top 100",
																		 rdio_id: "p6780967")
		@song = Song.create!(query: "Black Skinhead - Kanye West",
										 key: "t32961632",
										 name: "Black Skinhead",
										 artist: "Kanye West",
										 icon: "http://http://rdio-c.cdn3.rdio.com/album/5/c/4/00000000002fa4c5/2/square-200.jpg")
		@playlist.songs << @song
	end

	subject { @playlist }

	it { should respond_to(:title) }
	it { should respond_to(:user_id) }
	it { should respond_to(:rdio_id) }
	it { should respond_to(:user) }
	its(:user) { should == user }

	it { should be_valid }

	it "should have created a relationship" do
		PlaylistsSong.first.playlist.should == @playlist
		PlaylistsSong.first.song.should == @song
	end

	it "should have songs" do
		@playlist.songs.should == [@song]
	end

	describe "when user_id is not present" do
		before { @playlist.user_id = nil }
		it { should_not be_valid }
	end

	describe "with no title" do
		before { @playlist.title = '' }
		it { should_not be_valid}
	end

	describe "with a title that is too long" do
		before { @playlist.title = 'x' * 51 }
		it { should_not be_valid }
	end

	describe "accessible attributes" do
		it "should not allow access to user_id" do
			expect do
				Playlist.new(title: "Beach Jamz", user_id: user.id)
			end.to raise_error(ActiveModel::MassAssignmentSecurity::Error)
		end
	end
end
