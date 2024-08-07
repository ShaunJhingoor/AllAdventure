# == Schema Information
#
# Table name: trails
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  description :text             not null
#  location    :string           not null
#  difficulty  :string           not null
#  length      :float            not null
#  latitude    :float            not null
#  longitude   :float            not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Trail < ApplicationRecord
    validates :name, :description, :location, :difficulty, :length, :latitude, :longitude, presence: true
    validates :name, uniqueness: true 
    validates :name, :location, :difficulty, length: {minimum:3}
    validates :description, length: {minimum:25}
    validates :difficulty, inclusion: {in: %w(Easy Moderate Hard), message: "%{value} not a valid difficulty option"}
 

    has_one_attached :photo

    has_many :review, 
    dependent: :destroy

    has_many :favorites, dependent: :destroy

    has_many :trail_photos, dependent: :destroy
    
    has_many :favorite_trails, through: :favorites, source: :trail


  def self.search_names(query)
    where("lower(name) LIKE ?", "%#{sanitize_sql_like(query.downcase)}%")
  end
  def self.search_difficulty(query)
    where("lower(difficulty) LIKE?", "%#{sanitize_sql_like(query.downcase)}%")
  end
end
