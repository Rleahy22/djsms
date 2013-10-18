require 'spec_helper'

describe Playlist do

	let(:user) { FactoryGirl.create(:user) }
	before do
		@playlist = user.playlists.build(title: "Top 100",
																		 rdio_id: "p6780967")
	end

	subject { @playlist }

	it { should respond_to(:title) }
	it { should respond_to(:user_id) }
	it { should respond_to(:rdio_id) }
	it { should respond_to(:user) }
	its(:user) { should == user }

	it { should be_valid }

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
