const express = require('express')
const router = express.Router()
const DepartmentModel = require('../../db/personnel/department')
const getId = require('./common.js')

//新增
router.post('/addDepartment',async (req,res) =>{
  const { departmentName, describe, phone, sortValue, address } = req.body
  try{
    if(!departmentName) throw new Error('缺少部门名称')
    if(!phone) throw new Error('缺少手机号')
    if(!address) throw new Error('缺少地址')
  }catch(err){
    res.send({ status: 0, success: false, msg: err.message})
  }
  try{
    const isExist = await DepartmentModel.findOne({departmentName})
    if(isExist){
      res.send({ status: 0, success: false, msg: '公司已存在'})
    }else{
      const department_id = getId('department_id')
      const postData = {departmentName, describe, phone, sortValue, address,id: department_id}
      await DepartmentModel.create(postData)
      res.send({status: 1, success: true, msg: '新增成功'})
    }
  }catch(err){
    res.send({ status: 0, success: false, msg: '新增失败'})
  }
})

//获取列表
router.get('/getDepartmentList',async (req,res) =>{
  const {pageSize,page} = req.query
  try{
    const data = await DepartmentModel.find({}).limit(Number(pageSize)).skip(Number(page -1 ) * Number(pageSize))
    res.send({status: 1, success: true, msg: '请求成功', data})
  }catch(err){
    res.send({status: 0, success: false, msg: '请求失败', data: []})
  }
})

//编辑
router.put('/updateDepartment',async (req,res) =>{
  const { id, departmentName, describe, phone, sortValue, address } = req.body
  try{
    if(!id){
      res.send({status: 0, success: false, msg: '缺少id'})
    }else{
      const postData = { departmentName, describe, phone, sortValue, address }
      await DepartmentModel.findOneAndUpdate({_id: id},postData)
      res.send({status: 1, success: true, msg: '编辑成功'})
    }
  }catch(err){
    res.send({status: 0, success: false, msg: '编辑失败'})
  }
})

//详情
router.get('/departmentDetail',async (req,res) =>{
  const { id } = req.query
  try{
    if(!id){
      res.send({status: 0, success: false, msg: '缺少id'})
    }else{
      const data = await DepartmentModel.findOne({_id: id})
      res.send({status: 1, success: true, msg: '请求成功', data})
    }
  }catch(err){
    res.send({status: 0, success: false, msg: '请求失败', data: {}})
  }
})

//删除
router.delete('/deleteDepartment',async (req,res) =>{
  const { id } = req.query
  try{
    if(!id){
      res.send({status: 0, success: false, msg: '缺少id' })
    }else{
      await DepartmentModel.remove({_id: id})
      res.send({status: 1, success: true, msg: '删除成功' })
    }
  }catch(err){
    res.send({status: 0, success: false, msg: '删除失败' })
  }
})

module.exports = router