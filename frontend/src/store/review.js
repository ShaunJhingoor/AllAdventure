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

export const Fetchreviews = () => async dispatch => {
    const response = await csrfFetch(`/api/reviews`)
    if(response.ok){
        
    const reviews = await response.json();
    dispatch(setREVIEWS(reviews));
    return response;
    }
  };

export const createReview = (newReview) => async dispatch => {
    const res  = await csrfFetch(`api/reviews`, {
        method: "POST", 
        body: JSON.stringify(newReview), 
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

export const updateReview = (updatedReview) => async dispatch => {
    const res  = await csrfFetch(`api/reviews/${updatedReview.id}`, {
        method: "PUT", 
        body: JSON.stringify(updatedReview), 
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(res.ok){
        const review = await res.json()
        dispatch(setREVIEW(review))
    }
}

export const deleteReview = (reviewId) => async dispatch => {
    const res = await csrfFetch(`api/reviews/${reviewId}`, {
        method: "DELETE"
    })
    if(res.ok){
        dispatch(removeREVIEW(reviewId))
    }
}

function reviewReducer(state={}, action){
    let newState = {...state}
    switch(action.type){
         case SET_REVIEWS: 
            return {...newState, ...action.reviews}
        case SET_REVIEW: 
            newState[action.review.id] = action.review
            return newState
        case REMOVE_REVIEW: 
            delete newState[action.reviewId]
                return newState
        default:
            return state
    }
  }
  
  export default reviewReducer