import React, {Component} from 'react';
import {View, Image, Text, Button, Alert, StyleSheet, PermissionsAndroid, ProgressBarAndroid, ToastAndroid} from 'react-native';

import RNFetchBlob from "rn-fetch-blob";

import Icon from 'react-native-vector-icons/FontAwesome';

export default class ImageDownload extends Component {

    constructor(props) {
        super(props);

        this.state = {
            progress: 0,
            loading: false
        };
    }
    actualDownload = () => {
        this.setState({
            progress: 0,
            loading: true
        });
        let dirs = RNFetchBlob.fs.dirs;
        console.log(dirs.DownloadDir,this.props.fileName,this.props.accessToken,this.props.downloadURL)
        RNFetchBlob.config({
            // add this option that makes response data to be stored as a file,
            // this is much more performant.
            path: dirs.DownloadDir + "/" + this.props.fileName + ".jpg",
            fileCache: true
        })
            .fetch(
                "GET",
                this.props.downloadURL,
                {
                    Authorization : 'Bearer ' + this.props.accessToken,
                }
            )
            .progress((received, total) => {
                console.log("progress", received / total);
                this.setState({ progress: received / total });
            })
            .then(res => {
                console.log(res);
                this.setState({
                    progress: 100,
                    loading: false
                });
                ToastAndroid.showWithGravity(
                    "Your file has been downloaded to downloads folder!",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );
            });
    };

    async downloadFile() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "Storage Permission",
                    message: "App needs access to memory to download the file "
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.actualDownload();
            } else {
                Alert.alert(
                    "Permission Denied!",
                    "You need to give storage permission to download the file"
                );
            }
        } catch (err) {
            console.warn(err);
        }
    }
    render() {
        return (
            <View style={this.props.options}>
                <Button onPress={() => this.downloadFile()} title="Download" color="#841584"/>
                {this.state.loading ? (
                    <ProgressBarAndroid
                        styleAttr="Large"
                        indeterminate={false}
                        progress={this.state.progress}
                    />
                ) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bottom :{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    container: {
        flex: 1,
        //alignItems: 'stretch',
        //backgroundColor: '#F5FCFF',
    },
});
