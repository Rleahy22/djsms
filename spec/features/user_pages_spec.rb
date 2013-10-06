require 'spec_helper'

describe "UserPages" do
 
	subject { page }

 	describe "signup" do
 		before { visit new_user_path }

 		it { should have_selector("input[type=submit][value='Sign Up']") }

 		describe "with invalid information" do
 			it "should not create a user" do
 				expect { click_button "Sign Up" }.not_to change(User, :count)
 			end
 		end

 		describe "with valid information" do
 			before do
 				fill_in "Username", with: "Example1"
 				fill_in "Email", with: "example@me.com"
 				fill_in "Password", with: "Password1"
 				fill_in "Confirm Password", with: "Password1"
 			end

 			describe "after saving the user" do
 				before { click_button "Sign Up" }
 				let(:user) { User.find_by_email("example@me.com")}

 				it { should have_selector('h1', text: user.username) }
 			end

 			it "should create a user" do
 				expect { click_button "Sign Up" }.to change(User, :count).by(1)
 			end
 		end
 	end
end
