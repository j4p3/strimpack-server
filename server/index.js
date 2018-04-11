// ========================================================================= //
// 
// Webserver for:
//  server-side rendering of React app
//  user authentication
// 
// ========================================================================= //

import express from 'express';
const path = require('path');

import renderer from './renderer';
import authenticator from './authenticator';

const app = express();
const port = 8080;

app.get('^/$', renderer);
app.get('^/auth', authenticator.authenticate('twitch-token'));
app.get(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
));

app.configure(() => {
  app.use(authenticator.initialize())
});

app.listen(port, (e) => {
  if (e) {
    return console.error('webapp: server failure', e);
  }

  console.log('webapp: ssr server running on port ' + port);
})
