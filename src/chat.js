import React, { Component } from 'react';
import update from 'react-addons-update';

import Store from './store';
import './chat.css'

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [{
        author: 'Test',
        message: 'Foo'
      }]
    };
  }

  componentDidMount() {
    this.store = new Store({
      callback: this.handleData,
      context: this
    });
  }

  handleData(data) {
    console.log('chat: received new data')
    const newMessages = update(this.state.messages, {
      $push: [data]
    });
    this.setState({messages: newMessages});
  }

  messageList() {
    return this.state.messages.map((message) => {
      (<div>{message.author}: {message.content}</div>)
    });
  }

  render() {
    // ??? why isn't this rendering?
    const messages = this.state.messages.map((message, i) => {
      <div key={i}>{message.content}</div>
    });
    return (
      <div>
        <h1>Messages</h1>
        {messages}
      </div>        
    );
  }
}

export default Chat;
