import React from "react";
import {createDrawerNavigator, createAppContainer} from "react-navigation";

import SplashScreen from './SplashScreen';
import LoginScreen from "./LoginScreen";
import HomeScreen from './HomeScreen';
import TestScreen from './TestScreen';
import MapScreen from './MapScreen';
import SketchScreen from "./SketchScreen";
import ChatScreen from './ChatScreen';
import TestSnow from './TestSnow';
import Camera from "./Camera";
import VideoScreen from "./VideoScreen";
//import SliderScreen from "./SliderScreen";

const Splash = {
    screen : SplashScreen,
    navigationOptions : {
        header : null,
    },
};

const Login = {
    screen : LoginScreen,
    navigationOptions : {
        header : null,
    },
};

const Home = {
    screen : HomeScreen,
    navigationOptions : {
        header : null,
    },
};

const Test = {
    screen : TestScreen,
    navigationOptions : {
        header : null,
    },
};

const Map = {
    screen : MapScreen,
    navigationOptions : {
        header : null,
    },
};

const Sketch = {
    screen : SketchScreen,
    navigationOptions : {
        header : null,
    },
};

const Chat = {
    screen : ChatScreen,
    navigationOptions : {
        header : null,
    },
};

const Snow = {
    screen : TestSnow,
    navigationOptions : {
        header : null,
    },
};

const CameraScreen = {
	screen : Camera,
	navigationOptions : {
		header : null,
	},
};

const Video = {
    screen : VideoScreen,
    navigationOptions : {
        header : null,
    },
};

/*const Slider = {
    screen : SliderScreen,
    navigationOptions : {
        header : null,
    },
};*/

const RouteConfig = {
    initialRoute : 'Splash',
};

const AppNavigator = createDrawerNavigator({Splash:Splash, Login:Login, Home:Home, Test:Test, Map:Map, Sketch:Sketch, Chat:Chat, Snow:Snow, CameraScreen:CameraScreen, Video:Video},RouteConfig);

export default createAppContainer(AppNavigator);