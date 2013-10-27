class CreateTexts < ActiveRecord::Migration
  def change
    create_table :texts do |t|
      t.string :content
      t.string :sender
      t.integer :playlist_id

      t.timestamps
    end
  end
end
