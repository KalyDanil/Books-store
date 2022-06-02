const db = require("../database/models/index");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const tokenKey = '1c2b-3c4d-5a6f-4g8h';

const { models } = db.sequelize;

async function registration(req, res) {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email && !password) {
            res.status(401).json({ error: true, message: 'Missing required body parameters' });
        }

        const symbolArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '_', '!', '?', ',', '.', '$', '%', '+', '=', '/', '|', '@', '#', '№'];
        const mailDogIndex = email.indexOf('@');
        const mailPointIndex = email.indexOf('.');
        if (mailDogIndex === -1 || mailPointIndex === -1) {
            return res.status(401).send('Such emails are not exist.');
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
            return res.status(401).send('Сancel. Password must have at least one capital letter, one symbol from (- _ + = ! ? % / | @ # $ № . ,) or one number, and its length must be at least 6.');
        }

        const user = await models.User.create({
            email: email,
            password: bcrypt.hashSync(password, 8)
        });

        delete user.dataValues.password;
        delete user._previousDataValues.password;
        user.dataValues.token = jwt.sign({ id: user.id }, tokenKey, { expiresIn: 60 * 6000 });

        res.status(200).send(user);
    } catch (err) {
        console.log(err);
    }
}

async function authorization(req, res) {
    try {
        const {
            email,
            password
        } = req.query;

        if (!email && !password) {
            res.status(401).json({ error: true, message: 'Missing required query parameters' });
        }

        const user = await models.User.findOne({
            where: {
                email: email,
            }
        });

        if (user && bcrypt.compareSync(password, user.password)) {
            delete user.dataValues.password;
            delete user._previousDataValues.password;
            user.dataValues.token = jwt.sign({ id: user.id }, tokenKey, { expiresIn: 60 * 6000 });
            res.status(200).json(user);
        } else { res.status(401).json("Wrong email or password.") }
    } catch (err) {
        console.log(err);
        res.send(err)
    }
}

function authorizationByToken(req, res) {
    try {
        const id = req.decoded.id;
        const getUser = async () => {
            const user = await models.User.findByPk(id,
                { attributes: { exclude: ['password'] } }
            );

            res.status(200).send(user);
        };
        return getUser();
    } catch (err) {
        console.log(err);
        res.send('Log in.');
    }
}

module.exports = {
    registration,
    authorization,
    authorizationByToken,
}