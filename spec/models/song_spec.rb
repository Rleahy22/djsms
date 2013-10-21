require 'spec_helper'

describe Song do
	let(:user) { FactoryGirl.create(:user) }
	let(:playlist) { user.playlists.build(title: "Top 100",
																		 rdio_id: "p6780967") }
	before do
		@song = Song.new(key: "t32961632",
										 name: "Black Skinhead",
										 artist: "Kanye West",
										 icon: "http://http://rdio-c.cdn3.rdio.com/album/5/c/4/00000000002fa4c5/2/square-200.jpg")
	end

	subject { @song }

	it { should respond_to(:key) }
	it { should respond_to(:name) }
	it { should respond_to(:artist) }
	it { should respond_to(:icon) }

	it { should be_valid }

	describe "when key is not present" do
		before { @song.key = "" }

		it { should_not be_valid }
	end

	describe "when key is invalid" do
		before { @song.key = "invalid" }

		it { should_not be_valid }
	end

	describe "when name is not present" do
		before { @song.name = "" }

		it { should_not be_valid }
	end

	describe "when artist is not present" do
		before { @song.artist = "" }

		it { should_not be_valid }
	end

	describe "when icon is not present" do
		before { @song.icon = "" }

		it { should_not be_valid }
	end

end
