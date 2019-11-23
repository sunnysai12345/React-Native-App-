import {toJson} from 'unsplash-js/native';
import Unsplash from 'unsplash-js/native';
import {AUTHCONFIG,PERMISSIONS,BASE_API} from "../config/Config";
import {AsyncStorage} from 'react-native';
import {Linking} from "react-native";
import * as actions from "./action";

console.log(AUTHCONFIG);
const unsplash = new Unsplash(AUTHCONFIG);

export function loadUser() {
    return unsplash.currentUser.profile()
        .then(toJson)
        .then(json => {
            return json;
        });
};

export function getBearerToken() {
    console.log(unsplash._bearerToken);
    return unsplash._bearerToken;
}

export function setAccessToken(accessToken) {
    console.log("set access token", accessToken);
    unsplash.auth.setBearerToken(accessToken);
}

export function fetchAccessToken(code) {
    return  unsplash.auth.userAuthentication(code)
        .then(toJson)
        .then(json => {
            if(json.access_token) {
                console.log(json);
                _storeData(accessToken);
                setAccessToken(json.access_token);
            }
        }).catch((err) => console.error('An error occurred', err));;
}

export function fetchPhoto(photo) {
    return unsplash.photos.downloadPhoto(photo);
}

export function getPhoto(keyword) {
    return unsplash.search.photos(keyword, 1, 1)
                .then(toJson)
                .then(json => {
                    console.log(json.results[0]);
                    return json.results[0];
                });
}

export function handleAuthentication() {
    const authenticationUrl = unsplash.auth.getAuthenticationUrl(PERMISSIONS);
    return Linking.openURL(authenticationUrl).catch((err) => console.error('An error occurred', err));
}

export function fetchRandomImage() {
    return unsplash.photos.getRandomPhoto()
        .then(toJson);
}


export async function _storeData(accessToken) {
    console.log("store data",accessToken);
    try {
        await AsyncStorage.setItem('accessToken',accessToken);
    } catch (error) {
        // Error saving data
    }
};

export async function _retrieveData() {
    try {
        const value = await AsyncStorage.getItem('accessToken');
        return value;
    } catch (error) {
        // Error retrieving data
    }
};





