import { useEffect, useState, useCallback } from "react";
import pin from "../../images/pin.png";
import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import "./Trailmaps.css";
import { useNavigate } from "react-router-dom";

const easeInOut = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

function GoogleMapsLoader({ trails, center, zoom, onPinClick, apiKey }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  if (!isLoaded) {
    return (
      <div className="loaderContainer">
        <div className="loader"></div>
      </div>
    );
  }

  if (!trails || trails.length === 0) {
    return null;
  }

  return (
    <div className="trailmapwrapper">
      <TrailMap
        trails={trails}
        center={center}
        zoom={zoom}
        onPinClick={onPinClick}
      />
    </div>
  );
}

function TrailMapWrapper({ trails, center, zoom = 10, onPinClick }) {
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    fetch("/api/maps-config")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load Google Maps config");
        }

        return response.json();
      })
      .then((data) => {
        setApiKey(data.apiKey);
      })
      .catch((error) => {
        console.error("Error loading Google Maps config:", error);
      });
  }, []);

  if (!apiKey) {
    return (
      <div className="loaderContainer">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <GoogleMapsLoader
      trails={trails}
      center={center}
      zoom={zoom}
      onPinClick={onPinClick}
      apiKey={apiKey}
    />
  );
}

export const TrailMap = ({ trails, center, zoom, onPinClick }) => {
  const newZoom = window.innerWidth <= 600 ? 8.4 : zoom;
  const [currentZoom, setCurrentZoom] = useState(newZoom);
  const [currentCenter, setCurrentCenter] = useState(center);
  const [selectedTrailId, setSelectedTrailId] = useState(null);

  const navigate = useNavigate();

  const animateZoom = useCallback(
    (targetZoom, targetCenter) => {
      const duration = 2000;
      const startZoom = currentZoom;
      const startCenter = currentCenter;
      const startTime = Date.now();

      const zoomStep = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = easeInOut(progress);

        const newZoom = startZoom + (targetZoom - startZoom) * easedProgress;

        const newCenter = {
          lat:
            startCenter.lat +
            (targetCenter.lat - startCenter.lat) * easedProgress,
          lng:
            startCenter.lng +
            (targetCenter.lng - startCenter.lng) * easedProgress,
        };

        setCurrentZoom(newZoom);
        setCurrentCenter(newCenter);

        if (progress < 1) {
          requestAnimationFrame(zoomStep);
        }
      };

      requestAnimationFrame(zoomStep);
    },
    [currentZoom, currentCenter]
  );

  useEffect(() => {
    animateZoom(newZoom, center);
  }, [newZoom, center]);

  const img = {
    url: pin,
    scaledSize:
      window.innerWidth <= 600
        ? new window.google.maps.Size(20, 20)
        : undefined,
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
    onPinClick(null);
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
            <InfoWindow onCloseClick={handleInfoWindowClose}>
              <div id="infoWindow">
                <p
                  id="trailNameHeaderInfoWindow"
                  onClick={() => {
                    navigate(`/trails/${trail?.id}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  {trail?.name}
                </p>

                <p id="infoWindowContent">Difficulty:{trail?.difficulty}</p>

                <p
                  id="infoWindowContentDirections"
                  onClick={() =>
                    handleGetDirections(trail?.latitude, trail?.longitude)
                  }
                >
                  Directions
                </p>
              </div>
            </InfoWindow>
          )}
        </MarkerF>
      ))}
    </GoogleMap>
  );
};

export default TrailMapWrapper;
