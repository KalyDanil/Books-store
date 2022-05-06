const jwt = require('jsonwebtoken');
const tokenKey = '1c2b-3c4d-5a6f-4g8h';

module.exports = function tokenVerify (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
            if(!token) {
                console.log('Log in.')
                res.send("Log in.")
            }
            jwt.verify(
                token,
                tokenKey,
                (err,decoded) => {
                    if (err) { console.log('Log in.'); return res.send("Log in.") }
                    req.decoded = decoded;
                    next()
                }
            )
    } catch(err) {
         console.log(err);
    }
}