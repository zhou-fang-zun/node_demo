const admin = require('./admin.js')
const todo = require('./todo.js')
const captcha = require('./captchas.js')
const test = require('./test.js')  //测试接口，查看验证码
const user = require('./personnelAdmin/user.js')
const proImport = require('./import/import.js')

module.exports = (app) => {
	app.use('/user',admin);
	app.use('/todo', todo);
	app.use('/captcha', captcha);
	app.use('/',test);    //测试接口，查看验证码
	app.use('/user',user);
	app.use('/import',proImport); 
}