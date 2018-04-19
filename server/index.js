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

const port = 8080;
const app = express();

app.use(authenticator.initialize());

app.get('/auth', authenticator.authenticate('oauth2'));
app.get('/auth/twitch', authenticator.authenticate('oauth2', {
  failureRedirect: '/fail' }),
  (req, res) => {
    console.log('successful auth');
    res.redirect('/');
});
app.get('/$', renderer);
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.listen(port, (e) => {
  if (e) return console.error('webapp: server failure', e);
  console.log('webapp: ssr server running on port ' + port);
})
