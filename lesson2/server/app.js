let express = require("express");
let app = express(); // 创建express的实例
// const router = express.Router();
const userRouter = require("./router/user.js"); //  引入路由
const homeRouter = require("./router/home.js"); //  引入路由
const menuRouter = require("./router/menu.js"); //  引入路由
const bodyParser = require("body-parser");
var passport = require("passport");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
); // 未编码的（{扩展：假}）
require("./config/passport")(passport);

app.use(passport.initialize());
app.use("/api", userRouter);
app.use("/api", homeRouter);
app.use("/api", menuRouter);
app.listen(3000);