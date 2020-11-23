//const todo = require('./todo.js')
const captcha = require('./captchas.js')

module.exports = (app) => {
	//app.use('/todo', todo);
	app.use('/captcha', captcha);
}