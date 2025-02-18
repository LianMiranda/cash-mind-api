const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const env = require("../env/env");
const User = require("../../api/models/User");

module.exports = (passport) => {
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

          let user = await User.findOne({ where: { email: email } });

          if (!user) {
            user = await User.create({
              id: profile.id,
              email: email,
              password: null,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              cpf: null,
            });
          }

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
