json.trail do
    json.extract! @trail, :id, :name, :description, :location, :difficulty, :length
end