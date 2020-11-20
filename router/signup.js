const express = require('express')
const router = express.Router()
const User = require('../db/modal/userModel')

const captcha = Math.ceil(Math.random()*10000)

//获取验证码
router.post('/code',(req,res) => {
	res.send({code: 0, success: true, msg: '获取成功', data: captcha })
})

//注册
router.post('/register',(req,res) => {
	const { name, pwd, repwd, gender, phone, avatar } = req.body
	try{
		if(!name) throw new Error('未填写用户名')
		if(!pwd) throw new Error('未设置密码')
		if(!repwd) throw new Error('未确认密码')
		if(!gender) throw new Error('未填写性别')
	}catch(e){
		return res.send(e.message)
	}
	let post = { name, pwd, repwd, gender, phone, avatar }
	User.find({name,phone}).then( result => {
		if(result.length > 0){
			res.send({ code:-1, success:false, msg:'用户已存在' })
		}else{
			return User.insertMany(post)
		}
	}).then(()=>{
		res.send({ code:0, success:true, msg:'注册成功'})
	}).catch(()=>{
		res.send({ code:-1, success:false, msg:'注册失败'})
	})
})