import "./FavoriteTrails.css"
import { useNavigate } from "react-router-dom"
function FavoriteTrails({trail}){
    const navigate = useNavigate()
    return(
        <>
        <div id="favoriteTrailInfo" onClick={() => navigate(`/trails/${trail?.id}`)}>
        <p id="favoriteTrailName">{trail?.name} </p>
        <p id="favoriteTrailLocation">{trail?.location}</p>
        <p id="favoriteTrailDifficulty">{trail?.difficulty}</p>
        <p id="favoriteTrailLength">Length:{trail?.length} mi</p>
        <p id="favoriteTrailDescription">{trail?.description}</p>
        </div>
        <div id="breakerbarshow1"></div>
        </>
    )
}
export default FavoriteTrails