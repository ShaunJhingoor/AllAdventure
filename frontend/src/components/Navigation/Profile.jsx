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

function Profile() {
  const current = useSelector((state) => state?.session?.user);
  const trails = useSelector(trailsArray);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(Fetchtrails()).then(() => setLoading(false));
  }, [dispatch]);

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
              {loading ? (
                <p id="numberOfReviewTag">Number of Reviews: <img src={Loadings} alt="loading" /></p>
              ) : (
                <p id="numberOfReviewTag">
                  Number of Reviews: {currentReviews?.length}
                </p>
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
        ) : currentReviews.length === 0 ? (
          <form className="currentReview">
            <h1 id="currentReviewHeader">Reviews</h1>
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
        ) : (
          <form className="currentReview">
            <h1 id="currentReviewHeader">Reviews</h1>
            <div id="breakerbarshow1"></div>
            {currentReviews.map((review, index) => (
              <UserReviews key={`${review.id}_${index}`} review={review} />
            ))}
          </form>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Profile;