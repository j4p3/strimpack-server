import React, { Component } from 'react';
import Chat from './chat';
import Nav from './nav';
import './stream.css';

export const Stream = (props) => {
  const defaults = {
    allowfullscreen: 'true'
  }
  const inheretedProps = {...defaults, ...props};
  return (
    <div>
      {/*      <iframe
        className="embedded"
        src="//player.twitch.tv/?channel=neuro"
        marginheight="0"
        marginwidth="0"
        frameborder="0"
        scrolling="no"
        allowfullscreen={inheretedProps['allowfullscreen']}>
      </iframe>*/}
      <h1>here</h1>
    </div>
  )
}

export class StreamScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          {<Nav/>}
          <main className="wrapper">
            <div className="stream element">
              <Stream />
            </div>
            <div className="chat element">
              <Chat />
            </div>
          </main>
        </div>
    );
  }
}
