import { useDispatch, useSelector } from "react-redux";
import { Fetchtrails } from "../../store/trail";
import { useEffect, useState } from "react";
import TrailsIndexItem from "./TrailsIndexItem";
import { trailsArray } from "../../store/trail";
import "./RealTrailsIndex.css";

function RealTrailsIndex() {
  const trails = useSelector(trailsArray);
  const dispatch = useDispatch();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    dispatch(Fetchtrails());
  }, [dispatch]);

  return (
    <div>
     <div id="realTrailIndexHeader"></div>
      <div id="realindexWrapper" className={isSidebarOpen ? "sidebaropen" : ""}>
        <ul id="openBtn" onClick={toggleSidebar}>
           
          &#9776; 
        </ul>
      
        <div id="sidebar" className={isSidebarOpen ? "open" : ""}>
            <div id="sidebarHeader"> 
                <h1>New York Best Trails</h1>
            </div>
          <ul>
            {trails.map((trail) => (
              <TrailsIndexItem key={trail.id} trail={trail} />
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default RealTrailsIndex;
