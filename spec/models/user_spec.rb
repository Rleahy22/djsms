require 'spec_helper'

describe User do
  before do
    @user = User.create!(username: "example1",
                         email: "example@me.com",
                         password: "Password1",
                         password_confirmation: "Password1")
    @other_user = User.create!(username: "example2",
                               email: "example2@me.com",
                               password: "Password1",
                               password_confirmation: "Password1")
    @friend = Friendship.create(user_id: @user.id, friend_id: @other_user.id)
  end
  
  subject { @user }

  it { should respond_to(:username) }
  it { should respond_to(:email) }
  it { should respond_to(:password_digest) }
  it { should respond_to(:password) }
  it { should respond_to(:password_confirmation) }
  it { should respond_to(:remember_token) }
  it { should respond_to(:authenticate) }
  it { should respond_to(:playlists) }
  it { should respond_to(:friends) }
  it { should respond_to(:friendships) }
  it { should respond_to(:contributors) }

  it { should be_valid }

  it "should have created a relationship with friends" do
    @user.friends.first.should == @other_user
  end

  describe "when username is not present" do
    before { @user.username = "" }
    it { should_not be_valid }
  end

  describe "when username is too long" do
    before { @user.username = "x" * 21 }
    it { should_not be_valid}
  end

  describe "when username is already taken" do
    before do
      user_with_same_name = @user.dup
      user_with_same_name.username = @user.username.upcase
      user_with_same_name.email = "different@email.com"
      user_with_same_name.should_not be_valid
    end
  end

  describe "when email is not present" do
    before { @user.email = "" }
    it { should_not be_valid }
  end

  describe "when email format is invalid" do
    it "user should be invalid" do
      addresses = %w[useratgmaildotcom me@mecom @gmail.com user]
      addresses.each do |invalid_address|
        @user.email = invalid_address
        @user.should_not be_valid
      end
    end
  end

  describe "when email address is already taken" do
    before do
      user_with_same_email = @user.dup
      user_with_same_email.email = @user.email.upcase
      user_with_same_email.username = "different_user"
      user_with_same_email.should_not be_valid
    end
  end

  describe "when password is not present" do
    before { @user.password = "" }
    it { should_not be_valid }
  end

  describe "when password and password_confirmation don't match" do
    before do
      passwords = ["", "notpassword"]
      passwords.each do |unmatched_password|
        @user.password_confirmation = unmatched_password
        @user.should_not be_valid
      end
    end
  end

  describe "with a password that is too short" do
    before { @user.password = @user.password_confirmation = "Xxxx123" }
    it { should_not be_valid }
  end

  describe "with a password that does not contain a number" do
    before { @user.password = @user.password_confirmation = "Password" }
    it { should_not be_valid}
  end

  describe "playlist associations" do

    before { @user.save }
    let!(:older_playlist) do
      FactoryGirl.create(:playlist, user: @user, created_at: 1.day.ago)
    end
    let!(:newer_playlist) do
      FactoryGirl.create(:playlist, user: @user, created_at: 1.hour.ago)
    end

    it "should have the playlists in the right order" do
      @user.playlists.should == [newer_playlist, older_playlist]
    end

    it "should destroy associated playlists" do
      playlists = @user.playlists.dup
      @user.destroy
      playlists.should_not be_empty
      playlists.each do |playlist|
        Playlist.find_by_id(playlist.id).should be_nil
      end
    end
  end
end
