const crypto = require('crypto');

function Md5 (password){
  const md5 = crypto.createHash('md5');
  return md5.update(password).digest('base64');
}

function encryption(password){
  const newPassword = Md5(Md5(password).substr(2,7) + Md5(password))
  return newPassword
}

module.exports = encryption