// import { createSelector } from 'reselect';
import csrfFetch from "./csrf";

export const SET_TRAILS ="trails/setTrails"
export const SET_TRAIL ="trails/setTrail"
export const SET_REVIEW_TRAIL = "trails/setREVIEW"
export const REMOVE_REVIEW = "trails/removeREVIEW"
// export const UPDATE_REVIEW_TRAIL = "trails/REVIEW"
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


export const setREVIEWTRAIL = (data) => ({
    type: SET_REVIEW_TRAIL,
    review: data.review,
    trail: data.trail
})
export const removeREVIEW = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
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

  export const createReview = (newReview) => async dispatch => {
    const res  = await csrfFetch(`/api/reviews`, {
        method: "POST", 
        body: JSON.stringify(newReview), 
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(res.ok){
        const {review} = await res.json()
        dispatch(setREVIEWTRAIL(review))
        return res
    }
}

export const updateReviews = (updatedReview) => async dispatch => {
    const res  = await csrfFetch(`/api/reviews/${updatedReview.id}`, {
        method: "PUT", 
        body: JSON.stringify({review: updatedReview}), 
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(res.ok){
        const review = await res.json()
        dispatch(setREVIEWTRAIL(review))
        return res
    }
}

export const deleteReview = (reviewId) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })
    if(res.ok){
        dispatch(removeREVIEW(reviewId))
    }
}

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
        case SET_REVIEW_TRAIL:
            if(action?.trail?.id && newState[action?.trail?.id]){
                newState[action.trail?.id]?.reviews.push(action?.review);
                return { ...newState };
            }else{
                return state
            }
        case REMOVE_REVIEW: 
            delete newState[action.reviewId]
                return newState
        default:
            return state
    }
  }
  export default TrailReducer

