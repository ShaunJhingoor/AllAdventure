import { Link } from 'react-router-dom'
import AverageRating from '../Rating/averagerating'

import '../search/SearchIndexItem.css'


function SearchIndexItem({result}){
    
    
    return (
        <>
        <div id='searchInfo'>
            <Link to={`/trails/${result.id}`} style={{ textDecoration: 'none' }}>
                <img src={result?.photoUrl} alt="result" id="searchImag" />
                <div className="detailsContainer">
                    <p id='searchtrailname'>{result?.name}</p>
                    <ul id='searchTrail'> 
                        <li>&#9733; <AverageRating trail={result}/> &bull; {result?.length}mi &bull; {result?.difficulty}</li>
                    </ul>
                </div>
            </Link>
        </div>
    </>
)
}
        
        
export default SearchIndexItem