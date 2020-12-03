const express = require('express')
const router = express.Router()
const captchapng =require('captchapng')

//验证码
router.post('/getCaptcha',(req,res) => {
	const { phone } = req.body
	if(!phone){
		res.send({ status: 0, success: false, msg: '缺少手机号' })
	}
	const cap = parseInt(Math.random() * 9000 + 1000);
	const p = new captchapng(80,30,cap);
	p.color(0,0,0,0)
	p.color(80,80,80,255)
	const base64 = p.getBase64()
	res.cookie('cap', cap, {maxAge: 300000, httpOnly: true})
	res.send({
		status: 1,
		success: true,
		code: 'data:image/png;base64,' + base64
	})
})

/*
 * 验证：
 * 获取存在服务器cookie的验证码
 * const cap = req.cookies.cap
 * 判断：
 * if(cap.toString() !== req.body.captcha) '验证码不正确'
 */

module.exports = router