FactoryGirl.define do
	factory :user do
		sequence(:username) { |n| "example#{n}" }
		sequence(:email) { |n| "example#{n}@me.com" }
		password "Password1"
		password_confirmation "Password1"
	end
end