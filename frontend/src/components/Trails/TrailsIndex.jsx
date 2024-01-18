import { useDispatch, useSelector } from "react-redux"
import { Fetchtrails } from "../../store/trail"
import { useEffect } from "react"
import TrailsIndexItem from "./TrailsIndexItem"
import { trailsArray } from "../../store/trail"
import "./TrailsIndex.css"
import { Link } from "react-router-dom"

function TrailsIndex(){
    const trails = useSelector(trailsArray)
        
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(Fetchtrails())
    }, [dispatch]);
    return(
        <>
        <img src="/home.jpeg" alt="home" id="homepageimag"/>
        <div id='indexWrapper'>
            <br />
            <h1 id="TrailIndexHeader">New York Favorites</h1>
            <br />
        <ul id="trailindexwrapper">
            {trails.slice(0,3).map(trail => 
                <TrailsIndexItem key={trail.id} trail={trail} />)}
            <Link to='/trails' id="showIndexBoxLink">
                <div id='showIndexBox'>
                <h1 id='showIndexBoxContent'>Show More</h1>
                
            </div>
            </Link>
        </ul>
            <div id="splashFooter"></div>
        </div>
        </>
    )
}
export default TrailsIndex