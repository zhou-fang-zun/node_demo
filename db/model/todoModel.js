const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  title: String,
  id: Number,
  content: String,
  deadline: Date
})
todoSchema.index({id: 1})

const todo = new mongoose.model('Todos',todoSchema)

module.exports = todo