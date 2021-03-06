class User < ActiveRecord::Base
  attr_accessible :username, :email, :password, :password_confirmation
  has_secure_password
  has_many :playlists, dependent: :destroy
  has_many :friendships, foreign_key: "user_id", class_name: "Friendship"
  has_many :friends, through: :friendships
  has_many :contributors, dependent: :destroy

  before_save { |user| self.email = email.downcase} 
  before_create :create_remember_token

  validates :username, presence: true, length: { maximum: 20 },
  										 uniqueness: { case_sensitive: false }
 	validates :email, presence: true,
 										format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i },
 										uniqueness: { case_sensitive: false }
 	validates :password, presence: true, length: { minimum: 8 },
 											 format: { with: /[0-9]/ }				
 	
 	private

 		def create_remember_token
 			self.remember_token = SecureRandom.urlsafe_base64
 		end
end
