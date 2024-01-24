import "./indexReviewItem.css"
import Rating from "./rating"
import { formatDate } from "./formatedate"
import reviewProfile from "../../images/reviewProfile.png"
import ReviewDropDown from "./reviewDropDown"
import { useState } from "react"
import {useSelector } from "react-redux"

function ReviewIndexItem({review, trail}) {
    const [visible,setVisible] = useState(false)
    const currentUser = useSelector(state => state.session.user)
    const canEdit = currentUser.id === review.user_id

    const handleSettingDropDown = (e) => {
        e.preventDefault()
        setVisible(!visible)
    }

    const capitalizeFirstLetter = (str) =>  {
        if (str && str.length > 0) {
            return str[0].toUpperCase() + str.slice(1);
          } else {
            return "";
          }
      }

    return (
        <div id="reviewsContent">
           
            <hr />
            <span id="reviewIndexItemName"> 
            <img src={reviewProfile} alt="reviewProfile" id="reviewProfileImag"/>
            <div>
            {capitalizeFirstLetter(review?.fname)} {capitalizeFirstLetter(review?.lname)} 
            <p id="reviewDateCreated">{formatDate(review?.created_at)}</p>
            </div>
            {visible && <div className="reviewSettingsDropDownWrapper">
                <ReviewDropDown review={review} visible={visible} setVisible={setVisible} trail={trail}/>
            </div>}
            {canEdit && <p id="currentUserDots" onClick={handleSettingDropDown}>&hellip;
            </p>}
            </span>
            <Rating rating={review?.rating}/>
            <p id="reviewIndexItemDescription">{review?.review}</p>
        </div>
    )
}

export default ReviewIndexItem