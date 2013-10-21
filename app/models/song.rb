class Song < ActiveRecord::Base
  attr_accessible :key, :artist, :icon, :name

  validates :key, presence: true, format: { with: /^t[0-9]+$/ }
  validates :name, presence: true
  validates :artist, presence: true
  validates :icon, presence: true
end
