import { useSelector } from "react-redux";
import Rating from "../Reviews/rating";
import "./fancyaveragerating.css"
function FancyAverageRating({ trail}) {
  const reviews = useSelector((state) => Object.values(state?.review || {}));

  const trailReviews = reviews.filter((review) => review?.trail_id === trail?.id);


  
  if (trailReviews.length === 0) {
    return (
      <p>No reviews available for this trail.</p>
  
    );
  }

  const sumOfRating = trailReviews.reduce((sum, review) => sum + review?.rating, 0);


  const averageRating = sumOfRating / trailReviews.length;

  return(
    <div>
    {averageRating.toFixed(1)}
   <Rating rating={averageRating.toFixed(1)}/>
   <p id="averageRatingLabel">Average Rating</p>
   <p id="numberofreviews">{trailReviews.length} Reviews</p>

    </div>
  )
  

}

export default FancyAverageRating