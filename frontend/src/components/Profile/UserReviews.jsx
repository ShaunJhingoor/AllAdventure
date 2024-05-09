import { useSelector } from "react-redux"
import { selectTrail } from "../../store/trail"
import { useNavigate } from "react-router-dom";
import { formatDate } from "../Reviews/formatedate";
import Rating from "../Reviews/rating";
import "./UserReviews.css"

function UserReviews({review }){
    const navigate = useNavigate()
    const trail = useSelector(selectTrail(review?.trail_id))

return(

   <div onClick={() => {navigate(`/trails/${review?.trail_id}`); window.scrollTo(0, 0)}} style={{ textDecoration: 'none' }}>
    <h1 id="trailName">{trail?.name}</h1>
    <h1 id="dateReview">Date Written: {formatDate(review?.created_at)}</h1>
    <h1><Rating rating={review?.rating}/></h1>
    <h1 id="trailReview">{review?.review}</h1>
    <div id="breakerbarshow1"></div>
   </div>
)
}

export default UserReviews