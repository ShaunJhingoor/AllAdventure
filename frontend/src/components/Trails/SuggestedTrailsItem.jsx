// import { useSelector } from 'react-redux'
import './TrailsIndexItem.css'
import { Link } from 'react-router-dom'
import "./SuggestedTrailsItem.css"
// import bird from "../../images/bird.jpeg"
import { fetchAllFavorites,removeFromFavorites, addToFavorites } from "../../store/favorite";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import AverageRating from '../Rating/averagerating'
import NonFavorite from "../../images/notFavorite.png";
import Favorite from "../../images/Favorite.png";

function SuggestedTrailsItem({trail}){
    const currentUser = useSelector(state => state?.session?.user);
    const favorites = useSelector(state => state?.favorite);
    const dispatch = useDispatch();
    const [rerender, setRerender] = useState(false);

    const favoriteTrailIds = Object.values(favorites)?.map(favoriteObj => favoriteObj?.favorite?.trail?.id);

    useEffect(() => {
        if(currentUser){
        dispatch(fetchAllFavorites(currentUser?.id));
        }
    }, [currentUser, dispatch, favoriteTrailIds?.length, rerender]);

    const favoriteForTrail = Object.values(favorites)?.find(favoriteObj => favoriteObj?.favorite?.trail?.id == trail.id);

    const isFavorite = favoriteTrailIds?.includes(trail?.id);

    const handleFavoriteClick = async() => {
        if (isFavorite) {
            await dispatch(removeFromFavorites(trail?.id, favoriteForTrail?.favorite?.id)); 
        } else {
            await dispatch(addToFavorites(trail?.id)); 
        }
        setRerender(!rerender); 
    };
   
    return (
        
            
        <div id='Suggestedinfo'>
        
            
            <Link to={`/trails/${trail?.id}`}  onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: 'none' }}>
                <img src={trail?.photoUrl} alt="result" id="suggestedimag" />
             </Link>
             {currentUser && (
            <div className="suggested-favorite-container" >
                {isFavorite ? (
                    <img src={Favorite} alt="Favorite" className="favorite-icon"  onClick={handleFavoriteClick} />

                ) : (
                    <img src={NonFavorite} alt="Not Favorite" className="favorite-icon" onClick={handleFavoriteClick}/>
                )}
            </div>
                )}
            <Link to={`/trails/${trail?.id}`} onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: 'none' }}>
                <p id='suggestedhometrailname'>{trail?.name}</p>
                <ul id='suggestedsplashpageTrail'> 
                <li>&#9733; <AverageRating trail={trail}/> &bull; {trail?.length}mi &bull; {trail?.difficulty}</li>
                </ul>
            </Link>
            
        
            
        </div>
        
        
    )
}

export default SuggestedTrailsItem