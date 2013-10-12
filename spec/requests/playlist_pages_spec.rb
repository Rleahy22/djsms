require 'spec_helper'

describe "PlaylistPages" do
  
  subject { page }

  let(:user) { FactoryGirl.create(:user) }
  before { sign_in user }

  describe "playlist creation" do
  	before { visit user_path(user) }

  	describe "with invalid information" do

  		it "should not create a playlist" do
  			expect { click_button "Create Playlist" }.not_to change(Playlist, :count)
  		end

  		describe "error messages" do
  			before { click_button "Create Playlist" }
  			it { should have_content('*') }
  		end
  	end

  	describe "with valid information" do

  		before { fill_in 'playlist_title', with: "Ultimate Creed Playlist" }
  		it "should create a playlist" do
  			expect { click_button "Create Playlist" }.to change(Playlist, :count).by(1)
  		end
  	end
  end
end
