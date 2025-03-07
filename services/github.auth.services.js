require('dotenv').config();
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require("../models/user.models.js");
const { setUser } = require("./auth.services.js");

passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ["user:email"],
  },
  async (accessToken, refreshToken, profile, done) => {

    try {
      let email = profile.emails?.[0]?.value || null;
      let user = await User.findOne({ email }); 

      if (user) {
        const githubProvider = user.providers.find(p => p.provider === "github");
        if (!githubProvider) {
          user.providers.push({ provider: "github", providerId: profile.id });
          await user.save();
        }
      } else {
        user = await User.create({
          username: profile.username,
          email: email,
          profilePicture: profile.photos[0]?.value,
          providers: [{ provider: "github", providerId: profile.id }]
        });
      }
      const token = setUser(user._id);
      return done(null, { user, token });
    } catch (error) {
      return done(error, false);
    }
  }
));

module.exports = passport;