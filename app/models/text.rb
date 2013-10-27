class Text < ActiveRecord::Base
  attr_accessible :content, :sender
  belongs_to :playlist

  validates :content, presence: true
  validates :sender, presence: true, format: { with: /^[+][0-9]{11}$/ }
end
