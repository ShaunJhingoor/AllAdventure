import pin from "../../images/pin.png"
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api"
import "./Trailmaps.css"
function TrailMapWrapper({trails, center,zoom=10}) {
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
            <TrailMap trails={trails} center ={center} zoom={zoom}/>
        </div>
        </>
    )

}

export const TrailMap = ({trails, center,zoom}) => {

    if(!trails){
        return null 
    }
    
    // const latitude = trails[0]?.latitude
    // const longitude = trails[0]?.longitude 

    // const center = ({lat:  40.7299341, lng: -74.013928})

    const img = {
        url: pin
    }

    const containerStyle = {
        width: '100%',
        height: '100%'
      };
   
    return(
        <>
            <GoogleMap zoom={zoom}  center={center} mapContainerStyle={containerStyle}>
            {trails.map((trail) =>{
        
                return (<MarkerF key={trail.id} position={{lat: trail?.latitude, lng: trail?.longitude}} icon={img}/>)
            }
            )}
            </GoogleMap> 
        </>
    );
}

export default TrailMapWrapper









    

