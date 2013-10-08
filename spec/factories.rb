FactoryGirl.define do
	factory :user do
		username "example"
		email "example@me.com"
		password "Password1"
		password_confirmation "Password1"
	end
end