class PlaylistsContributor < ActiveRecord::Base
  attr_accessible :contributor_id, :playlist_id

  belongs_to :playlist
  belongs_to :contributor
end
