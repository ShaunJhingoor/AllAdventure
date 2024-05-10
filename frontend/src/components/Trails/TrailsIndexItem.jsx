import { useDispatch, useSelector } from 'react-redux';
import './TrailsIndexItem.css';
import { Link } from 'react-router-dom';
import NonFavorite from "../../images/notFavorite.png";
import Favorite from "../../images/redHeart.png"
import { fetchAllFavorites,removeFromFavorites, addToFavorites } from "../../store/favorite";
import AverageRating from '../Rating/averagerating';
import { useEffect } from 'react';
import { useState } from 'react';

function TrailsIndexItem({ trail, setCenter = 0, setZoom = 0, onPinClick }) {
    const currentUser = useSelector(state => state?.session?.user);
    const favorites = useSelector(state => state?.favorite);
    const dispatch = useDispatch();
    const [rerender, setRerender] = useState(false);

    const favoriteTrailIds = Object.values(favorites)?.map(favoriteObj => favoriteObj?.favorite?.trail?.id);
    

    useEffect(() => {
        if(currentUser){
        dispatch(fetchAllFavorites(currentUser?.id));
        }
    }, [currentUser, dispatch, rerender]);

    
    const handleTrailItemClick = (e) => {
        e.preventDefault()
        onPinClick(trail.id);
    };

    const favoriteForTrail = Object.values(favorites)?.find(favoriteObj => favoriteObj?.favorite?.trail?.id == trail?.id);

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
        <div
            id={`trail-${trail.id}`}
            onClick={(e) => handleTrailItemClick(e)} // Call handleTrailItemClick when the trail item is clicked
            onMouseOver={(e) => {e.stopPropagation(); setCenter({lat: trail.latitude, lng: trail.longitude}); setZoom(15)}}
            onMouseLeave={(e) => {e.stopPropagation(); setCenter({lat:  40.79142619411136, lng:-73.58735483173312}); setZoom(10)}}
            className="trail-item-container"

        >
            <Link to={`/trails/${trail?.id}`} onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: 'none' }}>
                <img src={trail?.photoUrl} alt="result" id="trailimag" />
                
            </Link>
            {currentUser && (
            <div className="favorite-container" >
                {isFavorite ? (
                    <img src={Favorite} alt="Favorite" className="favorite-icon"  onClick={handleFavoriteClick} />

                ) : (
                    <img src={NonFavorite} alt="Not Favorite" className="favorite-icon" onClick={handleFavoriteClick}/>
                )}
            </div>
                )}
            <Link to={`/trails/${trail.id}`} onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: 'none' }}>
                <p id='hometrailname'>{trail.name}</p>
            </Link>
            <ul id='splashpageTrail'> 
                <li>&#9733; <AverageRating trail={trail}/> &bull; {trail.length}mi &bull; {trail.difficulty}</li>
            </ul>
        </div>
    );
}

export default TrailsIndexItem;