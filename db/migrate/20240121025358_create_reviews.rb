class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.references :user, null: false, foreign_key: true
      t.references :trail, null: false, foreign_key: true
      t.text :review, null:false 
      t.integer :rating, null:false 
      t.timestamps
    end
  end
end
