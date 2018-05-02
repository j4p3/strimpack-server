// ========================================================================= //
// 
// OAuth consumer for Twitch
// 
// ========================================================================= //

import passport from 'passport';
import OAuth2Strategy from 'passport-oauth2';
import fetch from 'node-fetch';

import { User } from './db';

const TWITCH_OAUTH_ENDPOINT = 'https://id.twitch.tv/oauth2/authorize';
const TWITCH_TOKEN_ENDPOINT = 'https://id.twitch.tv/oauth2/token';
const TWITCH_API_ENDPOINT = 'https://api.twitch.tv/helix';
const TWITCH_SCOPE = 'user:read:email';
const STRIMPACK_SERVER_HOST = process.env.STRIMPACK_SERVER_HOST;
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
const TWITCH_CALLBACK_URI = process.env.TWITCH_CALLBACK_URI;

// @todo extract these utilities to a user model/class
async function initializeUser(data) {
  const user = await User.findOrCreate({
    where: { twitch_id: data.id },
    defaults: {
      username: data.display_name,
      email: data.email,
      subscription_level: 0,
      twitch_id: data.id,
      twitch_username: data.display_name,
      twitch_profile_image: data.profile_image_url,
      twitch_access_token: data.accessToken,
      twitch_refresh_token: data.refreshToken,
    }
  });
  return user;
}

async function fetchUserData(accessToken, refreshToken) {
  const res = await fetch(TWITCH_API_ENDPOINT + '/users', {
    headers: { Authorization: `Bearer ${accessToken}`
  }});

  if (!res.ok) { 
    // @todo handle edge cases, expired access tokens
    let e = new Error('Bad response from Twitch');
    return e;
  }

  const data = await res.json();
  data.refreshToken = refreshToken;
  return data.data[0];
}

passport.use(new OAuth2Strategy({
    authorizationURL: TWITCH_OAUTH_ENDPOINT,
    tokenURL: TWITCH_TOKEN_ENDPOINT,
    clientID: TWITCH_CLIENT_ID,
    clientSecret: TWITCH_CLIENT_SECRET,
    callbackURL: STRIMPACK_SERVER_HOST + TWITCH_CALLBACK_URI,
    scope: TWITCH_SCOPE,
    state: true,
  }, (accessToken, refreshToken, profile, cb) => {
    fetchUserData(accessToken, refreshToken).then(data => {
      initializeUser(data).then(([user, created]) => {
        return cb(null, user);
      }).catch(e => cb(e, null));
    }).catch(e => cb(e, null));
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then((user) => {
    done(null, user);
  }).catch((e) => {
    done(e, null)
  });
});

export default passport;
