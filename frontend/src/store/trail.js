// import { createSelector } from 'reselect';
import csrfFetch from "./csrf";

export const SET_TRAILS ="trails/setTrails"
export const SET_TRAIL ="trails/setTrail"
// const REMOVE_TRAIL ="trails/REMOVE_TRAIL"

export const trailsArray = (state =>  Object.values(state.trail || {}))

export const selectTrail = (trailId) => (state) => {
  return state?.trail[trailId] || null
}

export const setTrails = (trails) => ({
    type: SET_TRAILS,
    trails
})

export const setTrail = (trail) => ({
    type: SET_TRAIL,
    trail
})


export const Fetchtrails = () => async dispatch => {
    const response = await csrfFetch("/api/trails")
    if(response.ok){
    const trails = await response.json();
    dispatch(setTrails(trails));
    return response;
    }
  };

export const Fetchtrail = (trailId) => async dispatch => {
    const response = await csrfFetch(`/api/trails/${trailId}`)
    if(response.ok){
    const trail = await response.json();
    dispatch(setTrail(trail));
    return response;
    }
  };

  function TrailReducer(state={}, action){
    let newState = {...state}
    switch(action.type){
         case SET_TRAILS: 
            return {...newState, ...action.trails}
        case SET_TRAIL: 
        // debugger
            newState[action.trail.trail.id] = action.trail.trail
            return newState
        default:
            return state
    }
  }
  export default TrailReducer

