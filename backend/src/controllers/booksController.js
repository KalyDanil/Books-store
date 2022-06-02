const db = require("../database/models/index");
const { Op, Sequelize } = require("sequelize");

const { models } = db.sequelize;

async function getAllBooks(req, res) {
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

    if (!minPrice && !maxPrice && !limit && !userId) {
      res.status(401).json({ error: true, message: 'Missing required query parameters' });
    }

    const offset = ((+page) - 1) * (+limit);
    const books = await models.Book.findAll({
      include: [
        {
          model: models.Genre,
          where: selectedGenres ? { id: selectedGenres } : {}
        },
        {
          model: models.User,
          attributes: { exclude: ['password'] },
          through: {
            attributes: ['rating']
          }
        },
        {
          model: models.User,
          as: 'UserLikedBooks',
          attributes: { exclude: ['password'] },
          through: {
            where: { UserId: userId }
          }
        },
        {
          model: models.User,
          as: 'CartBooks',
          attributes: { exclude: ['password'] },
          through: {
            where: { UserId: userId }
          }
        },
      ],
      where: {
        price: {
          [Op.between]: [+minPrice, +maxPrice],
        },
        [Op.or]:
          [
            {
              name: {
                [Op.like]: `%${search}%`
              }
            },
            {
              authorname: {
                [Op.like]: `%${search}%`
              }
            }
          ]
      },
      order: [
        [sortBy]
      ],
      offset: offset,
      limit: +limit,
    });

    const booksCount = await models.Book.findAll({
      include: [
        {
          model: models.Genre,
          where: selectedGenres ? { id: selectedGenres } : {}
        },
        {
          model: models.User,
          as: 'UserLikedBooks',
          through: {
            where: { UserId: userId }
          }
        },
      ],
      where: {
        price: {
          [Op.between]: [+minPrice, +maxPrice],
        },
        [Op.or]:
          [
            {
              name: {
                [Op.like]: `%${search}%`
              }
            },
            {
              authorname: {
                [Op.like]: `%${search}%`
              }
            }
          ]
      },
      order: [
        [sortBy]
      ],
    });

    const price = await models.Book.findAll({
      attributes: ['price'],
    });

    price.sort(function (a, b) { return a.price - b.price; });
    const elementaryMinPrice = price[0].price;
    price.sort(function (a, b) { return - a.price + b.price; });
    const elementaryMaxPrice = price[0].price;

    const genres = await models.Genre.findAll({ raw: true });
 
    res.status(200).send({
      books: books,
      booksCount: booksCount.length,
      genres: genres,
      minPrice: elementaryMinPrice,
      maxPrice: elementaryMaxPrice
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}

async function getAllLikedBooks(req, res) {
  try {
    const {
      page = '1',
      limit,
      userId
    } = req.query

    if (!userId && !limit) {
      res.status(401).json({ error: true, message: 'Missing required query parameters' });
    }

    const offset = ((+page) - 1) * (+limit);
    const books = await models.Book.findAll({
      include: [
        {
          model: models.User,
          attributes: { exclude: ['password'] },
          through: {
            attributes: ['rating']
          }
        },
        {
          model: models.User,
          as: 'UserLikedBooks',
          attributes: { exclude: ['password'] },
          where: { id: userId },
        },
      ],
      offset: offset,
      limit: +limit,
    });

    const { count, rows } = await models.Book.findAndCountAll({
      include: [
        {
          model: models.User,
          as: 'UserLikedBooks',
          where: { id: userId },
        },
      ],
    });
    res.status(200).send({ books: books, booksCount: count });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}

async function getBook(req, res) {
  try {
    const {
      bookId,
      userId,
    } = req.query;

    if (!userId && !bookId) {
      res.status(401).json({ error: true, message: 'Missing required query parameters' });
    }

    const book = await models.Book.findOne({
      include: [
        {
          model: models.User,
          attributes: { exclude: ['password'] },
          through: {
            attributes: ['rating'],
          }
        },
        {
          model: models.Comment,
          include: [
            {
              model: models.User,
              attributes: ['fullName', 'avatar'],
            },
          ],
        },
        {
          model: models.User,
          as: 'UserLikedBooks',
          attributes: { exclude: ['password'] },
          through: {
            where: { UserId: +userId }
          }
        },
        {
          model: models.User,
          as: 'CartBooks',
          attributes: { exclude: ['password'] },
          through: {
            where: { UserId: userId }
          }
        },
      ],
      where: { id: +bookId },
    });

    const answer = {
      book,
      comments: book.Comments,
    }

    if (+userId !== 0) {
      const user = await book.getUsers({
        where: { id: +userId }
      });

      if (user.length === 0) {
        return res.status(200).send(answer);
      }

      answer.userRating = user[0].UserBook.rating;
      return res.status(200).send(answer);
    }

    res.status(200).send(answer);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}

async function getRecommendedBooks(req, res) {
  try {
    const {
      limit,
      userId,
      bookId,
    } = req.query;

    if (!userId && !bookId && !limit) {
      res.status(401).json({ error: true, message: 'Missing required query parameters' });
    }

    const genresId = [];
    const likedbooksId = [];

    const likedBooks = await models.Book.findAll({
      include: [
        {
          model: models.Genre,
        },
        {
          model: models.User,
          as: 'UserLikedBooks',
          attributes: { exclude: ['password'] },
          where: { id: userId },
        },
      ],
      offset: 0,
      limit: limit,
    });

    likedBooks.map((item) => {
      for (let i = 0; i < item.Genres.length; i++) {
        genresId.push(item.Genres[i].id);
        likedbooksId.push(item.id);
      }
    })

    const recommendations = await models.Book.findAll({
      include: [
        {
          model: models.Genre,
          where: { id: genresId }
        },
        {
          model: models.User,
          attributes: { exclude: ['password'] },
          through: {
            attributes: ['rating']
          }
        },
      ],
      where: {
        id: {
          [Op.notIn]: likedbooksId,
          [Op.ne]: bookId
        }
      },
      offset: 0,
      limit: limit,
    });
    res.status(200).send(recommendations);
  } catch (err) {
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

    if (!userId && !bookId && !rating) {
      res.status(401).json({ error: true, message: 'Missing required body parameters' });
    }

    const [user, created] = await models.UserBook.findOrCreate({
      where: {
        BookId: bookId,
        UserId: userId
      },
      defaults: {
        rating: rating
      }
    });

    if (user) {
      models.UserBook.update({
        rating: rating,
      }, {
        where: {
          BookId: bookId,
          UserId: userId
        }
      })
    }

    res.status(200).send('Ok');
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}

async function toLikeBook(req, res) {
  try {
    const {
      userId,
      bookId,
      like = false,
    } = req.body;

    if (!userId && !bookId) {
      res.status(401).json({ error: true, message: 'Missing required body parameters' });
    }

    if (like === false) {
      models.LikedBook.destroy({
        where: {
          BookId: bookId,
          UserId: userId
        }
      })
      res.send('ok');
      return
    }

    models.LikedBook.create({
      BookId: bookId,
      UserId: userId
    })

    res.status(200).send('ok');
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}



module.exports = {
  getAllBooks,
  getAllLikedBooks,
  getBook,
  getRecommendedBooks,
  changeRating,
  toLikeBook,
}