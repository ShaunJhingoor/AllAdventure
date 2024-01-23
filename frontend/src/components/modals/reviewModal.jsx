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
  console.log(currentUser);

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
      <div id="modal-background" />
      <div id="modal-content">
        <button onClick={handleHideModal}>x</button>
        <p id="trailModalName">{trail?.name}</p>
        <br />
        <Ratings rating={rating} setRating={setRating} />
        <textarea
          id="reviewReview"
          type="textarea"
          placeholder="What do you want to talk about?"
          maxLength="3000"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <button onClick={handleSubmitReview} type="submit" disabled={rating === 0 ||review.length <= 0 }>Submit</button>
      </div>
    </div>
  );
}

export default CreateModal;
