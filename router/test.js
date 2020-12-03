const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.get('/test',(req,res)=>{
  console.log('Cookies: ', req.cookies)
  console.log('Signed Cookies: ', req.signedCookies)
  res.json({Cookies: req.cookies, SignedCookies: req.signedCookies,token: jwt.sign( {account: 'abcd'}, 'shhhhh')})
})

module.exports = router