const path = require('path')
const express = require('express')
const session = require('express-session')
const winston = require('winston')
const expressWinston = require('express-winston')
const router = require('./router')
const app = express()

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended: false}))  //解析表单数据
app.use(bodyparser.json())   //解析json数据

//const db = require('./db/connect')  //连接数据库
//设置静态目录
//app.use('/public',express.static('public'))
app.use(express.static(path.join(__dirname,'public')))

app.use(session({
	name: 'mynode',  // 设置 cookie 中保存 session id 的字段名称
	secret: 'mynode',  // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
	cookie: {maxAge: 60*1000*30},  // 过期时间，过期后 cookie 中的 session id 自动删除
	resave: true,  // 强制更新 session
	saveUninitialized: false,  // 设置为 false，强制创建一个 session，即使用户未登录
}))

//处理表单及文件上传的中间件
/*app.use(require('express-formidable')({
	uploadDir: path.join(__dirname,'public/img'),  //上传文件目录
	keepExtensions: true  //保留后缀
}))*/

//正常请求的日志
/*app.use(expressWinston.logger({
	transports: [
		new (winston.transports.Console)({
			json: true,
			colorize: true
		}),
		new winston.transports.File({
			filename: 'logs/success.log'
		})
	]
}))*/

app.all('*',(req,res,next) => {
	const { origin, Origin, referer, Referer} = req.headers;
	const allowOrigin = origin || Origin || referer || Referer || '*';
	res.header("Access-Control-Allow-Origin", allowOrigin);
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("Content-Type", "application/json;charset=utf-8");
	res.header("X-Powered-By", 'Express');
	if(req.url === '/favicon.ico') return
	if(req.method === 'OPTIONS'){
		res.send(200)
	}else{
		next()
	}
})

//路由要放到上面这个中间件后面，不然就跳过了
router(app)

// 错误请求的日志
/*app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}))*/

app.listen(3000,()=>{
	console.log('服务器启动')
})