const express = require('express')
const router = express.Router()
var passport = require('passport')
router.get(
  '/homeData',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res, next) => {
    // console.log(passport.authenticate)
    console.log(req.user)
    res.json(req.user)
  }
)

module.exports = router