import passport from 'passport';
import TwitchTokenStrategy from 'passport-twitch-token';

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
