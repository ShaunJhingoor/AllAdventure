json.user do
    json.extract! @user, :id, :email, :username, :fname, :lname,:created_at, :updated_at
end

# json.review do 
#   @reviews.select { |review| review.user_id == @user.id }.each do |review|
#     json.set! review.id do 
#       json.extract! review, :id, :rating, :review, :user_id, :trail_id, :created_at
#     end
#   end
# end