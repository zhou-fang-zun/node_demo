const mongoose = require('mongoose')

const idsSchema = new mongoose.Schema({
	admin_id: Number,
	todo_id: Number
})

const Ids = mongoose.model('Ids',idsSchema)

Ids.findOne((err,data) =>{
	if(!err){
		const newIds = new Ids({
			admin_id: 0,
			todo_id: 0
		})
		newIds.save()
	}
})

module.exports = Ids