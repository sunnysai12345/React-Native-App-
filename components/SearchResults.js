import React,{Component} from "react";

import {ListItem, Left, List, View, Text, Container, Content, Body} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ConfigStore} from '../config/Config'

export default class SearchResults extends Component {


    render() {
        //console.log("splashed");
        const {searchResults} = this.props;
        return (
            <Container >
                <Content>
                    <List dataArray={searchResults} renderRow={(item) =>
                        <View>
                            <ListItem icon>
                                <Left>
                                    <Icon size={20} name="location-on"/>
                                </Left>
                                <Body>
                                    <Text>{item.primaryText}</Text>
                                </Body>
                            </ListItem>
                        </View>
                    }/>
                </Content>
            </Container>

        );
    }
}