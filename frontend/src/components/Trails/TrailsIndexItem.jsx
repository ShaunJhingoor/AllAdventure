import { useSelector } from 'react-redux'
import './TrailsIndexItem.css'
import { Link } from 'react-router-dom'
function TrailsIndexItem({trail}){
    const currentUser = useSelector(state=> state?.session.user)


    return (
        <div>
            
        <div id='trailinfo'>
        
            <ul >
            <Link to={ currentUser? `/trails/${trail.id}`: '/signUp'} >
                <img src="hempsteadstatepark.webp" alt="trail" id="trailimag" />
             </Link>
               
            <Link to={currentUser? `/trails/${trail.id}`: '/signUp'} style={{ textDecoration: 'none' }}>
                <p id='hometrailname'>{trail.name}</p>
                <ul id='splashpageTrail'> 
                <li>&#9733; 4.3  {trail.length}mi {trail.difficulty}</li>
                </ul>
            </Link>

            </ul>
        </div>
        <div className='splashfooter'></div>
        </div>
    )
}

export default TrailsIndexItem