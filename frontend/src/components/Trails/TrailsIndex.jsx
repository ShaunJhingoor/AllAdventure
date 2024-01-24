import { useDispatch, useSelector } from "react-redux"
import { Fetchtrails } from "../../store/trail"
import { useEffect } from "react"
import TrailsIndexItem from "./TrailsIndexItem"
import { trailsArray } from "../../store/trail"
import "./TrailsIndex.css"
import { Link } from "react-router-dom"
import home from "../../images/home.jpeg"

function TrailsIndex(){
    const trails = useSelector(trailsArray)
        
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(Fetchtrails())
    }, [dispatch]);
    return(
        <>
        <img src={home} alt="home" id="homepageimag"/>
        <div id='indexWrapper'>
            <br />
            <Link to='/trails' id="linkTrailIndexHeader">
            <h1 id="TrailIndexHeader">New York Favorites</h1>
        </Link>
            <br />
        <div id="trailindexwrapper">
            {trails.slice(0,3).map((trail,index) => 
                <TrailsIndexItem key={`${trail.id}_${index}`} trail={trail} />)}
            <Link to='/trails' id="showIndexBoxLink">
                <div id='showIndexBox'>
                <h1 id="showIndexBoxContent">
                    <span id='showIndexBoxContent1'>Show More</span>
                    <span id="showIndexBoxContent2">{">"}</span>
                </h1>
                {/* <h1 id="showIndexBoxContent2">{">"}</h1> */}
                
            </div>
            </Link>
        </div>
            
        </div>
        <div id="splashFooter"></div>
        </>
    )
}
export default TrailsIndex