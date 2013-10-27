class AddPlaylistIdToTexts < ActiveRecord::Migration
  def change
  	add_column :texts, :playlist_id, :integer
  end
end
