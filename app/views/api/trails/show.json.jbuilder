json.trail do
    if @trail
      json.extract! @trail, :id, :name, :description, :location, :difficulty, :length, :latitude, :longitude
      json.photoUrl @trail.photo.attached? ? @trail.photo.url : nil
    else
      json.null! # or any other value or handling you prefer when @trail is nil
    end
  end
  json.review do 
    
    @reviews.each do |review|
        json.set! review.id do 
            json.extract! review, :id,:rating,:review, :user_id, :trail_id, :created_at
            json.extract! review.user, :fname, :lname
        end
    end
end
