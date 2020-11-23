const express = require('express')
const router = express.Router()
const foodModel = require('../db/model/foodModel')

router.post('/add',(req,res)=>{
	let {name,price,desc,typename,typeid,img} = req.body
	//判断参数是否正确
	foodModel.find({name})
	.then((data)=>{
		if(data.length === 0){
			return foodModel.insertMany({name,price,desc,typename,typeid,img})
		}else{
			res.send({err:-3,msg:'商品名已存在'})
		}
	})
	.then((data)=>{
		res.send({err:0,msg:'添加成功'})
	})
	.catch(()=>{
		res.send({err:-1,msg:'添加失败'})
	})
})

//获取
router.post('/getFoodlist',(req,res)=>{
	let {pageSize,page} = req.body
	
	foodModel.find({}).limit(Number(pageSize)).skip(Number(page-1)*pageSize)
	.then((data)=>{
		res.send({err:0,msg:'获取成功',info:data})
	})
})

//查询分类
router.post('/getInfoByType',(req,res)=>{
	//let typeid = 4
	let {typeid} = req.body
	foodModel.find({typeid})
	.then((data)=>{
		res.send({err:0,msg:'查询ok',list:data})
	})
	.catch(()=>{
		res.send({err:-1,msg:'查询失败'})
	})
})


//关键字查询
router.post('/getInfoByKw',(req,res)=>{
	//$set $gte $or $and $regex  regexp
	 let {kw} = req.body
	 let reg = new RegExp(kw)   //创建一个正则表达式  匹配关键字
	 
	 //foodModel.find({age:{$gte:16}})
	 //foodModel.find({name:{$regex:reg}})   //名字模糊查询
	 
	 foodModel.find({$or:[{name:{$regex:reg}},{desc:{$regex:reg}}]})   //名字与描述模糊查询
	 .then((data)=>{
		 res.send({err:0,msg:'查询ok',list:data})
	 })
	 .catch(()=>{
		 res.send({err:-1,msg:'查询失败'})
	 })
})


//删除
router.post('/del',(req,res)=>{
	let {_id} = req.body
	//多个删除
	//foodModel.remove({_id:[id1,id2,id3]})
	//单个删除
	foodModel.remove({_id})
	.then((data)=>{
		res.send({err:0,msg:'删除成功'})
	})
	.catch(()=>{
		res.send({err:-1,msg:'删除失败'})
	})
})


//修改
router.post('/update',(req,res)=>{
	let {name,price,desc,typename,typeid,img} = req.body
	 foodModel.update({_id},{name,price,desc,typename,typeid,img})
	 .then((data)=>{
		 res.send({err:0,msg:'修改成功'})
	 })
	 .catch(()=>{
		 res.send({err:-1,msg:'修改失败'})
	 })
})


//分页查询
router.post('/getInfoByPage',(req,res)=>{
	let pageSize = req.body.pageSize || 5  //设置默认值
	let page = req.body.page || 1
	let count = 0
	foodModel.find()
	.then((list)=>{
		count = list.length
		return foodModel.find().limit(Number(pageSize)).skip(Number((page-1)*pageSize))
	})
	.then((data)=>{
			 //res.send({err:0,msg:'查询成功',list:data})
			 res.send({err:0,msg:'查询成功',info:{
				 count,
				 allpage:Math.ceil(count/pageSize),
				 list:data
			 }})
	})
	.catch(()=>{
			 res.send({err:-1,msg:'查询失败'})
	})
})

module.exports = router