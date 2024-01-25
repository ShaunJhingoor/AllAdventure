import { useDispatch, useSelector } from "react-redux";
import { Fetchtrails } from "../../store/trail";
import { useState } from "react";
import TrailsIndexItem from "./TrailsIndexItem";
import { trailsArray } from "../../store/trail";
import "./RealTrailsIndex.css";
import { useEffect } from "react";
import  TrailMapWrapper from "../maps/Trailmaps"
import SmallSearchBar from "../search/smallsearchbar";

function RealTrailsIndex() {
  const trails = useSelector(trailsArray);
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [center, setCenter] = useState({lat:  40.7299341, lng: -74.013928})
  const [zoom, setZoom] = useState(8)
  console.log(center)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch trails on component mount
  useEffect(() => {
    dispatch(Fetchtrails());
  }, [dispatch]);

  // const handleMouseOver =(e) => {

  // }

  return (
    <div>
      
      <div id="realTrailIndexHeader">
        <SmallSearchBar/>
      </div>
      
      <div id="realindexWrapper" className={isSidebarOpen ? "sidebaropen" : "sidebarclose"}>
    
        <div id="sidebar" className={isSidebarOpen ? "open" : ""}>
       
          <div id="sidebarHeader"> 
            <h1>New York Best Trails</h1>
          </div>
        
          <div>
      
            {trails.map((trail) => (
              <TrailsIndexItem key={trail.id} trail={trail}  setCenter ={setCenter}  setZoom={setZoom}
              />
              
           
            ))}
          </div>
         
         
         
          
        </div>

        
          
            
        <div id="openSideBar" onClick={toggleSidebar}>
        
          <p id="textsidebaropener">{isSidebarOpen ? "<" : ">"}</p>
        </div>
       
        <TrailMapWrapper key={"why"} trails={trails} center ={center} zoom={zoom} />
        

      </div>

      <div 
      id="realTrailIndexFooter">
      </div>
      
    </div>
  );
}

export default RealTrailsIndex;


