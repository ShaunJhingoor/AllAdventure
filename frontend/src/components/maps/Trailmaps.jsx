import { useEffect, useState, useCallback } from "react";
import pin from "../../images/pin.png";
import { GoogleMap, MarkerF, useLoadScript, InfoWindow } from "@react-google-maps/api";
import "./Trailmaps.css";
import { useNavigate } from "react-router-dom";



const easeInOut = (t) => {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

function TrailMapWrapper({ trails, center, zoom = 10, onPinClick }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return(
      <div className="loaderContainer">
      <div className="loader"></div>
      </div>
    )
  }

  if (!trails || trails.length === 0) {
    return null;
  }

  return (
    <div className="trailmapwrapper">
      <TrailMap trails={trails} center={center} zoom={zoom}  onPinClick={onPinClick}/>
    </div>
  );
}

export const TrailMap = ({ trails, center, zoom, onPinClick }) => {
  const newZoom = window.innerWidth <= 600 ? 8.4 : zoom
  const [currentZoom, setCurrentZoom] = useState(newZoom);
  const [currentCenter, setCurrentCenter] = useState(center);
  const [selectedTrailId, setSelectedTrailId] = useState(null);
  
  const navigate = useNavigate()


  const animateZoom = useCallback((targetZoom, targetCenter) => {
    const duration = 2000; // Adjusted animation duration in milliseconds
    const startZoom = currentZoom;
    const startCenter = currentCenter; // Use currentCenter instead of map.getCenter()
    const startTime = Date.now();

    const zoomStep = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeInOut(progress); // Apply easing function

      // Calculate new zoom level
      const newZoom = startZoom + (targetZoom - startZoom) * easedProgress;

      // Calculate new center position
      const newCenter = {
        lat: startCenter.lat + (targetCenter.lat - startCenter.lat) * easedProgress,
        lng: startCenter.lng + (targetCenter.lng - startCenter.lng) * easedProgress,
      };

      // Set the new zoom level and center position
      setCurrentZoom(newZoom);
      setCurrentCenter(newCenter);

      if (progress < 1) {
        requestAnimationFrame(zoomStep);
      }
    };

    requestAnimationFrame(zoomStep);
  }, [currentZoom, currentCenter]);

  useEffect(() => {
    animateZoom(newZoom, center);
  }, [newZoom, center]);

  const img = {
    url: pin,
    scaledSize: window.innerWidth <= 600 ? new window.google.maps.Size(20, 20): undefined
  };

 

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const mapOptions = {
    disableDefaultUI: true,
    gestureHandling: "cooperative",
  };

  const handleMarkerClick = (trail) => {
    
    setSelectedTrailId(trail?.id);
    onPinClick(trail?.id); 
  };
  
  const handleInfoWindowClose = () => {
    
    setSelectedTrailId(null);
    onPinClick(null) 
  };

  const handleGetDirections = (latitude, longitude) => {
    const mapsURL = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(mapsURL, "_blank");
};

  return (
    <GoogleMap
      zoom={currentZoom}
      center={currentCenter}
      mapContainerStyle={containerStyle}
      options={mapOptions}
    >
       {trails.map((trail) => (
        <MarkerF
          key={trail?.id}
          position={{ lat: trail?.latitude, lng: trail?.longitude }}
          icon={img}
          onClick={() => handleMarkerClick(trail)}
          
        >
          {selectedTrailId == trail.id && (
            <InfoWindow 
            onCloseClick={handleInfoWindowClose}
            >
              <div id="infoWindow">
                <p id="trailNameHeaderInfoWindow" onClick={() => {navigate(`/trails/${trail?.id}`); window.scrollTo(0, 0)}}>{trail?.name}</p>
                <p id="infoWindowContent">Difficulty:{trail?.difficulty}</p>
                <p id="infoWindowContentDirections" onClick={() => handleGetDirections(trail?.latitude, trail?.longitude)} >Directions</p>
              </div>
            </InfoWindow>
          )}
        </MarkerF>
      ))}
    </GoogleMap>
  );
};

export default TrailMapWrapper;