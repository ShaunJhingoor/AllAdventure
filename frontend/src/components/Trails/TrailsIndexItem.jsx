import { useSelector } from 'react-redux'
import './TrailsIndexItem.css'
import { Link } from 'react-router-dom'

import AverageRating from '../Rating/averagerating'

function TrailsIndexItem({trail,setCenter, setZoom}){
    console.log(trail.photoUrl)
    const currentUser = useSelector(state=> state?.session.user)
    console.log(trail)


    return (
        
            
        <div id='trailinfo'  onMouseOver = {() => { setCenter({lat: trail.latitude, lng: trail.longitude}); setZoom(15)}}
        onMouseLeave = {() => {setCenter({lat: trail.latitude, lng: trail.longitude}); setZoom(10)}}>
        
            
            <Link to={ currentUser? `/trails/${trail.id}`: '/signUp'} >
                <img src={trail?.photoUrl} alt="result" id="trailimag" />
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