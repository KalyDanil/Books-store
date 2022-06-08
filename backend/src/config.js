require('dotenv').config();

const database = JSON.parse(process.env.DATABASE);
const port = process.env.PORT;
const tokenKey = process.env.TOKENKEY;
const saltRounds = +process.env.SALTROUNDS;
const expiresIn = +process.env.EXPIRESIN;

module.exports = {
    database,
    port,
    tokenKey,
    saltRounds,
    expiresIn
}

