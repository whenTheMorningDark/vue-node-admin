const express = require('express')
const router = express.Router()
let {
  Success,
  Error
} = require("../utils/message")
router.get('/homeData', (req, res, next) => {
  res.json(new Success("首页data!"))
})
module.exports = router