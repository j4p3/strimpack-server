import passport from 'passport';
import OAuth2Strategy from 'passport-oauth2';

import { User, TwitchAuthentication } from './db';

const TWITCH_OAUTH_ENDPOINT = 'https://id.twitch.tv/oauth2/authorize';
const TWITCH_TOKEN_ENDPOINT = 'https://id.twitch.tv/oauth2/token';
const TWITCH_SCOPE = 'user:read:email';
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
const TWITCH_CALLBACK_URI = process.env.TWITCH_CALLBACK_URI;

passport.use(new OAuth2Strategy({
    authorizationURL: TWITCH_OAUTH_ENDPOINT,
    tokenURL: TWITCH_TOKEN_ENDPOINT,
    clientID: TWITCH_CLIENT_ID,
    clientSecret: TWITCH_CLIENT_SECRET,
    callbackURL: TWITCH_CALLBACK_URI,
    scope: TWITCH_SCOPE,
    // state: true,
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('got tokens');
    cb();
    // find or create twitch authentication
    // find or create user?

    // User.findOrCreate({ exampleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));

export default passport;
