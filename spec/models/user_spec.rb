require 'spec_helper'

describe User do

	subject { @user }

	it { should respond_to(:username) }
	it { should respond_to(:password_digest) }
	it { should respond_to(:password_password) }
	it { should respond_to(:password_confirmation) }
end
