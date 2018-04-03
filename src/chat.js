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
        content: 'Foo'
      }]
    };
  }

  componentDidMount() {
    this.store = new Store({
      callback: this.handleData,
      context: this
    });
  }

  render() {
    return (
      <div>
        <h1>Messages</h1>
        {this.messageList()}
      </div>        
    );
  }

  handleData(data) {
    console.log('chat: received new data')
    this.setState((prevState) => {
        return { messages: prevState.messages.concat(data) }
    });
  }

  messageList() {
    return this.state.messages.map((message, i) => {
      return <div key={i}>{message.content}</div>
    });
  }
}

export default Chat;
