class CreatePlaylists < ActiveRecord::Migration
  def change
    create_table :playlists do |t|
      t.string :title
      t.integer :user_id
      t.string :rdio_id

      t.timestamps
    end
    add_index :playlists, [:user_id, :created_at]
  end
end
