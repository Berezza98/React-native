/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Message from './components/Message';
import Form from './components/Form';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Picker,
  Button,
  Alert,
  ScrollView,
  Image,
  Slider,
  Switch,
  BackHandler,
  ToastAndroid,
  ToolbarAndroid
} from 'react-native';

export default class AwesomeProject extends Component {
  constructor(props){
    super(props);
    this.state={
      messages: []
    }
    this.addNewMessage= this.addNewMessage.bind(this);
  }
  addNewMessage(message){
    console.log("Main", message);
    fetch("https://ancient-stream-43921.herokuapp.com/messages",
    {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: message
    }).then(() => {
      this.setState({
        messages: [...this.state.messages, message]
      });
    });
  }

  componentDidMount(){
    fetch("https://ancient-stream-43921.herokuapp.com/messages")
      .then(res => res.json())
      .then(json => {
          this.setState({messages: json.messages})
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.first}>
          <ToolbarAndroid title="AwesomeApp" style={{flex: 1}}
          actions={[{title: 'Settings', show: 'always'}, {title: 'Settings', show: 'always'}, {title: 'Settings', show: 'always'}, ]} />
        </View>
        <View style={styles.second}>
            <ScrollView>
              {this.state.messages.map((message, index) => <Message key={index} messageText={message} />)}
            </ScrollView> 
        </View>
        <View style={styles.third} >
            <Form sendMessage={this.addNewMessage}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  first: {
    backgroundColor: 'red',
    flex: 1
  },
  second: {
    backgroundColor: 'blue',
    flex: 8,
    justifyContent: 'center'
  },
  third: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
