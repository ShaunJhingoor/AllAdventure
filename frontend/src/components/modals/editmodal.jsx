import { useDispatch } from "react-redux"
import * as reviewActions from "../../store/review"
import * as modalActions from "../../store/modal"
import "./reviewModal.css"
import Ratings from "../Rating/rating";
import { useState } from "react";
function EditModal({review,trail,visible,setVisible}){
    const dispatch = useDispatch()
    const[review1,setReview] = useState("")
    const [rating, setRating] = useState(0);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        const updateReview = {
            id: review.id,
            review: review1,
            trail_id: review.trail_id,
            rating: rating,
            user_id: review.user_id,
            created_at: new Date().toISOString(),
        };
          await dispatch(modalActions.hideModal("editReview"));
          await dispatch(reviewActions.updateReview(updateReview))
          await dispatch(reviewActions.Fetchreviews())
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
            <div id="exitReviewCreaterContainer1">
            <p onClick={handleHideModal} id="exitReviewCreater">x</p>
            </div>
            <p id="trailModalName">{trail?.name}</p>
            {/* <div id="CreateReviewContainer"> */}
            
              <div id="ratingCreateReviewContainer">
              <p id="ratingCreateReviewHeader">Rating</p>
              <br />
            <Ratings id="ratingCreateReview" rating={review.rating} setRating={setRating}  />
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
              defaultValue={review.review}
              onChange={(e) => setReview(e.target.value)}
            />
            
            {/* </div> */}
            
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
export default EditModal