let express = require('express')
let app = express() //创建express的实例
const userRouter = require('./router/user.js') //  引入路由
const homeRouter = require('./router/home.js') //  引入路由
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
})) //未编码的（{扩展：假}）

app.use('/api', userRouter)
app.use('/api', homeRouter)
// app.get('/', function (req, res) {
//   res.send('Hello,myServer2'); //服务器响应请求
// });
app.listen(3000)