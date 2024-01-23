import { useState } from "react";
import  *  as modalActions from "../../store/modal"
import * as reviewActions from "../../store/review"
import "./reviewModal.css"
import { useDispatch } from "react-redux";
import Ratings from "../Rating/rating";
 function Modal({ trail }) {
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0)
  const dispatch = useDispatch()
  

  const handleHideModal = (e) => {
    e.preventDefault()
    dispatch(modalActions.hideModal("createReview"))
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    const newReview ={
        review: review,
        trail_id: trail.id,
        rating: rating
    }
    dispatch(modalActions.hideModal("createReview"))
    return dispatch(reviewActions.createReview(newReview))
  }
    return (
      <div id="modal">
        <div id="modal-background" />
        <div id="modal-content">
        <button onClick={handleHideModal}>x</button>
          <p id="trailModalName">{trail?.name}</p>
          <br />
          <Ratings rating={rating} setRating={setRating}/>
          <textarea id="reviewReview"  
            type="textarea" placeholder="What do you want to talk about?" 
            maxLength='3000' value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button onClick={handleSubmitReview}>Submit</button>
        </div>
       
      </div>
    );
  }

  
  export default Modal;

  

