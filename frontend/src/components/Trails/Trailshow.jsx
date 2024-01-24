import { useParams } from "react-router-dom"
import { Fetchtrail, selectTrail } from "../../store/trail"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import hempsteadstatepark from "../../images/hempsteadstatepark.webp"
import './TrailShow.css'
import ReviewsIndex from "../Reviews/indexReviews"
import CreateReview from "../Reviews/createReview"
import AverageRating from "../Rating/averagerating"
import FancyAverageRating from "../Rating/fancyaveragerating"


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
              <span id="showtrailinfoimag">{trail?.difficulty} &bull;<span id="starshowimag">&#9733; </span><AverageRating trail={trail}/></span>

            </div>
            <br />
            <div id="showdescriptionheader">
            
              <p id="showdescriptionheadertext">Description</p>
              
            </div>
            <br />
            <div id="breakerbarshow1"></div>
              <br />
       
            <div id="showdescription">
                <p>{trail?.description}</p>
               
              </div>
              <br />
              <div id="breakerbarshow1"></div>
              <br />
              <div id="modalAverage">
                <div id="modalAverage">
               <p id="averageRating"><FancyAverageRating trail={trail}/> </p>
               <br />
               </div>
               <CreateReview key={trail?.id} trail={trail}/>
               </div>
              <br />
              <div id="showReviews">
                <br />
              <ReviewsIndex trail={trail}/>
              </div>
            <br />
          </form>
        </div>
        <br />
        <br />
        <div id="showpagefooter">

        </div>
        </div>
      );
      
}

export default TrailShow