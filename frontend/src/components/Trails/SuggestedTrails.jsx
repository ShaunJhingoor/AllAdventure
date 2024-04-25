import { useSelector } from "react-redux";
import { trailsArray, Fetchtrails } from "../../store/trail";
import { useDispatch } from "react-redux";
import SuggestedTrailsItem from "./SuggestedTrailsItem";
import { useEffect } from "react";
import "./TrailsIndex.css";
import { useState } from "react";

function SuggestedTrail({ trailId }) {
  const trails = useSelector(trailsArray);
  const dispatch = useDispatch();
  const [randomTrails, setRandomTrails] = useState([]);

  useEffect(() => {
    dispatch(Fetchtrails());
  }, [dispatch]);

  useEffect(() => {
    const shuffledTrails = shuffle(trails);
    setRandomTrails(shuffledTrails);
  }, [trails]);

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  return (
    <div id="trailindexwrapper">
      {randomTrails.filter((trail) => trail?.id != trailId).slice(0, 4).map((trail, index) => (
        <SuggestedTrailsItem key={`${trail?.id}_${index}`} trail={trail} />
      ))}
    </div>
  );
}

export default SuggestedTrail;
