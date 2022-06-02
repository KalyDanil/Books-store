const db = require("../database/models/index");
const bcrypt = require('bcryptjs');

const { models } = db.sequelize;

function edit (req, res){
    try {
        const {
            email,
            fullName
        } = req.body;

        if(!email && !fullName) {
            res.status(401).json({ error: true, message: 'Missing required body parameters' });
        }

        const id = req.decoded.id;  
        if(email !== undefined) {
            const mailDogIndex = email.indexOf('@');
            const mailPointIndex = email.indexOf('.');
    
            if(mailDogIndex === -1 || mailPointIndex === -1) {
                return res.send('Such emails are not exist.');
            }
        }
    
        db.sequelize.models.User.update({ 
            fullName: fullName,
            email: email
         }, {
            where: {
              id: id
            }
        })
        res.status(200).send('User are updated.');
    } catch(err) {
        console.log(err);
        res.status(401);
    }   
}

async function editPassword (req, res){
    try {
        const {
            oldPassword,
            newPassword
        } = req.body;

        if(!oldPassword && !newPassword) {
            res.status(401).json({ error: true, message: 'Missing required body parameters' });
        }

        const id = req.decoded.id;
        const user = await models.User.findByPk(id);

        if(!bcrypt.compareSync(oldPassword, user.password)) {
            return res.send('Wrong old password.')
        }

        const passwordLen = newPassword.length;
        const symbolArr = ['1','2','3','4','5', '6', '7', '8', '9', '-', '_', '!', '?', '$', '%', '+', '=', '/', '|', '@', '#', '№'];
        let numberOfSymbol = 0;
        let numberOfCapitalLetter = 0;

        for (let letter of newPassword) {

            if(symbolArr.indexOf(letter) !== -1) {
                numberOfSymbol +=1;
            }
    
            if(letter.toUpperCase() === letter) {
                numberOfCapitalLetter += 1;
            }
        }

        if(passwordLen < 6 || numberOfSymbol === 0 || numberOfCapitalLetter === 0) {
            return res.send('Сancel. Password must have at least one capital letter, one symbol from (-, _, +, =, !, ?, %, /, |, @, #, $, №) or one number, and its length must be at least 6.');
        }
            
        models.User.update({ 
            password: bcrypt.hashSync(newPassword, 8)
            }, {
            where: {
                id: id
            }
        })
        return res.status(200).send('Password are updated.');
    } catch(err) {
        console.log(err);
        res.status(401);
    }
}

async function delet (req, res){
    try {
        const id = req.decoded.id;
        const user = await models.User.destroy({
            where: {
              id: id
            }
        })
        if (user !== null) {res.status(200).send('User is deleted.')}
        else {res.send('User is not found.')}
    } catch(err) {
        console.log(err);
        res.status(401)
    }
}

async function uploadAvatar (req, res) {
    try {
        const id = req.decoded.id;
        const image = req.file.filename;

        if(!image) {
            res.status(401).json({ error: true, message: 'Missing required file parameter' });
        }

        db.sequelize.models.User.update({ 
            avatar: image
            }, {
            where: {
                id: id
            }
        })
        res.status(200).send('ok')
    } catch(err) {
        console.log(err);
        res.send("Ошибка при загрузке файла.")
    }
    
}

module.exports = {
    edit,
    editPassword,
    delet,
    uploadAvatar
}