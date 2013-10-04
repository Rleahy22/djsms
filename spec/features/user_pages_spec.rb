require 'spec_helper'

describe "UserPages" do
 
	subject { page }

 	describe "index" do
 		before { visit signin_path }

 		it { should have_selector("input[type=submit][value='Sign In / Sign Up']") }
 	end

 	describe "signup" do
 		before { visit new_user_path }

 		it { should have_selector("input[type=submit][value='Sign Up']")}

 		describe "with invalid information" do
 			it "should not create a user" do
 				expect { click_button "Sign Up" }.not_to change(User, :count)
 			end
 		end
 	end
end
