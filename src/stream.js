import React, { Component } from 'react';
import Chat from './chat';
import './global.css';
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

export const StreamScreen = (props) => {
  return (
      <section className="stream-container container ">        
        <main className="stream">
          <Stream />
        </main>
        <aside className="chat"><div class="inner">
          <Chat />
        </div></aside>
      </section>
  );
}
