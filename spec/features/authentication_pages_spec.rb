require 'spec_helper'

describe "AuthenticationPages" do

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
			before do
				fill_in "EMAIL", with: user.email.upcase
				fill_in "PASSWORD", with: user.password
				click_button "Sign In"
			end

			it { should have_selector('h1', text: user.username) }
		end
	end
end
