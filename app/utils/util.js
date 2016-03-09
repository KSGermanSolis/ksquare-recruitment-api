/**
 * Created by gsolis on 3/8/16.
 */
var uuid = require('node-uuid'),
  bcrypt = require('bcrypt-nodejs'),
  jwt = require('jsonwebtoken');

function newId(){
  return uuid.v4();
}

function generateToken(obj){
  var signObj = {};
  for(var property in obj){
    signObj[property] = obj[property];
  }
  var token = jwt.sign(signObj, process.env.JWT_SECRET);
  return  token;
}

function verifyToken(token, callback){
  jwt.verify(token, process.env.JWT_SECRET, callback);
}

function encryptPassword(password, salt){
  salt = salt ? salt : bcrypt.genSaltSync();
  var encryptedPassword = bcrypt.hashSync(password, salt);
  return { salt: salt, encryptedPassword: encryptedPassword };
}

function comparePassword(password, salt, encryptedPassword){
  var encryptedPassSalt = this.encryptPassword(password, salt);
  return encryptedPassword === encryptedPassSalt.encryptedPassword;
}

module.exports = {
  newId: newId,
  generateToken: generateToken,
  verifyToken: verifyToken,
  encryptPassword: encryptPassword,
  comparePassword: comparePassword
};