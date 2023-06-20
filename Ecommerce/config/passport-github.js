import passport from "passport";
import githubUserModel from "../Models/githubUserModel.js";
import GitHubStrategy from "passport-github2";
import dotenv from "dotenv";

dotenv.config();

const initializePassport = () => {
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/session/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);

        try {
          const user = await githubUserModel.findOne({
            email: profile._json.email,
          });
          if (user) return done(null, user);
          const newUser = await UserModel.create({
            first_name: profile._json.name,
            email: profile._json.email,
          });
          return done(null, newUser);
        } catch (err) {
          return done("Error al iniciar sesion con github" + err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await githubUserModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;
