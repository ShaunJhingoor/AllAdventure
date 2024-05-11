import { useEffect, useState, useCallback } from "react";
import pin from "../../images/pin.png";
import { GoogleMap, MarkerF, useLoadScript, InfoWindow } from "@react-google-maps/api";
import "./Trailmaps.css";
import { useNavigate } from "react-router-dom";


const easeInOut = (t) => {
    // Adjust the easing function for smoother animation
    return t < 0.5 ? 2 * t * t : -1 + 2 * (2 - t) * t;
};

function TrailMapWrapper({ trails, center, zoom = 10, onPinClick }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
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
  const [currentZoom, setCurrentZoom] = useState(zoom);
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
    animateZoom(zoom, center);
  }, [zoom, center]);

  const img = {
    url: pin,
  };

 

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const mapOptions = {
    disableDefaultUI: true,
    gestureHandling: "auto",
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
            <InfoWindow position={{ lat: trail?.latitude, lng: trail?.longitude }}
            onCloseClick={handleInfoWindowClose}
            >
              <div id="infoWindow">
                <p id="trailNameHeader" onClick={() => {navigate(`/trails/${trail?.id}`); window.scrollTo(0, 0)}}>{trail?.name}</p>
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