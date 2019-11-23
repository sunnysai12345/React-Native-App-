/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Linking} from 'react-native';

import AppNavigator from '../components/Navigator';

import { createStore } from 'redux';
import wholeState from '../utils/reducer';

import {loadHome} from "../utils/action";

import {connect, Provider} from 'react-redux';

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android:
		'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu',
});

type Props = {};

const store = createStore(wholeState);

//console.log(store.getState());
//const BASE_URL = "https://api.unsplash.com/photos";

class App extends Component<Props> {

    render() {
        return (
            <Provider store ={store}>
                <AppNavigator/>
            </Provider>
        );
        /*return (
            <Provider store ={store}>
                {this.state.authorized ? <HomeScreen/> : <LoginScreen/>}
            </Provider>
        );*/
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'stretch',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

export default App;

