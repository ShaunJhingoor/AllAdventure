import csrfFetch from "./csrf";

export const SET_REVIEWS ="reviews/setREVIEWS"
export const SET_REVIEW = "reviews/setREVIEW"
export const REMOVE_REVIEW = "reviews/removeREVIEW"

export const reviewsArray = (state =>  Object.values(state?.review || {}))

export const selectReview = (reviewId) => (state) => {
    return state?.review[reviewId] || null
  }

  export const setREVIEWS = (reviews) => ({
    type: SET_REVIEWS,
    reviews
})

export const setREVIEW = (review) => ({
    type: SET_REVIEW,
    review
})

export const removeREVIEW = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
})

export const Fetchreviews = (trailId) => async dispatch => {
    const response = await csrfFetch(`/api/trails/${trailId}/reviews`)
    if(response.ok){
    const reviews = await response.json();
    dispatch(setREVIEWS(reviews));
    return response;
    }
  };

export const createReview = (review) => async dispatch => {
    const res  = await csrfFetch(`api/trails/${review.trailId}/reviews`, {
        method: "POST", 
        body: JSON.stringify(review), 
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(res.ok){
        const review = await res.json()
        dispatch(setREVIEW(review))
        return res
    }
}

export const updateReview = (review) => async dispatch => {
    const res  = await csrfFetch(`api/trails/${review.trailId}/reviews/${review.id}`, {
        method: "PUT", 
        body: JSON.stringify(review), 
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(res.ok){
        const review = await res.json()
        dispatch(setREVIEW(review))
    }
}

export const deleteReview = (review) => async dispatch => {
    const res = await csrfFetch(`api/trails/${review.trailId}/reviews/${review.id}`, {
        method: "DELETE"
    })
    if(res.ok){
        dispatch(removeREVIEW(review.id))
    }
}

function reviewReducer(state={}, action){
    let newState = {...state}
    switch(action.type){
         case SET_REVIEWS: 
            return {...newState, ...action.reviews}
        case SET_REVIEW: 
            newState[action.review.review.id] = action.review.review
            return newState
        case REMOVE_REVIEW: 
            delete newState[action.reviewId]
                return newState
        default:
            return state
    }
  }
  
  export default reviewReducer