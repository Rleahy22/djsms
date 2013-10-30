class Playlist < ActiveRecord::Base
  attr_accessible :title, :rdio_id

  belongs_to :user
  has_many :texts
  has_many :playlists_songs
  has_many :songs, through: :playlists_songs
  has_many :playlists_contributors
  has_many :contributors, through: :playlists_contributors

  validates :user_id, presence: true
  validates :title, 	presence: true, length: { maximum: 50 } 

  default_scope order: 'playlists.created_at DESC'
end
