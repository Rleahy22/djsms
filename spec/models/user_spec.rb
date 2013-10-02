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
end
