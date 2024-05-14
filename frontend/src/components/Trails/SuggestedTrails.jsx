import { useSelector } from "react-redux";
import { trailsArray, FetchRange } from "../../store/trail";
import { useDispatch } from "react-redux";
import SuggestedTrailsItem from "./SuggestedTrailsItem";
import { useEffect, useState } from "react";
import "./TrailsIndex.css";
// import Loadings from "../../images/loading.gif"

function SuggestedTrail({trailId}) {
  const trails = useSelector(trailsArray);
  const dispatch = useDispatch();
  const [loading, setLoadingLocal] = useState(true);

  useEffect(() => {
    setLoadingLocal(true)
    if(trailId <= 16){
      dispatch(FetchRange(Number(trailId), Number(trailId) + 3))
      .then(() => {
        setLoadingLocal(false);
      });
    }else if(trailId > 16 && trailId != 20){
      dispatch(FetchRange(Number(trailId) - 3, Number(trailId)))
        .then(() => {
          setLoadingLocal(false);
        });
      }else{
        dispatch(FetchRange(Number(trailId) - 4, Number(trailId)))
        .then(() => {
          setLoadingLocal(false);
        })
      }
  }, [dispatch, trailId]);

  if (loading) {
    return(
       <div id="suggestedTrailsLoading">
        <div className="loader1"></div>
       </div>
       )
  }

  return (
    <div id="trailindexwrapper">
      {
        trails?.filter(trail => trail?.id != trailId).map((trail, index) => (
          <SuggestedTrailsItem key={`${trail?.id}_${index}`} trail={trail}  />
        ))

      }
      
    </div>
  );
}

export default SuggestedTrail;








