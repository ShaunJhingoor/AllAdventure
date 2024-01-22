# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require "open-uri"
# ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Review.destroy_all
    User.destroy_all
    Trail.destroy_all
    
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('trails')
    ApplicationRecord.connection.reset_pk_sequence!('reviews')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'Demo-lition', 
      email: 'demo@user.io', 
      password: 'password',
      fname: "demo",
      lname: "smith"
    )

   
 

    trail1 = Trail.create(
      name: 'Central Park Loop',
      description: 'A scenic loop around Central Park. Suitable for walking, jogging, and biking. Enjoy the lush greenery and iconic landmarks.',
      location: 'New York City',
      difficulty: 'Easy',
      length: 6.0,
      latitude: 40.785091,
      longitude: -73.968285
    )

    trail1.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/adventureIcon.png"), filename: "adventureIcon.png")

    trails_data = [
      {
        name: 'Cascade Falls Trail',
        description: 'Explore the mesmerizing Cascade Falls on this trail. Moderate difficulty with rocky terrain. Nature lovers will appreciate the waterfall views.',
        location: 'Cascade National Park',
        difficulty: 'Moderate',
        length: 4.5,
        latitude: 48.759613,
        longitude: -121.788000
      },
      {
        name: 'Sunset Ridge Trail',
        description: 'Experience breathtaking sunset views on this ridge trail. Intermediate difficulty with elevation changes. Bring your camera!',
        location: 'Mount Sunset',
        difficulty: 'Hard',
        length: 5.8,
        latitude: 35.789567,
        longitude: -118.875478
      },
      {
        name: 'Pine Grove Hike',
        description: 'Immerse yourself in the pine-scented air on this serene hike. Easy trail suitable for families. Ideal for birdwatching.',
        location: 'Pine Valley',
        difficulty: 'Easy',
        length: 2.5,
        latitude: 39.123456,
        longitude: -76.654321
      },
      {
        name: 'Rocky Mountain Trail',
        description: 'Challenge yourself with this rocky mountain trail. Advanced hikers will enjoy the rugged terrain and panoramic views.',
        location: 'Rocky Mountains',
        difficulty: 'Moderate',
        length: 8.0,
        latitude: 39.550051,
        longitude: -105.782067
      },
      {
        name: 'Coastal Explorer Path',
        description: 'Discover the beauty of the coast on this explorer path. Easy walking trail with ocean views. Perfect for a leisurely stroll.',
        location: 'Coastal Bay',
        difficulty: 'Easy',
        length: 3.5,
        latitude: 34.052235,
        longitude: -118.243683
      },
      {
        name: 'Misty Forest Trek',
        description: 'Embark on a misty forest trek. Moderate difficulty with winding paths. Enjoy the enchanting atmosphere of the woods.',
        location: 'Misty Grove',
        difficulty: 'Moderate',
        length: 4.2,
        latitude: 47.606209,
        longitude: -122.332071
      },
      {
        name: 'Desert Oasis Trail',
        description: 'Experience the tranquility of a desert oasis on this easy trail. Unique desert flora and fauna await exploration.',
        location: 'Desert Valley',
        difficulty: 'Easy',
        length: 3.0,
        latitude: 33.865143,
        longitude: -115.588993
      },
      {
        name: 'Autumn Leaves Walk',
        description: 'Take a leisurely walk through vibrant autumn leaves. Easy trail suitable for families. Enjoy the fall foliage.',
        location: 'Autumn Valley',
        difficulty: 'Easy',
        length: 2.8,
        latitude: 42.360081,
        longitude: -71.058884
      },
      {
        name: 'Alpine Adventure Hike',
        description: 'Embark on an alpine adventure with this challenging hike. Spectacular mountain views and alpine meadows await.',
        location: 'Alpine Peaks',
        difficulty: 'Hard',
        length: 7.5,
        latitude: 46.818188,
        longitude: 9.684722
      },
      {
        name: 'Lakeside Serenity Trail',
        description: 'Enjoy the serenity of a lakeside stroll. Easy trail suitable for all ages. Perfect for a peaceful escape.',
        location: 'Tranquil Lake',
        difficulty: 'Easy',
        length: 3.0,
        latitude: 35.689487,
        longitude: -82.090251
      },
      {
        name: 'Canyon Explorer Path',
        description: 'Explore the depths of a canyon on this adventurous path. Moderate difficulty with rocky terrain. Bring sturdy footwear.',
        location: 'Deep Canyon',
        difficulty: 'Moderate',
        length: 5.2,
        latitude: 36.106965,
        longitude: -112.112056
      }
    ]
    
    trails_data.each do |trail_params|
      difficulty = trail_params[:difficulty].capitalize
      unless ['Easy', 'Moderate', 'Hard'].include?(difficulty)
        raise "Invalid difficulty level '#{trail_params[:difficulty]}' for trail '#{trail_params[:name]}'. Difficulty must be Easy, Moderate, or Hard."
      end
    
      Trail.create!(trail_params)
    end
    
    
    # More users
    10.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password',
        fname: Faker::Name.first_name,
        lname: Faker::Name.last_name
      }) 
      
   
    
    end
    Review.create!(
        user_id: 1,
        trail_id: 1,
        review: "This was an amazing trail",
        rating: 3
      )
  
    puts "Done!"
  # end