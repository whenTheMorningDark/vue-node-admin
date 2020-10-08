let express = require('express')
let app = express() // 创建express的实例
const expressJwt = require('express-jwt')
// const router = express.Router();
const userRouter = require('./router/user.js') //  引入路由
const homeRouter = require('./router/home.js') //  引入路由
const menuRouter = require('./router/menu.js') //  引入路由
const bodyParser = require('body-parser')
// var passport = require('passport')
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
) // 未编码的（{扩展：假}）
// require('./config/passport')(passport)
/**
 * 验证token
 * 跳过用户接口
 */
app.use(expressJwt({
  secret: 'kafei',
  algorithms: ['HS256']
}).unless({
  path: ['/api/user']
}))
// 中间件
app.use((err, req, res, next) => {
  // 跳过前台接口验证
  if (req.originalUrl.slice(1, 4) === 'web') {
    return next()
  }
  console.log(err.name)
  // Token过期
  if (err.name === 'UnauthorizedError') {
    res.status(200)
    res.send({
      message: 'token过期，请重新登录',
      code: 10001,
      time: err.inner.expiredAt
    })

  }
})
// app.use(passport.initialize())
app.use('/api', userRouter)
app.use('/api', homeRouter)
app.use('/api', menuRouter)


app.listen(3000)