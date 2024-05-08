// import { createSelector } from 'reselect';
import csrfFetch from "./csrf";
import { createSelector } from 'reselect';

export const SET_TRAILS ="trails/setTrails"
export const SET_TRAIL ="trails/setTrail"
export const SET_REVIEW_TRAIL = "trails/setREVIEW"
export const REMOVE_REVIEW = "trails/removeREVIEW"
// export const UPDATE_REVIEW_TRAIL = "trails/REVIEW"
// const REMOVE_TRAIL ="trails/REMOVE_TRAIL"
const selectTrails = state => state.trail;
export const trailsArray = createSelector(
    selectTrails,
    trails => Object.values(trails || {})
  );

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

// const uploadPhotoSuccess = (trailId, photoUrl) => ({
//     type: UPLOAD_PHOTO_SUCCESS,
//     payload: { trailId, photoUrl },
//   });

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
// Two arrors without currly brackets is an immediate return of the new multi line function that needs a return 
// Thunk decides if its a function or action and does what it need to 
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

// export const uploadPhoto = (trailId, photoFile) => async (dispatch) => {
//     try {
    
//         const response = await csrfFetch(`/api/trails/${trailId}/add_photo`, {
//             method: "POST",
//             body: photoFile,
//         });

//         if (!response.ok) {
//             throw new Error('Failed to upload photo');
//         }

//         const data = await response.json();
//         dispatch(uploadPhotoSuccess(trailId, data.photoUrl));
//         dispatch(Fetchtrail(trailId));
//         return response;
//     } catch (error) {
//         console.error("Error uploading photo:", error);
//         throw error; 
//     }
// };

    // export const FetchRange = (start,end) => async dispatch => {
    //     const response = await csrfFetch(`/api/trails/fetch_range?start=${start}&end=${end}`)
    //     if(response.ok){
    //         const data = await response.json()
    //         dispatch(setTrails(data))
    //         return response
    //     }
    // }

  function TrailReducer(state={}, action){
    let newState = {...state}
    
    switch(action.type){
         case SET_TRAILS: 
         newState = { ...action.trails };

  
        Object.keys(newState).forEach(trailId => {
            newState[trailId].reviews = {};
        });

        
        Object.values(action.reviews).forEach(review => {
            const trailId = review.trail_id;
            if (newState[trailId]) {
                newState[trailId].reviews[review.id] = review;
            }
        });
    

         return newState;

        case SET_TRAIL: 
            newState[action.trail.id] = action.trail;
            newState[action.trail.id].reviews = action.reviews || {}
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

