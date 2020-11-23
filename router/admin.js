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
		}catch(err => {
			res.send({ status: 0, success: false, msg: err.message })
			return
		})
		try{
			const admin = User.findOne({name})
			if(admin){
				res.send({ status: 0, success: false, msg: '该用户已经存在' })
			}else{
				const admin_id = await getId('admin_id')
			}
		}catch(err => {
			res.send({ status: 0, success: false, msg: '注册失败' })
			return
		})
	})

	let post = { name, pwd, repwd, gender, phone, avatar }
	
})

//req.session.user = user
//find  查找
//insertMany  插入
//foodModel.find({}).limit(Number(pageSize)).skip(Number(page-1)*pageSize)  分页
//foodModel.find({$or:[{name:{$regex:reg}},{desc:{$regex:reg}}]})   模糊查询
//remove  删除   foodModel.remove({_id:[id1,id2,id3]})  多个删除
//update  修改
