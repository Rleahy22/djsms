class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
    	t.string :key
      t.string :name
      t.string :artist
      t.string :icon

      t.timestamps
    end
    add_index :songs, [:key]
  end
end
