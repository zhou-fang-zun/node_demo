const express = require('express')
const router = express.Router()
const UserPositionModel = require('../../db/personnel/userPosition')
const getId = require('./common.js')

//新增
router.post('/addUserPost',async (req,res) =>{
  const { postName, postGrade } = req.body
  try{
    if(!postName) throw new Error('缺少职位名称')
    if(!postGrade) throw new Error('缺少职位等级')
  }catch(err){
    res.send({ status: 0, success: false, msg: err.message })
  }
  try{
    const isExist = await UserPositionModel.findOne({postName})
    if(isExist){
      res.send({ status: 0, success: false, msg: '职位已存在' })
    }else{
      const post_id = getId('post_id')
      await UserPositionModel.create({ postName, postGrade, id: post_id })
      res.send({ status: 1, success:true, msg: '新增成功' })
    }
  }catch(err){
    res.send({ status: 0, success: false, msg: '新增失败' })
  }
})

//获取列表
router.get('/getUserPostList',async (req,res) =>{
  const { pageSize,page } = req.query
  try{
    const data = await UserPositionModel.find({}).limit(Number(pageSize)).skip(Number(page - 1) * Number(pageSize))
    res.send({ status: 1, success: true, msg: '请求成功', data})
  }catch(err){
    res.send({ status: 0, success: false, msg: '请求失败', data: [] })
  }
})

//编辑
router.put('/updateUserPost',async (req,res) =>{
  const { id, postName, postGrade } = req.body
  try{
    if(!id) throw new Error('缺少id')
    if(!postName) throw new Error('缺少职位名称')
    if(!postGrade) throw new Error('缺少职位等级')
  }catch(err){
    res.send({ status: 0, success: false, msg: err.message })
  }
  try{
    await UserPositionModel.findOneAndUpdate({_id: id},{ postName, postGrade })
    res.send({ status: 1, success: true, msg: '编辑成功' })
  }catch(err){
    res.send({ status: 0, success: false, msg: '编辑失败' })
  }
})

//详情
router.get('/userPostDetail',async (req,res) =>{
  const { id } = req.query
  try{
    if(!id){
      res.send({ status: 0, success: false, msg: '缺少id', data: {} })
    }else{
      const data = await UserPositionModel.findOne({ _id: id })
      res.send({ status: 1, success: true, msg: '请求成功', data })
    }
  }catch(err){
    res.send({ status: 0, success: false, msg: '请求失败', data: {} })
  }
})

//删除
router.delete('deleteUserPost',async (req,res) =>{
  const { id } = req.query
  try{
    if(!id){
      res.send({ status: 0, success: false, msg: '缺少id' })
    }else{
      await UserPositionModel.remove({ _id: id })
      res.send({ status: 1, success: true, msg: '删除成功' })
    }
  }catch(err){
    res.send({ status: 0, success: false, msg: '删除失败' })
  }
})

module.exports = router