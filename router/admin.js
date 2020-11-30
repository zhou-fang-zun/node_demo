const express = require('express')
const router = express.Router()
const UserModel = require('../db/model/userModel')
const getId = require('./common.js')
const encryption = require('../middlewares/crypto')
const tokens = require('../utils/tokens')

//注册
router.post('/register',async (req,res) => {
	const { name, pwd, gender = 0, phone, avatar } = req.body
	try{
		if(!name) throw new Error('用户名错误')
		if(!pwd) throw new Error('密码错误')
		if(!phone) throw new Error('手机号错误')
	}catch(err){
		res.send({ status: 0, success: false, msg: err.message })
		return
	}
	const newpassword = encryption(pwd)
	try{
		const admin = UserModel.findOne({name})
		if(admin.length){
			res.send({ status: 0, success: false, msg: '该用户已经存在' })
		}else{
			const admin_id = await getId('admin_id')
			const postData = {
				name, pwd: newpassword, gender, phone, avatar, id: admin_id
			}
			console.log(postData,'123')
			await UserModel.create(postData)
			req.session.admin_id = admin_id
			res.send({ status: 1, success: true, msg: '注册成功' })
		}
	}catch(err){
		res.send({ status: 0, success: false, msg: '注册失败' })
		return
	}
})

//登录
router.post('/signin',async (req,res) =>{
	const cap = req.cookies.cap
	console.log(cap,'cap')
	if(!cap || cap === undefined){
		res.send({ status: 0, success: false, msg: '验证码失效' })
		return
	}
	const { name, pwd, captcha } = req.body
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
	const newPassword = encryption(pwd)
	try{
		const user = await UserModel.findOne({name})
		//找不到就让它注册
		if(!user){
			const admin_id = await getId('admin_id')
			const newUser = {
				name, pwd: newPassword, id: admin_id,
			}
			await UserModel.create(newUser)
			let token = tokens.setToken(60 * 60 * 24 * 7,{name,id})
			req.session.admin_id = admin_id
			res.send({ status: 1, success: true, msg: '登录成功', data:{
				token
			}})
		}else if(user.pwd.toString() !== newPassword.toString()){
			res.send({ status: 0, success: false, msg: '密码不正确'})
			return
		}else{
			//jwt验证(生成token的)
			let token = tokens.setToken(60 * 60 * 24 * 7,{name,id})
			//登录成功后将用户的相关信息存到session(这是session+cookie的验证)
			req.session.admin_id = admin_id
			res.send({ status: 1, success: true, msg: '登录成功', data:{ token }})
		}
	}catch(err){
		res.send({ status: 0, success: false, msg: '登录失败'})
	}
})

//修改密码
router.post('/changePwd',async (req,res) =>{
	const cap = req.cookies.cap
	if(!cap){
		res.send({ status: 0, success: false, msg: '验证码失效'})
		return
	}
	const { name,oldPwd,newPwd,confirmPwd,captcha } = req.body
	try{
		if(!name){
			throw new Error('用户名参数错误')
		}else if(!oldPwd){
			throw new Error('旧密码参数错误')
		}else if(!newPwd){
			throw new Error('必须填写新密码')
		}else if(!confirmPwd){
			throw new Error('两次密码不一致')
		}else if(!captcha){
			throw new Error('请填写验证码')
		}
	}catch(err){
		res.send({ status: 0, success: false, msg: '修改密码参数错误'})
	}
	if(cap.toString() !== captcha.toString()){
		res.send({ status: 0, success: false, msg: '验证码错误'})
		return
	}
	const md5OldPassword = encryption(oldPwd)
	try{
		const user = await UserModel.findOne({name})
		if(!user){
			res.send({ status: 0, success: false, msg: '未找到当前用户'})
		}else if(user.pwd.toString() !== md5OldPassword.toString()){
			res.send({ status: 0, success: false, msg: '密码不正确'})
		}else{
			user.pwd = encryption(newPwd)
			user.save();
			res.send({ status: 1, success: true, msg: '修改密码成功'})
		}
	}catch(err){
		res.send({ status: 0, success: false, msg: '修改密码失败'})
	}
})

//退出
router.post('/signout',(req,res) => {
	try{
		//退出登录删除session token
		delete req.session.admin_id
		res.send({ status: 1, success: true, msg: '退出成功'})
	}catch(err){
		res.send({ status: 0, success: false, msg: '退出失败'})
	}
})

//测试
router.post('/test',async (req,res) =>{
	const { name } = req.body
	console.log(name,'name')
	const result = await UserModel.find({name})
	if(result){
		res.send({status: 1, success:true, data: result})
	}else{
		res.send({status: 0, success:false, msg: '无数据'})
	}
})

module.exports = router
//req.session.user = user
//find  查找
//insertMany  插入
//foodModel.find({}).limit(Number(pageSize)).skip(Number(page-1)*pageSize)  分页
//foodModel.find({$or:[{name:{$regex:reg}},{desc:{$regex:reg}}]})   模糊查询
//remove  删除   foodModel.remove({_id:[id1,id2,id3]})  多个删除
//update  修改
//findOneAndUpdate
