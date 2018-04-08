import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Store from './store';
import './global.css'
import './chat.css'


class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.el = React.createRef();
  }

  componentDidMount() {
    this.el.current.focus()
  }

  render() {
    return (
      <textarea type="text"
                ref={this.el}
                value={this.props.value}
                onChange={this.props.onChange}
                onKeyDown={this.props.onKeyDown} />
    );
  }
}

const Message = (props) => {
  return (
    <div className="message"><b>{props.author}</b>: {props.content}</div>
  )
}

class MessageList extends Component {
  static atBottom = true;

  constructor(props) {
    super(props);
    this.el = React.createRef(); 
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.messages.length !== this.props.messages.length) {
      const scrollBottom = (this.el.current.scrollHeight -
                            this.el.current.clientHeight);
      this.atBottom = (scrollBottom <= 0) ||
                      (this.el.current.scrollTop === scrollBottom);
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate() {
    if (this.atBottom) this.scrollToBottom();
  }

  render() {
    return (
      <div className="messages" ref={this.el}>
        {this.props.messages.map((message, i) => {
          return <Message key={i} {...message} />
        })}
      </div>
    );
  }

  scrollToBottom() {
    const scrollBottom = this.el.current.scrollHeight - this.el.current.clientHeight;
    ReactDOM.findDOMNode(this.el.current).scrollTop = scrollBottom > 0 ? scrollBottom : 0;
  }
}

class Chat extends Component {
  // 
  // Lifecycle
  // 
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

  // 
  // Presentational
  // 

  render() {
    return (
      <section className="chat-container container vertical ">
        <MessageList messages={this.state.messages} />
        <div className="input"><div className="inner">
          <MessageInput value={this.state.input}
                        onChange={this.handleInput}
                        onKeyDown={this.handleKey} />
        </div></div>
      </section>
    );
  }

  input() {
    return (
      <textarea type="text"
             value={this.state.input}
             onChange={this.handleInput}
             onKeyDown={this.handleKey} />
    );
  }

  // 
  // Data & events
  // 

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
}

export default Chat;
