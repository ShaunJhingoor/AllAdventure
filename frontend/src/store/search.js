import csrfFetch from "./csrf";
import { createSelector } from "reselect";


export const REVIEVE_SEARCH_TRAILS = 'search/REVIEVE_SEARCH_TRAILS'
export const CLEAR_SEARCH_TRAILS = 'search/CLEAR_SEARCH_TRAILS'

const selectSearchResults = (state =>  state?.search?.search)
export const ArraySearch = createSelector(
    selectSearchResults,
    searchResults => Object.values(searchResults|| {})
  );

export const receiveSearchTrails = (trails) => ({
    type: REVIEVE_SEARCH_TRAILS,
    trails
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
    switch (action.type){
        case REVIEVE_SEARCH_TRAILS:
            return  {...action.trails}
        case CLEAR_SEARCH_TRAILS:
            return {}
        default: 
            return state
    }
}

export default searchReducer
