require 'spec_helper'

describe "SongPages" do
	
	subject { page }

	let(:user) { FactoryGirl.create(:user) }
  let(:playlist) { FactoryGirl.create(:playlist, user: user, title: "Pop") }

  before { sign_in(user) }

  describe "song creation" do
  	before { visit playlist_path(playlist) }

  	describe "with invalid information" do

  		it "should not create a song" do
  			expect { click_button "Search" }.not_to change(Song, :count)
  		end
  	end

  	describe "with valid information" do
  		before do
        fill_in "song_query", with: "Black Skinhead - Kanye West"
        find(:xpath, "//input[@id='song_key']").set "t32961632"
        find(:xpath, "//input[@id='song_name']").set "Black Skinhead"
        find(:xpath, "//input[@id='song_artist']").set "Kanye West"
  			find(:xpath, "//input[@id='song_icon']").set "http://rdio-c.cdn3.rdio.com/album/5/c/4/00000000002fa4c5/2/square-200.jpg"
  		end

  		it "should create a song" do
  			expect { click_button "Search" }.to change(Song, :count).by(1)
  		end
  	end
  end
end