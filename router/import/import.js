const express = require('express')
const router = express.Router()
const xlsx = require('node-xlsx')
const uuid = require('node-uuid')
const ProModel = require('../../db/import/proModel')
const filestr = 'F:/workspace/node_demo/shop.xlsx'

router.post('/importPro',async (req,res) =>{
  //1.获取表格信息
  let obj = xlsx.parse(filestr)[0].data
  let arr = []
  //2.遍历数据---排除第一条数据(因为是标题)
  obj.map((item,index) =>{
    if(index !== 0) {
      //3.生成产品id插入数据库
      arr.push({
        proid: 'pro_' + uuid.v1(),
        type: item[0],
        brand: item[1],
        barnding: item[2],
        proname: item[3],
        price: item[4],
        flag: item[5],
        proimg: item[6],
        note: item[7],
      })
    }
  })

  await ProModel.insertMany(arr)
  res.send({ status: 1, success: true, msg: '上传成功'})
})

router.get('/getProList',async (req,res) =>{
  const data = await ProModel.find({})
  console.log(data,'data')
  res.send({ status: 1, success: true, msg: '获取成功', data})
})

module.exports = router