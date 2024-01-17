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
        <div>
            <br />
            <h1 id="TrailIndexHeader">New York Favorites</h1>
            <br />
        <ul id="trailindexwrapper">
            {trails.map(trail => 
                <TrailsIndexItem key={trail.id} trail={trail} />)}
        </ul>
        </div>
        </>
    )
}
export default TrailsIndex