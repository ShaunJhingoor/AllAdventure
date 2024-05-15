import csrfFetch from "./csrf";
import { createSelector } from "reselect";


export const REVIEVE_SEARCH_TRAILS = 'search/REVIEVE_SEARCH_TRAILS'
export const CLEAR_SEARCH_TRAILS = 'search/CLEAR_SEARCH_TRAILS'

const selectSearchResults = (state =>  state?.search)
export const ArraySearch = createSelector(
    selectSearchResults,
    searchResults => Object.values(searchResults|| {})
  );

export const receiveSearchTrails = (data) => ({
    type: REVIEVE_SEARCH_TRAILS,
    trails: data.trail, 
    reviews: data.review
})

export const clearSearchTrails = () => ({
    type: CLEAR_SEARCH_TRAILS
})

export const fetchSearch = (searchValue) => async (dispatch) => {
    const res = await csrfFetch(`/api/trails/search?query=${searchValue}`)
    
    if(res.ok){
        const trails = await res.json()
        
        dispatch(receiveSearchTrails(trails))
        return trails
    }
}

const searchReducer = (state ={}, action) => {
    let newState = {...state}
    switch (action.type){
        case REVIEVE_SEARCH_TRAILS:
            newState = { ...action.trails };

  
        Object.keys(newState).forEach(trailId => {
            newState[trailId].reviews = {};
        });

        
        Object.values(action.reviews || {}).forEach(review => {
            const trailId = review.trail_id;
            if (newState[trailId]) {
                newState[trailId].reviews[review.id] = review;
            }
        });
    

         return newState;
        case CLEAR_SEARCH_TRAILS:
            return {}
        default: 
            return state
    }
}

export default searchReducer
