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
import camping from "../../images/camping.png"
import { useNavigate } from "react-router-dom"
import SmallTrailMapWrapper from "../maps/Smalltrailmap"


function TrailShow(){
    const {trailId} = useParams()
    const navigate = useNavigate()
    

    
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
        <div className="invalidTrail">
        <img src={camping} alt="camping" id="invalidTrailImg"/>
        <h1 id="invalidTrailError">404</h1>
        
        <h1 id="invalidTrailHeader">We have reached the end of the trail</h1>
        <p id="invalidTrailStatment">The page you are looking for either does not exist or has a new link. Let us get you back on the right path.</p>
        <br />
        <button type="submit" onClick={()=>navigate("/trails")} id='InvalidTrailButton'>Find Your Next Adventure</button>
        </div>
      )
    }
    return (
      <>
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
              <div id="smallMap"><SmallTrailMapWrapper trail={trail}/></div>
              
              
              <div id="modalAverage">
                <div id="modalAverage">
               <div id="averageRating"><FancyAverageRating trail={trail}/> </div>
               <br />
               </div >

               <CreateReview key={trail?.id} trail={trail}/>
               </div>
              <br />
                <br />
              <ReviewsIndex trail={trail}/>
              
            <br />
          </form>
        </div>
        <br />
        <br />
        </div>
        <div id="showpagefooter">
          <a href="https://github.com/ShaunJhingoor" target="_blank" rel="noopener noreferrer">
          <img src={github} alt="GitHub Logo" width="50" height="50"/>
          </a>
          <a href="https://www.linkedin.com/in/shaun-jhingoor-10a50328a/" target="_blank" rel="noopener noreferrer">
          <img src={linkedIn} alt="linkedin Logo" width="50" height="50"/>
          </a>
        </div>
        </>
      );
      
}

export default TrailShow