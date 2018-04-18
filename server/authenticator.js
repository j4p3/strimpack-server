import passport from 'passport';
import TwitchTokenStrategy from 'passport-twitch-token';

import User from './db';

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

passport.use(new TwitchTokenStrategy({
    clientID: TWITCH_CLIENT_ID,
    clientSecret: TWITCH_CLIENT_SECRET,
    passReqToCallback: true
}, (req, accessToken, refreshToken, profile, next) => {
    User.findOrCreate({'twitch.id': profile.id}, (error, user) => {
        return next(error, user);
    });
}));

export default passport;
