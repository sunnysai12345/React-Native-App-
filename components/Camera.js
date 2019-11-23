import React,{Component} from 'react';
import { Dimensions, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CaptureButton from "./CaptureButton";

export default class Camera extends Component {

	constructor(props){
		super(props);

		this.state = {
			identifedAs: '',
			loading: false
		}
	}

	takePicture = async function() {
		console.log(this.camera);
		if (this.camera) {
			// Pause the camera's preview
			//this.camera.pausePreview();
			// Set the activity indicator
			this.setState((previousState, props) => ({
				loading: true
			}));
			// Set options
			const options = {
				base64: true,

			};
			// Get the base64 version of the image
			const data = await this.camera.takePictureAsync(options);
			// Get the identified image
			console.log(data);
			this.identifyImage(data.base64);
		}
	}

	identifyImage(imageData){
		// Initialise Clarifai api
		const Clarifai = require('clarifai');
		const app = new Clarifai.App({
			apiKey: '7cb6f68fe4274d3386035faf9dde63d8'
		});
		// Identify the image
		app.models.predict(Clarifai.GENERAL_MODEL, {base64: imageData})
			.then((response) => this.displayAnswer(response.outputs[0].data.concepts[0].name)
				.catch((err) => alert(err))
			);
	}

	displayAnswer(identifiedImage){
		// Dismiss the acitivty indicator
		console.log(identifiedImage);
		this.setState((prevState, props) => ({
			identifedAs:identifiedImage,
			loading:false
		}));
		// Show an alert with the answer on
		Alert.alert(
			"Identified as",
			this.state.identifedAs,
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{text: 'OK', onPress: () => console.log('OK Pressed')},
			],
		{ cancelable: false }
		);
		// Resume the preview
		this.camera.resumePreview();
	}

	render() {
		return(
			<RNCamera ref={ ref => {this.camera = ref;}}
			          style={styles.preview}
			          androidCameraPermissionOptions={{
								title: 'Permission to use camera',
								message: 'We need your permission to use your camera',
								buttonPositive: 'Ok',
								buttonNegative: 'Cancel',
							}}
			          androidRecordAudioPermissionOptions={{
				          title: 'Permission to use audio recording',
				          message: 'We need your permission to use your audio',
				          buttonPositive: 'Ok',
				          buttonNegative: 'Cancel',
			          }} >
				<ActivityIndicator size="large" style={styles.loadingIndicator} color="#fff" animating={this.state.loading}/>
				<CaptureButton buttonDisabled={this.state.loading} onClick={this.takePicture.bind(this)}/>
			</RNCamera>
		);
	}
}

const styles = StyleSheet.create({
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
	},
	loadingIndicator: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});
