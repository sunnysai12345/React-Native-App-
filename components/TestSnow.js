import React, { Component } from 'react';
import {
    Container,
    Header,
    Button,
    Text,
    Body,
    Form,
    Item as FormItem,
    Input,
    Label,
    Title,
} from 'native-base';

import firebase from 'firebase';
import base64 from 'react-native-base64';
//const BASIC_API = this.state.url;

const firebaseConfig = {
    apiKey: "AIzaSyD_DiUlHSHiflswnFIEHOXWXKHKF9ufy88",
    authDomain: "snow-bot-496dd.firebaseapp.com",
    databaseURL: "https://snow-bot-496dd.firebaseio.com",
    projectId: "snow-bot-496dd",
    storageBucket: "snow-bot-496dd.appspot.com",
    messagingSenderId: "114012405786",
    appId: "1:114012405786:web:a2695067f7b9963d"
};

firebase.initializeApp(firebaseConfig);


export default class TestSnow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url:"",
            username : "",
            password : "",
            loggedIn:"",
            basicAuth: "",
        }
    }

    componentDidMount() {
        this.readUserData();
        if(this.state.username && this.state.password && this.state.url) {
            fetch(this.state.url+"/api/now/table/incident?sysparm_limit=1",{method:'GET',
                headers: headers,
            }).then((response) => {
                if(response.status=='200') {
                    this.setState({loggedIn: 'true'});
                    console.log(response);
                }
            });

        }
    }

    writeUserData(url,username,password){
        firebase.database().ref('Users/').push({
            url,
            username,
            password
        }).then((data)=>{
            //success callback
            console.log('data ' , data)
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
        })
    }


    readUserData() {
        let headers = new Headers();
        firebase.database().ref('/Users').once('value').then((snapshot)=> {
            console.log(snapshot.val());
            var url = (snapshot.val() && snapshot.val().url) || 'url';
            var username = (snapshot.val() && snapshot.val().username) || 'Guest';
            var password = (snapshot.val() && snapshot.val().password) || 'Guest';
            var basicAuth = base64.encode(username + ":" + password);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Accept','application/json');
            headers.append('Authorization', 'Basic ' + basicAuth);
            fetch(url+"/api/now/table/incident?sysparm_limit=1",{method:'GET',
                headers: headers,
            }).then((response) => {
                if(response.status=='200') {
                    this.setState({loggedIn: 'true'});
                    console.log(response);
                }
            });
            this.setState({url:url,username:username,password:password,basicAuth:basicAuth});

        });
    }

    handleLogin() {
        let headers = new Headers();
        console.log(this.state,base64.encode(this.state.username + ":" + this.state.password));

        this.writeUserData(this.state.url,this.state.username,this.state.password);

        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept','application/json');
        headers.append('Authorization', 'Basic ' + base64.encode(this.state.username + ":" + this.state.password));

        fetch(this.state.url+"/api/now/table/incident",{method:'GET',
            headers: headers,
        }).then(response => console.log(response));

    }


    render() {
        return (
            this.state.loggedIn ? <Container><Text>Success</Text></Container> :
            <Container style={{ justifyContent: 'center' }}>
                <Form>
                    <FormItem >
                        <Label>Instance URL</Label>
                        <Input onChangeText={(url) => this.setState({url})}/>
                    </FormItem>
                    <FormItem >
                        <Label>Username</Label>
                        <Input  onChangeText ={(username) =>this.setState({username})} />
                    </FormItem>
                    <FormItem last>
                        <Label>Password</Label>
                        <Input  onChangeText={(password) =>this.setState({password})} secureTextEntry={true} />
                    </FormItem>
                    <Button full primary style={{ paddingBottom: 4 }} onPress={() =>this.handleLogin()}>
                        <Text> Login </Text>
                    </Button>
                </Form>
            </Container>

        );
    }
}