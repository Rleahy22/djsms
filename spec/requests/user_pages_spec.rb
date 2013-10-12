require 'spec_helper'

describe "UserPages" do
 
	subject { page }

	describe "index" do
		before { visit users_path }

		it { should have_selector('h1', text: "All Users") }

		# describe "pagination" do

		# 	before(:all) { 30.times { FactoryGirl.create(:user) } }
		# 	after(:all) { User.delete_all }

		# 	it "should list each user" do
		# 		User.paginate(page: 1).each do |user|
		# 			page.should have_selector('li', text: user.username)
		# 		end
		# 	end
		# end
	end

 	describe "signup" do
 		before { visit new_user_path }

 		it { should have_selector("input[type=submit][value='Sign Up']") }

 		describe "with invalid information" do
 			it "should not create a user" do
 				expect { click_button "Sign Up" }.not_to change(User, :count)
 			end

 			describe "after submission" do
 				before { click_button "Sign Up" }

 				it { should have_selector("input[type=submit][value='Sign Up']") }
 				it { should have_content('*') }
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
 				it { should have_link('Sign Out') }
 			end

 			it "should create a user" do
 				expect { click_button "Sign Up" }.to change(User, :count).by(1)
 			end
 		end
 	end

 	describe "profile page" do
 		let(:user) { FactoryGirl.create(:user) }
 		let!(:p1) { FactoryGirl.create(:playlist, user: user, title: "Pop") }
 		let!(:p2) { FactoryGirl.create(:playlist, user: user, title: "Rock") }

 		before { visit user_path(user) }

 		it { should have_selector('h1', text: user.username) }

 		describe "playlists" do
 			it { should have_content(p1.title) }
 			it { should have_content(p2.title) }
 		end
 	end

 	describe "edit" do
 		let(:user) { FactoryGirl.create(:user) }
 		before do
 			sign_in user
 			visit edit_user_path(user)
 		end

 		describe "page" do
 			it { should have_content("Update Your Profile") }
 			it { should have_link("Delete Account") }
 		end

 		describe "with valid information" do
 			let(:new_username) { "NewUserName" }
 			let(:new_email) { "new@email.com" }
 			before do
 				fill_in "Username", with: new_username
 				fill_in "Email", with: new_email
 				fill_in "Password", with: user.password
 				fill_in "Password Confirmation", with: user.password
 				click_button "Save Changes"
 			end

 			specify { expect(user.reload.username).to eq new_username }
 			specify { expect(user.reload.email).to eq new_email }
 		end
 	end
end
