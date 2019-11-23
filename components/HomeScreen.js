
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Linking, Image, ImageBackground} from 'react-native';


import { SearchBar } from 'react-native-elements';
import {fetchRandomImage, getPhoto,} from "../utils/helpers";
import Card from './Card';

export default class HomeScreen extends Component {

    state = {
        search: '',
        data: '',
        categories: ["Nature","Food"],//,"Travel","Science","Technology"],
        categoryImageURLs: [],
    };



    componentDidMount() {
        /*fetchRandomImage().then(json => {
            //console.log(json);
            this.setState({data:json});
        });*/
        const urls = this.state.categories.map(function(category) {
            return getPhoto(category).then(url=> {
                return url;
            });
        });
        Promise.all(urls).then((data) => {
            console.log(data);
            this.setState({categoryImageURLs:data});
        });
    };

    /*updateSearch = search => {
        this.setState({ search });
    };*/


    render() {
        /*const { search,randomImageUrl } = this.state;
        console.log(randomImageUrl);'
        <SearchBar
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            onSubmitEditing={this.fetchImages}
            value={this.state.search}
        />*/
        return (
            <View style={styles.container}>
                {
                    this.state.categoryImageURLs.length>0 ? (this.state.categoryImageURLs.map((data,index) =>
                         <Card navigation={this.props.navigation} data={data} category={this.state.categories[index]}/>)) : <Text>Loading</Text>
                }
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
});