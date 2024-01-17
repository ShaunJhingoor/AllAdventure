import './TrailsIndexItem.css'
import { Link } from 'react-router-dom'
function TrailsIndexItem({trail}){
    return (
        <div>
            
        <div id='trailinfo'>
        
            <ul >
            <Link to={`/trails/${trail.id}`}>
                <img src="hempsteadstatepark.webp" alt="trail" id="trailimag" />
             </Link>
               
            <Link to={`/trails/${trail.id}`}>
                <p id='trailname'>{trail.name}</p>
                <span id='splashpageTrail'> &#9733; 4.3 {trail.length} mi {trail.difficulty}</span>
            </Link>

            </ul>
        </div>
        <div className='splashfooter'></div>
        </div>
    )
}

export default TrailsIndexItem