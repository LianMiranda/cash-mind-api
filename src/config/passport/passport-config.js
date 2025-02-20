const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const env = require("../env/env");
const authService = require("../../api/services/auth.service");

const passportConfig = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.oauth.clientIdGoogle,
        clientSecret: env.oauth.clientSecretGoogle,
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          const googleId = profile.id

          const user = await authService.userOAuth({
              email: email,
              password: null,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              cpf: null,
              googleId: googleId,
          });

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

module.exports = passportConfig;
