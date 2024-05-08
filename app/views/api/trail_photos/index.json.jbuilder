json.trail_photos do 
  @photos.each do |photo|
    json.set! photo.id do
    json.extract! photo, :id,:trail_id, :user_id, :created_at
    json.image_url photo.image.attached? ? photo.image.url : nil
    json.trail_name photo.trail.name ? photo.trail.name : nil
    json.user_fname photo.user.fname ? photo.user.fname : nil
    json.user_lname photo.user.lname ? photo.user.lname : nil
    end 
  end
end

