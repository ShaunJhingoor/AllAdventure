json.review do
    json.extract! @review, :id, :user_id, :trail_id, :review, :rating, :created_at
end

