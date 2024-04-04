import { useDispatch, useSelector } from "react-redux"
// import  { Fetchreviews } from "../../store/review"
import { Fetchtrail } from "../../store/trail"
import { useEffect } from "react"
import ReviewIndexItem from "./indexReviewItem"
import { useParams } from "react-router-dom"

function ReviewsIndex({trail}){
    const dispatch = useDispatch()
    const {trailId} = useParams()
    useEffect(() => {
        dispatch(Fetchtrail(trailId))
    },[dispatch,trailId])

    const reviews = useSelector((state) => state?.trail?.[trail.id]?.reviews || [])


    return (
        <div>
            {Object.values(reviews).reverse().filter(el => el.trail_id == trailId).map((review) => (
                <ReviewIndexItem key={`${review?.id}-${trailId}`} review ={review} trail={trail}/>
            ))}
        </div>
   
    );

}
export default ReviewsIndex