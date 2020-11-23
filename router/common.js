const Ids = require('../db/model/ids.js')

const idList = ['admin_id']
async function getId(type){
	if (!idList.includes(type)) {
		throw new Error('id类型错误');
		return
	}
	try{
		const idData = await Ids.findOne();
		idData[type] ++ ;
		await idData.save();
		return idData[type]
	}catch(err){
		throw new Error(err)
	}
}

module.exports = getId