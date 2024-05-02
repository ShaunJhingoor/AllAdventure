# json.favorite do 
#     @favorites.each do |favorite|
#         json.set! favorite.id do 
#             json.extract! favorite, :id
#         end
#     end
# end
# json.trail do
#   if @favorite.trail
#     json.extract! @favorite.trail, :id, :name, :description, :location, :difficulty, :length, :latitude, :longitude
#     json.photoUrl @favorite.trail.photo.attached? ? @favorite.trail.photo.url : nil
#   else
#     json.null!
#   end
# end

json.array! @favorites do |favorite|
  json.favorite do
    json.extract! favorite, :id, :user_id
    json.trail do
      if favorite.trail
        json.extract! favorite.trail, :id, :name, :description, :location, :difficulty, :length, :latitude, :longitude
        json.photoUrl favorite.trail.photo.attached? ? favorite.trail.photo.url : nil
      else
        json.null!
      end
    end
  end
end
  
  