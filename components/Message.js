import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Message extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
        <View style={styles.message}>
            <Text style={styles.text}>{this.props.messageText}</Text>
        </View>
        );
    }
}

const styles= StyleSheet.create({
    message:{
        flex: 1,
        backgroundColor: 'gold',
        borderWidth: 2,
        borderColor: 'blue',
        padding: 5 
    },
    text:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    }
})
