class TrailPhoto < ApplicationRecord
  belongs_to :user
  belongs_to :trail

  has_one_attached :image

  validates :user_id, presence: true
  validates :trail_id, presence: true
  
end



