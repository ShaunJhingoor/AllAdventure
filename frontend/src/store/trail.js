// import { createSelector } from 'reselect';
import csrfFetch from "./csrf";

export const SET_TRAILS ="trails/setTrails"
export const SET_TRAIL ="trails/setTrail"
// const REMOVE_TRAIL ="trails/REMOVE_TRAIL"

export const trailsArray = (state =>  Object.values(state.trail || {}))

export const selectTrail = (trailId) => (state) => {
  return state?.trail[trailId] || null
}


// const selectTrailState = (state) => state.trail;

// export const trailsArray = createSelector(
//   [selectTrailState],
//   trails =>  Object.values(trails))

// export const selectTrail = (trailId) => (state) => {
//   return state?.trail[trailId] || null
// }
export const setTrails = (data) => ({
    type: SET_TRAILS,
    trails: data.trail,
    reviews: data.review
})

export const setTrail = (data) => ({
    type: SET_TRAIL,
    trail: data.trail,
    reviews: data.review
})


export const Fetchtrails = () => async dispatch => {
    const response = await csrfFetch("/api/trails")
    if(response.ok){
    const data = await response.json();
    dispatch(setTrails(data));
    return response;
    }
  };

export const Fetchtrail = (trailId) => async dispatch => {
    const response = await csrfFetch(`/api/trails/${trailId}`)
    if(response.ok){
    const data = await response.json();
    dispatch(setTrail(data));
    return response;
    }
  };

  function TrailReducer(state={}, action){
    let newState = {...state}
    switch(action.type){
         case SET_TRAILS: 
         newState = { ...newState, ...action.trails }
         Object.values(action.reviews).forEach(review => {
             const trailId = review.trail_id;
             if (newState[trailId]) {
                 newState[trailId].reviews = newState[trailId].reviews || [];
                 newState[trailId].reviews.push(review);
             }
         });
         return newState;
        case SET_TRAIL: 
        newState[action.trail.id] = action.trail;
        Object.values(action.reviews).forEach((review) => {
            const trailId = review.trail_id;
            if (newState[trailId]) {
                newState[trailId].reviews = newState[trailId].reviews || [];
                newState[trailId].reviews.push(review);
            }
        });
        return newState;
        default:
            return state
    }
  }
  export default TrailReducer

