import { useNavigate } from "react-router-dom"
import pin from "../../images/pin.png"
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api"
import "./Smalltrailmap.css"



function SmallTrailMapWrapper({trail}) {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
    })

    if(!isLoaded){
        return(
            <div className="loaderContainer">
            <div className="loader"></div>
            </div>
          )
    }
    if(!trail ){
        return null
    }
    return (
        <>
        <div className="smallTrailMapWrapper">
            
            <TrailMap trail={trail}/>
            
        </div>
        </>
    )

}

export const TrailMap = ({trail}) => {
    const navigate = useNavigate()

    if(!trail){
        return null 
    }
    


    const img = {
        url: pin
    }

    const containerStyle = {
        width: '400px',
        height: '200px',
        borderRadius: '50px',
        border: '2px solid black',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        cursor:'pointer'
      };

      const responsiveContainerStyle = {
        height: '180px',
        width: '110px', 
        borderRadius: '20%',
        marginRight: '15px',
        marginLeft: '20px'
      };
      
   
      if (window.innerWidth <= 600) { 
        Object.assign(containerStyle, responsiveContainerStyle);
      }

    const mapOptions = {
        disableDefaultUI: true, 
        zoomControl: false, 
        streetViewControl: false, 
        gestureHandling: 'none',
        mapTypeControl: false,
       fullscreenControl: false 
      };
   
    return(
        <>
            
            <GoogleMap zoom={14}  center={{lat: trail?.latitude, lng: trail?.longitude}} mapContainerStyle={containerStyle} options={mapOptions} onClick={() => {navigate("/trails"); window.scrollTo(0, 0); }}>

        
            <MarkerF key={trail.id} position={{lat: trail?.latitude, lng: trail?.longitude}} icon={img} onClick={() => {navigate("/trails"); window.scrollTo(0, 0); }}/>
    
            </GoogleMap> 
            
        </>
    );
}

export default SmallTrailMapWrapper