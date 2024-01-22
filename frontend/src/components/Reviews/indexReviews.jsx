import { useDispatch, useSelector } from "react-redux"
import  { Fetchreviews } from "../../store/review"
import { useEffect } from "react"
import ReviewIndexItem from "./indexReviewItem"
import { useParams } from "react-router-dom"

function ReviewsIndex(){
    const reviews = useSelector(state => Object.values(state?.review|| {}))
    console.log(reviews)
    const dispatch = useDispatch()
    const {trailId} = useParams()
    console.log(trailId)
    useEffect(() => {
        dispatch(Fetchreviews())
    },[dispatch])

    return (
        <div>
            {reviews.filter(el => el.trail_id == trailId).map((review) => (
                <ReviewIndexItem key={review.id} review ={review}/>
            ))}
        </div>
   
    );

}
export default ReviewsIndex