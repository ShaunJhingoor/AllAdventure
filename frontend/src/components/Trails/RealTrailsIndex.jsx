import { useDispatch, useSelector } from "react-redux";
import { Fetchtrails } from "../../store/trail";
import { useState } from "react";
import TrailsIndexItem from "./TrailsIndexItem";
import { trailsArray } from "../../store/trail";
import "./RealTrailsIndex.css";
// import MyMapComponent from "../maps/Trailmaps";
import { useEffect } from "react";

function RealTrailsIndex() {
  const trails = useSelector(trailsArray);
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch trails on component mount
  useEffect(() => {
    dispatch(Fetchtrails());
  }, [dispatch]);

  return (
    <div>
      
      <div id="realTrailIndexHeader"></div>
      <div id="realindexWrapper" className={isSidebarOpen ? "sidebaropen" : "sidebarclose"}>
        <div id="sidebar" className={isSidebarOpen ? "open" : ""}>
          <div id="sidebarHeader"> 
            <h1>New York Best Trails</h1>
          </div>
          <div>
            {trails.map((trail) => (
              <TrailsIndexItem key={trail.id} trail={trail} />
            ))}
          </div>
        </div>
        <div id="openSideBar" onClick={toggleSidebar}>
          <p id="textsidebaropener">{isSidebarOpen ? "<" : ">"}</p>
        </div>
      </div>
      <div id="realTrailIndexFooter"></div>

      {/* <MyMapComponent /> */}
    </div>
  );
}

export default RealTrailsIndex;


