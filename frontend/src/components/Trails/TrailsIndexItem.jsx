import './TrailsIndexItem.css'
import { Link } from 'react-router-dom'
function TrailsIndexItem({trail}){
    return (
        <div>
            
        <div id='trailinfo'>
        
            <ul >
                <Link to="trails/:trailId"><img src="hempsteadstatepark.webp" alt="trail" id="trailimag"/></Link>
                <p id='trailname'>{trail.name}</p> <p>{trail.length} mi</p> 
            </ul>
        </div>
        <div className='splashfooter'></div>
        </div>
    )
}

export default TrailsIndexItem