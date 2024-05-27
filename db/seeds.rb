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
    Favorite.destroy_all
    TrailPhoto.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('trails')
    ApplicationRecord.connection.reset_pk_sequence!('reviews')
    ActiveRecord::Base.connection.reset_pk_sequence!('favorites')
    ActiveRecord::Base.connection.reset_pk_sequence!('trail_photos')

  
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
    # centralPark.photo.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/centralParkRoute.png"), filename: "centralParkRoute.png")

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
 
    

    10.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password',
        fname: Faker::Name.first_name,
        lname: Faker::Name.last_name
      }) 
      
    end

    #1 central
    centralPark1 = TrailPhoto.create!(
      user_id: 1,
      trail_id: 1
    )
    centralPark1.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/centralParkEast.png"), filename: "centralParkEast.png")

    #2 central
    centralPark2 = TrailPhoto.create!(
      user_id: 2,
      trail_id: 1
    )
    centralPark2.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/centralPark2.webp"), filename: "centralPark2.webp")

    #3 central
    centralPark3 = TrailPhoto.create!(
      user_id: 3,
      trail_id: 1
    )
    centralPark3.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/centralPark3.webp"), filename: "centralPark3.webp")

    #4 central
    centralPark4 = TrailPhoto.create!(
      user_id: 4,
      trail_id: 1
    )
    centralPark4.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/centralPark4.webp"), filename: "centralPark4.webp")
    #1 hemp 
    hemp1 = TrailPhoto.create!(
      user_id: 5,
      trail_id: 2,
    )
    hemp1.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/hemp1.webp"), filename: "hemp1.webp")

    #2 hemp 
    hemp2 = TrailPhoto.create!(
      user_id: 6,
      trail_id: 2,
    )
    hemp2.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/hemp2.webp"), filename: "hemp2.webp")

    #3 hemp 
    hemp3 = TrailPhoto.create!(
      user_id: 7,
      trail_id: 2,
    )
    hemp3.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/hemp3.webp"), filename: "hemp3.webp")

    #4 hemp 
    hemp4 = TrailPhoto.create!(
      user_id: 8,
      trail_id: 2,
    )
    hemp4.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/hemp4.webp"), filename: "hemp4.webp")

    #1 flushing
    flushing1 = TrailPhoto.create!(
      user_id: 9,
      trail_id: 3,
    )
    flushing1.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/flushing1.webp"), filename: "flushing1.webp")

    #2 flushing
    flushing2 = TrailPhoto.create!(
      user_id: 10,
      trail_id: 3,
    )
    flushing2.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/flushing2.webp"), filename: "flushing2.webp")

    #3 flushing
    flushing3 = TrailPhoto.create!(
      user_id: 11,
      trail_id: 3,
    )
    flushing3.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/flushing3.webp"), filename: "flushing3.webp")

    #4 flushing
    flushing4 = TrailPhoto.create!(
      user_id: 1,
      trail_id: 3,
    )
    flushing4.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/flushing4.webp"), filename: "flushing4.webp")

    #1 alleyPond
    alleyPond1 = TrailPhoto.create!(
      user_id: 2,
      trail_id: 4,
    )
    alleyPond1.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/alley1.webp"), filename: "alley1.webp")

      #2 alleyPond
      alleyPond2 = TrailPhoto.create!(
        user_id: 3,
        trail_id: 4,
      )
      alleyPond2.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/alley2.webp"), filename: "alley2.webp")

      #3 alleyPond
      alleyPond3 = TrailPhoto.create!(
        user_id: 4,
        trail_id: 4,
      )
      alleyPond3.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/alley3.webp"), filename: "alley3.webp")

      #4 alleyPond
      alleyPond4 = TrailPhoto.create!(
        user_id: 5,
        trail_id: 4,
      )
      alleyPond4.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/alley4.webp"), filename: "alley4.webp")

      #1 orange
      orange1 = TrailPhoto.create!(
        user_id: 6,
        trail_id: 5,
      )
      orange1.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/orange1.webp"), filename: "orange1.webp")

      #2 orange
      orange2 = TrailPhoto.create!(
        user_id: 7,
        trail_id: 5,
      )
      orange2.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/orange2.webp"), filename: "orange2.webp")

      #3 orange
      orange3 = TrailPhoto.create!(
        user_id: 8,
        trail_id: 5,
      )
      orange3.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/orange3.webp"), filename: "orange3.webp")

       #4 orange
      orange4 = TrailPhoto.create!(
        user_id: 9,
        trail_id: 5,
      )
      orange4.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/orange4.webp"), filename: "orange4.webp")

      #1 teepee      
      teepee1 = TrailPhoto.create!(
        user_id: 10,
        trail_id: 6,
      )
      teepee1.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/teepee1.webp"), filename: "teepee1.webp")

      #2 teepee      
      teepee2 = TrailPhoto.create!(
        user_id: 11,
        trail_id: 6,
      )
      teepee2.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/teepee2.webp"), filename: "teepee2.webp")

      #3 teepee      
      teepee3 = TrailPhoto.create!(
        user_id: 1,
        trail_id: 6,
      )
      teepee3.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/teepee3.webp"), filename: "teepee3.webp")

      #4 teepee      
      teepee4 = TrailPhoto.create!(
        user_id: 2,
        trail_id: 6,
      )
      teepee4.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/teepee4.webp"), filename: "teepee4.webp")

      #1 bly     
      bly1 = TrailPhoto.create!(
        user_id: 3,
        trail_id: 7,
      )
      bly1.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/bly1.webp"), filename: "bly1.webp")

      #2 bly     
      bly2 = TrailPhoto.create!(
        user_id: 4,
        trail_id: 7,
      )
      bly2.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/bly2.webp"), filename: "bly2.webp")

      #3 bly     
      bly3 = TrailPhoto.create!(
        user_id: 5,
        trail_id: 7,
      )
      bly3.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/bly3.webp"), filename: "bly3.webp")

      #4 bly     
      bly4 = TrailPhoto.create!(
        user_id: 6,
        trail_id: 7,
      )
      bly4.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/bly4.webp"), filename: "bly4.webp")

      #1 caumsett    
      caumsett1 = TrailPhoto.create!(
        user_id: 7,
        trail_id: 8,
      )
      caumsett1.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/caumsett1.webp"), filename: "caumsett1.webp")

      #2 caumsett    
      caumsett2 = TrailPhoto.create!(
        user_id: 8,
        trail_id: 8,
      )
      caumsett2.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/caumsett2.webp"), filename: "caumsett2.webp")

      #3 caumsett    
      caumsett3 = TrailPhoto.create!(
        user_id: 9,
        trail_id: 8,
      )
      caumsett3.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/caumsett3.webp"), filename: "caumsett3.webp")

      #4 caumsett    
      caumsett4 = TrailPhoto.create!(
        user_id: 10,
        trail_id: 8,
      )
      caumsett4.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/caumsett4.webp"), filename: "caumsett4.webp")

      #1 high    
      high1 = TrailPhoto.create!(
        user_id: 11,
        trail_id: 9,
      )
      high1.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/high1.webp"), filename: "high1.webp")

      #2 high    
      high2 = TrailPhoto.create!(
        user_id: 1,
        trail_id: 9,
      )
      high2.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/high2.webp"), filename: "high2.webp")

      #3 high    
      high3 = TrailPhoto.create!(
        user_id: 2,
        trail_id: 9,
      )
      high3.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/high3.webp"), filename: "high3.webp")

      #4 high    
      high4 = TrailPhoto.create!(
        user_id: 3,
        trail_id: 9,
      )
      high4.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/high4.webp"), filename: "high4.webp")

      #1 prospect    
      prospect1 = TrailPhoto.create!(
        user_id: 4,
        trail_id: 10,
      )
      prospect1.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/prospect1.webp"), filename: "prospect1.webp")

      #2 prospect    
      prospect2 = TrailPhoto.create!(
        user_id: 5,
        trail_id: 10,
      )
      prospect2.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/prospect2.webp"), filename: "prospect2.webp")

      #3 prospect    
      prospect3 = TrailPhoto.create!(
        user_id: 6,
        trail_id: 10,
      )
      prospect3.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/prospect3.webp"), filename: "prospect3.webp")

      #4 prospect    
      prospect4 = TrailPhoto.create!(
        user_id: 7,
        trail_id: 10,
      )
      prospect4.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/prospect4.webp"), filename: "prospect4.webp")

      #1 glenIsland    
      glenIsland1 = TrailPhoto.create!(
        user_id: 8,
        trail_id: 11,
      )
      glenIsland1.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/glenIsland1.webp"), filename: "glenIsland1.webp")

      #2 glenIsland    
      glenIsland2 = TrailPhoto.create!(
        user_id: 9,
        trail_id: 11,
      )
      glenIsland2.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/glenisland2.webp"), filename: "glenisland2.webp")

      #3 glenIsland    
      glenIsland3 = TrailPhoto.create!(
        user_id: 10,
        trail_id: 11,
      )
      glenIsland3.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/glenisland3.webp"), filename: "glenisland3.webp")

      #4 glenIsland    
      glenIsland4 = TrailPhoto.create!(
        user_id: 11,
        trail_id: 11,
      )
      glenIsland4.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/glenisland4.webp"), filename: "glenisland4.webp")

      #1 croton  
      croton1 = TrailPhoto.create!(
        user_id: 1,
        trail_id: 12,
      )
      croton1.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/croton1.webp"), filename: "croton1.webp")

      #2 croton  
      croton2 = TrailPhoto.create!(
        user_id: 2,
        trail_id: 12,
      )
      croton2.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/croton2.webp"), filename: "croton2.webp")

      #3 croton  
      croton3 = TrailPhoto.create!(
        user_id: 3,
        trail_id: 12,
      )
      croton3.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/croton3.webp"), filename: "croton3.webp")

      #4 croton  
      croton4 = TrailPhoto.create!(
        user_id: 4,
        trail_id: 12,
      )
      croton4.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/croton4.webp"), filename: "croton4.webp")

      #1 hoffa  
      hoffa1 = TrailPhoto.create!(
        user_id: 5,
        trail_id: 13,
      )
      hoffa1.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/hoffa1.webp"), filename: "hoffa1.webp")

      #2 hoffa  
      hoffa2 = TrailPhoto.create!(
        user_id: 6,
        trail_id: 13,
      )
      hoffa2.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/hoffa2.webp"), filename: "hoffa2.webp")

      #3 hoffa  
      hoffa3 = TrailPhoto.create!(
        user_id: 7,
        trail_id: 13,
      )
      hoffa3.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/hoffa3.webp"), filename: "hoffa3.webp")

      #4 hoffa  
      hoffa4 = TrailPhoto.create!(
        user_id: 8,
        trail_id: 13,
      )
      hoffa4.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/hoffa4.webp"), filename: "hoffa4.webp")

      #1 connect  
      connect1 = TrailPhoto.create!(
        user_id: 9,
        trail_id: 14,
      )
      connect1.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/connect1.webp"), filename: "connect1.webp")

      #2 connect  
      connect2 = TrailPhoto.create!(
        user_id: 10,
        trail_id: 14,
      )
      connect2.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/connect2.webp"), filename: "connect2.webp")
    
      #3 connect  
      connect3 = TrailPhoto.create!(
        user_id: 11,
        trail_id: 14,
      )
      connect3.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/connect3.webp"), filename: "connect3.webp")

      #4 connect  
      connect4 = TrailPhoto.create!(
        user_id: 1,
        trail_id: 14,
      )
      connect4.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/connect4.webp"), filename: "connect4.webp")

      #1 edgewood  
      edgewood1 = TrailPhoto.create!(
        user_id: 2,
        trail_id: 15,
      )
      edgewood1.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/edgewood1.webp"), filename: "edgewood1.webp")

      #2 edgewood  
      edgewood2 = TrailPhoto.create!(
        user_id: 3,
        trail_id: 15,
      )
      edgewood2.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/edgewood2.webp"), filename: "edgewood2.webp")

      #3 edgewood  
      edgewood3 = TrailPhoto.create!(
        user_id: 4,
        trail_id: 15,
      )
      edgewood3.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/edgewood3.webp"), filename: "edgewood3.webp")

      #4 edgewood  
      edgewood4 = TrailPhoto.create!(
        user_id: 5,
        trail_id: 15,
      )
      edgewood4.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/edgewood4.webp"), filename: "edgewood4.webp")

      #1 rocky 
      rocky1 = TrailPhoto.create!(
        user_id: 6,
        trail_id: 16,
      )
      rocky1.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/rocky1.webp"), filename: "rocky1.webp")

      #2 rocky 
      rocky2 = TrailPhoto.create!(
        user_id: 7,
        trail_id: 16,
      )
      rocky2.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/rocky2.webp"), filename: "rocky2.webp")

      #3 rocky 
      rocky3 = TrailPhoto.create!(
        user_id: 8,
        trail_id: 16,
      )
      rocky3.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/rocky3.webp"), filename: "rocky3.webp")

      #4 rocky 
      rocky4 = TrailPhoto.create!(
        user_id: 9,
        trail_id: 16,
      )
      rocky4.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/rocky4.webp"), filename: "rocky4.webp")

      #1 eis 
      eis1 = TrailPhoto.create!(
        user_id: 10,
        trail_id: 17,
      )
      eis1.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/eis1.webp"), filename: "eis1.webp")

      #2 eis 
      eis2 = TrailPhoto.create!(
        user_id: 11,
        trail_id: 17,
      )
      eis2.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/eis2.webp"), filename: "eis2.webp")

      #3 eis 
      eis3 = TrailPhoto.create!(
        user_id: 1,
        trail_id: 17,
      )
      eis3.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/eis3.webp"), filename: "eis3.webp")

      #4 eis 
      eis4 = TrailPhoto.create!(
        user_id: 2,
        trail_id: 17,
      )
      eis4.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/eis4.webp"), filename: "eis4.webp")

      #1 long 
      long1 = TrailPhoto.create!(
        user_id: 3,
        trail_id: 18,
      )
      long1.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/long1.webp"), filename: "long1.webp")

      #2 long 
      long2 = TrailPhoto.create!(
        user_id: 4,
        trail_id: 18,
      )
      long2.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/long2.webp"), filename: "long2.webp")

      #3 long 
      long3 = TrailPhoto.create!(
        user_id: 5,
        trail_id: 18,
      )
      long3.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/long3.webp"), filename: "long3.webp")

      #4 long 
      long4 = TrailPhoto.create!(
        user_id: 6,
        trail_id: 18,
      )
      long4.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/long4.webp"), filename: "long4.webp")

      #1 tiffany 
      tiffany1 = TrailPhoto.create!(
        user_id: 7,
        trail_id: 19,
      )
      tiffany1.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/tiffany1.webp"), filename: "tiffany1.webp")

      #2 tiffany 
      tiffany2 = TrailPhoto.create!(
        user_id: 8,
        trail_id: 19,
      )
      tiffany2.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/tiffany2.webp"), filename: "tiffany2.webp")

      #3 tiffany 
      tiffany3 = TrailPhoto.create!(
        user_id: 9,
        trail_id: 19,
      )
      tiffany3.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/tiffany3.webp"), filename: "tiffany3.webp")

      #4 tiffany 
      tiffany4 = TrailPhoto.create!(
        user_id: 10,
        trail_id: 19,
      )
      tiffany4.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/tiffany4.webp"), filename: "tiffany4.webp")

      #1 cold 
      cold1 = TrailPhoto.create!(
        user_id: 11,
        trail_id: 20,
      )
      cold1.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/cold1.webp"), filename: "cold1.webp")

      #2 cold 
      cold2 = TrailPhoto.create!(
        user_id: 1,
        trail_id: 20,
      )
      cold2.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/cold2.webp"), filename: "cold2.webp")

      #3 cold 
      cold3 = TrailPhoto.create!(
        user_id: 2,
        trail_id: 20,
      )
      cold3.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/cold3.webp"), filename: "cold3.webp")

      #4 cold 
      cold4 = TrailPhoto.create!(
        user_id: 3,
        trail_id: 20,
      )
      cold4.image.attach(io: URI.open("https://alladventure1-seeds.s3.amazonaws.com/cold4.webp"), filename: "cold4.webp")

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
          
      favorite_trail_ids = [1, 4, 10, 7, 18,20] 
      favorite_trail_ids.each do |trail_id|
      Favorite.create!(
        user_id: 1,
        trail_id: trail_id
      )
    end

    User.where.not(username: 'Demo-lition').each do |user|
      user.favorite_trails << Trail.all.sample(3)
    end
      

  
    puts "Done!"
  # end