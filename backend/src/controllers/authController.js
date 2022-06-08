const db = require("../database/models/index");
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcryptjs');

const { models } = db.sequelize;

async function registration(req, res) {
    try {
        const {
            email,
            password
        } = req.body;

        const salt = bcrypt.genSaltSync(config.saltRounds);

        if (!email && !password) {
            return res.status(401).json({ error: true, message: 'Missing required body parameters' });
        }

        const symbolArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '_', '!', '?', ',', '.', '$', '%', '+', '=', '/', '|', '@', '#', '№'];
        const mailDogIndex = email.indexOf('@');
        const mailPointIndex = email.indexOf('.');
        if (mailDogIndex === -1 || mailPointIndex === -1) {
            return res.status(401).json('Such emails are not exist.');
        }

        const passwordLen = password.length;
        let numberOfSymbol = 0;
        let numberOfCapitalLetter = 0;
        for (let letter of password) {

            if (symbolArr.indexOf(letter) !== -1) {
                numberOfSymbol += 1;
            }

            if (letter.toUpperCase() === letter) {
                numberOfCapitalLetter += 1;
            }
        }
        if (passwordLen < 6 || numberOfSymbol === 0 || numberOfCapitalLetter === 0) {
            return res.status(401).json('Сancel. Password must have at least one capital letter, one symbol from (- _ + = ! ? % / | @ # $ № . ,) or one number, and its length must be at least 6.');
        }

        const user = await models.User.create({
            email: email,
            password: bcrypt.hashSync(password, salt)
        });

        const answer = JSON.parse(JSON.stringify(user))
        delete answer.password
        answer.token = jwt.sign({ id: user.id }, config.tokenKey, { expiresIn: config.expiresIn });
    
        return res.status(200).json(answer);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: true, message: err.message });
    }
}

async function authorization(req, res) {
    try {
        const {
            email,
            password
        } = req.query;

        if (!email && !password) {
            return res.status(401).json({ error: true, message: 'Missing required query parameters' });
        }

        const user = await models.User.findOne({
            where: {
                email: email,
            }
        });
      
        if (user && bcrypt.compareSync(password, user.password)) {
            const answer = JSON.parse(JSON.stringify(user))
            delete answer.password
            answer.token = jwt.sign({ id: user.id }, config.tokenKey, { expiresIn: config.expiresIn });
            return res.status(200).json(answer);
        } else { res.status(401).json("Wrong email or password.") }
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: true, message: err.message });
    }
}

function authorizationByToken(req, res) {
    try {
        const id = req.decoded.id;
        const getUser = async () => {
            const user = await models.User.findByPk(id,
                { attributes: { exclude: ['password'] } }
            );

            return res.status(200).json(user);
        };
        return getUser();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: true, message: 'Log in.' });
    }
}

module.exports = {
    registration,
    authorization,
    authorizationByToken,
}