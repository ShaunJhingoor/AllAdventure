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

    // const capitalizeFirstLetter = (str) =>  {
    //     return str[0].toUpperCase() + str.slice(1);
    //   }

    return (
        <div id="reviewsContent">
           
            <hr />
            <span id="reviewIndexItemName"> <img src={reviewProfile} alt="reviewProfile" id="reviewProfileImag"/>
            <div>
            {review?.fname} {review?.lname} 
            <p id="reviewDateCreated">{formatDate(review?.created_at)}</p>
            </div>
            </span>
            {visible && <div className="reviewSettingsDropDownWrapper">
                <ReviewDropDown review={review} visible={visible} setVisible={setVisible} trail={trail}/>
            </div>}
            {canEdit && <button id="currentUserDots" onClick={handleSettingDropDown}>Please Work
            </button>}
            <Rating rating={review?.rating}/>
            <p id="reviewIndexItemDescription">{review?.review}</p>
        </div>
    )
}

export default ReviewIndexItem