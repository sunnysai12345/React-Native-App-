
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Linking, Image, ImageBackground} from 'react-native';

import {bindActionCreators} from 'redux';

import {getCurrentLocation} from "../utils/helpers";
import SearchResults from './SearchResults';
import RNGooglePlaces from 'react-native-google-places';
import MapView from 'react-native-maps';
import { SearchBar } from 'react-native-elements';
import {loadHome} from "../utils/action";
import {connect} from "react-redux";
import * as actions from "../utils/action";


class MapScreen extends Component {

    constructor(props) {
        super(props);
        const {dispatch} = props;
    }

    state = {
        currentLocation:{},
        search:'',
        searchResults:{},
    };

    updateSearch = (keyword) => {
        this.setState({search:keyword});
        RNGooglePlaces.getCurrentPlace()
            .then((results) => console.log(results))
            .catch((error) => console.log(error.message));

        RNGooglePlaces.getAutocompletePredictions('facebook')
            .then((results) =>
                console.log(results)
            )
            .catch((error) => console.log(error.message));
    };

    getCurrentLocation() {
        console.log("function called");
        return navigator.geolocation.getCurrentPosition(
            (position)=> {
                console.log(position);
                this.setState({currentLocation:position});
            },
            (error) => { console.log(error)},
            {
                enableHighAccuracy: true,
                maximumAge        : 1000,
                timeout           : 20000
            })
    }

    componentDidMount() {
        //bindActionCreators(actions,this.props.dispatch);
        this.getCurrentLocation();
        console.log(this.state.currentLocation);
    }


    render() {
        console.log(this.state.currentLocation);
        const coords = this.state.currentLocation.coords || {latitude:37.78825,longitude:-122.4324};
        const region ={
            latitude: coords.latitude ||37.78825,
            longitude: coords.longitude || -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        };
        console.log(region);
        return (
            <View style={styles.container}>
                {this.state.currentLocation.coords ?<MapView provider={MapView.PROVIDER_GOOGLE}
                                                     style={styles.map}
                                                     region={region}
                                                     >
                                                <MapView.Marker
                                                    coordinate={region}
                                                    pinColor="red"/>
                                            </MapView> : <Text>Loading</Text>}
                <SearchBar
                    containerStyle={{backgroundColor: 'white',borderRadius: 0.7}}
                    inputContainerStyle={{backgroundColor:'white'}}
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    onSubmitEditing={this.fetchImages}
                    value={this.state.search}
                />
                <SearchResults searchResults={this.state.searchResults}/>

            </View>
        );
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
    map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        //top:160,
    },
});


const mapStateToProps = (state,props) => {
    return {
        currentLocation: state.wholeState.currentLocation,

    }
};

const mapDispatchToProps = (dispatch,props) => {
    return {
        getCurrentLocation: () => dispatch(getCurrentLocation()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);