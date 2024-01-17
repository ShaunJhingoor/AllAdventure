import { useDispatch, useSelector } from "react-redux"
import { Fetchtrails } from "../../store/trail"
import { useEffect } from "react"
import TrailsIndexItem from "./TrailsIndexItem"
import { trailsArray } from "../../store/trail"
import "./TrailsIndex.css"

function TrailsIndex(){
    const trails = useSelector(trailsArray)
    console.log(trails);
        
        

    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(Fetchtrails())
    }, [dispatch]);
    return(
        <>
        <div id='indexWrapper'>
            <br />
            <h1 id="TrailIndexHeader">New York Favorites</h1>
            <br />
        <ul id="trailindexwrapper">
            {trails.slice(0,3).map(trail => 
                <TrailsIndexItem key={trail.id} trail={trail} />)}
            <div id='showIndexBox'>
                <h1 id='showIndexBoxContent'>Show More</h1>
            </div>
        </ul>
            
        </div>
        </>
    )
}
export default TrailsIndex