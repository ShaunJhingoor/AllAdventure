// import { useSelector } from 'react-redux'
import './TrailsIndexItem.css'
import { Link } from 'react-router-dom'
import "./SuggestedTrailsItem.css"

import AverageRating from '../Rating/averagerating'

function SuggestedTrailsItem({trail}){
    // const currentUser = useSelector(state=> state?.session.user)
 


    return (
        
            
        <div id='Suggestedinfo'>
        
            
            <Link to={`/trails/${trail.id}`}  onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: 'none' }}>
                <img src={trail?.photoUrl} alt="result" id="suggestedimag" />
             </Link>
               
            <Link to={`/trails/${trail.id}`} onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: 'none' }}>
                <p id='suggestedhometrailname'>{trail.name}</p>
                <ul id='suggestedsplashpageTrail'> 
                <li>&#9733; <AverageRating trail={trail}/> &bull; {trail.length}mi &bull; {trail.difficulty}</li>
                </ul>
            </Link>
            
        
            
        </div>
        
        
    )
}

export default SuggestedTrailsItem