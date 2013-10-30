class CreatePlaylistsContributors < ActiveRecord::Migration
  def change
    create_table :playlists_contributors do |t|
      t.integer :playlist_id
      t.integer :contributor_id

      t.timestamps
    end
  end
end
