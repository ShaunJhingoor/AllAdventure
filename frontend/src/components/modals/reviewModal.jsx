import { useState } from "react";
import * as modalActions from "../../store/modal";
import * as reviewActions from "../../store/review";
import "./reviewModal.css";
import { useDispatch, useSelector } from "react-redux";
import Ratings from "../Rating/rating";
import exit from "../../images/exitButton.png"
function CreateModal({ trail }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const [reviewError, setReviewError] = useState(null);
  const currentUser = useSelector((state) => state.session.user);
  

  const handleHideModal = (e) => {
    e.preventDefault();
    dispatch(modalActions.hideModal("createReview"));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const trimmedReview = review.trim();


    if (trimmedReview.length === 0) {
    
      setReviewError("Review cannot be empty");
      return;
    }
    const newReview = {
      review: {
        review: trimmedReview,
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
        <img onClick={handleHideModal} id="exitReviewCreater" src={exit} alt="exit"/>
        </div>
        <p id="trailModalName">{trail?.name}</p>
        
          <div id="ratingCreateReviewContainer">
          <p id="ratingCreateReviewHeader">Rating</p>
          <br />
        <Ratings id="ratingCreateReview" rating={rating} setRating={setRating}  />
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
            setReview(e.target.value);
            setReviewError(null);
          }}
        />
        
        </div>
        {reviewError && <p id="errormessage">{reviewError}</p>}
     
        
          {/* <div className="breakerline"></div> */}
      </div>
        <div id="submitContainer">
        
       
        <button id="createReviewSubmit" onClick={handleSubmitReview} type="submit" disabled={rating === 0 ||review.length <= 0 }  style={{
          backgroundColor: rating === 0 || review.length <= 0 ? 'gray' : 'rgb(38,67,17)',
          color: rating === 0 || review.length <= 0 ? 'black' : 'white',}}>
            <p id="createReviewSubmitContent">Submit</p>
            </button>
        </div>
    </div>
  );
}

export default CreateModal;
