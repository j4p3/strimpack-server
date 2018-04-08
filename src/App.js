import React, { Component } from 'react';
import { StreamScreen } from './stream';
import Nav from './nav';
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="root vertical container">
        <Nav />
        <StreamScreen />
      </div>
    );
  }
}

export default App;
