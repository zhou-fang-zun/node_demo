const express = require('express')
const router = express.Router()
const User = require('../db/modal/userModel')
const getId = require('.common.js')

//注册
router.post('/register',(req,res) => {
	const form = new formidable.IncomingForm();
	form.parse(req,async (err,fields,files) => {
		if(err){
			res.send({ status: 0, success: false, msg: '表单信息错误'})
			return
		}
		const { name, pwd, gender = 0, phone, avatar } = fields
		try{
			if(!name) throw new Error('用户名错误')
			if(!pwd) throw new Error('密码错误')
			if(!phone) throw new Error('手机号错误')
		}catch(err){
			res.send({ status: 0, success: false, msg: err.message })
			return
		}
		const newpassword = md5(pwd)
		try{
			const admin = User.findOne({name})
			if(admin){
				res.send({ status: 0, success: false, msg: '该用户已经存在' })
			}else{
				const admin_id = await getId('admin_id')
				const postData = {
					name, pwd: newpassword, gender, phone, avatar, id: admin_id
				}
				await User.create(postData)
				req.session.admin_id = admin_id
				res.send({ status: 1, success: true, msg: '注册成功' })
			}
		}catch(err){
			res.send({ status: 0, success: false, msg: '注册失败' })
			return
		}
	})
})

//登录
router.post('/loginin',(req,res) =>{
	const cap = req.cookies.cap
	if(!cap){
		res.send({ status: 0, success: false, msg: '验证码失效' })
		return
	}
	const form = new formidable.IncomingForm()
	form.parse(req,async (err,fields,files) => {
		if(err){
			res.send({ status: 0, success: false, msg: '表单信息错误'})
			return
		}
		const { name, pwd, captcha } = fields
		try{
			if(!name) throw new Error('用户名参数错误')
			if(!pwd) throw new Error('密码参数错误')
			if(!captcha) throw new Error('验证码参数错误')
		}catch(err){
			res.send({ status: 0, success: false, msg: err.message})
			return
		}
		if(cap.toString() !== captcha.toString()){
			res.send({ status: 0, success: false, msg: '验证码不正确'})
			return
		}
	})
})
//req.session.user = user
//find  查找
//insertMany  插入
//foodModel.find({}).limit(Number(pageSize)).skip(Number(page-1)*pageSize)  分页
//foodModel.find({$or:[{name:{$regex:reg}},{desc:{$regex:reg}}]})   模糊查询
//remove  删除   foodModel.remove({_id:[id1,id2,id3]})  多个删除
//update  修改
