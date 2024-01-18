import { useSelector } from 'react-redux'
import './TrailsIndexItem.css'
import { Link } from 'react-router-dom'
import hempsteadstatepark from "../../../images/hempsteadstatepark.webp"

function TrailsIndexItem({trail}){

    const currentUser = useSelector(state=> state?.session.user)


    return (
        
            
        <div id='trailinfo'>
        
        
            <Link to={ currentUser? `/trails/${trail.id}`: '/signUp'} >
                <img src={hempsteadstatepark} alt="trail" id="trailimag" />
             </Link>
               
            <Link to={currentUser? `/trails/${trail.id}`: '/signUp'} style={{ textDecoration: 'none' }}>
                <p id='hometrailname'>{trail.name}</p>
                <ul id='splashpageTrail'> 
                <li>&#9733; 4.3 &bull; {trail.length}mi &bull; {trail.difficulty}</li>
                </ul>
            </Link>
            
        
            
        </div>
        
        
    )
}

export default TrailsIndexItem