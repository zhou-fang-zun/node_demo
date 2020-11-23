const express = require('express')
const router - express.Router()
const Todo = require('../db/model/todoModel')

//添加
router.post('/add',(req,res) => {
	const { title,content,validate } = req.body
	Todo.insertMany({title,content,validate}).then(() => {
		res.send({ code:0, success:true, msg:'添加成功' })
	}).catch(() => {
		res.send({ code:-1, success:false, msg:'添加失败'})
	})
})

//获取列表
router.get('/todoList',(req,res) =>{
	const {pageSize,page} = req.body
	Todo.find({}).limit(Number(pageSize)).skip(Number(page - 1) * pageSize).then((data)=>{
		res.send({ code:0, success:true, msg:'请求成功',data })
	}).catch(()=>{
		res.send({ code:-1, success:false, msg:'请求失败'})
	})
})

//删除
router.post('/delete',(req,res) => {
	const {_id} = req.body
	Todo.remove({_id}).then(()=>{
		res.send({ code:0, success:true, msg:'删除成功' })
	}).catch(()=>{
		res.send({ code:-1, success:false, msg:'删除失败'})
	})
})

module.exports = router