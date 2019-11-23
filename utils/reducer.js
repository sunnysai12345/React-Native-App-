import { combineReducers } from 'redux';
import {AsyncStorage} from "react-native";


const wholeState = (state = {
    show:false,
    token: '',
    loading: true,
    error: null,
    currentLocation:{},
}, action) => {
    switch (action.type) {
        case 'LOAD_HOME':
            console.log("reducer");
            return { ...state, show: true};
        case 'GET_TOKEN':
            return { ...state, token: action.token };
        case 'SAVE_TOKEN':
            if(action.token) {
                console.log(action.token);
                AsyncStorage.setItem('token', action.token);
            }
            return { ...state, token: action.token || state.token};
        case 'REMOVE_TOKEN':
            return { ...state, token: action.token };
        case 'LOADING':
            return { ...state, loading: action.isLoading };
        case 'ERROR':
            return { ...state, error: action.error };
        case 'GET_CURRENT_LOCATION':
            console.log("reducer location",action.currentLocation);
            return { ...state, currentLocation: action.currentLocation};
        default:
            return state;
    }
};

export default combineReducers({
    wholeState: wholeState,
});




