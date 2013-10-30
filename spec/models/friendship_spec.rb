require 'spec_helper'

describe Friendship do

	let(:user) 			 { FactoryGirl.create(:user) }
	let(:other_user) { FactoryGirl.create(:user) }

	before do
		@friendship = Friendship.new(user_id: user.id, friend_id: other_user.id)
	end

	subject { @friendship }

	it { should respond_to(:user_id) }
	it { should respond_to(:friend_id) }

	it { should be_valid }
end
