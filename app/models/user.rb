class User < ActiveRecord::Base
  attr_accessible :username, :email, :password, :password_confirmation
  has_secure_password

  validates :username, presence: true, length: { maximum: 20 }
end
