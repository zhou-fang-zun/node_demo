const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name: {type: String, required: true},
	pwd: {type: Number, required: true},
	repwd: {type: Number, required: true},
	gender: {type: Number, required: true},
	phone: {type: Number, required: true},
	avatar: {type: String}
})

//将schema对象转化为数据模型
//该数据对象和集合关联{'集合名',schema对象}
const user = mongoose.model('user',userSchema)

module.exports = user