require 'spec_helper'

describe "PlaylistPages" do
  
  subject { page }

  let(:user) { FactoryGirl.create(:user) }
  let(:playlist) { FactoryGirl.create(:playlist, user: user, title: "Pop") }
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

  describe "playlist view" do
    before { visit playlist_path(playlist) }

    it { should have_selector('h1', text: playlist.title) }

    describe "player" do

      it { should have_selector('div.player') }
      it { should have_selector('div.controls')}
    end
  end

  describe "as playlist owner" do
    before { visit playlist_path(playlist) }

    it { should have_link('Delete Playlist') }
  end

  describe "not as playlist owner" do
    let(:other_user) { FactoryGirl.create(:user,
                                         username: "New",
                                         email: "new@me.com")}
    before do
      sign_out
      sign_in(other_user)
      visit playlist_path(playlist)
    end

    it { should_not have_link('Delete Playlist') }
  end

  describe "deleting a playlist" do
    before { visit playlist_path(playlist) }
    it "should delete the playlist" do
      expect { click_link "Delete Playlist" }.to change(Playlist, :count).by(-1)
    end
  end
end
