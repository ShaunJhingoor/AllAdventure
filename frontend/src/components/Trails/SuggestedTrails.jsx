import { useSelector } from "react-redux";
import { trailsArray, FetchRange } from "../../store/trail";
import { useDispatch } from "react-redux";
import SuggestedTrailsItem from "./SuggestedTrailsItem";
import { useEffect, useState } from "react";
import "./SuggestedTrails.css";


function SuggestedTrail({trailId}) {
  const trails = useSelector(trailsArray);
  const dispatch = useDispatch();
  const [loading, setLoadingLocal] = useState(true);

  // useEffect(() => {
  //   setLoadingLocal(true)
  //   if(trailId <= 16){
  //     dispatch(FetchRange(Number(trailId), Number(trailId) + 3))
  //     .then(() => {
  //       setLoadingLocal(false);
  //     });
  //   }else if(trailId > 16 && trailId != 20){
  //     dispatch(FetchRange(Number(trailId) - 3, Number(trailId)))
  //       .then(() => {
  //         setLoadingLocal(false);
  //       });
  //     }else{
  //       dispatch(FetchRange(Number(trailId) - 4, Number(trailId)))
  //       .then(() => {
  //         setLoadingLocal(false);
  //       })
  //     }
  // }, [dispatch, trailId]);

  useEffect(() => {
    setLoadingLocal(true);
    let start = Number(trailId);
    let end = 0
    if(Number(trailId) == 1){
      start = Number(trailId) + 2
      end = start + 2
    }
    else if (Number(trailId) <= 17) {
      end = start + 2
    }else if(Number(trailId) > 17 && Number(trailId) != 20){
      start = Number(trailId) - 2
      end = Number(trailId) 
    }else{
      start = Number(trailId) - 3
      end = Number(trailId) 
    }
    
    // console.log(`start: ${start}, end:${end}`)
    dispatch(FetchRange(start, end))
      .then(() => {
        setLoadingLocal(false);
      });
  }, [dispatch, trailId]);

  if (loading) {
    return(
       <div id="suggestedTrailsLoading">
        <div className="loader1"></div>
       </div>
       )
  }

  return (
    <div id="suggestedTrailsWrapper">
      {
        trails?.filter(trail => trail?.id != trailId).map((trail, index) => (
          <SuggestedTrailsItem key={`${trail?.id}_${index}`} trail={trail}  />
        ))

      }
      
    </div>
  );
}

export default SuggestedTrail;








