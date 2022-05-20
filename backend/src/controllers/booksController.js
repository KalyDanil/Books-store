const db = require("../../database/models/index");
const { Op } = require("sequelize");

async function getAllBooks (req, res){
    try {
        const {
            genres: selectedGenres,
            minPrice,
            maxPrice,
            search = '',
            sortBy = 'name',
            page = '1',
            limit,
            userId
        } = req.query
        const offset = ((+page) - 1) * (+limit);
       
        const books = await db.sequelize.models.Book.findAll({
            include: [
                {
                  model: db.sequelize.models.Genre,
                  where: selectedGenres? {id: selectedGenres} : {}
                },
                {
                    model: db.sequelize.models.User,
                    through: {
                      attributes: ['rating']
                    }
                },
                {
                    model: db.sequelize.models.User,
                    as: 'UserLikedBooks',
                    through: {
                        where: {UserId: userId}
                    }
                },
            ],
            where: {
                price: {
                    [Op.between]: [+minPrice, +maxPrice],
                },
                [Op.or]: 
                 [
                    {name: {
                        [Op.like]: `%${search}%`
                    }},
                    {authorname: {
                        [Op.like]: `%${search}%`
                    }}
                ]
            },
            order: [
                [sortBy]
            ],
            offset: offset,
            limit: +limit,
        });

        const {count, rows} = await db.sequelize.models.Book.findAndCountAll({
            include: [
                {
                  model: db.sequelize.models.Genre,
                  where: selectedGenres? {id: selectedGenres} : {}
                },
                {
                    model: db.sequelize.models.User,
                    as: 'UserLikedBooks',
                    through: {
                        where: {UserId: userId}
                    }
                },
            ],
            where: {
                price: {
                    [Op.between]: [+minPrice, +maxPrice],
                },
                [Op.or]: 
                 [
                    {name: {
                        [Op.like]: `%${search}%`
                    }},
                    {authorname: {
                        [Op.like]: `%${search}%`
                    }}
                ]
            },
            order: [
                [sortBy]
            ],
            offset: offset,
            limit: +limit,
        });
        res.send({books: books, booksCount: count});
        return
    } catch(err) {
        console.log(err);
        res.status(500);
    }   
}

async function getAllLikedBooks (req, res){
    try {
        const {
            page = '1',
            limit,
            userId
        } = req.query
        const offset = ((+page) - 1) * (+limit);
        const books = await db.sequelize.models.Book.findAll({
            include: [
                {
                    model: db.sequelize.models.User,
                    through: {
                      attributes: ['rating']
                    }
                },
                {
                    model: db.sequelize.models.User,
                    as: 'UserLikedBooks',
                    where: {id: userId},
                },
            ],
            offset: offset,
            limit: +limit,
        });

        const { count, rows} = await db.sequelize.models.Book.findAndCountAll({
            include: [
                {
                    model: db.sequelize.models.User,
                    as: 'UserLikedBooks',
                    where: {id: userId},
                },
            ],
        });
        res.send({books: books, booksCount: count});
    } catch(err) {
        console.log(err);
        res.status(500);
    }   
}

async function getAllGenres (req, res){
    try {
        const genres = await db.sequelize.models.Genre.findAll({raw:true});
        res.send(genres);
    } catch(err) {
        console.log(err);
        res.status(500);
    }   
}

async function getMinMaxPrice (req, res){
    try {
        const price = await db.sequelize.models.Book.findAll({
            attributes: ['price'],
        });
        price.sort(function(a, b) { return a.price - b.price; });
        const minPrice = price[0].price;
        price.sort(function(a, b) { return - a.price + b.price; });
        const maxPrice = price[0].price;
        res.send({minPrice: minPrice, maxPrice: maxPrice});
    } catch(err) {
        console.log(err);
        res.status(500);
    }   
}

async function getSelectedBook (req, res){
    try {
        const {
            bookId,
            userId,
        } = req.query;
        const book = await db.sequelize.models.Book.findOne({
            include: [
                {
                    model: db.sequelize.models.User,
                    through: {
                      attributes: ['rating'],
                    }
                },
                {
                    model: db.sequelize.models.Comment,
                    include: [
                        {
                            model: db.sequelize.models.User,
                            attributes: ['fullName', 'avatar'],
                        },
                    ],
                },
                {
                    model: db.sequelize.models.User,
                    as: 'UserLikedBooks',
                    through: {
                        where: {UserId: +userId}
                    }
                }, 
            ],
            where: {id: +bookId},
        });

        if(+userId !== 0) {
            try {
                const user = await book.getUsers({
                    where: {id: +userId} 
                });
                const answer = {
                    book,
                    comments: book.Comments,
                    userRating: user[0].UserBook.rating
                }
                res.send(answer);
                return
            } catch(err) {}     
        }

        const answer = {
            book,
            comments: book.Comments,
        }
        res.send(answer);
    } catch(err) {
        console.log(err);
        res.status(500);
    }   
}

async function getRecommendedBooks (req, res){
    try {
        const {
            limit,
            userId,
            bookId,
        } = req.query;
        const genresId = [];
        const likedbooksId = [];
        
        const likedBooks = await db.sequelize.models.Book.findAll({
            include: [
                {
                    model: db.sequelize.models.Genre,
                },
                {
                    model: db.sequelize.models.User,
                    as: 'UserLikedBooks',
                    where: {id: userId},
                },
            ],
            offset: 0,
            limit: limit,
        });

        likedBooks.map((item) => {
            for(let i = 0; i < item.Genres.length; i++) {
                genresId.push(item.Genres[i].id);
                likedbooksId.push(item.id);
            }
        })

        const recommendations = await db.sequelize.models.Book.findAll({
            include: [
                {
                    model: db.sequelize.models.Genre,
                    where: {id: genresId}
                },
                {
                    model: db.sequelize.models.User,
                    through: {
                      attributes: ['rating']
                    }
                },
                {
                    model: db.sequelize.models.User,
                    as: 'UserLikedBooks',
                },
            ],
            where: {
                id: {
                    [Op.notIn]: likedbooksId, 
                    [Op.ne]: bookId} 
            },
            offset: 0, 
            limit: limit, 
        });
        res.send(recommendations); 
    } catch(err) {
        console.log(err);
        res.status(500);
    }   
}

async function changeRating(req, res) {
    try {
        const {
            bookId,
            userId,
            rating,
        } = req.body;
        const book = await db.sequelize.models.Book.findByPk(bookId);
        const user = await db.sequelize.models.User.findByPk(userId);
        book.addUser(user, {through:{rating: rating}})
        res.send('Ok');
    } catch(err) {
        console.log(err);
        res.status(500);
    } 
}

async function makeComment (req, res){
    try {
        const {
            bookId,
            userId,
            comment,
            commentDate
        } = req.body;
        const book = await db.sequelize.models.Book.findByPk(bookId);
        const user = await db.sequelize.models.User.findByPk(userId);
        book.createComment({
            comment: comment, 
            UserId: user.id, 
            avatar: user.avatar, 
            commentator: user.fullName,
            createdAt: commentDate
        });
        res.send('Ok');
    } catch(err) {
        console.log(err);
        res.status(500);
    }   
}

async function addBookToCart (req, res){
    try {
        const {
            userId,
            bookId,
            amount = 1,
        } = req.body;
        const book = await db.sequelize.models.Book.findByPk(bookId);
        const user = await db.sequelize.models.User.findByPk(userId);
        book.addUser(user, {through:{inCart: amount}});
        res.send('ok');
    } catch(err) {
        console.log(err);
        res.status(500);
    }   
}

async function toLikeBook (req, res){
    try {
        const {
            userId,
            bookId,
            like = false,
        } = req.body;
        const book = await db.sequelize.models.Book.findByPk(bookId);
        const user = await db.sequelize.models.User.findByPk(userId);

        if(like === false) {
            book.removeUserLikedBooks(user);
            res.send('ok');
            return
        }

        book.addUserLikedBooks(user);
        res.send('ok');
        
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
        const user = await db.sequelize.models.User.findOne({
            include: [
                {
                    model: db.sequelize.models.Book,
                    through: {
                      attributes: ['inCart'],
                      where: {inCart: {[Op.gt]: 0}},
                    }
                },
            ],
            where: {id: userId},
        });
        res.send(user.Books);
    } catch(err) {
        console.log(err);
        res.status(500);
    }   
}

module.exports = {
    getAllBooks,
    getAllLikedBooks,
    getAllGenres,
    getSelectedBook,
    getRecommendedBooks,
    makeComment,
    getMinMaxPrice,
    changeRating,
    addBookToCart,
    getCartBooks,
    toLikeBook,
}