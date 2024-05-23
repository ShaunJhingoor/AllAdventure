import { useDispatch, useSelector } from 'react-redux';
import './TrailsIndexItem.css';
import { Link } from 'react-router-dom';
import NonFavorite from "../../images/notFavorite.png";
import Favorite from "../../images/redHeart.png"
import { fetchAllFavorites,removeFromFavorites, addToFavorites } from "../../store/favorite";
import AverageRating from '../Rating/averagerating';
import { useEffect } from 'react';
import { useState } from 'react';


function TrailsIndexItem({ trail, setCenter = 0, setZoom = 0}) {
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
            onMouseOver={(e) => {e.stopPropagation(); setCenter({lat: trail.latitude, lng: trail.longitude}); setZoom(15)}}
            onMouseLeave={(e) => {e.stopPropagation(); setCenter({lat: 40.81501535327977, lng: -73.39608034896676}); setZoom(10)}}
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