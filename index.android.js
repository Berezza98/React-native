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
  ToolbarAndroid,
  RefreshControl
} from 'react-native';

export default class AwesomeProject extends Component {
  constructor(props){
    super(props);
    this.state={
      messages: [],
      loader: true,
      refreshing: false
    }
    this.addNewMessage= this.addNewMessage.bind(this);
    this.onRefresh= this.onRefresh.bind(this);
    this.deleteMessage= this.deleteMessage.bind(this);
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

  onRefresh(){
    this.setState({
      refreshing: true
    })
    fetch("https://ancient-stream-43921.herokuapp.com/messages")
      .then(res => res.json())
      .then(json => {
          this.setState({messages: json.messages,
                         loader: false,
                         refreshing: false
            });
      });
  }

  deleteMessage(message){
    this.setState({
      loader: true
    });
    fetch("https://ancient-stream-43921.herokuapp.com/messages",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "text/plain"
      },
      body: message
    }).then(() => {
      let index= this.state.messages.indexOf(message);
      let messages= this.state.messages;
      messages.splice(index, 1);
      this.setState({
        messages,
        loader: false
      });
    });
  }

  componentDidMount(){
    fetch("https://ancient-stream-43921.herokuapp.com/messages")
      .then(res => res.json())
      .then(json => {
          this.setState({messages: json.messages,
                         loader: false
            });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.first}>
          <ToolbarAndroid title="Chat" style={{flex: 1}} />
        </View>
        <View style={styles.second}>
            <View style={this.state.loader ? styles.loaderCenter : styles.hideLoader}>
                <ActivityIndicator style={this.state.loader ? styles.loader : styles.hideLoader} color='white' size='large' animating={this.state.loader} />
            </View>
            <ScrollView
              style={this.state.loader ? styles.hideLoader : ''}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              } >
              {this.state.messages.map((message, index) => <Message deleteMessage={this.deleteMessage} style={this.state.loader ? styles.showMessage : styles.hideMessage} key={index} messageText={message} />)}
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
    justifyContent: 'center',
    display: 'flex'
  },
  third: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  loaderCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  hideLoader: {
    display: 'none'
  },
  showMessage: {
    display: 'flex'
  },
  hideMessage: {
    display: 'none'
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
