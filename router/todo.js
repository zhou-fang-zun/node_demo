const express = require('express')
const router = express.Router()
const TodoModel = require('../db/model/todoModel')
const getId = require('./common')

//添加
router.post('/addTodo',async (req,res) => {
	const { title,content,deadline } = req.body
	try{
		if(!title) throw new Error('请填写标题')
	}catch(err){
		res.send({ status: 0, success: false, msg: err.message})
	}
	try{
		//const todo_id = await getId('todo_id')
		await TodoModel.create({title,content,deadline})
		res.send({ status: 1, success: true, msg: '添加成功'})
	}catch(err){
		res.send({ status: 0, success: false, msg: '添加失败'})
	}
})

//获取列表
router.get('/getTodoList',async (req,res) =>{
	const {pageSize,page} = req.query
	try{
		const data =await TodoModel.find({}).limit(Number(pageSize)).skip(Number(page - 1) * pageSize)
		res.send({ status: 1, success: true, msg:'请求成功',data })
	}catch(err){
		res.send({ status: 0, success: false, msg:'请求失败',data: [] })
	}
})

//编辑
router.put('/updateTodo',async (req,res) =>{
	const { title, content, deadline, id } = req.body
	const updateData = {title, content, deadline}
	try{
		await TodoModel.findOneAndUpdate({_id: id},updateData)
		res.send({ status: 1, success: true, msg:'修改成功' })
	}catch(err){
		res.send({ status: 0, success: false, msg:'修改失败' })
	}
})

//详情
router.get('/getTodoDetail',async (req,res) =>{
	const { id } = req.query
	try{
		const data = await TodoModel.findOne({_id: id})
		res.send({ status: 1, success: true, msg:'请求成功',data })
	}catch(err){
		res.send({ status: 0, success: false, msg:'请求失败',data: {} })
	}
})

//删除
router.delete('/deleteTodo',async (req,res) => {
	const {id} = req.query
	try{
		await TodoModel.remove({_id: id})
		res.send({ status: 1, success: true, msg:'删除成功' })
	}catch(err){
		res.send({ status: 0, success: false, msg:'删除失败' })
	}
})


module.exports = router