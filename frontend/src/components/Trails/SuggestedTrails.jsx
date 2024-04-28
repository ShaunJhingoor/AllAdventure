import { useSelector } from "react-redux";
import { trailsArray, Fetchtrails } from "../../store/trail";
import { useDispatch } from "react-redux";
import SuggestedTrailsItem from "./SuggestedTrailsItem";
import { useEffect, useState } from "react";
import "./TrailsIndex.css";

function SuggestedTrail({ trailId }) {
  const trails = useSelector(trailsArray);
  const dispatch = useDispatch();
  const [randomTrails, setRandomTrails] = useState([]);

  useEffect(() => {
    dispatch(Fetchtrails());
  }, [dispatch]);

  useEffect(() => {
    if (trails.length > 0) {
     
      const filteredTrails = trails.filter((trail) => trail.id !== trailId);


      const shuffledTrails = shuffleArray(filteredTrails);

      
      const selectedTrails = shuffledTrails.slice(0, 4);

      setRandomTrails(selectedTrails);
    }
  }, [trails, trailId]);

  
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  if (randomTrails.length === 0) {
    return null;
  }
  return (
    <div id="trailindexwrapper">
      {randomTrails.map((trail, index) => (
        <SuggestedTrailsItem key={`${trail.id}_${index}`} trail={trail} />
      ))}
    </div>
  );
}

export default SuggestedTrail;

