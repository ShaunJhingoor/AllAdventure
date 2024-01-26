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

## MVPs 
### User Auth 

Users can SignUp, use a demo user to view the site, LogIn, or LogOut. Once signed up the users information persist in both the backend and frontend

#### LogIn
  <br>
<br>


  
![image](https://github.com/ShaunJhingoor/AllAdventure/assets/146994547/834d3211-d190-4baf-8527-b299964ea05c)
<br>
<br>
```js
import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './LoginForm.css';

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
Users can search by trail name. If they have a few letters of a trail it will populate all the trails that correspond to the trail
<br>
<br>

https://github.com/ShaunJhingoor/AllAdventure/assets/146994547/2836eb0e-8502-46d5-bcc7-e637bc843570
<br>
<br>
```js
import { useState } from "react"
import { useDispatch } from "react-redux"
import { clearSearchTrails, fetchSearch } from "../../store/search";
import "./searchBar.css"
import search from "../../images/search.png"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



function SearchBar(){
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const currentUser = useSelector(state=> state?.session.user)

    const handleSearch = () => {
        if(searchValue.trim() !== ''){
            
            dispatch(fetchSearch(searchValue))
            
        }else{
            dispatch(clearSearchTrails())
        }
    }

    const handleSearchEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch()
            navigate("/trails/search")
        }
      };

      const capitalizeFirstLetter = (str) =>  {
        if (str && str.length > 0) {
            return str[0].toUpperCase() + str.slice(1);
          } else {
            return "";
          }
      }

    return (
        <>
        <div className="searchBar">
        <h1 id="Welcomestatment">
        Welcome {currentUser ? 'Back' : 'Start'} {currentUser ? `${capitalizeFirstLetter(currentUser?.fname)} ${capitalizeFirstLetter(currentUser?.lname)}` : 'Your Search'} 
        
      </h1>
            
            <input 
            type="text"
            placeholder="Search by trail name" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            id="searchBarInput"
            onKeyDown={handleSearchEnter}
            />
           
            <Link to="/trails/search" id="searchBarButton"><img src={search} alt="search"   onClick={handleSearch} /></Link>
            
        </div>
        </>
    )
}

export default SearchBar
```
<br>
<br>

## Map 
There is a custome pin that shows the location of trail. When you hover over a trail it zooms in on the map where the trail is located. Was able to accomplish this by using google maps API.

<br>
<br>

https://github.com/ShaunJhingoor/AllAdventure/assets/146994547/77e9a826-8460-4d90-98b3-88ff944007a2


<br>
<br>

```js
import pin from "../../images/pin.png"
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api"
import "./Trailmaps.css"
function TrailMapWrapper({trails, center,zoom=10}) {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
    })

    if(!isLoaded){
        return <div>Loading...</div>
    }
    if(!trails || trails.length === 0){
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

    if(!trails){
        return null 
    }
    

    const img = {
        url: pin
    }

    const containerStyle = {
        width: '100%',
        height: '100%'
      };
   
    return(
        <>
            <GoogleMap zoom={zoom}  center={center} mapContainerStyle={containerStyle}>
            {trails.map((trail) =>{
        
                return (<MarkerF key={trail.id} position={{lat: trail?.latitude, lng: trail?.longitude}} icon={img}/>)
            }
            )}
            </GoogleMap> 
        </>
    );
}

export default TrailMapWrapper
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
import { useState } from "react";
import * as modalActions from "../../store/modal";
import * as reviewActions from "../../store/review";
import "./reviewModal.css";
import { useDispatch, useSelector } from "react-redux";
import Ratings from "../Rating/rating";
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
    const newReview = {
      review: {
        review: review,
        trail_id: trail.id,
        rating: rating,
        user_id: currentUser.id,
        created_at: new Date().toISOString(),
      },
    };
     await dispatch(reviewActions.createReview(newReview));
     await dispatch(reviewActions.Fetchreviews())
     dispatch(modalActions.hideModal("createReview"));
   
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

* Expand the search feature so the user can feature by parks and list of trails within those parks will show up

### Thanks 
All Adventure was created Within 14 days. I hope you enjoy!







