require 'spec_helper'

describe Contributor do

	let(:user) { FactoryGirl.create(:user) }

	before do
		@contributor = user.contributors.create(name: "Jenny",
																						phone_number: "+15558675309")
		@playlist = user.playlists.create(title: "Pop", rdio_id: "p6780967")
		@playlist.contributors << @contributor
	end

	subject { @contributor }

	it { should respond_to(:name) }
	it { should respond_to(:phone_number) }
	it { should respond_to(:user_id) }
	its(:user) { should == user }

	it { should be_valid }

	it "should have created a relationship with users" do
		user.contributors.first.should == @contributor
	end


	it "should have created a relationship with playlists" do
		PlaylistsContributor.first.playlist.should == @playlist
		PlaylistsContributor.first.contributor.should == @contributor
	end

	it "should have playlists" do
		@contributor.playlists.should == [@playlist]
	end

	describe "when name is not present" do
		before { @contributor.name = '' }

		it { should_not be_valid }
	end

	describe "when phone number format is invalid" do
		before { @contributor.phone_number = "555-867-5309" }

		it { should_not be_valid }
	end
end
