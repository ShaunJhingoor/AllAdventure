import csrfFetch from "./csrf";
import { createSelector } from 'reselect';

    const selectTrailPhotos = state => state?.trailPhotos?.trail_photos;

    export const trailPhotosArray = createSelector(
    selectTrailPhotos,
    trailPhotos => Object.values(trailPhotos || {})
    );

    export const SET_TRAILS_PHOTOS = "trails/setTrailsPhotos"
    export const ADD_TRAIL_PHOTO = "trails/addTrailPhoto";
    export const REMOVE_TRAIL_PHOTO = "trails/removeTrailPhoto";

    export const setTrailsPhotos = (data) => ({
        type: SET_TRAILS_PHOTOS, 
        photo: data
    })

    export const addTrailPhoto = (photo) => ({
        type: ADD_TRAIL_PHOTO,
        photo: photo
    });

    export const removeTrailPhoto = (photoId) => ({
        type: REMOVE_TRAIL_PHOTO,
        photoId: photoId
    });



    export const fetchTrailPhotos = () => async dispatch => {
        const response = await csrfFetch(" /api/trail_photos")

        if(response.ok){
            const data = await response.json() 
            dispatch(setTrailsPhotos(data))
            return response
        }
    }


export const createTrailPhoto = (trailId, photoFile) => async dispatch => {
    
    const formData = new FormData();
    
    formData.append(`image`, photoFile);

    

    const response = await csrfFetch(`/api/trails/${trailId}/trail_photos`, {
        method: 'POST',
        body: formData,
    });
    
    if (response.ok) {
        const {data} = await response.json();
        dispatch(addTrailPhoto(data));
        dispatch(fetchTrailPhotos())
        return response;
    }
};




    export const deleteTrailPhoto = (trailPhotoId) => async dispatch => {
        const response = await csrfFetch(`/api/trail_photos/${trailPhotoId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            dispatch(removeTrailPhoto(trailPhotoId));
            return response;
        }
    }

    function TrailPhotosReducer(state = {}, action){
        let newState ={...state}

        switch(action.type){
            case SET_TRAILS_PHOTOS: 
                return {...state, ...action.photo}
            case ADD_TRAIL_PHOTO: 
                return { ...state,...action.photo };
            case REMOVE_TRAIL_PHOTO: 
                delete newState[action.photoId]
                return newState
            default: 
                return state
        }
    }
export default TrailPhotosReducer