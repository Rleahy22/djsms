include ApplicationHelper

def sign_in(user)
	visit signin_path
	fill_in "EMAIL", with: user.email
	fill_in "PASSWORD", with: user.password
	click_button "Sign In"
end

def sign_out
	visit root_path
	click_link "Sign Out"
end