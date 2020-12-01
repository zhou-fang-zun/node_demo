const admin = require('./admin.js')
const todo = require('./todo.js')
const captcha = require('./captchas.js')


module.exports = (app) => {
	app.use('/user',admin);
	app.use('/todo', todo);
	app.use('/captcha', captcha);
	
}