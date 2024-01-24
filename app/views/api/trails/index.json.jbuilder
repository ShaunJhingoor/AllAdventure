json.trail do 
    
    @trails.each do |trail|
        json.set! trail.id do 
            json.extract! trail, :id, :name, :description, :location, :difficulty, :length, :latitude, :longitude
        end
    end
end
json.review do 
    
    @reviews.each do |review|
        json.set! review.id do 
            json.extract! review, :rating,:review, :user_id, :trail_id, :created_at, :updated_at
        end
    end
end