json.trail_photos do 
  @photos.each do |photo|
    json.set! photo.id do
    json.extract! photo, :id,:trail_id,  :user_id
    json.image_url photo.image.attached? ? photo.image.url : nil
    json.trail_name photo.trail.name ? photo.trail.name : nil
    end 
  end
end

