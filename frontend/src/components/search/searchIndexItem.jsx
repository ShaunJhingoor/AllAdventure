import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AverageRating from '../Rating/averagerating'

import '../search/SearchIndexItem.css'


function SearchIndexItem({result}){
    const currentUser = useSelector(state=> state?.session.user)
    
    
    return (
        
        <>
      <div id='searchInfo'>

    <Link to={ currentUser? `/trails/${result.id}`: '/signUp'} >
        <img src={result?.photoUrl} alt="result" id="searchImag" />
    </Link>
    <Link to={currentUser? `/trails/${result.id}`: '/signUp'} style={{ textDecoration: 'none' }}>

        <div className="detailsContainer">
            <p id='searchtrailname'>{result.name}</p>
            <ul id='searchTrail'> 
                <li>&#9733; <AverageRating trail={result}/> &bull; {result.length}mi &bull; {result.difficulty}</li>
            </ul>
        </div>
    </Link>
</div>

            
            
        
        </>   
        
        
    )
}
export default SearchIndexItem