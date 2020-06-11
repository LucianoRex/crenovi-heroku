const User = require("../models/user");
var cfg = require("../config/index");

var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken() ,
opts.secretOrKey = cfg.jwtSecret;

module.exports = passport => {
    passport.use(
      new JwtStrategy(opts, async (payload, done) => {
        await User.findById(payload.user_id)
          .then(user => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch(err => {
            return done(null, false);
          });
      })
    );
  };