require 'spec_helper'

describe Text do

	let(:user) { FactoryGirl.create(:user) }
	before do
		@playlist = user.playlists.create!(title: "Top 100",
																		 	 rdio_id: "p6780967")
		@text = @playlist.texts.create!(content: "123 Hey Jude - The Beatles",
																		sender: "+18158612021")
	end

	subject { @text }

	it { should respond_to(:content) }
	it { should respond_to(:sender) }
	it { should respond_to(:playlist) }
	its(:playlist) { should == @playlist}

	it { should be_valid }

	describe "when content is not present" do
		before { @text.content = '' }

		it { should_not be_valid }
	end

	describe "when sender is not present" do
		before { @text.sender = '' }

		it { should_not be_valid }
	end

	describe "when sender is in wrong format" do
		it "should not be valid" do
			senders = %w[8005551234 17732025862 +5558675309 Steve]
			senders.each do |sender|
				@text.sender = sender
				@text.should_not be_valid
			end
		end
	end
end
