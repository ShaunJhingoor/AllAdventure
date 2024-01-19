class ChangeTrails < ActiveRecord::Migration[7.0]
  def change
    drop_table :trails
    create_table :trails do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.string :location, null: false
      t.string :difficulty, null: false
      t.float :length, null: false
      t.float :latitude, null: false 
      t.float :longitude, null: false 

      t.timestamps
    end
    add_index :trails, :name, unique: true
    add_index :trails, :location
  end
end
