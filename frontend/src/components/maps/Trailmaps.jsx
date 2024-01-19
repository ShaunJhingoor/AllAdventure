import bird from "../../images/bird.jpeg"
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api"
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
    
    // const latitude = trails[0]?.latitude
    // const longitude = trails[0]?.longitude 

    const center = ({lat:  40.7299341, lng: -74.013928})

    const img = {
        url: bird
    }

    const containerStyle = {
        width: '100%',
        height: '100%'
      };
   
      const examples = [{id:1 , lat:40.7299341, lng:-74.013928 }]
    return(
        <>
            <GoogleMap zoom={9}  center={center} mapContainerStyle={containerStyle}>
            {trails.map((trail) =>{
        
                console.log(trail?.latitude);
                return (<MarkerF key={trail.id} position={{lat: trail?.latitude, lng: trail?.longitude}} />)
            }
            )}
            </GoogleMap> 
        </>
    );
}

export default TrailMapWrapper









    

