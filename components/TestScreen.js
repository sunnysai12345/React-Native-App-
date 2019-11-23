
import React, {Component} from 'react';
import {Platform, Text, View, Linking, Image, ImageBackground,  Button, Alert,
    StyleSheet, PermissionAndroid, ProgressBarAndroid, ToastAndroid, TouchableHighlight} from 'react-native';

import {fetchRandomImage,} from "../utils/helpers";
import Card from './Card';

export default class HomeScreen extends Component {

    state = {
        search: '',
        data: '',
        loading:'',
        fullScreen:false,
    };

    /*componentDidMount() {
        fetchRandomImage().then(json => {
            console.log(json);
            this.setState({data:json});
        });
    };*/

    updateSearch = search => {
        this.setState({ search });
    };

    loadScreen(screen) {
        console.log("screen");
        const {navigation} = this.props;
        this.setState({fullScreen:true});
        //navigation.navigate("Test");

    }
    returnCardComponent() {
        const img = require("../Images/test.jpg");
        const name = "sunny";
        return (
            <TouchableHighlight style={{flex:1}} onPress={() => this.loadScreen("Test")}>
                <View style={styles.container}>
                    <ImageBackground style ={{flex:1 , width:null, height:null}} source ={img} resizeMode="stretch">
                        <View style={styles.card}>
                            <View style={styles.cardData}>
                                <View style={styles.cardAvatar}>
                                    <Image
                                        source={img}
                                        style={{width:64,height:64}}
                                        resizeMode="cover"
                                        borderRadius={64}
                                    />
                                </View>
                                <View style={styles.cardContent}>
                                    <Text style={styles.cardTitle}>{name}</Text>
                                    <Text style={styles.cardDescription}>@sunny</Text>
                                </View>
                            </View>
                            <View style={styles.cardExtras}>
                                <Text style={styles.textStyle}>Category</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        //console.log(randomImageUrl);
        console.log(this.state.fullScreen);
        return (
            this.state.fullScreen ?  this.returnCardComponent() :
                <View style={styles.container}>
                    {this.returnCardComponent()}
                    {this.returnCardComponent()}
                </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        margin:10,
    },
    cardData: {
        flex:1,
        flexDirection: 'row',
        //justifyContent: 'space-between',
    },
    cardAvatar: {
        flexDirection: 'row',
    },
    cardContent: {
        //flexBasis: 230,
        paddingLeft: 10,
        //flexDirection: 'column',
    },
    cardTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        //alignSelf: 'center',
        marginLeft: 5,
        fontFamily: 'SFCompactText-Medium',
        marginTop: 10
    },
    cardDescription: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        //alignSelf: 'center',
        marginLeft: 5,
        fontFamily: 'SFCompactText-Medium',
       // marginTop: 5
    },
    cardExtras: {
        flex:1,
    },
    textStyle: {
        color: 'white',
        fontSize: 36,
        fontWeight: 'bold',
        alignSelf: 'center',
        fontFamily: 'SFCompactText-Medium',
    }
});