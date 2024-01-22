import { useParams } from "react-router-dom"
import { Fetchtrail, selectTrail } from "../../store/trail"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import hempsteadstatepark from "../../images/hempsteadstatepark.webp"
import './TrailShow.css'
import ReviewsIndex from "../Reviews/indexReviews"

function TrailShow(){
    const {trailId} = useParams()
    

    
    const dispatch = useDispatch()
    const trail = useSelector(selectTrail(trailId))
    
    useEffect(() => {
       dispatch(Fetchtrail(trailId))
    }, [dispatch, trailId]);
    return (
        <div>
        <div className="showoutside">
          <form className="show">
            <img src={hempsteadstatepark} alt="trail" id="showtrailimag" />

            <div id="breakerbarshow"></div>

            <div id="showtextimag">
              <p id="showtrailnameimag">{trail?.name}</p>
              <span id="showtrailinfoimag">{trail?.difficulty} &bull;<span id="starshowimag">&#9733;</span> 4.3</span>
            </div>
              <ReviewsIndex/>
          </form>

        </div>
        </div>
      );
      
}

export default TrailShow