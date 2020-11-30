const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
  id: Number,
  departmentName: String,
  describe: String,
  phone: Number,
  address: String,
  sortValue: {type: Number,default: 0}
})

departmentSchema.index({id: 1})

const department = mongoose.model('department',departmentSchema)

module.exports = department