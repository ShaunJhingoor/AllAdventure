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

    
    
    
    
    # 1
    centralPark = Trail.create!(
        name: "Central Park East and West Drive Loop",
        description:"Explore this 6.1-mile loop trail near New York City, New York. Generally considered an easy route, it takes an average of 2 h 2 min to complete. This is a very popular area for road biking, running, and walking, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime. Dogs are welcome, but must be on a leash.",
        location:"New York, NY",
        difficulty: 'Easy',
        length: 6.1,
        latitude: 40.785091,
        longitude: -73.968285
    )

    centralPark.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/Central+Park+East+and+West+Drive+Loop.webp"), filename: "Central Park East and West Drive Loop.webp")

    # 2 
    hempsteadLakeLoop = Trail.create!(
      name: "Hempstead Lake Loop",
      description: "Explore this 3.1-mile loop trail near Rockville Centre, New York. Generally considered an easy route, it takes an average of 57 min to complete. This is a popular trail for mountain biking, road biking, and running, but you can still enjoy some solitude during quieter times of day. The best times to visit this trail are March through November. Dogs are welcome, but must be on a leash.",
      location: "Eagle Ave, West Hempstead, NY 11552",
      difficulty: "Easy",
      length: 3.1, 
      latitude: 40.6831,
      longitude: -73.6431
    )
    hempsteadLakeLoop.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/hempsteadLakeLoop.webp"), filename: "hempsteadLakeLoop.webp")
    
    #3
    flushingmeadowloop = Trail.create!(
      name: "Flushing Meadow Loop",
      description: "Discover this 5.6-mile loop trail near New York City, New York. Generally considered a moderately challenging route, it takes an average of 1 h 38 min to complete. This is a very popular area for road biking, running, and walking, so you'll likely encounter other people while exploring. The best times to visit this trail are May through September. Dogs are welcome, but must be on a leash.",
      location: "Grand Central Parkway and, Van Wyck Expy, Queens, 11354",
      difficulty: "Moderate",
      length: 5.6, 
      latitude: 40.7400315,
      longitude: -73.8432702
    )
    flushingmeadowloop.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/flushingmeadowpark.webp"), filename: "flushingmeadowpark.webp")
    #4
    alleyPondParkLoop = Trail.create!(
      name: "Alley Pond Park Loop",
      description: "Enjoy this 3.2-mile loop trail near New York City, New York. Generally considered a moderately challenging route, it takes an average of 1 h 8 min to complete. This is a very popular area for hiking, running, and walking, so you'll likely encounter other people while exploring. The best times to visit this trail are April through November.",
      location: "Union Tpke, Oakland Gardens, NY 11364",
      difficulty: "Moderate",
      length: 3.2, 
      latitude: 40.743659,
      longitude: -73.7441849
    )
    alleyPondParkLoop.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/alleyPondParkLoop.webp"), filename: "alleyPondParkLoop.webp")

    #5
    forestParkOranageLoop = Trail.create!(
      name: "Forest Park Orange Loop",
      description: "Head out on this 2.3-mile loop trail near New York City, New York. Generally considered an easy route. This is a very popular area for horseback riding, mountain biking, and running, so you'll likely encounter other people while exploring. The best times to visit this trail are March through November. Dogs are welcome, but must be on a leash.",
      location: "Myrtle Avenue, Union Tpke, Park Ln S",
      difficulty: "Easy",
      length: 2.3, 
      latitude: 40.704354,
      longitude: -73.8543669
    )
    forestParkOranageLoop.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/ForestParkOranage+.webp"), filename: "ForestParkOranage .webp")
    #6
    teepee = Trail.create!(
      name: "Teepee to Thrilla to Viper to IMBA Loop",
      description: "Discover this 5.6-mile loop trail near Queens, New York. Generally considered a moderately challenging route, it takes an average of 1 h 47 min to complete. This is a very popular area for hiking and mountain biking, so you'll likely encounter other people while exploring. The best times to visit this trail are March through October. Dogs are welcome, but must be on a leash.",
      location: "196-10 Union Tpke, Fresh Meadows, NY 11366",
      difficulty: "Moderate",
      length: 5.6, 
      latitude: 40.741706,
      longitude: -73.7712369
    )
    teepee.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/teepee.webp"), filename: "teepee.webp")

    #7
    blydenburgh = Trail.create!(
      name: "Blydenburgh County Park Stump Pond Loop",
      description: "Head out on this 6.1-mile loop trail near Hauppauge, New York. Generally considered an easy route, it takes an average of 1 h 55 min to complete. This is a very popular area for birding, fishing, and hiking, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime. Dogs are welcome and may be off-leash in some areas.",
      location: "Veteran's Memorial Highway, Smithtown, NY 11788",
      difficulty: "Easy",
      length: 6.1, 
      latitude: 40.837865,
      longitude: -73.2219439
    )
    blydenburgh.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/blydenburghStumpLoop.webp"), filename: "blydenburghStumpLoop.webp")
  
    #8
    caumsett = Trail.create!(
      name: "Caumsett State Historic Park Perimeter Loop",
      description: "Experience this 5.2-mile loop trail near Huntington, New York. Generally considered an easy route, it takes an average of 1 h 49 min to complete. This is a very popular area for birding, hiking, and mountain biking, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime. You'll need to leave pups at home — dogs aren't allowed on this trail.",
      location: "25 Lloyd Harbor Rd, Lloyd Harbor, NY 11743",
      difficulty: "Easy",
      length: 5.2, 
      latitude: 40.921863,
      longitude: -73.4712159
    )
    caumsett.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/caumsett.webp"), filename: "caumsett.webp")

    #9
    highline = Trail.create!(
      name: "High Line Park Point to Point",
      description: "Experience this 1.2-mile point-to-point trail near New York City, New York. Generally considered an easy route, it takes an average of 21 min to complete. This is a very popular area for walking, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime. You'll need to leave pups at home — dogs aren't allowed on this trail.",
      location: "New York, NY 10011",
      difficulty: "Easy",
      length: 1.2, 
      latitude: 40.7479965,
      longitude: -74.0048
    )
    highline.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/highline.webp"), filename: "highline.webp")

    #10

    prospect = Trail.create!(
      name: "Prospect Park Loop",
      description: "Explore this 3.6-mile loop trail near New York City, New York. Generally considered an easy route, it takes an average of 1 h 11 min to complete. This is a very popular area for birding, mountain biking, and road biking, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime. Dogs are welcome, but must be on a leash.",
      location: "Brooklyn, NY",
      difficulty: "Easy",
      length: 3.6, 
      latitude: 40.665535,
      longitude: -73.969749
    )
    prospect.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/prospect.webp"), filename: "prospect.webp")

    #11 
    glenIsland= Trail.create!(
      name: "Glen Island Loop",
      description: "Get to know this 1.9-mile loop trail near New Rochelle, New York. Generally considered an easy route, it takes an average of 35 min to complete. This trail is great for walking, and it's unlikely you'll encounter many other people while exploring. The best times to visit this trail are October through October.",
      location: "Weyman Ave, New Rochelle, NY 10805",
      difficulty: "Easy",
      length: 1.9, 
      latitude: 40.8863667,
      longitude: -73.7841564
    )
    glenIsland.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/glen+island.webp"), filename: "glen island.webp")

    #12
    croton=Trail.create!(
      name: "Crotona Park Loop",
      description: "Explore this 1.5-mile loop trail near New York City, New York. Generally considered an easy route, it takes an average of 29 min to complete. This trail is great for running and walking, and it's unlikely you'll encounter many other people while exploring. Dogs are welcome, but must be on a leash.",
      location: "Charlotte St, Bronx, NY 10457",
      difficulty: "Easy",
      length: 1.5, 
      latitude: 40.8385033,
      longitude: -73.8976977
    )
    croton.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/crotona.webp"), filename: "crotona.webp")

    #13 
    hoffa = Trail.create!(
      name: " Hoffa and Aspen Loop",
      description: "Discover this 3.2-mile loop trail near Old Bethpage, New York. Generally considered a moderately challenging route, it takes an average of 1 h 1 min to complete. This is a popular trail for birding, hiking, and mountain biking, but you can still enjoy some solitude during quieter times of day. The best times to visit this trail are March through October. Dogs are welcome, but must be on a leash.",
      location: "99 Quaker Meeting House Rd, Farmingdale, NY 11735",
      difficulty: "Easy",
      length: 3.2, 
      latitude: 40.75220401365692,
      longitude:-73.44221506929551
    )
    hoffa.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/hoffa.webp"), filename: "hoffa.webp")

    #14 
    connectQuot = 
    Trail.create!(
      name: "Connetquot Preserve Blue Trail Loop",
      description: "Try this 8.3-mile loop trail near Islip Terrace, New York. Generally considered an easy route, it takes an average of 2 h 26 min to complete. This is a popular trail for birding, hiking, and running, but you can still enjoy some solitude during quieter times of day. The best times to visit this trail are March through January. You'll need to leave pups at home — dogs aren't allowed on this trail.",
      location: "4090 Sunrise Hwy, Oakdale, NY 11769",
      difficulty: "Easy",
      length: 8.3, 
      latitude: 40.75465480308603,
      longitude:-73.1519301249098
    )
    connectQuot.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/connectquot.webp"), filename: "connectquot.webp")
    
    #15
    edgewood = 
    Trail.create!(
      name: "Edgewood Oak Brush Plains Preserve Trail Loop",
      description: "Check out this 3.9-mile loop trail near Deer Park, New York. Generally considered a moderately challenging route, it takes an average of 1 h 8 min to complete. This is a popular trail for hiking, running, and walking, but you can still enjoy some solitude during quieter times of day. The best times to visit this trail are April through November. Dogs are welcome, but must be on a leash.",
      location: "528 Commack Rd, Deer Park, NY 11729",
      difficulty: "Moderate",
      length: 3.9, 
      latitude: 40.77809077615406,
      longitude:-73.30698019653744
    )
    edgewood.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/edgewood.webp"), filename: "edgewood.webp")

    #16
    rocky=
    Trail.create!(
      name: "Rocky Point Trail",
      description: "Discover this 10.4-mile loop trail near Rocky Point, New York. Generally considered a moderately challenging route, it takes an average of 3 h 11 min to complete. This is a very popular area for hiking, mountain biking, and running, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime. Dogs are welcome, but must be on a leash.",
      location: "Rte 25A, Rocky Point, NY 11778",
      difficulty: "Moderate",
      length: 10.4, 
      latitude: 40.928534588020646, 
      longitude:-72.92978500165137
    )
    rocky.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/rocky.webp"), filename: "rocky.webp")

    #17
    eisenhower=
    Trail.create!(
      name: "Eisenhower Park Loop",
      description: "Get to know this 3.4-mile loop trail near Hempstead, New York. Generally considered an easy route, it takes an average of 1 h 1 min to complete. This is a popular trail for birding, road biking, and running, but you can still enjoy some solitude during quieter times of day. The trail is open year-round and is beautiful to visit anytime. You'll need to leave pups at home — dogs aren't allowed on this trail.",
      location: "1899 Park Blvd, East Meadow, NY 11554",
      difficulty: "Easy",
      length: 3.4, 
      latitude: 40.727731540192245,  
      longitude:-73.57355443399015
    )
    eisenhower.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/eisenhower.webp"), filename: "eisenhower.webp")
    
    #18
    longPond=
    Trail.create!(
      name: "Long Pond and Green Trail Loop",
      description: "Enjoy this 5.1-mile loop trail near Ridge, New York. Generally considered an easy route, it takes an average of 1 h 35 min to complete. This trail is great for hiking, horseback riding, and mountain biking, and it's unlikely you'll encounter many other people while exploring. The best times to visit this trail are March through June. Dogs are welcome, but must be on a leash.",
      location: "2500 William Floyd Pkwy, Ridge, NY 11961",
      difficulty: "Easy",
      length: 5.1, 
      latitude: 40.9103569246585, 
      longitude:-72.86984966098065  
    )
    longPond.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/brookhavenStatePark.webp"), filename: "brookhavenStatePark.webp")

    #19
    tiffany=
    Trail.create!(
      name: "Tiffany Creek Preserve Loop",
      description: "Try this 2.8-mile loop trail near Oyster Bay, New York. Generally considered an easy route, it takes an average of 1 h 2 min to complete. This trail is great for birding, hiking, and running, and it's unlikely you'll encounter many other people while exploring. The best times to visit this trail are January through February. You'll need to leave pups at home — dogs aren't allowed on this trail.",
      location: "Oyster Bay, NY 11771",
      difficulty: "Easy",
      length: 2.8, 
      latitude: 40.85966218332627, 
      longitude:-73.51898112501044 
    )
    tiffany.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/tiffany.webp"), filename: "tiffany.webp")
 
    #20 
    coldSpring=Trail.create!(
      name: "Nassau-Suffolk Trail: Cold Spring Harbor to Uplands Farm Sanctuary",
      description: "Get to know this 5.2-mile out-and-back trail near Cold Spring Harbor, New York. Generally considered a moderately challenging route, it takes an average of 2 h 21 min to complete. This is a very popular area for birding, cross-country skiing, and hiking, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime.",
      location: "250 Lawrence Hill Rd, Cold Spring Harbor, NY 11724",
      difficulty: "Moderate",
      length: 5.2, 
      latitude: 40.859372815128594, 
      longitude:-73.45988460314258
    )
    coldSpring.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/cold-harbor.webp"), filename: "cold-harbor.webp")
 
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
    
    def generate_realistic_review
      
      trail_experience = ["amazing", "breathtaking", "challenging", "peaceful", "exciting", "refreshing", "captivating", "awe-inspiring"].sample
      trail_condition = ["well-maintained", "scenic", "wild", "rocky", "lush", "undeveloped", "rugged", "pristine", "muddy", "disheveled"].sample
      weather_condition = ["sunny", "cloudy", "windy", "rainy", "misty", "clear", "stormy", "foggy"].sample
      random_thoughts = ["I can't wait to go back!", "Highly recommended!", "A hidden gem!", "A must-visit trail!", "Great for nature lovers!", "An unforgettable experience!", "A nature lover's paradise!"].sample
      popular = ["secluded", "popular", "quiet", "crowded", "hidden", "off-the-beaten-path", "well-known"].sample

      
      "The trail was #{trail_experience}. The trail conditions were #{trail_condition}, and the weather was #{weather_condition}. The trail was #{popular}.#{random_thoughts}"
    end

    (1..11).each do |user_id|
      (1..20).each do |trail_id|
        
        Review.create!(
          user_id: rand(1..11),
          trail_id: trail_id,
          review: generate_realistic_review,
          rating: rand(1..5)
          )
      end
    end
          
        
      

  
    puts "Done!"
  # end