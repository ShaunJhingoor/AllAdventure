@reviews.each do |review|
    json.set! review.id do 
        json.extract! review, :id, :user_id, :trail_id, :review, :rating, :created_at
    end
end