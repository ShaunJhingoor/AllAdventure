json.favorite do
    json.extract! @favorite, :id
    
    json.trail do
      if @favorite.trail
        json.extract! @favorite.trail, :id, :name, :description, :location, :difficulty, :length, :latitude, :longitude
        json.photoUrl @favorite.trail.photo.attached? ? @favorite.trail.photo.url : nil
      else
        json.null!
      end
    end
  end