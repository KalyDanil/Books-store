const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function tokenVerify(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      console.log('Log in.')
      return res.status(401).json("Log in.")
    }
    jwt.verify(
      token,
      config.tokenKey,
      (err, decoded) => {
        if (err) { return res.json("Log in.") }
        req.decoded = decoded;
        next()
      }
    )
  } catch (err) {
    console.log(err);
  }
}