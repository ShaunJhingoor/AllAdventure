import { useSelector } from "react-redux";
import { trailsArray, Fetchtrails } from "../../store/trail";
import { useDispatch } from "react-redux";
import SuggestedTrailsItem from "./SuggestedTrailsItem";
import { useEffect, useState } from "react";
import "./TrailsIndex.css";

function SuggestedTrail({ num1, num2 }) {
  const trails = useSelector(trailsArray);
  const dispatch = useDispatch();
  const [loading, setLoadingLocal] = useState(true);

  useEffect(() => {
    dispatch(Fetchtrails())
      .then(() => {
        setLoadingLocal(false);
      });
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="trailindexwrapper">
      {num1 < num2 ? (
        trails?.slice(num1, num2)?.map((trail, index) => (
          <SuggestedTrailsItem key={index} trail={trail}  />
        ))
      ) : (
        trails?.slice(num2 - 2, num1 - 2)?.map((trail, index) => (
          <SuggestedTrailsItem key={index} trail={trail}  />
        ))
      )}
    </div>
  );
}

export default SuggestedTrail;








