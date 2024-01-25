import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AverageRating from '../Rating/averagerating'
import '../Trails/TrailsIndexItem.css';


function SearchIndexItem({result}){
    const currentUser = useSelector(state=> state?.session.user)
    console.log(result)
    
    return (
        <>
            
        <div id='trailinfo'>
        
            
            <Link to={ currentUser? `/trails/${result.id}`: '/signUp'} >
               
                <img src={result?.photoUrl} alt="result" id="trailimag" />
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