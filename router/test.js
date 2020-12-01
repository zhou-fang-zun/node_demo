const express = require('express')
const router = express.Router()

router.get('/test',(req,res)=>{
  console.log('Cookies: ', req.cookies)
  console.log('Signed Cookies: ', req.signedCookies)
  res.json({Cookies: req.cookies, SignedCookies: req.signedCookies})
})

module.exports = router