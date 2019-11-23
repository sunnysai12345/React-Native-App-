import React, { Component } from 'react';
import {AppRegistry, Image, StyleSheet, Text, View} from "react-native";

import Video from "react-native-gifted-chat/node_modules/react-native-video";
import FilePickerManager from 'react-native-file-picker';

//FilePickerManager

export default class VideoScreen extends Component {

	constructor(props) {
		super(props);

		this.state = {
			file: {},
		}
	}

	render() {
		console.log("Video screen");
		FilePickerManager.showFilePicker(null, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled file picker');
			}
			else if (response.error) {
				console.log('FilePickerManager Error: ', response.error);
			}
			else {
				this.setState({
					file: response
				});
			}
		});
		return (
			<View style ={{flex:1}}>
				<Video source={{ uri: this.state.file.uri}}
				       resizeMode="cover"
				       style={styles.backgroundVideo}
				       />
			</View>

		);
	}
}

var styles = StyleSheet.create({
	backgroundVideo: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
});
