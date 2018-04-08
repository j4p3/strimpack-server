import React, { Component } from 'react';
import Store from './store';
import './global.css'
import './chat.css'


class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [{
        author: 'Test',
        content: 'Foo'
      }],
      input: ''
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }

  componentDidMount() {
    this.store = new Store({
      callback: this.handleData,
      context: this
    });
  }

  render() {
    return (
      <section className="chat-container container vertical ">
        <div className="messages">
          {this.messageList()}
        </div>
        <div className="input"><div className="inner">
          {this.input()}
        </div></div>
      </section>
    );
  }

  handleData(data) {
    console.log('chat: received new data')
    this.setState((prevState) => {
        return { messages: prevState.messages.concat(data) };
    });
  }

  handleInput(evt) {
    this.setState({input: evt.target.value});
  }

  handleKey(evt) {
    if (evt.keyCode === 13) {
      const message = {
        author: 'react',
        content: this.state.input
      };
      this.store.broadcast(message);
      this.setState((prevState) => {
        return {
          input: '',
          messages: prevState.messages.concat(message)
        };
      });
    }
  }

  messageList() {
    return this.state.messages.map((message, i) => {
      return <div key={i}>{message.content}</div>
    });
  }

  input() {
    return (
      <input type="text"
             value={this.state.input}
             onChange={this.handleInput}
             onKeyDown={this.handleKey} />
    );
  }
}

export default Chat;
