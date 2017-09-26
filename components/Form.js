import React, {Component} from 'react';
import {View, Button, TextInput, StyleSheet, Alert} from 'react-native';

export default class Form extends Component{
    constructor(props){
        super(props);
        this.state={
            messageText: ''
        }
        this.sendMessage= this.props.sendMessage;
        this.sendNewMessage= this.sendNewMessage.bind(this);
        this.changeMessageText= this.changeMessageText.bind(this);
    }

    changeMessageText(newText){
        this.setState({
            messageText: newText
        });
    }

    sendNewMessage(){
        if(this.state.messageText && this.state.messageText.trim()){
            this.sendMessage(this.state.messageText);
            this.setState({
                messageText: ''
            });
            this.forceUpdate();
        }
        else{
            Alert.alert('please write your message');
        }
    }

    render(){
        return(
            <View style={styles.form}>
                <TextInput style={styles.input} value={this.state.messageText} onChangeText={this.changeMessageText}/>
                <Button style={styles.submit} onPress={this.sendNewMessage} title='SEND'/> 
            </View>
        );
    }
}

var styles= StyleSheet.create({
    form:{
        flex: 1,
        flexDirection: 'row'
    },
    input:{
        flex: 5
    },
    submit:{
        flex: 1,
        backgroundColor: 'lightblue',
        color: 'black',
        fontWeight: 'bold'
    }
});