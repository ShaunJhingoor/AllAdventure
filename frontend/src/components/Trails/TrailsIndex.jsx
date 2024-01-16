import { useDispatch, useSelector } from "react-redux"
import Fetchtrails from '../../store/trail'
import { useEffect } from "react"
import TrailsIndexItem from "./TrailsIndexItem"

function TrailsIndex(){
    const trails = useSelector(state => Object.values(state.trails || {}))

    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(Fetchtrails())
    }, [dispatch]);
    return(
        <div>
        <ul>
            {trails.map(trail => 
                <TrailsIndexItem key={trail.id} trail={trail}/>)}
        </ul>
        </div>
    )
}
export default TrailsIndex