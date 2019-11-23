import React,{Component} from "react";
import {Image, View} from 'react-native';
import {ConfigStore} from '../config/Config'

export default class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.config = new ConfigStore();
    }

    componentDidMount() {
        const {navigation} = this.props;
        //console.log(navigation);
        setTimeout(() => {
            navigation.navigate("Test");
        },this.config.SplashTime);
    }

    render() {
        //console.log("splashed");
        return (
            <View style ={{flex:1}}>
                <Image style ={{flex:1 , width:null, height:null}} source ={this.config.SplashImg}/>
            </View>

        );
    }
}
