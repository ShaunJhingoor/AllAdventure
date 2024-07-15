# Welcome to All Adventure
Check out the [Live Site](https://alladventure.onrender.com/)

# Introduction

All Adventure is a based on All trails. All Adventure allows users to view different trails. Also, allows users to interact in there community by leaving reviews, photos, and ratings of trails. Users can also favorite trails that they enjoyed so they can revisit them at a later date. As someone who loves nature, I wanted to create a website that anyone can use to find a trail near them and get outside. I implmented features that allow users to create a account to leave reviews and view trails, a map that allows users to see the locations of different trails in New York, and users can search for a trail by name or difficulty.

* Languages: Javascript, Ruby, HTML, and CSS
* Frontend: React-Vite
* Backend: Ruby on Rails
* Database: PostgreSQL
* Hosting: Render
* Asset Storage: AWS Simple Cloud Storage (S3)
* APIs: Google Maps and Open Weather Map

# Features
## User Auth 

Users can SignUp, use a demo user to view the site, LogIn, or LogOut. Once signed up the users information persist in the backend.

#### LogIn
  <br>
<br>

<div align="center"> 
  
![signUp](https://github.com/ShaunJhingoor/AllAdventure/assets/146994547/aa7e95ef-7787-4068-9efa-69775f164412)

</div>

<br>
<br>

```js
function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user); //Find the logged in user
  const [credential, setCredential] = useState(''); //To keep track of the credentials(email or username)
  //the user is entering in
  const [password, setPassword] = useState(''); //Keep track of the password the user is entering
  const [errors, setErrors] = useState([]); //Keep track of errors

  const demoLogin = async(e) => {
      e.preventDefault() 
      await dispatch(sessionActions.login({credential:'Demo-lition', password:'password'}))  // Dispatch login with Demo info
      navigate("/trails")
    }

  if (sessionUser) return <Navigate to="/" replace={true} />; //When logging out or not logged in
 // directing to the splash page

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice and try again
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);//Adding the errors to the errors array
        else setErrors([res.statusText]);
      });
  }

  return (
    <div className='logincontainer'>
    <div className='loginoutside'>
      <form onSubmit={handleSubmit} className='login'
        //Submits login information to the backend when user press the login button>
        <br />
        <br />
      <h1 id='loginheader'> Welcome back. </h1>
      <h1 id='loginheader1'>Log in and start exploring.</h1>
          <br />
          <br />
          <br />
          <input
            id='loginusername'
            type="text"
            value={credential}
            placeholder="Username or Email"
            onChange={(e) => setCredential(e.target.value)}
            //Sets credentials to user inpus
            required
          />
       
       <br />
          <input
            type="password" //Makes sure the password is not plainly shown
            id='loginpassword'
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}//sets password to user input
            required
          />
        <br />
        <br />
        <ul id="loginerrors">
          {errors.map(error => <li key={error}>{error}</li>)//Displays errors on failure}
          
        </ul>
        <br />
        <button type="submit" id='demologin' onClick={demoLogin}>Demo Login</button> //Dispatch login with click with demo info
        <br />
        <button type="submit" id='loginbutton'>Log In</button>
        <br />
        <p>Do not have an account? <NavLink to="/signup">Sign Up</NavLink> </p
       //If user does not have an account can hit sign up to redirected to the sign up page> 
      </form>
    </div >
    <div className='loginfooter'>

     </div>
    </div>
  );
}

export default LoginForm;
```
<br>
<br>

## Search Feature 
Users can search by trail name or difficulty. If they have a few letters of a trail it will populate all the trails that correspond to the search.
<br>
<br>

<div align="center"> 
  
![search (8)](https://github.com/ShaunJhingoor/AllAdventure/assets/146994547/30af04d2-5be7-460c-9fa1-365b0ca41f86)

</div>

<br>
<br>

```js

function SearchBar(){
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState(''); // Keeps track of what the user is typing in search bar
    const navigate = useNavigate();
    const currentUser = useSelector(state=> state?.session.user) // Gets the user that is logged in 

    const handleSearch = () => {
        if(searchValue.trim() !== ''){ //Removes any extract white space and make sure user is not entering an empty search
            
            dispatch(fetchSearch(searchValue)) //dispatch search with results that update as you type using thunk action 
            
        }else{
            dispatch(clearSearchTrails()) //Clears search bar after search
        }
    }

    const handleSearchEnter = (e) => { // Allows user to search with hitting the ender key
        if (e.key === 'Enter') { // can search by hitting enter
            e.preventDefault();
            handleSearch() // Dispatches handle search
            navigate("/trails/search") //navigates to the search page
        }
      };

      const capitalizeFirstLetter = (str) =>  {
        if (str && str.length > 0) {
            return str[0].toUpperCase() + str.slice(1); // Capitalize the first letter of the last and first namce
          } else {
            return "";
          }
      }

    return (
        <>
        <div className="searchBar">
        <h1 id="Welcomestatment">
        Welcome {currentUser ? 'Back' : 'Start'} {currentUser ? `${capitalizeFirstLetter(currentUser?.fname)} ${capitalizeFirstLetter(currentUser?.lname)}` : 'Your Search'}
        // Welcome message will change based on signed in or not
      </h1>
            
            <input 
            type="text"
            placeholder="Search by trail name" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}// Changes the search the search value when user types
            id="searchBarInput"
            onKeyDown={handleSearchEnter} // Can search by hitting the enter key
            />
           
            <Link to="/trails/search" id="searchBarButton"><img src={search} alt="search"   onClick={handleSearch} /></Link>
             <h1 id="mapLink" onClick={() => { navigate("/trails"); window.scrollTo(0, 0); }}>Explore nearby trails</h1> // Link to map page
        </div>
        </>
    )
}

```
<br>
<br>

## Map 
There is a custom pin that shows the location of trail. When you hover over a trail it zooms in on the map where the trail is located. Was able to accomplish this by using google maps API.

<br>
<br>

<div align="center"> 
  
![map (1)](https://github.com/ShaunJhingoor/AllAdventure/assets/146994547/e85ea52b-1586-472c-a576-c01bf881f7e4)

</div>

<br>
<br>

```js
export const TrailMap = ({ trails, center, zoom, onPinClick }) => {
  const [currentZoom, setCurrentZoom] = useState(zoom);
  const [currentCenter, setCurrentCenter] = useState(center);
  const [selectedTrailId, setSelectedTrailId] = useState(null);
  
  const navigate = useNavigate()


  const animateZoom = useCallback((targetZoom, targetCenter) => {
    const duration = 2000; // Adjusted animation duration in milliseconds
    const startZoom = currentZoom;
    const startCenter = currentCenter; // Use currentCenter 
    const startTime = Date.now();

    const zoomStep = () => {
      const elapsedTime = Date.now() - startTime; // Calculates the delay 
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeInOut(progress); // Apply easing function

      // Calculate new zoom level
      const newZoom = startZoom + (targetZoom - startZoom) * easedProgress;

      // Calculate new center position
      const newCenter = {
        lat: startCenter.lat + (targetCenter.lat - startCenter.lat) * easedProgress,
        lng: startCenter.lng + (targetCenter.lng - startCenter.lng) * easedProgress,
      };

      // Set the new zoom level and center position
      setCurrentZoom(newZoom); // Chnages center and zoom as it changes
      setCurrentCenter(newCenter);

      if (progress < 1) {
        requestAnimationFrame(zoomStep);
      }
    };

    requestAnimationFrame(zoomStep);
  }, [currentZoom, currentCenter]);

  useEffect(() => {
    animateZoom(zoom, center);
  }, [zoom, center]);

  const img = { //Custome pin image
    url: pin,
  };

 

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const mapOptions = {
    disableDefaultUI: true, //Gets rid of users map options
    gestureHandling: "auto",
  };

  const handleMarkerClick = (trail) => {
    
    setSelectedTrailId(trail?.id); // OnClick of the trail sets the id as the selected trail
    onPinClick(trail?.id); 
  };
  
  const handleInfoWindowClose = () => {
    
    setSelectedTrailId(null); // OnClose set the trail id as null 
    onPinClick(null) 
  };

  const handleGetDirections = (latitude, longitude) => {
    const mapsURL = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`; //Get directions based on trails latitude and longitude 
    window.open(mapsURL, "_blank");
};

  return (
    <GoogleMap
      zoom={currentZoom}
      center={currentCenter}
      mapContainerStyle={containerStyle}
      options={mapOptions}
    >
       {trails.map((trail) => (
        <MarkerF
          key={trail?.id}
          position={{ lat: trail?.latitude, lng: trail?.longitude }} // Places the pin pased off trail latitude and longitude
          icon={img}
          onClick={() => handleMarkerClick(trail)} 
          
        >
          {selectedTrailId == trail.id && ( //If clicked trail is the same as the trailId show the trail info window
            <InfoWindow position={{ lat: trail?.latitude, lng: trail?.longitude }}
            onCloseClick={handleInfoWindowClose}
            >
              <div id="infoWindow">
                <p id="trailNameHeader" onClick={() => {navigate(`/trails/${trail?.id}`); window.scrollTo(0, 0)}}>{trail?.name}</p>
                <p id="infoWindowContent">Difficulty:{trail?.difficulty}</p>
                <p id="infoWindowContentDirections" onClick={() => handleGetDirections(trail?.latitude, trail?.longitude)} >Directions</p>
              </div>
            </InfoWindow>
          )}
        </MarkerF>
      ))}
    </GoogleMap>
  );
};

export default TrailMapWrapper;
```
<br>
<br>

##  Profile
Users can view all the reviews, photos and favorites they have made/uploaded.

<br>
<br>

<div align="center"> 
  
![profile](https://github.com/ShaunJhingoor/AllAdventure/assets/146994547/ad7f602f-6d4b-4393-a548-8927d5570cf4)

</div>

<br>
<br>

```js
function Profile() {
  const current = useSelector((state) => state?.session?.user); //gets current user 
  const profileUser = useSelector((state) => state?.session?.otherUser?.user) //gets other users information
  const trails = useSelector(trailsArray || []); // gets all the trails and if non returns an empty array
  const favoritesObj = useSelector(state => state?.favorite || {}) // gets all the users favorites
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Loading for fetches
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [section, setSection] = useState('R') // Keep track of what section the user is on
  const {userId} = useParams() // gets the user id based off the url
  const favoriteTrails = Object.values(favoritesObj)?.filter(favorite => favorite?.favorite?.user_id == userId)?.map(favorite => favorite?.favorite?.trail) //Gets all the favorite trails
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Manage the delete modal state
  const userPhoto = useSelector(trailPhotosArray) // Gets an array of all the user photos
  const [test, setTest] = useState(null)
 
  useEffect(() => {
    dispatch(fetchUser(userId)) // Fetch the other user based on id 
    .then(() => setLoading3(false))
    .catch(() => setLoading3(false));
  }, [dispatch, userId])

  useEffect(() => {
    setLoading2(true)
    const fetchPhoto = async () => {
      try{
        dispatch(fetchUsersTrailPhotos(userId)) // Fetch all the photos the user has uploaded 
          .then(() => setLoading2(false))
          .catch(() => setLoading2(false)); 
      } catch(error) {
        setLoading2(false)
        console.error("Error fetching favorites:", error)
      }
    }
    fetchPhoto()
  }, [dispatch, userId])

 


  useEffect(() => {
  setLoading(true);
  dispatch(FetchUserReviews(userId)) //Fetch all the reviews the user had made
    .then(() => setLoading(false))
    .catch(() => setLoading(false)); 
}, [dispatch, userId]);

useEffect(() => {
  const fetchFavorites = async () => {
    setLoading1(true);
    try {
        await dispatch(fetchAllFavorites(userId)) // Fetch all the users favorites 
      setLoading1(false);
    } catch (error) {
      setLoading1(false);
    }
  };



  fetchFavorites();
}, [dispatch, userId]);
```

<br>
<br>

## Edit User
Can change users information after confirming password.

<br>
<br>

<div align="center"> 
  
![user edit](https://github.com/ShaunJhingoor/AllAdventure/assets/146994547/97d8acd0-d93a-4c9d-bf2e-90b4f825e6fc)

</div>


<br>
<br>

```js
const handleEditUser = async(e) => {
        e.preventDefault()
        if(isSubmitted) return // user cannot spam the submit button
        setIsSubmitted(true)

        const updateUsers = { // get all the user info and put it into an object
            id: current?.id,
            username: username, 
            fname: fname,
            lname: lname, 
            password: password, 
            email: email
        }
           
        dispatch(updateUser(updateUsers, oldPassword)) // send the updated info and the oldpassword. Oldpassword is confirmed in the backend so the old password is never exposed in the frontend
            .then(() => {
                setIsSubmitted(false); // User can submit again since the changes have been made
                navigate(`/profile/${current?.id}`); // goes to the users profile
                window.scrollTo(0, 0)
            })
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json(); // try the request again 
        
                }catch {
                    data = await res.text(); 
                }
                if (data?.errors) setErrors(data.errors); // if there is an error display the error/errors
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
                setIsSubmitted(false);
                });
            }
```

<br>
<br>

##  Reviews (CRUD)
Users can create, edit, or delete a review when signed in 

<br>
<br>

<div align="center"> 
  
![reviews](https://github.com/ShaunJhingoor/AllAdventure/assets/146994547/ad44869d-bb10-47b0-987c-61d6b8d0639f)

</div>

<br>
<br>


```js
function CreateModal({ trail }) {
  const [review, setReview] = useState(""); //To keep track of what the user types as the review
  const [rating, setRating] = useState(0); // Keep track of the rating initialize with 0
  const [isSubmitted, setIsSubmitted] = useState(false) // Keep track of if the user has submitted there review
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user); //Get the current user
  

  const handleHideModal = (e) => {
    e.preventDefault();
    dispatch(modalActions.hideModal("createReview")); 
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if(isSubmitted) return //If the review is sumbited user cannot submit the same review again

    if (trimmedReview.length === 0) {
    
      setReviewError("Review cannot be empty");// Throws an error when the user submits a review
      //with just spaces 
      return;
    }

    setIsSubmitted(true) //While submitting review change status to true so users cannot spam the submit button
  
    const newReview = { //Formating a new review to be sent to the backend
      review: {
        review: trimmedReview, //Removes extract spaces
        trail_id: trail.id,
        rating: rating,
        user_id: currentUser.id,
        created_at: new Date().toISOString(),
      },
    };
     await dispatch(createReview(newReview));//creating a new review with with a outside
      // key of review and setting the key value pairs 
     await dispatch(Fetchtrail(trail.id))//Getting the information of the specific trail that
      //the user is reviewing, which also has the reviews on the trail sent with it.
     dispatch(modalActions.hideModal("createReview")); //after you create a review it closes the modal
     setIsSubmitted(false) // Users can add another review after submitting
  };
  return (
    <div id="modal">
      <div id="modal-background" ></div>
      <div id="modal-content">
        <div id="exitReviewCreaterContainer">
        <img onClick={handleHideModal} id="exitReviewCreater" src={exit} alt="exit"
         //Dispatching hidemodel to close the model on click of the x/>
        </div>
        <p id="trailModalName">{trail?.name}</p>
        
          <div id="ratingCreateReviewContainer">
          <p id="ratingCreateReviewHeader">Rating</p>
          <br />
        <Ratings id="ratingCreateReview" rating={rating} setRating={setRating}
        //Set the rating to whatever the user selects and sends it to the backend to be stored /> 
        </div>
        <div>
       
        
        
        
       
        <p id="reviewReviewHeader">Review</p>
       <br />
       <br />
        <textarea
          id="reviewReview"
          type="textarea"
          placeholder="Give back to the community. Share your thoughts about the trail so others know what to expect."
          maxLength="3000"
          value={review}
          onChange={(e) => {
            setReview(e.target.value); //Sets review to whatever the user types
            setReviewError(null);
          }}
        />
        
        </div>
        {reviewError && <p id="errormessage">{reviewError}</p>} //If there is any errors display them
     
      </div>
        <div id="submitContainer">
        
        <button id="createReviewSubmit" onClick={handleSubmitReview} type="submit" disabled={rating === 0 ||review.length <= 0 }  style={{
        //If the review is empty or the rating has not been change cannot submit 
          backgroundColor: rating === 0 || review.length <= 0 ? 'gray' : 'rgb(38,67,17)',
          color: rating === 0 || review.length <= 0 ? 'black' : 'white',}}
          //If review and rating has been changed and formated correctly the button color changes to green >
            <p id="createReviewSubmitContent">Submit</p>
            </button>
        </div>
    </div>
  );
}

export default CreateModal;

```
<br>
<br>

##  Favorites
Users can favorite or un-favorite a trail

<br>
<br>

<div align="center"> 
  
![favorite](https://github.com/ShaunJhingoor/AllAdventure/assets/146994547/2051babb-69f1-4a56-8b5c-3dca3ca15d38)

</div>


<br>
<br>

```js
 const isFavorite = favoriteTrailIds?.includes(trail?.id); // returns true or false if the trail is already favorited

    const handleFavoriteClick = async() => {
        if (isFavorite) {
            await dispatch(removeFromFavorites(trail?.id, favoriteForTrail?.favorite?.id));  // if it is remove the favorite based off trail id and favorite id
        } else {
            await dispatch(addToFavorites(trail?.id));  // add favorite based on trail id
        }
        setRerender(!rerender); 
    };
```
<br>
<br>


## Photos 
Users can upload and delete photos to my AWS s3 bucket 

<br>
<br>

<div align="center"> 

![photo](https://github.com/ShaunJhingoor/AllAdventure/assets/146994547/cd5893f1-fad6-40b0-b703-13a9bfd780a4)

</div>


<br>
<br>

```js
const PhotoUploadModal = ({ trailId, visible, setVisible }) => {
  const dispatch = useDispatch();
  const [photoFile, setPhotoFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
      const file = e.target.files[0] // gets the file information
      if (file) {
        setPhotoFile(file); // sets the file info
        setFileName(file.name);
      } else {
        setPhotoFile(null);
        setFileName('');
      }
  };

  const handleUpload = async (e) => {
      e.preventDefault();
      if (photoFile) {
          await dispatch(createTrailPhoto(trailId, photoFile)); // sends the trailId and the file info to backend 
          dispatch(modalActions.hideModal("photoUpload")); // establishing modal state
          setVisible(!visible); // closing the modal 
      } else {
        setPhotoFile(null);
        setFileName('');
        setError('File type not supported. Please select a JPEG or PNG file.');
      }
  };
```


<br>
<br>

### Future Features

* Expand the search feature so the user can filter by parks and list of trails within those parks will show up

### Thank You
I hope you enjoy!







