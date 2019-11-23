import React,{Component} from "react";
import {Image, StyleSheet, View} from 'react-native';
import {ConfigStore} from '../config/Config';


const {width:totalWidth} = Dimension.get("window");
const count = 5;
const width = totalWidth / count;
const height = width;

export default class SliderScreen extends Component {

    constructor(props) {
        super(props);
        this.config = new ConfigStore();
    }


    render() {
        //console.log("splashed");
        return (
            <View style ={styles.container}>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: totalWidth,
        height,
        borderRadius:height/2,
        backgroundColor: '#F5FCFF',
    },
});