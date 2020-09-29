let mysql = require('./db')
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
module.exports = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
  }
  var jwtConfig = new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(mysql)
    mysql.query(
      'select * from user where id = ?',
      [jwt_payload.id],
      (error, data) => {
        if (data) {
          return done(null, data[0])
        }
        return done(null, false)
      }
    )
  })
  passport.use(jwtConfig)
}