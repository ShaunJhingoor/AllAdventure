import csrfFetch from './csrf.js';
const ADD_FAVORITE = 'favorites/addFavorite';
const REMOVE_FAVORITE = 'favorites/removeFavorite';
const FETCH_ALL_FAVORITES = 'favorites/fetchAllFavorites';

const addFavorite = (favorite) => ({
  type: ADD_FAVORITE,
  payload: favorite,
});

const removeFavorite = (favoriteId) => ({
  type: REMOVE_FAVORITE,
  payload: favoriteId,
});

const fetchAllFavoritesSuccess = (favorites) => ({
    type: FETCH_ALL_FAVORITES,
    payload: favorites,
  });

export const fetchAllFavorites = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/favorites`);
    if (response.ok) {
      const data = await response.json();
      dispatch(fetchAllFavoritesSuccess(data));
    }
  };

export const addToFavorites = (trailId) => async (dispatch) => {
    const response = await csrfFetch(`/api/trails/${trailId}/favorites`, {
      method: "POST",
      body: JSON.stringify({ trailId }),
    });
    if (response.ok) {
      const data = await response.json();
      const favorite = {
        id: data.favorite.id,
        trail: data.favorite.trail,
      };
      dispatch(addFavorite(favorite));
    }
}

// Thunk action to remove a favorite
export const removeFromFavorites = (trailId, favoriteId) => async (dispatch) => {
    const response = await csrfFetch(`/api/trails/${trailId}/favorites/${favoriteId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(removeFavorite(favoriteId));
    } 
};

const initialState = {};

function favoriteReducer(state = initialState, action) {
let newState = { ...state };
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case REMOVE_FAVORITE:
      delete newState[action.payload];
      return newState;
    case FETCH_ALL_FAVORITES:
      return {...action.payload}
    default:
      return state;
  }
}

export default favoriteReducer;
