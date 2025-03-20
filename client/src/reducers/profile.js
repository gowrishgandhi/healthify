import {
    PROFILE_ERROR,
    GET_PROFILE,
    CLEAR_PROFILE,
    EDIT_PROFILE,
    ATTACH_PROFILE, SET_DBCALL, RESET_DBCALL, SET_LOADING, RESET_LOADING
  } from '../actions/types';

const initialState = {
    profile: null,
    loading: true,
    getdb: false,
    error: {},    
    alldata: []
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case EDIT_PROFILE:
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case ATTACH_PROFILE:
            return {
                ...state,
                alldata: [...state.alldata, payload],
                loading: false
            };   
        
            case SET_DBCALL:
                return {
                    ...state, getdb: true, loading: true
                };

                case RESET_DBCALL:
                    return {
                        ...state, getdb: false
                    };

                  case SET_LOADING:
                        return {
                            ...state, loading: true
                        };

                case RESET_LOADING:
                    return {
                        ...state, loading: false
                    };
        

    
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: true,
                getdb: false
            };
        
       
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,                
                loading: true,
                getdb: false,                 
                alldata: [],
                error: null,
                     
            };                

        
        default: 
            return state;
    };
};