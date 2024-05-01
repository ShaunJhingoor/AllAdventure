import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import SmallSearchBar from "../search/smallsearchbar";
import UserReviews from "./UserReviews";
import { Fetchtrails, trailsArray } from "../../store/trail";
import { formatDate } from "../Reviews/formatedate";
import edit from "../../images/edit.png";
import bird from "../../images/bird.jpeg";
import Flower from "../../images/flower.png";
import Footer from "../footer/Footer";
import "./Profile.css";
import Loadings from "../../images/loading.gif"
import { fetchAllFavorites } from "../../store/favorite";
import FavoriteTrails from "./FavoriteTrails";
import heartFlower from "../../images/heartFlower.png"

function Profile() {
  const current = useSelector((state) => state?.session?.user);
  const trails = useSelector(trailsArray);
  const favoritesObj = useSelector(state => state?.favorite)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [section, setSection] = useState('R')

  section
  
  useEffect(() => {
    dispatch(Fetchtrails()).then(() => setLoading(false));
    dispatch(fetchAllFavorites(current?.id)).then(() => setLoading1(false));
  }, [dispatch, current]);

  const favoriteTrails = Object.values(favoritesObj).map(favorite => favorite?.favorite?.trail)
  if (!current) {
    return <Navigate to="/login" />;
  }

  const capitalizeFirstLetter = (str) => {
    if (str && str.length > 0) {
      return str[0].toUpperCase() + str.slice(1);
    } else {
      return "";
    }
  };

  const currentReviews = trails
    ?.flatMap((trail) => {
      if (trail?.reviews) {
        const reviewsArray = Object.values(trail?.reviews);
        const userReviews = reviewsArray.filter(
          (review) => review?.user_id === current?.id
        );
        return userReviews.map((review) => ({
          trail_id: trail?.id,
          ...review,
        }));
      }
      return [];
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <>
      <SmallSearchBar />
      <br />
      <div id="ProfileFormOutside">
        <br />
      <div id="position">
        <form className="profile">
          <div id="bird">
            <img src={bird} alt="bird" id="profileImg" />
          </div>
          <div id="userInfo">
            <p id="Name">
              {capitalizeFirstLetter(current?.fname)}{" "}
              {capitalizeFirstLetter(current?.lname)}{" "}
              <img
                src={edit}
                alt="edit"
                id="editUser"
                onClick={() => navigate("/edit")}
              />
            </p>
            <p id="currentDateCreated">
              Member since {formatDate(current?.created_at)}
            </p>
            <div id="numberOfReviews">
              {/* Conditionally render "Loading..." while data is being fetched */}
              {loading && loading1 ? (
                <>
                <p id="numberOfReviewTag">Number of Reviews: <img src={Loadings} alt="loading" /></p>
                <p id="numberOfReviewTag">Number of Favorites: <img src={Loadings} alt="loading"/></p>
                </>
              ) : (
                <>
                <p id="numberOfReviewTag" onClick={() => setSection("R")}>
                
                  Number of Reviews: {currentReviews?.length}
                </p>
                <p id="numberOfReviewTag" onClick={() => setSection("F")}>
                
                  Number of Favorites: {favoriteTrails?.length}
                </p>
                </>
              )}
            </div>
          </div>
          </form>
        {loading ? (
        <form className="currentReview">
          <div id="formLoading">
            <img src={Loadings} alt="Loading" />
            <h1 id="loadingContent">Loading</h1>
            </div>
        </form>
        ) : section === "R" && currentReviews.length === 0? (
          <form className="currentReview">
            <div id="currentReviewHeader">
              <p onClick={() => setSection('R')} className={section === 'R' ? 'active' : ''} id="currentReviewHeaderReview">Reviews</p>
              <p onClick={() => setSection('F')} className={section === 'F' ? 'active' : ''} id="currentReviewHeaderFavorite">Favorites</p>
          </div>
            <div id="breakerbarshow1"></div>
            <div id="noReviewImage">
              <img src={Flower} alt="flower" />
            </div>
            <div id="noReviewHeader">
              <p id="noReviewHeaderContent">Review some trails</p>
            </div>
            <div id="noReviewContentContainer">
              <p id="noReviewContent">
                Help others know what to expect from the trail by sharing your
                experience.
              </p>
            </div>
            <div id="navigateButtonContainer">
              <button
                id="navigateButton"
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("/trails");
                }}
                style={{ textDecoration: "none" }}
              >
                <p id="navigateButtonContent">Explore Trails</p>
              </button>
            </div>
          </form>
        ) : section === "R" ?(
          <form className="currentReview">
            <div id="currentReviewHeader">
              <p onClick={() => setSection('R')} className={section === 'R' ? 'active' : ''} id="currentReviewHeaderReview">Reviews</p>
              <p onClick={() => setSection('F')} className={section === 'F' ? 'active' : ''} id="currentReviewHeaderFavorite">Favorites</p>
            </div>
            <div id="breakerbarshow1"></div>
            {currentReviews.map((review, index) => (
              <UserReviews key={`${review?.id}_${index}`} review={review} />
            ))}
          </form>
        ): favoriteTrails?.length === 0 ?(
          <form className="currentReview">
          <div id="currentReviewHeader">
              <p onClick={() => setSection('R')} className={section === 'R' ? 'active' : ''} id="currentReviewHeaderReview">Reviews</p>
              <p onClick={() => setSection('F')} className={section === 'F' ? 'active' : ''} id="currentReviewHeaderFavorite">Favorites</p>
          </div>
          <div id="breakerbarshow1"></div>
            <div id="noReviewImage">
              <img src={heartFlower} alt="flower" />
            </div>
            <div id="noReviewHeader">
              <p id="noReviewHeaderContent">Add your favorites</p>
            </div>
            <div id="noReviewContentContainer">
              <p id="noReviewContent">
              Keep track of your favorite adventures so you can revisit them
              </p>
            </div>
            <div id="navigateButtonContainer">
              <button
                id="navigateButton"
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("/trails");
                }}
                style={{ textDecoration: "none" }}
              >
                <p id="navigateButtonContent">Explore Trails</p>
              </button>
            </div>
          </form>
        ):(
          <form className="currentReview">
          <div id="currentReviewHeader">
              <p onClick={() => setSection('R')} className={section === 'R' ? 'active' : ''} id="currentReviewHeaderReview">Reviews</p>
              <p onClick={() => setSection('F')} className={section === 'F' ? 'active' : ''} id="currentReviewHeaderFavorite">Favorites</p>
          </div>
          <div id="breakerbarshow1"></div>
            {favoriteTrails.map((trail, index) => (
              <FavoriteTrails key={`${trail?.id}_${index}`}trail ={trail}/>  
            ))}
          </form>
        )}
      </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;