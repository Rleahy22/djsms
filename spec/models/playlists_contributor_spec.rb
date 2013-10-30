require 'spec_helper'

describe PlaylistsContributor do
	before do
		@playlist_contributor = PlaylistsContributor.new(playlist_id: 1,
																										 contributor_id: 1)
	end

	subject { @playlist_contributor }

	it { should respond_to(:playlist_id) }
	it { should respond_to(:contributor_id) }

	it { should be_valid }
end
