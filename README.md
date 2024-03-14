# Welcome to All Adventure
Check out the [Live Site](https://alladventure.onrender.com)

## Introduction

All Adventure is a clone of All trails. All trails allows users to view different trails. Also, allows users to interact in there community by leaving revies on trails. As someone who loves nature, I wanted to create a website that anyone can use to find a trail near them and get outside. I implmented features that allow users to create a profile to leave reviews and view trails, a map that allows users to see the locations of different trails in New York, and users can search for a trail by name.

* Languages: Javascript, Ruby, HTML, and CSS
* Frontend: React-Vite
* Backend: Rails
* Database: PostgreSQL
* Hosting: Render
* Asset Storage: AWS Simple Cloud Storage (S3)
* API: Google Maps

## Features
### User Auth 

Users can SignUp, use a demo user to view the site, LogIn, or LogOut. Once signed up the users information persist in both the backend and frontend

#### LogIn
  <br>
<br>


  
![image](https://github.com/ShaunJhingoor/AllAdventure/assets/146994547/834d3211-d190-4baf-8527-b299964ea05c)
<br>
<br>
```js
function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }

  return (
    <div className='logincontainer'>
    <div className='loginoutside'>
      <form onSubmit={handleSubmit} className='login'>
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
            required
          />
       
       <br />
          <input
            type="password"
            id='loginpassword'
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <br />
        <br />
        <ul id="loginerrors">
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <br />
        <button type="submit" id='loginbutton'>Log In</button>
        <br />
        <p>Do not have an account? <NavLink to="/signup">Sign Up</NavLink> </p> 
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

#### SignUp
<br>
<br>

![image](https://github.com/ShaunJhingoor/AllAdventure/assets/146994547/c285ebe4-e915-4e45-9a15-f4f62cafe7f2)
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
            handleSearch()
            navigate("/trails/search")
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
        // Welcome message with change based on signed in or not
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

https://github.com/ShaunJhingoor/AllAdventure/assets/146994547/7086df2a-e04a-4c6c-b051-a13405459cb6

<br>
<br>


```js
function CreateModal({ trail }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  

  const handleHideModal = (e) => {
    e.preventDefault();
    dispatch(modalActions.hideModal("createReview")); 
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const newReview = { //Sending to the backend 
      review: {
        review: review,
        trail_id: trail.id,
        rating: rating,
        user_id: currentUser.id,
        created_at: new Date().toISOString(),
      },
    };
     await dispatch(reviewActions.createReview(newReview));  creating a new review with with a outside key of review and setting the key value pairs 
     await dispatch(reviewActions.Fetchreviews()) getting all the reviews so it renders everything correctly 
     dispatch(modalActions.hideModal("createReview")); after you create a review it closes the modal
   
  };
  return (
    <div id="modal">
      <div id="modal-background" ></div>
      <div id="modal-content">
        <div id="exitReviewCreaterContainer">
        <p onClick={handleHideModal} id="exitReviewCreater">x</p>
        </div>
        <p id="trailModalName">{trail?.name}</p>
        
          <div id="ratingCreateReviewContainer">
          <p id="ratingCreateReviewHeader">Rating</p>
          <br />
        <Ratings id="ratingCreateReview" rating={rating} setRating={setRating}  />
        </div>
        <div>
        <br />
        <br />
        <br />
        <br />
        
       
        <p id="reviewReviewHeader">Review</p>
       <br />
        <textarea
          id="reviewReview"
          type="textarea"
          placeholder="What do you want to talk about?"
          maxLength="3000"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        
       
        
        </div>
     
        <div id="submitContainer">
        
       
        <button id="createReviewSubmit" onClick={handleSubmitReview} type="submit" disabled={rating === 0 ||review.length <= 0 }  style={{
          backgroundColor: rating === 0 || review.length <= 0 ? 'gray' : 'rgb(38,67,17)',
          color: rating === 0 || review.length <= 0 ? 'black' : 'white',}}>
            <p id="createReviewSubmitContent">Submit</p>
            </button>
        </div>
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







