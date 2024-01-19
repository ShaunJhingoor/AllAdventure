// import { useEffect } from "react";
// import { Wrapper } from '@googlemaps/react-wrapper';

// const MyMapComponent = () => {
//   useEffect(() => {
//     const apiKey = process.env.REACT_APP_MAPS_API_KEY

//     if (!apiKey) {
//       console.error("Google Maps API key is missing. Make sure to set REACT_APP_GOOGLE_MAPS_API_KEY in your .env.local file.");
//       return;
//     }

//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
//     script.async = true;
//     script.defer = true;

//     script.onload = () => {
//       console.log("Google Maps API script loaded successfully");
//     };

//     script.onerror = () => {
//       console.error("Failed to load Google Maps API script");
//     };

//     document.head.appendChild(script);

//     window.initMap = () => {
//       console.log("Initializing the map...");
//       const map = new window.google.maps.Map(document.getElementById('map'), {
//         center: { lat: 40.7128, lng: -74.0060 },
//         zoom: 9,
//       });
//     };
//   }, []); 

//   return (
//     <Wrapper apiKey={import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
//       <div id="map" style={{ height: '100%', width: '100%' }}></div>
//     </Wrapper>
//   );
// };

// export default MyMapComponent;






    

