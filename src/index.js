// ========================================================================= //
// 
// Root JS file for clientside stream application.
// Clientside entrypoint, hydrates DOM already rendered on server.
// 
// ========================================================================= //


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let user;
if (window.__DATA__) {
  user = JSON.parse(window.__DATA__)
}

ReactDOM.hydrate(<App user={user} />, document.getElementById('root'));
registerServiceWorker();
