import { useSelector } from 'react-redux'
import './TrailsIndexItem.css'
import { Link } from 'react-router-dom'
import hempsteadstatepark from "../../images/hempsteadstatepark.webp"
import AverageRating from '../Rating/averagerating'

function TrailsIndexItem({trail,setCenter, setZoom}){

    const currentUser = useSelector(state=> state?.session.user)


    return (
        
            
        <div id='trailinfo'  onMouseOver = {() => { setCenter({lat: trail.latitude, lng: trail.longitude}); setZoom(12)}}
        onMouseLeave = {() => {setCenter({lat: trail.latitude, lng: trail.longitude}); setZoom(8)}}>
        
        
            <Link to={ currentUser? `/trails/${trail.id}`: '/signUp'} >
                <img src={hempsteadstatepark} alt="trail" id="trailimag" />
                {/* <img src={trail.photoUrl} alt="trail" id="trailimag" /> */}
             </Link>
               
            <Link to={currentUser? `/trails/${trail.id}`: '/signUp'} style={{ textDecoration: 'none' }}>
                <p id='hometrailname'>{trail.name}</p>
                <ul id='splashpageTrail'> 
                <li>&#9733; <AverageRating trail={trail}/> &bull; {trail.length}mi &bull; {trail.difficulty}</li>
                </ul>
            </Link>
            
        
            
        </div>
        
        
    )
}

export default TrailsIndexItem