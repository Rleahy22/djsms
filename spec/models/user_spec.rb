require 'spec_helper'

describe User do
	before do
		@user = User.new(username: "example1", email: "example@me.com",
										 password: "password", password_confirmation: "password")
	end
	subject { @user }

	it { should respond_to(:username) }
	it { should respond_to(:email) }
	it { should respond_to(:password_digest) }
	it { should respond_to(:password) }
	it { should respond_to(:password_confirmation) }

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
			user_with_same_name.save
		end

		it { should_not be_valid }
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
			user_with_same_email.save
		end

		it { should_not be_valid }	end
end
