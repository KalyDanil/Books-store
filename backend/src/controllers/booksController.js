const db = require("../../database/models/index");

async function getAllBooks (req, res){
    try {
        const books = await db.sequelize.models.Book.findAll({raw:true})
        res.send(books);
    } catch(err) {
        console.log(err);
        res.status(500);
    }   
}

module.exports = {
    getAllBooks,
}