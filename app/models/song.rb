class Song < ActiveRecord::Base
  attr_accessible :query, :key, :artist, :icon, :name

  has_many :playlists_songs
  has_many :playlists, through: :playlists_songs

  validates :key, presence: true, format: { with: /^t[0-9]+$/ }
  validates :name, presence: true
  validates :artist, presence: true
  validates :icon, presence: true
end
