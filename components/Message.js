import React, {Component} from 'react';
import {Alert, View, Text, StyleSheet, TouchableWithoutFeedback, Image} from 'react-native';

export default class Message extends Component{
    constructor(props){
        super(props);
        this.state={
            seleced: false
        }
        this.selectMessage= this.selectMessage.bind(this);
        this.deleteMessage= this.deleteMessage.bind(this);
    }

    selectMessage(){
        this.setState({
            seleced: !this.state.seleced
        })
    }

    deleteMessage(){
        this.props.deleteMessage(this.props.messageText);
    }

    render(){
        return(
        
            <View style={this.state.seleced ? [styles.message, styles.messageSelected] : [styles.message]}>
                <Text onPress={this.selectMessage} style={styles.text}>{this.props.messageText}</Text>
                <TouchableWithoutFeedback onPress={this.deleteMessage} style={this.state.seleced ? styles.imgContainer : styles.hide}>
                    <Image resizeMode="contain" style={this.state.seleced ? styles.img : styles.hide} source={require('../images/trash.png')}/>
                </TouchableWithoutFeedback>
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
        padding: 5 ,
        flexDirection: 'row',
        alignItems: 'center'
    },
    messageSelected:{
        backgroundColor: 'yellow'
    },
    text:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        flex: 8
    },
    hide: {
        display: 'none'
    },
    imgContainer: {
        flex: 2
    },
    img: {
        width: 20,
        height: 20
    }
})
