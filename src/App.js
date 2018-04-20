import React, { Component } from 'react';
import update from 'react-addons-update';

import { StreamScreen } from './stream';
import Nav from './nav';
import { Modal, ModalContext, content } from './modal';
import { UserContext, userState } from './user';
import './app.css';

// @todo expose this component as a module-level export
// extract clientside stuff to separate repo
// require in serverside package & import it there
class App extends Component {
  constructor(props) {
    super(props);

    // 
    // Context transformer methods
    // tfw you accidentally roll your own redux
    // 

    this.close = () => {
      this.setState((state) => {
        return update(state, {
          modal: { visible: { $set: false } }
        });
      });
    };

    this.subscribe = () => {
      this.setState((state) => {
          return update(state, { modal: {
            visible: { $set: true },
            content: { $set: content.subscribe }}
        });
      });
    };

    this.state = {
      modal: {
        content: content.hi,
        visible: false,
        hi: this.hi,
        subscribe: this.subscribe,
        close: this.close
      },
      auth: {
        user: props.user,
      }
    };
  }

  render() {
    return (
      <div className="root vertical container">
        <UserContext.Provider value={this.state.auth}>
        <ModalContext.Provider value={this.state.modal}>
          <Nav />
          <StreamScreen />
          <Modal />
        </ModalContext.Provider>
        </UserContext.Provider>
      </div>
    );
  }
}

export default App;
