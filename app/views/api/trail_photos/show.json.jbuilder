json.trail_photo do
    if @photo
      json.extract! @photo, :id, :trail_id, :user_id
      json.image_url @photo.image.attached? ? @photo.image.url : nil
    else
      json.null!
    end
  end
  