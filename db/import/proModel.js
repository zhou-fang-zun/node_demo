const mongoose = require('mongoose')

const proSchema = new mongoose.Schema({
  proid: String,
  type: String,
  brand: String,
  barnding: String,
  proname: String,
  price: Number,
  flag: Number,
  proimg: String,
  note: String,
})

module.exports = mongoose.model('pro',proSchema)