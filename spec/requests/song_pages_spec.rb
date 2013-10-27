require 'spec_helper'

describe "SongPages" do
	
	subject { page }

	let(:user) { FactoryGirl.create(:user) }
  let(:playlist) { FactoryGirl.create(:playlist, user: user, title: "Pop") }

  before { sign_in(user) }
end