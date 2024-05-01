import "./FavoriteTrails.css"
import { useNavigate } from "react-router-dom"
function FavoriteTrails({trail}){
    const navigate = useNavigate()
    const handleGetDirections = (latitude, longitude) => {
    
        const mapsURL = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
        
        window.open(mapsURL, "_blank");
      };
    return(
        <>
        <div id="favoriteTrailInfo" >
        <p id="favoriteTrailName" onClick={() => navigate(`/trails/${trail?.id}`)}>{trail?.name} </p>
        <p id="favoriteTrailLocation" onClick={() => navigate(`/trails/${trail?.id}`)}>{trail?.location}</p>
        <p id="getDirections" onClick={() => handleGetDirections(trail?.latitude, trail?.longitude)}>Get Directions</p>
        <p id="favoriteTrailDifficulty" onClick={() => navigate(`/trails/${trail?.id}`)}>{trail?.difficulty}</p>
        <p id="favoriteTrailLength" onClick={() => navigate(`/trails/${trail?.id}`)}>Length:{trail?.length} mi</p>
        <p id="favoriteTrailDescription" onClick={() => navigate(`/trails/${trail?.id}`)}>{trail?.description}</p>
        </div>
        <div id="breakerbarshow1"></div>
        </>
    )
}
export default FavoriteTrails