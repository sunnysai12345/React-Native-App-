import {AsyncStorage} from 'react-native';

export const loadHome = () => ({
    type:'LOAD_HOME'
});

export const getToken = (token) => ({
    type: 'GET_TOKEN',
    token,
});

export const saveToken = token => ({
    type: 'SAVE_TOKEN',
    token
});

export const removeToken = () => ({
    type: 'REMOVE_TOKEN',
});

export const loading = bool => ({
    type: 'LOADING',
    isLoading: bool,
});

export const error = error => ({
    type: 'ERROR',
    error,
});

export const  getCurrentLocation = (currentLocation) => ({
        type: 'GET_CURRENT_LOCATION',
        currentLocation,
    }
);