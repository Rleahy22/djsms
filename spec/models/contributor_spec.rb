require 'spec_helper'

describe Contributor do

	let(:user) { FactoryGirl.create(:user) }

	before do
		@contributor = user.contributors.create(name: "Jenny",
																						phone_number: "+15558675309")
	end

	subject { @contributor }

	it { should respond_to(:name) }
	it { should respond_to(:phone_number) }
	it { should respond_to(:user_id) }

	it { should be_valid }

	it "should have created a relationship with users" do
		user.contributors.first.should == @contributor
	end
end
