class Contributor < ActiveRecord::Base
  attr_accessible :name, :phone_number, :user_id
  belongs_to :user
  has_many :playlists_contributors
  has_many :playlists, through: :playlists_contributors
end
