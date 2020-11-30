const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  id: Number,
  postName: String,
  postGrade: Number,  //0：总裁  1:经理  2:员工 
})

postSchema.index({id:1})

const post = mongoose.model('position',postSchema)

module.exports = post