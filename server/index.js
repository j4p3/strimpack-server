// ========================================================================= //
// 
// Webserver for:
//  server-side rendering of React app
//  user authentication
// 
// ========================================================================= //

import express from 'express';
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const path = require('path');

import { connection } from './db';
import renderer from './renderer';
import authenticator from './authenticator';

const SERVER_PORT = process.env.SERVER_PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;
const DATABASE_URL = 'pg://' + connection; // weirdness going on with imports
const app = express();

app.use(session({
  store: new pgSession({ conString: DATABASE_URL }),
  secret: SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days 
}));
app.use(authenticator.initialize());
app.use(authenticator.session());
app.use((req, res, next) => {
  res.set('X-Clacks-Overhead', 'GNU Terry Pratchet');
  next();
});

app.get('/auth', authenticator.authenticate('oauth2'));
app.get('/auth/twitch', authenticator.authenticate(
  'oauth2',
  { failureRedirect: '/fail' }),
  (req, res) => { res.redirect('/'));
app.get('/$', renderer);
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.listen(SERVER_PORT, (e) => {
  if (e) return console.error('webapp: server failure', e);
  console.log('webapp: ssr server running on port ' + SERVER_PORT);
})
