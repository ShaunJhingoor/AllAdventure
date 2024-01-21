class Review < ApplicationRecord
    validates :user_id, :trail_id, :review, :rating presence: true
    validates :rating, inclusion: {in: 1..5, message: "must be selected"}

    belongs_to :user

    belongs_to :trail
end