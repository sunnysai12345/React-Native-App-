


import React, {Component} from 'react';
import {View, Image, Text, ImageBackground, StyleSheet, PermissionsAndroid, ProgressBarAndroid, ToastAndroid} from 'react-native';
import { Avatar  } from 'react-native-elements';
import {getBearerToken} from '../utils/helpers';
import ImageDownload from "./ImageDownload";
import axios from 'axios';

export default class Card extends Component {

    constructor(props) {
        super(props);
        //this.fetchImageURL.bind(this);
    }

    render() {
        const {data} = this.props;
        console.log(data);
        const profileImage = data.user.profile_image.medium;
        const photo = data.urls.regular;
        const name = data.user.name;
        const accessToken = getBearerToken();
        return (
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
                                <Text style={styles.cardDescription}>{data.user.username}</Text>
                            </View>
                        </View>
                        <ImageDownload fileName={data.id}
                                       downloadURL={photo}
                                       accessToken={accessToken}
                                       options={styles.cardExtras} />
                    </View>
                </ImageBackground>
            </View>
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
        fontSize: 12,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginLeft: 5,
        fontFamily: 'SFCompactText-Medium',
        marginTop: 10,
        //color: '#F5FCFF',
    },
    cardDescription: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginLeft: 5,
        fontFamily: 'SFCompactText-Medium',
        marginTop: 5,
        //color: '#F5FCFF',
    },
    cardOptions: {
        flex:1,
        marginTop: 15,
        //justifyContent: 'flex-end',
        //flexDirection: 'column',
        //alignSelf: 'flex-end'

    },
});