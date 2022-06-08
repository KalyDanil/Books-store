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
            return res.status(401).json({ error: true, message: 'Missing required body parameters' });;
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
       
        return res.status(200).json('Comment was created');
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: true, message: err.message });
    }   
}

module.exports = {
    makeComment,
}