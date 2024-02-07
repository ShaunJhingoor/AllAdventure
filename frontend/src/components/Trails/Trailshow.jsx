import { useParams } from "react-router-dom"
import { Fetchtrail, selectTrail } from "../../store/trail"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import './TrailShow.css'
import ReviewsIndex from "../Reviews/indexReviews"
import CreateReview from "../Reviews/createReview"
import AverageRating from "../Rating/averagerating"
import FancyAverageRating from "../Rating/fancyaveragerating"
import SmallSearchBar from "../search/smallsearchbar"
import github from "../../images/github.png"
import linkedIn from "../../images/linkedin.png"
// import { useNavigate } from "react-router-dom"


function TrailShow(){
    const {trailId} = useParams()
    // const navigate = useNavigate()
    

    
    const dispatch = useDispatch()
    const trail = useSelector(selectTrail(trailId))
    
    useEffect(() => {
       dispatch(Fetchtrail(trailId))
    }, [dispatch, trailId]);

  //   useEffect(() => {
  //     if (trail === null || !trail) {
  //         navigate('/trails');
  //     }
  // }, [dispatch, trailId, trail, navigate]);
   
  if (trail === null || !trail) {
      return(
        <h1>This Trail does exist</h1>
      )
    }
    return (
        <div id="showWrapper">
          <div id="showHeader">
            <SmallSearchBar/>
          </div>
        <div className="showoutside">
          <form className="show">
            <img src={trail?.photoUrl} alt="result" id="showtrailimag" />

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
               <div id="averageRating"><FancyAverageRating trail={trail}/> </div>
               <br />
               </div >
               <div id="createReviewHolder">
               <CreateReview key={trail?.id} trail={trail}/>
               </div>
               </div>
              <br />
                <br />
              <ReviewsIndex trail={trail}/>
              
            <br />
          </form>
        </div>
        <br />
        <br />
        <div id="showpagefooter">
          <a href="https://github.com/ShaunJhingoor" target="_blank" rel="noopener noreferrer">
          <img src={github} alt="GitHub Logo" width="50" height="50"/>
          </a>
          <a href="https://www.linkedin.com/in/shaun-jhingoor-10a50328a/" target="_blank" rel="noopener noreferrer">
          <img src={linkedIn} alt="linkedin Logo" width="50" height="50"/>
          </a>
        </div>
        </div>
      );
      
}

export default TrailShow