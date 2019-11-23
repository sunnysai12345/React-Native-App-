


import React, {Component} from 'react';
import {View, Image, Text, ImageBackground, StyleSheet, PermissionsAndroid,
    ProgressBarAndroid, ToastAndroid, TouchableHighlight} from 'react-native';
import {loadScreen} from '../utils/action';

import {getBearerToken} from '../utils/helpers';
import ImageDownload from "./ImageDownload";
import axios from 'axios';

export default class Card extends Component {

    constructor(props) {
        super(props);
        //this.fetchImageURL.bind(this);
    }

    /*state ={
        imageURL : '',
    };

    componentDidMount() {
        const {data} = this.props;
        const accessToken = getBearerToken();
        this.fetchImageURL(data.links.download_location, accessToken).then((imageURL) => {
            this.setState({imageURL:imageURL});
        });
    };

    async fetchImageURL(url,accessToken) {
        console.log(url,accessToken);
        const imageURL = await axios.get(url, {
                method: 'get',
                headers : {
                    Authorization : 'Bearer ' + accessToken,
                },
            }).catch(err => console.error('An error occurred', err));
        console.log(imageURL.data.url);
        return imageURL.data.url;
    }

    showDownload() {
        return this.state.imageURL ? true : false ;
    }*/

    render() {
        const {data} = this.props;
        console.log(data);
        const profileImage = data.user.profile_image.medium;
        const photo = data.urls.regular;
        const name = data.user.name;
        /*const location = data.location ? data.location.country : null;
        const accessToken = getBearerToken();
        const imageURL = this.state.imageURL;
        const name = "sun1n1y";
        console.log(photo,data.user.profile_image,name,data.location,location,accessToken,this.state.imageURL); */
        return (
            //<TouchableHighlight style={{flex:1}} onPress={this.loadScreen(this.props.category)}>
                <View style={styles.card}>
                    <ImageBackground source={{uri:photo}} style={{flex:1,width:null,height:null}} resizeMode='cover'>
                        <View style={styles.miniCard}>
                            <View style={styles.cardData}>
                                <Image
                                    source={{
                                        uri:profileImage
                                    }}
                                    style={{width:64,height:64}}
                                    resizeMode="cover"
                                    borderRadius={64}
                                />
                                <View style={styles.cardInfo}>
                                    <Text style={styles.cardTitle}>{name}</Text>
                                    <Text style={styles.cardDescription}>{"@" + data.user.username}</Text>
                                </View>
                            </View>
                            <View style={styles.cardExtras}>
                                <Text style={styles.textStyle}>{this.props.category}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            //</TouchableHighlight>

        );
    }

}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
        opacity: 0.8,
    },
    miniCard: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        margin:10,
    },
    cardData: {
        flex:1,
        flexDirection: 'row',
    },
    cardAvatar: {
        flexDirection: 'row',
    },
    cardInfo: {
        paddingLeft: 10,
        color: '#F5FCFF',
    },
    cardTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginLeft: 5,
        fontFamily: 'SFCompactText-Medium',
        marginTop: 10,
        //color: '#F5FCFF',
    },
    cardDescription: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        //alignSelf: 'center',
        marginLeft: 5,
        fontFamily: 'SFCompactText-Medium',
        //marginTop: 5,
    },
    cardOptions: {
        marginLeft: 5,
        marginTop: 10,
        flex:1,
        //justifyContent: 'flex-end',
        //flexDirection: 'column',
        //alignSelf: 'flex-end'

    },
    textStyle: {
        color: '#1d191a',
        fontSize: 36,
        fontWeight: 'bold',
        alignSelf: 'center',
        fontFamily: 'SFCompactText-Medium',
    }
});