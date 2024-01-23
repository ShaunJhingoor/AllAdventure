import "./indexReviewItem.css"
import Rating from "./rating"
import { formatDate } from "./formatedate"
import reviewProfile from "../../images/reviewProfile.png"

function ReviewIndexItem({review}) {
    const capitalizeFirstLetter = (str) =>  {
        return str[0].toUpperCase() + str.slice(1);
      }

    return (
        <div id="reviewsContent">
            <hr />
            <span id="reviewIndexItemName"> <img src={reviewProfile} alt="reviewProfile" id="reviewProfileImag"/>
            <div>
            {capitalizeFirstLetter(review?.fname)} {capitalizeFirstLetter(review?.lname)} 
            <p id="reviewDateCreated">{formatDate(review?.created_at)}</p>
            </div>
            </span>
            <Rating rating={review?.rating}/>
            <p id="reviewIndexItemDescription">{review?.review}</p>
        </div>
    )
}

export default ReviewIndexItem