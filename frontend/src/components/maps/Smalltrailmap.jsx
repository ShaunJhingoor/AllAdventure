import pin from "../../images/pin.png"
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api"



function SmallTrailMapWrapper({trail}) {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
    })

    if(!isLoaded){
        return <div>Loading...</div>
    }
    if(!trail ){
        return null
    }
    return (
        <>
        <div className="trailmapwrapper">
            <TrailMap trail={trail}/>
        </div>
        </>
    )

}

export const TrailMap = ({trail}) => {

    if(!trail){
        return null 
    }
    


    const img = {
        url: pin
    }

    const containerStyle = {
        width: '20vw',
        height: '20vh',
        borderRadius: '50px',
        border: '2px solid black',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      };

    const mapOptions = {
        disableDefaultUI: true, 
        zoomControl: false, 
        streetViewControl: false, 
        gestureHandling: 'none' 
      };
   
    return(
        <>
            <GoogleMap zoom={14}  center={{lat: trail?.latitude, lng: trail?.longitude}} mapContainerStyle={containerStyle} options={mapOptions}>
        
            <MarkerF key={trail.id} position={{lat: trail?.latitude, lng: trail?.longitude}} icon={img}/>
    
            </GoogleMap> 
        </>
    );
}

export default SmallTrailMapWrapper