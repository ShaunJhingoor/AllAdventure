class CreateTrailPhotos < ActiveRecord::Migration[7.0]
  def change
    create_table :trail_photos do |t|
      t.references :trail, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string  :image, null: false
      t.timestamps
    end
  end
end
