# Welcome to All Adventure
Check out the [Live Site](https://alladventure.onrender.com/)

## Introduction

All Adventure is a clone of All trails. All trails allows users to view different trails. Also, allows users to interact in there community by leaving reviews and ratings on trails. As someone who loves nature, I wanted to create a website that anyone can use to find a trail near them and get outside. I implmented features that allow users to create a account to leave reviews and view trails, a map that allows users to see the locations of different trails in New York, and users can search for a trail by name or difficulty.

* Languages: Javascript, Ruby, HTML, and CSS
* Frontend: React-Vite
* Backend: Rails
* Database: PostgreSQL
* Hosting: Render
* Asset Storage: AWS Simple Cloud Storage (S3)
* API: Google Maps

## Features
### User Auth 

Users can SignUp, use a demo user to view the site, LogIn, or LogOut. Once signed up the users information persist in the backend.

#### LogIn
  <br>
<br>

![Screen Recording 2024-03-13 at 9 24 52 PM](https://github.com/ShaunJhingoor/AllAdventure/assets/146994547/9f24a871-4f02-404c-82d2-5816b42192d8)

<br>
<br>

```js
function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user); //Find the logged in user
  const [credential, setCredential] = useState(''); //To keep track of the credentials(email or username) the user is entering in
  const [password, setPassword] = useState(''); //Keep track of the password the user is entering
  const [errors, setErrors] = useState([]); //Keep track of errors

  if (sessionUser) return <Navigate to="/" replace={true} />; // When logging out or not logged in directing to the splash page

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
      <form onSubmit={handleSubmit} className='login'> //Submits login information to the backend when user press the login button
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
            onChange={(e) => setCredential(e.target.value)}//Sets credentials to user inpus
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
          {errors.map(error => <li key={error}>{error}</li>)} //Displays errors on failure
        </ul>
        <br />
        <button type="submit" id='loginbutton'>Log In</button>
        <br />
        <p>Do not have an account? <NavLink to="/signup">Sign Up</NavLink> </p> //If user does not have an account can hit sign up to redirected to the sign up page
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

### Search Feature 
Users can search by trail name or difficulty. If they have a few letters of a trail it will populate all the trails that correspond to the search.
<br>
<br>

![search (3)](https://github.com/ShaunJhingoor/AllAdventure/assets/146994547/1780ee16-a2ec-45b6-8047-bb349a75ab46)


<br>
<br>

```js

function SearchBar(){
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState(''); // Keeps track of what the user is typing in search bar
    const navigate = useNavigate();
    const currentUser = useSelector(state=> state?.session.user) // Gets the user that is logged in 

    const handleSearch = () => {
        if(searchValue.trim() !== ''){ //Removes any extract white space
            
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
            
        </div>
        </>
    )
}

```
<br>
<br>

## Map 
There is a custome pin that shows the location of trail. When you hover over a trail it zooms in on the map where the trail is located. Was able to accomplish this by using google maps API.

<br>
<br>

![map](https://github.com/ShaunJhingoor/AllAdventure/assets/146994547/8b16b984-5f6a-4cc6-8cd4-3d892c22829e)


<br>
<br>

```js
function TrailMapWrapper({trails, center,zoom=10}) {
    const {isLoaded} = useLoadScript({ //Make sure the map can be loaded from the api key stored in the env local file
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
    })

    if(!isLoaded){ // If map cannot be loaded then display loading
        return <div>Loading...</div>
    }
    if(!trails || trails.length === 0){ // If there are no trails then return null
        return null
    }
    return (
        <>
        <div className="trailmapwrapper">
            <TrailMap trails={trails} center ={center} zoom={zoom}/>
        </div>
        </>
    )

}

export const TrailMap = ({trails, center,zoom}) => {

    if(!trails){ // Making sure there are trails
        return null 
    }
    


    const img = { //Used for custom pin 
        url: pin
    }

    const containerStyle = { // The dimensions of the map 
        width: '100%',
        height: '100%'
      };

    const mapOptions = { // Removes the default features of the map given by google maps
    disableDefaultUI: true
    // zoomControl: false, 
    // streetViewControl: false, 
    // gestureHandling: 'none' 
    };
   
    return(
        <>
            <GoogleMap zoom={zoom}  center={center} mapContainerStyle={containerStyle} options={mapOptions}> // Sets zoom and center to the values passed down by componenets 
            {trails.map((trail) =>{
        
                return (<MarkerF key={trail.id} position={{lat: trail?.latitude, lng: trail?.longitude}} icon={img}/>) // Places a custom pin for every trail at the longitude and latitude that the trail has
            }
            )}
            </GoogleMap> 
        </>
    )
}
```
<br>
<br>

##  Reviews (CRUD)
Users can create, edit, or delete a review when signed in 

<br>
<br>

![CRUD (3)](https://github.com/ShaunJhingoor/AllAdventure/assets/146994547/7338ed51-13b4-4890-92df-55b3ae7be1fc)


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

    setIsSubmitted(true) //While submitting review cahnges status to true so users cannot spam the submit button
  
    const newReview = { //Formating a new review to be sent to the backend
      review: {
        review: review,
        trail_id: trail.id,
        rating: rating,
        user_id: currentUser.id,
        created_at: new Date().toISOString(),
      },
    };
     await dispatch(createReview(newReview));//creating a new review with with a outside key of review and setting the key value pairs 
     await dispatch(Fetchtrail(trail.id))//Getting the information of the specific trail that the user is reviewing, which also has the reviews on the trail sent with it.
     dispatch(modalActions.hideModal("createReview")); //after you create a review it closes the modal
     setIsSubmitted(false) // Users can add another review after submitting
  };
  return (
    <div id="modal">
      <div id="modal-background" ></div>
      <div id="modal-content">
        <div id="exitReviewCreaterContainer">
        <img onClick={handleHideModal} id="exitReviewCreater" src={exit} alt="exit"/> //Dispatching hidemodel to close the model on click of the x
        </div>
        <p id="trailModalName">{trail?.name}</p>
        
          <div id="ratingCreateReviewContainer">
          <p id="ratingCreateReviewHeader">Rating</p>
          <br />
        <Ratings id="ratingCreateReview" rating={rating} setRating={setRating}  /> //Set the rating to whatever the user selects and sends it to the backend to be stored
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
        {reviewError && <p id="errormessage">{reviewError}</p>} // If there is any errors display them
     
      </div>
        <div id="submitContainer">
        
        <button id="createReviewSubmit" onClick={handleSubmitReview} type="submit" disabled={rating === 0 ||review.length <= 0 }  style={{ // If the review is empty or the rating has not been change cannot submit 
          backgroundColor: rating === 0 || review.length <= 0 ? 'gray' : 'rgb(38,67,17)',
          color: rating === 0 || review.length <= 0 ? 'black' : 'white',}}> // If review and rating has been changed and formated correctly the button color changes to green
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

### Future Features

* Expand the search feature so the user can filter by parks and list of trails within those parks will show up

### Thanks 
All Adventure was created within 14 days. I hope you enjoy!







