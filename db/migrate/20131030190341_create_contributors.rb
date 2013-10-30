class CreateContributors < ActiveRecord::Migration
  def change
    create_table :contributors do |t|
      t.string :name
      t.string :phone_number
      t.integer :user_id

      t.timestamps
    end
  end
end
