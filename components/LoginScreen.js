import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Linking, AsyncStorage} from 'react-native';
import {Button} from 'react-native-elements';
import {handleAuthentication, loadUser, setAccessToken, fetchAccessToken, _storeData, _retrieveData} from '../utils/helpers';
import {loadHome} from "../utils/action";
import {connect} from 'react-redux';
import HomeScreen from "./HomeScreen";
import urlParse from "url-parse";


class LoginScreen extends Component{

    state = {
        authorized: false,
        userDetails: {},
    };

    componentDidMount() {
        //const {navigation} = this.props;
        _retrieveData("accessToken").then((token) => {
            if(token) {
                console.log("Loginscreen", token);
                setAccessToken(token);
                this.props.loadHome();
            }
            else {
                Linking.getInitialURL().then((url) => {
                    console.log("Linking", url);
                    if (url) {
                        const parsedUrl = urlParse(url, true);
                        const code = parsedUrl.query.code;
                        //console.log("code", code);
                        if (code) {
                            fetchAccessToken(code).then(() => {
                                this.setState({userDetails: loadUser(), authorized: true});
                                //console.log(this.state.userDetails);
                                this.props.loadHome();
                            });
                        }
                    }
                }).catch(err => console.error('An error occurred', err));
            }
        }).catch((err) => console.error('An earror occurred', err));
    };

    render() {
        console.log("show",this.props.show);
        return (
             this.props.show ? <HomeScreen/> :  <View style={styles.welcome}>
                                                <Button onPress={handleAuthentication} title="Link Unsplash Account"/>
                                                <Button onPress={this.props.loadHome} containerStyle={{margin:10}} title="Login as Guest"/>
                                                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
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

const mapStateToProps = (state,props) => {
    return {
        show: state.wholeState.show,
        token: state.wholeState.token,
    }
};

const mapDispatchToProps = (dispatch,props) => {
    return {
        loadHome: () => dispatch(loadHome()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);