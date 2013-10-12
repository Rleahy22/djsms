require 'spec_helper'

describe "Authentication" do

	subject { page }

	describe "sign in page" do
		before { visit signin_path }

		it { should have_selector("input[type=submit][value='Sign In']") }
		it { should have_link('Sign Up') }
	end

	describe "sign in" do
		before { visit signin_path }

		describe "with invalid information" do
			before { click_button "Sign In" }

			it { should have_selector("input[type=submit][value='Sign In']") }
			it { should have_content('Invalid') }
		end

		describe "with valid information" do
			let(:user) { FactoryGirl.create(:user) }
			before { sign_in user }

			it { should have_link(user.username)}
			it { should have_link('Sign Out')}
			it { should have_selector('h1', text: user.username) }
			it { should have_link('Account Settings') }
		
			describe "followed by signout" do
				before { click_link "Sign Out" }
				it { should have_selector("input[type=submit][value='Sign In']") }
			end
		end
	end

	describe "authorization" do
		describe "for non-signed-in users" do
			let(:user) { FactoryGirl.create(:user) }

			describe "when attempting to visit a protected page" do
				before do
					visit edit_user_path(user)
					fill_in "EMAIL", 		with: user.email
					fill_in "PASSWORD", with: user.password
					click_button "Sign In"
				end

				describe "after signing in" do
					it "should render the desired protected page" do
						page.should have_content('Update Your Profile')
					end
				end
			end

			describe "in the Users controller" do

				describe "visiting the edit page" do
					before { visit edit_user_path(user) }
					it { should have_selector("input[type=submit][value='Sign In']") }
				end
				describe "submitting to the update action" do
				  before { put user_path(user) }
				  specify { response.should redirect_to(signin_path) }
				end
			end

			describe "in the playlists controller" do

				describe "submitting to the create action" do
					before { post playlists_path }
					specify { response.should redirect_to(signin_path) }
				end

				describe "submitting to the destroy action" do
					before { delete playlist_path(FactoryGirl.create(:playlist)) }
					specify { response.should redirect_to(signin_path) }
				end
			end
		end

		describe "as wrong user" do
			let(:user) { FactoryGirl.create(:user) }
			let(:wrong_user) { FactoryGirl.create(:user, email: "wrong@user.com", 
																									 username: "Wronguser") }
			before { sign_in user }

			describe "visiting Users#edit page" do
				before { visit edit_user_path(wrong_user) }
				it { should_not have_content('Update Your Profile') }
			end

			describe "submitting a PUT request to the Users#update action" do
				before { put user_path(wrong_user) }
				specify { response.should redirect_to(signin_path) }
			end
		end
	end
end
