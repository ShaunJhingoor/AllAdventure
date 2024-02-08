import { useDispatch, useSelector } from "react-redux"
import { Fetchtrails } from "../../store/trail"
import { useEffect } from "react"
import TrailsIndexItem from "./TrailsIndexItem"
import { trailsArray } from "../../store/trail"
import "./TrailsIndex.css"
import { Link } from "react-router-dom"
import home from "../../images/home.jpeg"
import SearchBar from '../search/searchBar';
import { useState } from "react"
import github from "../../images/github.png"
import linkedIn from "../../images/linkedin.png"

function TrailsIndex(){
    const trails = useSelector(trailsArray)
    const [center, setCenter] = useState({lat:  40.79142619411136, lng:-73.58735483173312})
    const [zoom, setZoom] = useState(10)
    
        zoom 
        center
    
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(Fetchtrails())
       
    }, [dispatch]);
    return(
        <>
        
        <img src={home} alt="home" id="homepageimag" />
        <SearchBar/>
        <div id='indexWrapper'>
            <br />
            <Link to='/trails' id="linkTrailIndexHeader">
            <h1 id="TrailIndexHeader">New York Favorites</h1>
        </Link>
            <br />
        <div id="trailindexwrapper">
            {trails.slice(0,3).map((trail,index) => 
                <TrailsIndexItem key={`${trail?.id}_${index}`} trail={trail} setCenter={setCenter} setZoom={setZoom}/>)}
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
        <div id="splashFooter">
        <a href="https://github.com/ShaunJhingoor" target="_blank" rel="noopener noreferrer">
        <img src={github} alt="GitHub Logo" width="50" height="50"/>
        </a>
        <a href="https://www.linkedin.com/in/shaun-jhingoor-10a50328a/" target="_blank" rel="noopener noreferrer">
        <img src={linkedIn} alt="linkedin Logo" width="50" height="50"/>
        </a>
        </div>
        </>
    )
}
export default TrailsIndex