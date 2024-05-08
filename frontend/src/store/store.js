import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import sessionReducer from './session';
import TrailReducer from './trail';
// import reviewReducer from './review';
import modalsReducer from './modal';
import searchReducer from './search';
import favoriteReducer from './favorite';
import TrailPhotosReducer from './trail_photos';

const rootReducer = combineReducers({
    session: sessionReducer,
    trail: TrailReducer,
    modals: modalsReducer,
    search: searchReducer,
    favorite: favoriteReducer,
    trailPhotos: TrailPhotosReducer
});

let enhancer;
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState = {}) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;