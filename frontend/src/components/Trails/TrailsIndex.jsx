import { useDispatch, useSelector } from "react-redux"
import { Fetchtrails } from "../../store/trail"
import { useEffect } from "react"
import TrailsIndexItem from "./TrailsIndexItem"
import { trailsArray } from "../../store/trail"


function TrailsIndex(){
    const trails = useSelector(trailsArray)
        
        

    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(Fetchtrails())
    }, [dispatch]);
    return(
        <div>
        <ul>
            {trails.map(trail => 
                <TrailsIndexItem key={trail.id} trail={trail} />)}
        </ul>
        </div>
    )
}
export default TrailsIndex