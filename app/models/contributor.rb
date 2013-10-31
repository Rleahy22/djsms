class Contributor < ActiveRecord::Base
  attr_accessible :name, :phone_number, :user_id
  belongs_to :user
  has_many :playlists_contributors
  has_many :playlists, through: :playlists_contributors

  validates :name, presence: true
  validates :phone_number, presence: true,
  					format: { with: /^[+][0-9]{11}$/ }
end
