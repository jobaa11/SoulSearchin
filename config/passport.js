const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },

    async function(accessToken, refreshToken, profile, cb) {

      let user = await User.findOne({ googleId: profile.id });
      if (user) return cb(null, user);
      try {
        user = await User.create({
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value
        });
        return cb(null, user);
      } catch (err) {
        // An error occured
        return cb(err);
      }
    }
  )
);

passport.serializeUser(function(user, cb) {
  // Return a nugget of info that passport
  // will give us each time a request is made by
  // this logged in user
  cb(null, user._id);
})  ;

// Called with every request by a logged in user
passport.deserializeUser(async function(userId, cb) {
  // Return the user's doc so that passport
  // can assign it to req.user
  const user = await User.findById(userId);
  cb(null, user);
});