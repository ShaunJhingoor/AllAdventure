import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import SmallSearchBar from "../search/smallsearchbar";
import UserReviews from "./UserReviews";
import { FetchUserReviews, trailsArray } from "../../store/trail";
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
import photo from "../../images/photo.png"
import { useParams } from "react-router-dom";
import { fetchUser } from "../../store/session";
import { fetchUsersTrailPhotos, trailPhotosArray } from "../../store/trail_photos";
import Delete from "../../images/deletePhoto.png"
import DeletePhotoModal from "../modals/DeletePhotoModal";
import DeleteClick from "../../images/deletePhotoClick.png"
import noUser from "../../images/noUser.png"

function Profile() {
  const current = useSelector((state) => state?.session?.user);
  const profileUser = useSelector((state) => state?.session?.otherUser?.user)
  const trails = useSelector(trailsArray || []);
  const favoritesObj = useSelector(state => state?.favorite || {})
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [section, setSection] = useState('R')
  const {userId} = useParams()
  const favoriteTrails = Object.values(favoritesObj)?.filter(favorite => favorite?.favorite?.user_id == userId)?.map(favorite => favorite?.favorite?.trail)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const userPhoto = useSelector(trailPhotosArray)
  const [test, setTest] = useState(null)
 
  useEffect(() => {
    dispatch(fetchUser(userId))
    .then(() => setLoading3(false))
    .catch(() => setLoading3(false));
  }, [dispatch, userId])

  useEffect(() => {
    setLoading2(true)
    const fetchPhoto = async () => {
      try{
        dispatch(fetchUsersTrailPhotos(userId))
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
  dispatch(FetchUserReviews(userId))
    .then(() => setLoading(false))
    .catch(() => setLoading(false)); 
}, [dispatch, userId]);

useEffect(() => {
  const fetchFavorites = async () => {
    setLoading1(true);
    try {
        await dispatch(fetchAllFavorites(userId))
      setLoading1(false);
    } catch (error) {
      setLoading1(false);
      console.error("Error fetching favorites:", error);
    }
  };



  fetchFavorites();
}, [dispatch, userId]);

  
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
          (review) => review?.user_id == userId
        );
        return userReviews?.map((review) => ({
          trail_id: trail?.id,
          ...review,
        }));
      }
      return [];
    })
    ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  if(loading3){
    return(
      <div id="loadingUserOther">
        <img src={Loadings} alt="loading" />
        <h1>Loading</h1>
      </div>
    )
  }
  if(! profileUser){
    return(
      <div className="invalidTrail">
                <img src={noUser} alt="camping" id="invalidTrailImg" />
                <h1 id="invalidTrailError">404</h1>
                <h1 id="invalidTrailHeader">We have reached the end of the trail</h1>
                <p id="invalidTrailStatment">This users profile does not exist or has been removed</p>
                <br />
                <button type="submit"   onClick={() => { navigate("/trails"); window.scrollTo(0, 0); }}  id='InvalidTrailButton'>Find Your Next Adventure</button>
            </div>
    )
  }
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
            {capitalizeFirstLetter(profileUser?.fname)} {capitalizeFirstLetter(profileUser?.lname)}
          
              
            {current?.id && userId && current?.id == userId && (
                <img
                  src={edit}
                  alt="edit"
                  id="editUser"
                  onClick={() => navigate("/edit")}
                />
              )}
          </p>
            <p id="currentDateCreated">
              Member since {formatDate(current?.created_at)}
            </p>
            <div id="numberOfReviews">
              {/* Conditionally render "Loading..." while data is being fetched */}
              {loading || loading1 || loading2 || loading3? (
                <>
                <p id="numberOfReviewTag">Number of Reviews: <img src={Loadings} alt="loading" id="profileLoading"/></p>
                <p id="numberOfReviewTag">Number of Favorites: <img src={Loadings} alt="loading" id="profileLoading"/></p>
                <p id="numberOfReviewTag">Number of Photos: <img src={Loadings} alt="loading" id="profileLoading"/></p>
                </>
              ) : (
                <>
                <p id="numberOfReviewTag" onClick={() => setSection("R")} className={section === 'R' ? 'active' : ''}>
                
                  Number of Reviews: {currentReviews?.length}
                </p>
                <p id="numberOfReviewTag" onClick={() => setSection("F")} className={section === 'F' ? 'active' : ''}>
                
                  Number of Favorites: {favoriteTrails?.length}
                </p>

                <p id="numberOfReviewTag" onClick={() => setSection("P")} className={section === 'P' ? 'active' : ''}>
                
                Number of Photos: {userPhoto?.length}
              </p>
                </>
              )}
            </div>
          </div>
          </form>
        {loading || loading1 || loading2 || loading3? (
        <form className="currentReview">
          <div id="formLoading">
            <img src={Loadings} alt="Loading" id="profileLoading"/>
            <h1 id="loadingContent">Loading</h1>
            </div>
        </form>
        ) : section === "R" && currentReviews?.length === 0 && current?.id == userId?(
          <form className="currentReview">
            <div id="currentReviewHeader">
              <p onClick={() => setSection('R')} className={section === 'R' ? 'active' : ''} id="currentReviewHeaderReview">Reviews</p>
              <p onClick={() => setSection('F')} className={section === 'F' ? 'active' : ''} id="currentReviewHeaderFavorite">Favorites</p>
              <p onClick={() => setSection('P')} className={section === 'P' ? 'active' : ''} id="currentReviewHeaderPhoto">Photos</p>
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
        ) : section === "R" && currentReviews?.length === 0 && current?.id != userId?(
          <form className="currentReview">
          <div id="currentReviewHeader">
            <p onClick={() => setSection('R')} className={section === 'R' ? 'active' : ''} id="currentReviewHeaderReview">Reviews</p>
            <p onClick={() => setSection('F')} className={section === 'F' ? 'active' : ''} id="currentReviewHeaderFavorite">Favorites</p>
            <p onClick={() => setSection('P')} className={section === 'P' ? 'active' : ''} id="currentReviewHeaderPhoto">Photos</p>
        </div>
          <div id="breakerbarshow1"></div>
          <div id="noReviewImage">
            <img src={Flower} alt="flower" />
          </div>
          <div id="noReviewHeader">
            <p id="noReviewHeaderContent">User Currently has no reviews</p>
          </div>
          <div id="noReviewContentContainer">
            <p id="noReviewContent">
              Explore other trails and look at other users reviews to find your next adventure.
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
        ): section === "R" ?(
          <form className="currentReview">
            <div id="currentReviewHeader">
              <p onClick={() => setSection('R')} className={section === 'R' ? 'active' : ''} id="currentReviewHeaderReview">Reviews</p>
              <p onClick={() => setSection('F')} className={section === 'F' ? 'active' : ''} id="currentReviewHeaderFavorite">Favorites</p>
              <p onClick={() => setSection('P')} className={section === 'P' ? 'active' : ''} id="currentReviewHeaderPhoto">Photos</p>
            </div>
            <div id="breakerbarshow1"></div>
            {currentReviews?.map((review, index) => (
              <UserReviews key={`${review?.id}_${index}`} review={review} />
            ))}
          </form>
        ): section === "F" && favoriteTrails?.length === 0 && current?.id == userId?(
          <form className="currentReview">
          <div id="currentReviewHeader">
              <p onClick={() => setSection('R')} className={section === 'R' ? 'active' : ''} id="currentReviewHeaderReview">Reviews</p>
              <p onClick={() => setSection('F')} className={section === 'F' ? 'active' : ''} id="currentReviewHeaderFavorite">Favorites</p>
              <p onClick={() => setSection('P')} className={section === 'P' ? 'active' : ''} id="currentReviewHeaderPhoto">Photos</p>
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
        ):section === "F" && favoriteTrails?.length === 0 && current?.id != userId?(
          <form className="currentReview">
          <div id="currentReviewHeader">
              <p onClick={() => setSection('R')} className={section === 'R' ? 'active' : ''} id="currentReviewHeaderReview">Reviews</p>
              <p onClick={() => setSection('F')} className={section === 'F' ? 'active' : ''} id="currentReviewHeaderFavorite">Favorites</p>
              <p onClick={() => setSection('P')} className={section === 'P' ? 'active' : ''} id="currentReviewHeaderPhoto">Photos</p>
          </div>
          <div id="breakerbarshow1"></div>
            <div id="noReviewImage">
              <img src={heartFlower} alt="flower" />
            </div>
            <div id="noReviewHeader">
              <p id="noReviewHeaderContent">User Currently has no favorite trails</p>
            </div>
            <div id="noReviewContentContainer">
              <p id="noReviewContent">
              Explore more and find your next favorite trail
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
        ): section === "F"?(
          <form className="currentReview">
          <div id="currentReviewHeader">
              <p onClick={() => setSection('R')} className={section === 'R' ? 'active' : ''} id="currentReviewHeaderReview">Reviews</p>
              <p onClick={() => setSection('F')} className={section === 'F' ? 'active' : ''} id="currentReviewHeaderFavorite">Favorites</p>
              <p onClick={() => setSection('P')} className={section === 'P' ? 'active' : ''} id="currentReviewHeaderPhoto">Photos</p>
          </div>
          <div id="breakerbarshow1"></div>
            {favoriteTrails?.reverse().map((trail, index) => (
              <FavoriteTrails key={`${trail?.id}_${index}`}trail ={trail}/>  
            ))}
          </form>
        ): section === "P" && current?.id == userId && userPhoto?.length === 0?(
          <form className="currentReview">
          <div id="currentReviewHeader">
              <p onClick={() => setSection('R')} className={section === 'R' ? 'active' : ''} id="currentReviewHeaderReview">Reviews</p>
              <p onClick={() => setSection('F')} className={section === 'F' ? 'active' : ''} id="currentReviewHeaderFavorite">Favorites</p>
              <p onClick={() => setSection('P')} className={section === 'P' ? 'active' : ''} id="currentReviewHeaderPhoto">Photos</p>
          </div>
          <div id="breakerbarshow1"></div>
            <div id="noReviewImage">
              <img src={photo} alt="flower" />
            </div>
            <div id="noReviewHeader">
              <p id="noReviewHeaderContent">Add your Photos</p>
            </div>
            <div id="noReviewContentContainer">
              <p id="noReviewContent">
              Keep track of your beautiful adventures
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

        ): section === "P" && current?.id != userId && userPhoto?.length === 0?(
          <form className="currentReview">
          <div id="currentReviewHeader">
            <p onClick={() => setSection('R')} className={section === 'R' ? 'active' : ''} id="currentReviewHeaderReview">Reviews</p>
            <p onClick={() => setSection('F')} className={section === 'F' ? 'active' : ''} id="currentReviewHeaderFavorite">Favorites</p>
            <p onClick={() => setSection('P')} className={section === 'P' ? 'active' : ''} id="currentReviewHeaderPhoto">Photos</p>
        </div>
          <div id="breakerbarshow1"></div>
          <div id="noReviewImage">
            <img src={photo} alt="flower" />
          </div>
          <div id="noReviewHeader">
            <p id="noReviewHeaderContent">User currently has no photos</p>
          </div>
          <div id="noReviewContentContainer">
            <p id="noReviewContent">
              Explore other trails and users
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
          <div id="currentReviewHeader">
            <p onClick={() => setSection('R')} className={section === 'R' ? 'active' : ''} id="currentReviewHeaderReview">Reviews</p>
            <p onClick={() => setSection('F')} className={section === 'F' ? 'active' : ''} id="currentReviewHeaderFavorite">Favorites</p>
            <p onClick={() => setSection('P')} className={section === 'P' ? 'active' : ''} id="currentReviewHeaderPhoto">Photos</p>
        </div>
          <div id="breakerbarshow1"></div>
          <div className="profilePhotoGrid">               
            {userPhoto
                  ?.map((photo, index) => (
                      <div key={`${photo?.id}_${index}`} id="photoContent">
                      <div id="profilePhotoContainer">
                        <div id="dateUploadedProfile">
                          <p id="clickToView">Click to view trail</p>
                          <p id="dateProfileHeader">Date Uploaded</p>
                          <p id="dateProfile">{formatDate(photo?.created_at)}</p>
                        </div>
                      <img  src={photo?.image_url} alt={`Photo ${index}`} className="profilePhotoItem" onClick={() => { window.scrollTo(0, 0);navigate(`/trails/${photo?.trail_id}`)}}/>
                      </div>
                      {current?.id == userId && (
                      <img id="deletePhoto" src={showDeleteModal && test == photo?.id ? DeleteClick : Delete} alt="deletephoto" onClick={() => {setShowDeleteModal(true); setTest(photo?.id)}} />
                      )}
                      {showDeleteModal && (
                          <DeletePhotoModal
                            visible={showDeleteModal}
                            setVisible={setShowDeleteModal}
                            imageId={test}
                          />
                        )}
                      <p id="profilePhotoTrailName"  onClick={() => { window.scrollTo(0, 0);navigate(`/trails/${photo?.trail_id}`)}}>{photo?.trail_name}</p>
                      </div>
                  ))?.reverse()}
          </div>
      </form>
      )}
      </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;