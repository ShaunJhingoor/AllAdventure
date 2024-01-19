import bird from "../../images/bird.jpeg"
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"
import "./Trailmaps.css"
function TrailMapWrapper({trails}) {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
    })

    if(!isLoaded){
        return <div>Loading...</div>
    }
    if(!trails || trails.length === 0){
        return null
    }
    return (
        <>
        <div className="trailmapwrapper">
            <TrailMap trails={trails}/>
        </div>
        </>
    )

}

export const TrailMap = ({trails}) => {

    if(!trails){
        return null 
    }
    
    const latitude = trails[0]?.latitude
    const longitude = trails[0]?.longitude 

    const center = ({lat: latitude, lng: longitude})

    const img = {
        url: bird
    }

    const containerStyle = {
        width: '500px',
        height: '500px'
      };


    return(
        <>
            <GoogleMap zoom={9}  center={center} mapContainerStyle={containerStyle}>
            {trails?.map((trail) => <Marker key={trail.id} position={{ lat: trail?.latitude, lng: trail?.longitude }} icon={img} mapContainerStyle={containerStyle} />)}
            </GoogleMap> 
        </>
    );
}

export default TrailMapWrapper









    

