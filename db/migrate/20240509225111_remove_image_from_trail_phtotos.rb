class RemoveImageFromTrailPhtotos < ActiveRecord::Migration[7.0]
  def change
    remove_column :trail_photos, :image
  end
end
