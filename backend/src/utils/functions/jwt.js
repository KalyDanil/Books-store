const jwt = require('jsonwebtoken');
const config = require('../../config');

const jwtSign = (userId) => {
  return jwt.sign({ id: userId }, config.tokenKey, { expiresIn: config.expiresIn })
};

const jwtVerify = (token) => {
  return jwt.verify(token, config.tokenKey)
};

module.exports = {
  jwtSign,
  jwtVerify,
};