import { useDispatch, useSelector } from "react-redux";
import { Fetchtrails } from "../../store/trail";
import { useState } from "react";
import TrailsIndexItem from "./TrailsIndexItem";
import { trailsArray } from "../../store/trail";
import "./RealTrailsIndex.css";
import { useEffect } from "react";
import  TrailMapWrapper from "../maps/Trailmaps"
import SmallSearchBar from "../search/smallsearchbar";
import Footer from "../footer/Footer";



function RealTrailsIndex() {
  const trails = useSelector(trailsArray);
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [center, setCenter] = useState({lat: 40.793422531206886, lng:-73.6636916745758})
  // 40.79075537001656, -73.67191185324212
  // 40.793422531206886, -73.6636916745758
  // 40.80942324832731, -73.64255407229098
  const [zoom, setZoom] = useState(10)
  const [loading, setLoading] = useState(true)

  
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    
  };

  // Fetch trails on component mount
  useEffect(() => {
    dispatch(Fetchtrails())
    .then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  // const handleMouseOver =(e) => {

  // }

  const handlePinClick = (trailId) => {
    const trailElement = document.getElementById(`trail-${trailId}`);
    if (trailElement) {
      const rect = trailElement.getBoundingClientRect();
      const sidebarElement = document.getElementById("sidebar");
      
      if (sidebarElement) {
        let targetScrollTop;
        // Calculate the target scroll position based on sidebar and viewport dimensions
        const sidebarRect = sidebarElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        // const sidebarHeight = sidebarRect.height;
        const trailTopOffset = rect.top - sidebarRect.top;
  
        // Adjust the target scroll position based on screen size and trail position
        targetScrollTop = sidebarElement.scrollTop + trailTopOffset - (viewportHeight / 2) + (rect.height / 2);
  
        // Scroll the sidebar to the target position
        sidebarElement.scrollTo({
          top: targetScrollTop,
          behavior: "smooth",
        });
  
        // Check if the sidebar is not fully visible in the viewport
        if (sidebarRect.top < 0 || sidebarRect.bottom > viewportHeight) {
          // Scroll the window to bring the sidebar into view
          window.scrollTo({
            top: sidebarElement.offsetTop,
            behavior: "smooth",
          });
        }
      }
    }
  };
  
  
  
  if(loading){
    return(
      <div className="loaderContainer">
      <div className="loader"></div>
      </div>
    )
  }

  return (
    <div>
      
      <div id="realTrailIndexHeader">
        <SmallSearchBar/>
      </div>
      <br />
      <div id="realindexWrapper" className={isSidebarOpen ? "sidebaropen" : "sidebarclose"}>
    
        <div id="sidebar" className={isSidebarOpen ? "open" : ""}>
       
          <div id="sidebarHeader"> 
            <h1>New York Best Trails</h1>
          </div>
        
          <div id="trails">
      
            {trails.map((trail) => (
              <TrailsIndexItem key={trail.id} trail={trail}  setCenter ={setCenter}  setZoom={setZoom} onPinClick={handlePinClick}
              />
              
           
            ))}
          </div>
         
         
         
          
        </div>

        
          
            
        <div id="openSideBar" onClick={toggleSidebar}>
        
          <p id="textsidebaropener">{isSidebarOpen ? "<" : ">"}</p>
        </div>
       
        <TrailMapWrapper key={"why"} trails={trails} center ={center} zoom={zoom} onPinClick={handlePinClick}/>
        

      </div>

     <Footer/>
      
    </div>
  );
}

export default RealTrailsIndex;


