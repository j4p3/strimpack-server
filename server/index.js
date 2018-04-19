// ========================================================================= //
// 
// Webserver for:
//  server-side rendering of React app
//  user authentication
// 
// ========================================================================= //

const path = require('path');
import express from 'express';

import renderer from './renderer';
import authenticator from './authenticator';

const SERVER_PORT = process.env.SERVER_PORT;
const app = express();

app.use(authenticator.initialize());
app.use((req, res, next) => {
  res.set('X-Clacks-Overhead', 'GNU Terry Pratchet');
  next();
});

app.get('/auth', authenticator.authenticate('oauth2'));
app.get('/auth/twitch', (req, res, next) => {
  authenticator.authenticate('oauth2', (e, user, info, status) => {
    if (e) { console.log(e); return next(e); }
    // @todo log in user here? add to session?
    res.redirect('/') // kill token
  })(req, res, next);
});
app.get('/$', renderer);
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.listen(SERVER_PORT, (e) => {
  if (e) return console.error('webapp: server failure', e);
  console.log('webapp: ssr server running on port ' + SERVER_PORT);
})
