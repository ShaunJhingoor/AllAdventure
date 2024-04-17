import { useDispatch } from "react-redux"
// import * as reviewActions from "../../store/review"
import { updateReviews } from "../../store/trail"
import * as modalActions from "../../store/modal"
import { Fetchtrail } from "../../store/trail"
import "./reviewModal.css"
import Ratings from "../Rating/rating";
import { useState } from "react";
import exit from "../../images/exitButton.png"
function EditModal({review,trail,visible,setVisible}){
    const dispatch = useDispatch()
    const[review1,setReview] = useState(review.review)
    const [rating, setRating] = useState(review.rating);
    const [reviewError, setReviewError] = useState(null);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        const trimmedReview = review1.trim();


        if (trimmedReview.length === 0) {
        
          setReviewError("Review cannot be empty");
          return;
        }
        const updateReview = {
            id: review.id,
            trail_id: review.trail_id,
            review: review1,
            rating: rating,
            user_id: review.user_id,
            created_at: new Date().toISOString(),
        };
          dispatch(modalActions.hideModal("editReview"));
          await dispatch(updateReviews(updateReview))
          await dispatch(Fetchtrail(trail.id))
         setVisible(!visible)
          
       
      };

      const handleHideModal = (e) => {
        e.preventDefault();
        dispatch(modalActions.hideModal("editReview"));
      };

      return (
        <div id="modal">
          <div id="modal-background" ></div>
          <div id="modal-content">
            <div id="exitReviewCreaterContainer">
            <img onClick={()=> {{handleHideModal} setVisible(!visible)}} id="exitReviewCreater" src={exit} alt="exit"/>
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
            
            
           
            <p id="reviewReviewHeader">Review</p>
           <br />
           <textarea
              id="reviewReview"
              type="textarea"
              maxLength="3000"
              defaultValue={review1}
              onChange={(e) => setReview(e.target.value)}
            />
            
            </div>
            {reviewError && <p id="errormessage">{reviewError}</p>}
         
            {/* <div className="breakerline"></div> */}
        </div>
          <div id="submitContainer">
            
           
            <button id="createReviewSubmit" onClick={handleSubmitReview} type="submit"    style={{
              backgroundColor:  'rgb(38,67,17)',
              color:  'white',}}>
                <p id="createReviewSubmitContent">Submit</p>
                </button>
            </div> 
          </div>
      );
    }
export default EditModal


