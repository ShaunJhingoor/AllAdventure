import { Link } from 'react-router-dom'
import AverageRating from '../Rating/averagerating'
import { fetchAllFavorites,removeFromFavorites, addToFavorites } from "../../store/favorite";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import '../search/SearchIndexItem.css'
import NonFavorite from "../../images/notFavorite.png";
import Favorite from "../../images/redHeart.png"

function SearchIndexItem({result}){
    const currentUser = useSelector(state => state?.session?.user);
    const favorites = useSelector(state => state?.favorite);
    const dispatch = useDispatch();
    const [rerender, setRerender] = useState(false);
    const [loading5, setloading5] = useState(true)

    const favoriteTrailIds = Object.values(favorites)?.map(favoriteObj => favoriteObj?.favorite?.trail?.id);

    useEffect(() => {
        if(currentUser){
        dispatch(fetchAllFavorites(currentUser?.id)).then(
            () => {
                setloading5(false)
            }
        )
        }
    }, [currentUser, dispatch, rerender]);

    const favoriteForTrail = Object.values(favorites)?.find(favoriteObj => favoriteObj?.favorite?.trail?.id == result.id);

    const isFavorite = favoriteTrailIds?.includes(result?.id);

    const handleFavoriteClick = async() => {
        if (isFavorite) {
            await dispatch(removeFromFavorites(result?.id, favoriteForTrail?.favorite?.id)); 
        } else {
            await dispatch(addToFavorites(result?.id)); 
        }
        setRerender(!rerender); 
    };
    if(loading5){
        return (
            <div className="loading">
               <div className="loader4"></div>
            </div>
        );
    }
    return (
        <div id='searchInfo'>
        <div>
            <Link to={`/trails/${result?.id}`} style={{ textDecoration: 'none' }} onClick={() => window.scrollTo(0, 0)}>
                <img src={result?.photoUrl} alt="result" id="searchImag" />
            </Link>
        </div>  
        {currentUser && (
            <div className="suggested-favorite-container" >
                {isFavorite ? (
                    <img src={Favorite} alt="Favorite" className="favorite-icon"  onClick={handleFavoriteClick} />

                ) : (
                    <img src={NonFavorite} alt="Not Favorite" className="favorite-icon" onClick={handleFavoriteClick}/>
                )}
            </div>
                )}
        <div className="detailsContainer">
            <Link  to={`/trails/${result?.id}`} style={{ textDecoration: 'none' }} onClick={() => window.scrollTo(0, 0)}>
                <p id='searchtrailname'>{result?.name} </p>
                <ul id='searchTrail'> 
                    <li>&#9733; <AverageRating trail={result}/> &bull; {result?.length}mi &bull; {result?.difficulty}</li>
                </ul>
                </Link>
        </div>
    </div>
)
}
        
        
export default SearchIndexItem