// ========================================================================= //
// 
// Webserver for:
//  server-side rendering of React app
//  user authentication
// 
// ========================================================================= //

import express from 'express';
const bodyParser = require('body-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const path = require('path');

import { connection } from './db';
import renderer from './renderer';
import authenticator from './authenticator';
import subscriber from './subscriber';

const SERVER_PORT = process.env.STRIMPACK_SERVER_PORT;
const SESSION_SECRET = process.env.STRIMPACK_SESSION_SECRET;
const DATABASE_URL = 'pg://' + connection; // weirdness going on with imports
const app = express();

app.use(session({
  store: new pgSession({ conString: DATABASE_URL }),
  secret: SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days 
}));
app.use(bodyParser.json());
app.use(authenticator.initialize());
app.use(authenticator.session());
app.use((req, res, next) => {
  res.set('X-Clacks-Overhead', 'GNU Terry Pratchet');
  next();
});

app.get('^/auth', authenticator.authenticate('oauth2'));
app.get('^/auth/twitch', authenticator.authenticate(
  'oauth2',
  { failureRedirect: '/fail' }),
  (req, res) => res.redirect('/'));
app.post('/subscribe', subscriber);
app.get('^/$', renderer);
app.use(express.static(path.resolve(__dirname, '..', '..', 'strimpack-web-client', 'build')));

app.listen(SERVER_PORT, (e) => {
  if (e) return console.error('strimpack: server failure', e);
  console.log('strimpack: server running on port ' + SERVER_PORT);
})
