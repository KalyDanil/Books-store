const db = require("../database/models/index");
const { Op } = require("sequelize");

const { models } = db.sequelize;

async function addBookToCart (req, res){
    try {
        const {
            userId,
            bookId,
        } = req.body;

        if(!userId && !bookId) {
            res.status(401).json({ error: true, message: 'Missing required body parameters' });
        }

        const [user, created] = await models.CartBook.findOrCreate({
            where: {
                BookId: bookId,
                UserId: userId
            },
        });

        res.status(200).send('ok');
    } catch(err) {
        console.log(err);
        res.status(500);
    }   
}

async function changeBooksAmount (req, res){
    try {
        const {
            userId,
            bookId,
            amount,
        } = req.body;

        if(!userId && !bookId && !amount) {
            res.status(401).json({ error: true, message: 'Missing required body parameters' });
        }

        await models.CartBook.update({ 
            amount: amount,
            }, {
            where: {
                BookId: bookId,
                UserId: userId
            }
        })

        res.status(200).send('ok');
    } catch(err) {
        console.log(err);
        res.status(500);
    }   
}

async function deleteBookFromCart (req, res){
    try {
        const {
            userId,
            bookId,
        } = req.body;

        if(!userId && !bookId) {
            res.status(401).json({ error: true, message: 'Missing required body parameters' });
        }

        const cartBook = await models.CartBook.destroy({
            where: {
                BookId: bookId,
                UserId: userId
            },
        });

        res.status(200).send('ok');
    } catch(err) {
        console.log(err);
        res.status(500);
    }   
}

async function getCartBooks (req, res){
    try {
        const {
            userId,
        } = req.query;
        
        if(!userId) {
            res.status(401).json({ error: true, message: 'Missing required query parameters' });
        }

        const user = await models.User.findOne({
            include: [
                {
                    model: models.Book,
                    as: 'CartBooks',
                    attributes: {exclude: ['password']},
                    through: {
                        attributes: ['amount']
                    }
                },
            ],
            where: {id: userId},
            order: [
                [{ model: models.Book, as: 'CartBooks' }, 'name']
            ]
        });
        
        res.status(200).send(user.CartBooks);
    } catch(err) {
        console.log(err);
        res.status(500);
    }   
}

module.exports = {
    addBookToCart,
    changeBooksAmount,
    deleteBookFromCart,
    getCartBooks,
}