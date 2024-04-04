json.review do
    json.extract! @review, :id, :user_id, :trail_id, :review, :rating, :created_at
end

json.trail do
    if @trail
      json.extract! @trail, :id, :name, :description, :location, :difficulty, :length, :latitude, :longitude
      json.photoUrl @trail.photo.attached? ? @trail.photo.url : nil
    else
      json.null! # or any other value or handling you prefer when @trail is nil
    end
  end

