const express = require('express')
const router = express.Router()
const UserModel = require('../../db/model/userNodel')
const getId = require('./common.js')
const encryption = require('../middlewares/crypto')

//新增
router.post('/addUser',async (req,res) =>{
    const { name, pwd, gender, phone,avatar } = req.body
    try{
        if(!name) throw new Error('用户名错误')
		if(!pwd) throw new Error('密码错误')
		if(!phone) throw new Error('手机号错误')
    }catch(err){
        res.send({ status: 0, success: false, msg: err.message })
		return
    }
    const newpwd = encryption(pwd)
    try{
        const isExist = await UserModel.findOne({ name })
        if(isExist.length){
            res.send({ status: 0, success: false, msg: '用户已存在' })
        }else{
            const user_id = getId('admin_id')
            const postData = { name, pwd: newpwd, id: user_id, gender, phone, avatar }
            await UserModel.create(postData)
            res.send({ status: 1, success: true, msg: '新增成功' })
        }
    }catch(err){
        res.send({ status: 0, success: false, msg: '新增失败' })
    }
})

//获取用户列表
router.get('/getUserList',async (req,res)=>{
    const {pageSize,page} = req.query
    try{
        const data = await UserModel.find({}).limit(Number(pageSize)).skip(Number(page - 1) * pageSize)
        res.send({ status: 1, success: true, msg: '请求成功',data })
    }catch(err){
        res.send({ status: 0, success: false, msg: '请求失败',data: []})
    }
})

//用户详情
router.get('/getUserDetail',async (req,res) =>{
    const {id} = req.query
    try{
        const data = await UserModel.findOne({_id: id})
        res.send({ status: 1, success: true, msg: '请求成功',data})
    }catch(err){
        res.send({ status: 0, success: false, msg: '请求失败',data: {}})
    }
})

//编辑
router.put('/updateUser',async (req,res) =>{
    const {name,gender,phone,avatar,id} = req.body
    try{
        if(!name) throw new Error('缺少用户名')
        if(!id) throw new Error("缺少用户id")
    }catch(err){
        res.send({ status: 0, success: false, msg: err.message})
    }
    try{
        await UserModel.findOneAndUpdate({_id: id},{name,gender, phone, avatar})
        res.send({ status: 1, success: true, msg: '编辑成功'})
    }catch(err){
        res.send({ status: 0, success: false, msg: '编辑失败'})
    }
})

//删除
router.delete('/deleteUser',async (req,res) =>{
    const {id} = req.query
    try{
        if(!id){
            res.send({ status: 0, success: false, msg: '缺少用户id'})
        }else{
            await UserModel.remove({_id: id})
            res.send({ status: 1, success: true, msg: '删除成功'})
        }
    }catch(err){
        res.send({ status: 0, success: false, msg: '删除失败'})
    }
})

module.exports = router