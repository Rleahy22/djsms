class Playlist < ActiveRecord::Base
  attr_accessible :title, :embed_url
  belongs_to :user

  validates :user_id, presence: true
  validates :title, 	presence: true, length: { maximum: 50 } 

  default_scope order: 'playlists.created_at DESC'
end
