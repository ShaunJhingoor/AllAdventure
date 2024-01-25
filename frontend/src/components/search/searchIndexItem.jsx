import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import hempsteadstatepark from "../../images/hempsteadstatepark.webp"
import AverageRating from '../Rating/averagerating'
import '../Trails/TrailsIndexItem.css';


function SearchIndexItem({result}){
    const currentUser = useSelector(state=> state?.session.user)
    
    return (
        <>
            
        <div id='trailinfo'>
        
            
            <Link to={ currentUser? `/trails/${result.id}`: '/signUp'} >
                <img src={hempsteadstatepark} alt="result" id="trailimag" />
                {/* <img src={result.photoUrl} alt="result" id="resultimag" /> */}
             </Link>
               
            <Link to={currentUser? `/trails/${result.id}`: '/signUp'} style={{ textDecoration: 'none' }}>
                <p id='hometrailname'>{result.name}</p>
                <ul id='splashpageTrail'> 
                <li>&#9733; <AverageRating trail={result}/> &bull; {result.length}mi &bull; {result.difficulty}</li>
                </ul>
            </Link>
            
        
            
        </div>
        </>
        
        
    )
}
export default SearchIndexItem