const jwt = require('jsonwebtoken')

module.exports = (app) => {
  app.use((req,res,next) =>{
    //排除登录注册
    if(req.url !== '/user/register' && req.url !== '/user/signin' && req.url !== '/captcha/getCaptcha' && req.url !== '/test'){
      //不同形式获取token
      let token = req.headers.token || req.query.token || req.body.token
      //如果存在token 验证
      if(token){
        jwt.verify(token,'client',(err,decoded) =>{
          if(err){
            res.send({ status: 0, success: false, msg: '没有找到token' })
          }else{
            req.decoded = decoded
            next()
          }
        })
      }else{
        res.send({ status: 0, success: false, msg: '你还没有登录，请登录!' })
      }
    }else{
      next()
    }
  })
}