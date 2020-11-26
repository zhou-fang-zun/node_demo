const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name: String,
	pwd: String,
	id: Number,
	gender: {type: Number, default: 0},
	phone: Number,
	avatar: {type: String, default: 'default.jpg'},
	//status: Number,  //1:普通管理、 2:超级管理员
})

userSchema.index({id: 1});

//将schema对象转化为数据模型
//该数据对象和集合关联{'集合名',schema对象}
const user = mongoose.model('Users',userSchema)

module.exports = user