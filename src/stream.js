import React from 'react';
import Chat from './chat';
import './global.css';
import './stream.css';

export const Stream = (props) => {
  const defaults = {
    allowfullscreen: 'true'
  }
  const inheretedProps = {...defaults, ...props};
  return (
    <iframe
      title="stream"
      className="embedded"
      src="//player.twitch.tv/?channel=neuro"
      marginHeight="0"
      marginWidth="0"
      frameBorder="0"
      scrolling="no"
      allowFullScreen={inheretedProps['allowfullscreen']}>
    </iframe>
  )
}

export const StreamScreen = (props) => {
  return (
      <section className="stream-container container ">        
        <main className="stream">
          <Stream />
        </main>
        <aside className="chat"><div className="inner">
          <Chat />
        </div></aside>
      </section>
  );
}
