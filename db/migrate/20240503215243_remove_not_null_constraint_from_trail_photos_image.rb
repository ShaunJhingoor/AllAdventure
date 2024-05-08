class RemoveNotNullConstraintFromTrailPhotosImage < ActiveRecord::Migration[7.0]
  def change
    change_column_null :trail_photos, :image, true
  end
end
