import { useDispatch, useSelector } from "react-redux"
import { FetchRange } from "../../store/trail"
import { useEffect } from "react"
import TrailsIndexItem from "./TrailsIndexItem"
import { trailsArray } from "../../store/trail"
import "./TrailsIndex.css"
import { Link } from "react-router-dom"
import home from "../../images/home.jpeg"
import SearchBar from '../search/searchBar';
import { useState } from "react"
import Footer from "../footer/Footer"
// import { Carousel, Row, Col } from "react-bootstrap";

function TrailsIndex(){
    const trails = useSelector(trailsArray)
    const [center, setCenter] = useState({lat: 40.81501535327977, lng: -73.39608034896676})
    const [zoom, setZoom] = useState(10)
    const [loadingTrail, setLoadingTrail] = useState(true)

    
        zoom 
        center
    
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(FetchRange(Number(1), Number(3)))
       .then(() => {
        setLoadingTrail(false)
       })
    }, [dispatch]);


    
    return(
        <>
        
        <img src={home} alt="home" id="homepageimag" />
        <SearchBar/>
        <div id='indexWrapper'>
            <br />
            <Link to='/trails' id="linkTrailIndexHeader" onClick={() => window.scrollTo(0, 0)}>
            <h1 id="TrailIndexHeader">New York Favorites</h1>
        </Link>
            <br />
            <div id="trailindexwrapper">
                    {loadingTrail ? ( 
                        <div id="suggestedTrailsLoading1">
                        <div className="loader2"></div>
                       </div>
                    ) : ( 
                        <>
                            {trails.slice(0, 4).map((trail, index) => 
                                <TrailsIndexItem key={`${trail?.id}_${index}`} trail={trail} setCenter={setCenter} setZoom={setZoom} onPinClick={() => {null}}/>)
                            }
                        </>
                    )}
                </div>

            
        </div>
        <Footer/>
      </>
    )
}
export default TrailsIndex