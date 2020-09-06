# 项目登录和后台接口编写

一个系统中，我认为最为重要的就是登陆，首先我们要思考一下，系统登陆的目的是什么？在我看来，登陆模块的制作最为重要的一点就是获取当前用户登陆的信息，那么在前后端分离的项目中，登陆的目的就是为了获取到用户的 token 了，然后在剩下的每次模块制作中，都必须带有这个 token 标识与服务端相认。

# 初始化项目

我们前端技术栈主要使用到了 vuex+vue-router+axios+elementUi,那么在当前目录 src 下创建

```
server // 后台接口编写
  -config
   -db.js // 配置数据库基础数据
  -router // 配置路由接口
  -utils // 工具函数类
  app.js // 后台代码的主入口
src
	-api // 存放api接口
	-components // 公共组件存放
	-router // 前端路由
	-store // vuex数据存储仓库
  -utils // 工具函数
	-views // 界面
		-login
			login.vue
```

# 初始化路由文件

我们要做的第一件事情就是要初始化路由文件,现在由于涉及的模块不多,等多了我们在做一个分类的文件夹

src/router 下创建 index.js,具体引入方式可参考 src/router/index.js

# 初始化 vuex 文件

vuex 主要是作为一个全局共享的数据仓库,多组件公用的数据可以存放到这里来，以便于全局调用,在引入 vuex 模块的时候我使用了 webpack 中 require()方法,动态引入文件。这个也是后面实现动态路由主要使用到的方法。

```
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
```

# api 接口联调

在整个项目,我们需要把请求后台的 api 接口统一管理起来,在这里使用了 axios 这个请求库，它的使用方法比较简单，自行 baidu 便可以出来答案。axios 通过 interceptors.request 和 interceptors.response 分别用于处理请求前和请求后的数据,我们假定后端返回的成功码只有两种 0(成功)和-1(失败),另外还有一个重要的问题,网络请求,按照道理来说应该要有 loading 状态显示,但是 element 中的 loading 组件它是一个单例的,也就是说如果同个页面发起多个网络请求,它的全局 loading 就会消失,对于这个问题,我们在多个网络请求的情况下,再去讨论。具体代码在 src/utils/request

```
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})
service.interceptors.request.use(config=>{}) // 请求前处理,一般用于处理token和loading状态
service.interceptors.response.use(response=>{}) // 结果返回值
```

# 创建数据库(mysql)

这里我只要使用的是express来作为node的web框架,数据库使用的是mysql,另外这里我是用第三方数据库可视化操作工具,xmapp中自带的mysql。可以自己去下载xmapp。

<p align="center">
  <img src="http://119.23.36.73/githubImages/mysql1.png">
</p>

然后直接创建一个admin库,并且创建user表
<p align="center">
  <img src="http://119.23.36.73/githubImages/mysql2.png">
</p>

# node连接mysql

<p>node连接mysql是需要安装mysql模块,在server目录下执行 cnpm i mysql --save</p>
<p>在server/config下创建db.js这是用来连接mysql的基础配置</p>

```
let mysql = require('mysql') // mysql依赖模块
let connection = mysql.createConnection({ // 创建实例
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'admin',
})

connection.connect()
module.exports = connection
```
# 登录接口实现

<p>在router创建user.js这个是用来处理用户登录,退出,修改密码,新增用户等功能。</p>
<p>由于我们需要给前端返回token令牌,在这里就是使用第三方库jsonwebtoken</p>
<p>具体实现的api参数可自行参考官网,本项目具体代码实现在router/user.js</P>

```
function setToken(rule) {
  return new Promise(resolve => {
    jwt.sign(rule, "secret", {
      expiresIn: 3600
    }, (error, token) => {
      console.log(token)
      resolve(token)
    })
  })
}

```

<p>此外我们由于是需要做登录的功能,我们还需要引入body-parser来解析前端post过来的数据。另外我们还需要导入刚刚所编写的路由模块</p>
<p>在app.js目录</p>

```
const userRouter = require('./router/user.js') //  引入路由
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
})) //未编码的（{扩展：假}）
```

# 最后

未完待续....





