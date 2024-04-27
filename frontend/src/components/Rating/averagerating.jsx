import {  useSelector } from "react-redux";


function AverageRating({ trail}) {
  const reviews = useSelector((state) => state?.trail?.[trail?.id]?.reviews || []);
  const trailReviews = Object.values(reviews)?.filter((review) => review?.trail_id === trail?.id);

  
  if (trailReviews.length === 0) {
    return (
      <p>No reviews available for this trail.</p>
  
    );
  }

  const sumOfRating = trailReviews.reduce((sum, review) => sum + review.rating, 0);


  const averageRating = sumOfRating / trailReviews.length;

  return averageRating.toFixed(1)

  
  

}

export default AverageRating;


