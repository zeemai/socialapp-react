import {
    SET_SCREAMS,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    LOADING_DATA,
    DELETE_SCREAM,
    POST_SCREAM,
    SET_SCREAM,
    SUBMIT_COMMENT,
    LOADING_UI
  } from '../types';

  const initialState = {
    screams: [],
    scream: {},
    loading: false
  };

  export default function(state = initialState, action) {
      switch(action.type){
            case LOADING_DATA:
              return {
                  ...state,
                  loading: true
              }
            case SET_SCREAMS:
                return {
                    ...state,
                    screams: action.payload,
                    loading: false
                }
            case LIKE_SCREAM:
            case UNLIKE_SCREAM:
                let index = state.screams.findIndex( scream => scream.screamId === action.payload.screamId )
                state.screams[index] = action.payload;
                return {
                    ...state
                }
            case DELETE_SCREAM:
                let indexDelete = state.screams.findIndex(
                    (scream) => scream.screamId === action.payload
                );
                state.screams.splice(indexDelete, 1);
                return {
                    ...state
                };
            default:
                return state;
      }
  }