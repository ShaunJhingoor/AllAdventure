// import { useSelector } from 'react-redux'
import './TrailsIndexItem.css'
import { Link } from 'react-router-dom'

import AverageRating from '../Rating/averagerating'

function TrailsIndexItem({trail,setCenter=0, setZoom=0}){
    // const currentUser = useSelector(state=> state?.session.user)
 


    return (
        
            
        <div id='trailinfo'  onMouseOver = {() => { setCenter({lat: trail.latitude, lng: trail.longitude}); setZoom(15)}}
        onMouseLeave = {() => {setCenter({lat: trail.latitude, lng: trail.longitude}); setZoom(10)}}>
        
            
            <Link to={`/trails/${trail.id}`}  onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: 'none' }}>
                <img src={trail?.photoUrl} alt="result" id="trailimag" />
             </Link>
               
            <Link to={`/trails/${trail.id}`} onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: 'none' }}>
                <p id='hometrailname'>{trail.name}</p>
                <ul id='splashpageTrail'> 
                <li>&#9733; <AverageRating trail={trail}/> &bull; {trail.length}mi &bull; {trail.difficulty}</li>
                </ul>
            </Link>
            
        
            
        </div>
        
        
    )
}

export default TrailsIndexItem