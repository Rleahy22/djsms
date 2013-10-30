class Contributor < ActiveRecord::Base
  attr_accessible :name, :phone_number, :user_id
  belongs_to :user
end
