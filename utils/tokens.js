const jwt = require('jsonwebtoken')

class Tokens{
    static async VerifyToken(req,res,next){
        let reqBody = req.body
        let token = reqBody.accessToken || req.query.accessToken || req.headers['access-token'] || req.cookies.accessToken
        if(token){
            //存在token解析token
            await jwt.verify(token,'client',async (err,decoded) => {
                if(err){
                    res.send({ status: 0, success: false, msg: '当前用户未登录，请重新登录', data:{
                        islogin: false,
                        userInfo: {}
                    }})
                }else{
                    let userInfo = await UserModel.findOne({
                        where: {uid: decoded.uid},
                    })
                    if(userInfo){
                        req.islogin = true
                        req.userInfo = userInfo
                    }else{
                        req.islogin = false
                        req.userInfo = {}
                    }
                    next()
                }
            })
        }else{
            res.send({ status: 0, success: false, msg: '当前用户未登录，请重新登录', data:{
                islogin: false,
                userInfo: {}
            }})
        }
    }

    static setToken(time,data){
        return jwt.sign({...data},'client',{
            expiresIn: time
        })
    }
}

module.exports = Tokens