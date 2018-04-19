// ========================================================================= //
// 
// OAuth authentication consumer for Twitch
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
  }, async (accessToken, refreshToken, profile, cb) => {
    let data;
    try {
      const res = await fetch(TWITCH_API_ENDPOINT + '/users', {
        headers: { Authorization: `Bearer ${accessToken}`
      }});

      if (!res.ok) { 
        // @todo handle edge cases, expired access tokens
        let e = new Error('Bad response from Twitch');
        return cb(e, null);
      }

      data = await res.json();
      data = data.data[0];
      
    } catch(e) {
      // Network error
      console.log(e);
      return cb(e, null);
    }

    try {
      const [user, created] = await User.findOrCreate({
        where: { twitch_id: data.id },
        defaults: {
          username: data.display_name,
          email: data.email,
          subscription_level: 0,
          twitch_id: data.id,
          twitch_username: data.display_name,
          twitch_profile_image: data.profile_image_url,
          twitch_access_token: accessToken,
          twitch_refresh_token: refreshToken,
        }
      });
      // @todo log in user
      return cb(null, user);
    } catch(e) {
      // DB error
      console.log(e);
      return cb(e, null);
    }
}));

export default passport;
