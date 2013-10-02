class User < ActiveRecord::Base
  attr_accessible :username, :email, :password, :password_confirmation
  has_secure_password

  validates :username, presence: true, length: { maximum: 20 },
  										 uniqueness: { case_sensitive: false }
 	validates :email, presence: true,
 										format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i },
 										uniqueness: { case_sensitive: false }
 	validates :password, presence: true, length: { minimum: 8 },
 											 format: { with: /[0-9]/ }				
end
