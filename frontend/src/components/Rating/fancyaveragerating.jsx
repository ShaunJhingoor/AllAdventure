import { useSelector } from "react-redux";
import Rating from "../Reviews/rating";
import "./fancyaveragerating.css"
function FancyAverageRating({ trail}) {
  const reviews = useSelector((state) => Object.values(state?.review || {}));

  const trailReviews = reviews?.filter((review) => review?.trail_id === trail?.id);


  
  if (trailReviews.length === 0) {
    return (
      <p>No reviews available for this trail.</p>
  
    );
  }

  const sumOfRating = trailReviews.reduce((sum, review) => sum + review?.rating, 0);


  const averageRating = sumOfRating / trailReviews.length;

  return(
    <div>
    <p id="ratingFancyRating">{averageRating.toFixed(1)}</p>
   <Rating rating={averageRating.toFixed(1)} />
   <h3 id="averageRatingLabel">Average Rating</h3>
   <h3 id="numberofreviews">{trailReviews.length} Reviews</h3>
   
    </div>
  )
  

}

export default FancyAverageRating