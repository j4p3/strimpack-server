import React, { Component } from 'react';
import update from 'react-addons-update';

import { StreamScreen } from './stream';
import Nav from './nav';
import { Modal, ModalContext, content } from './modal';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);

    // 
    // Context transformer methods
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
      }
    };
  }

  render() {
    return (
      <div className="root vertical container">
        <ModalContext.Provider value={this.state.modal}>
          <Nav />
          <StreamScreen />
          <Modal />
        </ModalContext.Provider>
      </div>
    );
  }
}

export default App;
