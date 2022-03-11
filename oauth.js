const passport = require('passport');

// Google Authentication
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = "438467814712-qbjcdo43bavo3blbaeudnk2i31jj95if.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8000/google/callback",
  passReqToCallback: true,
},
  function (request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  })
);



// Facebook Authentication
const FacebookStrategy = require('passport-facebook').Strategy;
const FACEBOOK_APP_ID = "643751070061691";
const FACEBOOK_APP_SECRET = "222949b6501ba13b80f9e72fbedcbd58";

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:8000/facebook/callback"
},
  function (request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }));


  // Github Authentication
  const GitHubStrategy = require('passport-github2').Strategy
  const GITHUB_CLIENT_ID = "2ca0f08a6e460c5de7c3";
  const GITHUB_CLIENT_SECRET = "e059fc7522ff9807c0eaae348b88b301fffaee47"
  passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));


  passport.serializeUser(function (user, done) {
    done(null, user);
    }
  );
  
  passport.deserializeUser(function (user, done) {
    done(null, user);
    }
  );
  