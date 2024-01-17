import { useDispatch, useSelector } from "react-redux"
import { Fetchtrails } from "../../store/trail"
import { useEffect } from "react"
import TrailsIndexItem from "./TrailsIndexItem"
import { trailsArray } from "../../store/trail"
import "./RealTrailsIndex.css"

function RealTrailsIndex(){
    const trails = useSelector(trailsArray)
    console.log(trails);
        
        

    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(Fetchtrails())
    }, [dispatch]);
    return(
        <div>
        <div id='realindexWrapper'>
            <br />
            <h1 id="RealTrailIndexHeader">New York Favorites</h1>
            <br />
        <ul id="realtrailindexwrapper">
            {trails.map(trail => 
                <TrailsIndexItem key={trail.id} trail={trail} />)}
        </ul>
            
        </div>
        </div>
    )
}
export default RealTrailsIndex