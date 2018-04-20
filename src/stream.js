import React from 'react';

import { UserContext } from './user';
import Chat from './chat';
import './global.css';
import './stream.css';

export const Stream = (props) => {
  return (
    <h1>content</h1>
  )
}
/*
    <iframe
      title="stream"
      className="embedded"
      src="//player.twitch.tv/?channel=neuro"
      marginHeight="0"
      marginWidth="0"
      frameBorder="0"
      scrolling="no">
    </iframe>
*/

export const StreamScreen = (props) => {
  return (
      <section className="stream-container container ">        
        <main className="stream" style={{background: '#333'}}>
          <Stream />
        </main>
        <aside className="chat"><div className="inner">
          <UserContext.Consumer>
            {context => <Chat user={context.user} />}
          </UserContext.Consumer>
        </div></aside>
      </section>
  );
}
