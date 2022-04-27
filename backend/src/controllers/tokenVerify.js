const jwt = require('jsonwebtoken');
const tokenKey = '1c2b-3c4d-5a6f-4g8h';

module.exports = function tokenVerify (req, res, next) {
    try {
        if(req.query.token === undefined) {
            
            const token = req.body.token;
            if(!token) {
                res.send("Log in.")
            }
            jwt.verify(
                token,
                tokenKey,
                (err,decoded) => {
                    if (err) { return res.send("Log in.")}
                    req.decoded = decoded;
                    next()
                }
            )
        } else {
            const token = req.query.token;
            if(!token) {
                res.send("Log in.")
            }
            jwt.verify(
                token,
                tokenKey,
                (err,decoded) => {
                    if (err) { return res.send("Log in.")}
                    req.decoded = decoded;
                    next()
                }
            )
        }
    } catch(err) {
         console.log(err);
    }
}