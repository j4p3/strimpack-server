import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Store from './store';
import './global.css'
import './chat.css'


class MessageInput extends Component {
  constructor(props) {
    // 
    // Expected property: 'send' function
    // 
    if (!props.hasOwnProperty('send')) {
      throw new Error('MessageInput Missing }send prop.')
    }

    super(props);

    this.el = React.createRef();

    this.state = {
      value: ''
    };

    this.handleKey = this.handleKey.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    this.el.current.focus()
  }

  handleInput(evt) {
    this.setState({ value: evt.target.value });
  }

  handleKey(evt) {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      if (this.state.value) {
        this.props.send(this.state.value);
        this.setState({ value: '' });
      }
    } else {
      this.setState({ value: evt.target.value }); 
    }
  }

  render() {
    return (
      <textarea type="text"
                ref={this.el}
                value={this.state.value}
                onKeyDown={this.handleKey}
                onChange={this.handleInput} />
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
      author: 'Test'
    };

    this.send = this.send.bind(this);
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
          <MessageInput send={this.send} />
        </div></div>
      </section>
    );
  }

  // 
  // Data & events
  // 

  handleData(data) {
    this.setState((prevState) => {
        return { messages: prevState.messages.concat(data) };
    });
  }

  send(message) {
    // @todo grab user info from authcontext
    const data = {
      author: this.state.author,
      userId: 1,
      content: message
    };
    this.store.broadcast(data);
    this.setState((prevState) => {
      return {
        input: '',
        messages: prevState.messages.concat(data)
      };
    });
  }
}

export default Chat;
