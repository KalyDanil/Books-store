const db = require("../database/models/index");
const { Op } = require("sequelize");

const { models } = db.sequelize;

async function makeComment (req, res){
    try {
        const {
            bookId,
            userId,
            comment,
            commentDate
        } = req.body;

        if(!userId && !bookId && !comment && !commentDate) {
            res.status(401);
        }

        const user = await models.User.findByPk(userId);
        
        models.Comment.create({
            BookId: bookId,
            comment: comment, 
            UserId: user.id, 
            avatar: user.avatar, 
            commentator: user.fullName,
            createdAt: commentDate
        })
       
        res.status(200).send('Ok');
    } catch(err) {
        console.log(err);
        res.status(500);
    }   
}

module.exports = {
    makeComment,
}