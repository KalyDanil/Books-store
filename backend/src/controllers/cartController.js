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
            return res.status(401).json({ error: true, message: 'Missing required body parameters' });
        }

        const [user, created] = await models.CartBook.findOrCreate({
            where: {
                BookId: bookId,
                UserId: userId
            },
        });

        return res.status(200).json('Book was added');
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: true, message: err.message });
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
            return res.status(401).json({ error: true, message: 'Missing required body parameters' });
        }

        await models.CartBook.update({ 
            amount: amount,
            }, {
            where: {
                BookId: bookId,
                UserId: userId
            }
        })

        return res.status(200).json('Amount of book was changed');
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: true, message: err.message });
    }   
}

async function deleteBookFromCart (req, res){
    try {
        const {
            userId,
            bookId,
        } = req.body;

        if(!userId && !bookId) {
            return res.status(401).json({ error: true, message: 'Missing required body parameters' });
        }

        const cartBook = await models.CartBook.destroy({
            where: {
                BookId: bookId,
                UserId: userId
            },
        });

        return res.status(200).json('Book was deleted');
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: true, message: err.message });
    }   
}

async function getCartBooks (req, res){
    try {
        const {
            userId,
        } = req.query;
        
        if(!userId) {
            return res.status(401).json({ error: true, message: 'Missing required query parameters' });
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
        
        return res.status(200).json(user.CartBooks);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: true, message: err.message });
    }   
}

module.exports = {
    addBookToCart,
    changeBooksAmount,
    deleteBookFromCart,
    getCartBooks,
}