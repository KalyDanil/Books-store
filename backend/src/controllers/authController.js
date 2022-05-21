const db = require("../../database/models/index");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const tokenKey = '1c2b-3c4d-5a6f-4g8h';

async function registration (req, res) {
    try {
        const symbolArr = ['1','2','3','4','5', '6', '7', '8', '9', '-', '_', '!', '?', ',', '.', '$', '%', '+', '=', '/', '|', '@', '#', '№'];
        const mailDogIndex = req.body.email.indexOf('@');
        const mailPointIndex = req.body.email.indexOf('.');
        if(mailDogIndex === -1 || mailPointIndex === -1) {
            return res.status(401).send('Such emails are not exist.');
        }

        const passwordLen = req.body.password.length;
        let numberOfSymbol = 0;
        let numberOfCapitalLetter = 0;
        for (let letter of req.body.password) {

            if(symbolArr.indexOf(letter) !== -1) {
                numberOfSymbol +=1;
            }

            if(letter.toUpperCase() === letter) {
                numberOfCapitalLetter += 1;
            }
        }
        if(passwordLen < 6 || numberOfSymbol === 0 || numberOfCapitalLetter === 0) {
            return res.status(401).send('Сancel. Password must have at least one capital letter, one symbol from (- _ + = ! ? % / | @ # $ № . ,) or one number, and its length must be at least 6.');
        }

        const users0 = await db.sequelize.models.User.create({
            email: req.body.email,
            password: crypto
            .createHmac('sha256', 'salt')
            .update(req.body.password)
            .digest('hex')
        });
        const user = {
            id: users0.id,
            email: users0.email,
            createdAt: users0.createdAt,
            updatedAt: users0.updatedAt,
            token: jwt.sign({ id: users0.id }, tokenKey, { expiresIn: 60 * 6000 }),
        };
        res.send(user);
    } catch(err) {
        console.log (err);
    }
}

async function authorization (req, res){
    try {
        const user0 = await db.sequelize.models.User.findOne({
            where: {
                email: req.query.email,
                password: crypto
                .createHmac('sha256', 'salt')
                .update(req.query.password)
                .digest('hex')
            }
        });
        if(user0 !==null) {
            const user = {
                id: user0.id,
                email: user0.email,
                createdAt: user0.createdAt,
                updatedAt: user0.updatedAt,
                token: jwt.sign({ id: user0.id }, tokenKey, { expiresIn: 60 * 6000 }),
            };
            res.send(user);
        } else {res.status(401).send("Wrong email or password.")}
    } catch(err) {
        console.log (err);
        res.send(err)
    }
}

function authorizationByToken (req, res) {
    try{
        const id = req.decoded.id;
        const getUser = async () => {
            const user0 = await db.sequelize.models.User.findByPk(id);
            const user = {
                id: user0.id,
                fullName: user0.fullName,
                email: user0.email,
                avatar: user0.avatar,
                createdAt: user0.createdAt,
                updatedAt: user0.updatedAt
            };
            res.send(user);
        };
        return getUser();
    } catch(err) {
        console.log (err);
        res.send('Log in.');
    }
}

module.exports = {
    registration,
    authorization,
    authorizationByToken,
}