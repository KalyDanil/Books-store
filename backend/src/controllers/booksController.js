const db = require('../database/models/index');
const { Op, Sequelize } = require('sequelize');
const { StatusCodes } = require('http-status-codes');
const createError = require('../utils/functions/errCreater');

const { models } = db.sequelize;

const getAllBooks = async (req, res, next) => {
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

    let inOrder = 'ASC';

    if (!minPrice && !maxPrice && !limit && !userId) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'Missing required query parameters',
      );
    }

    if (sortBy === 'rating') {
      inOrder = 'DESC';
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
        [sortBy, inOrder]
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

    return res.status(200).json({
      books: books,
      booksCount: booksCount.length,
      genres: genres,
      minPrice: elementaryMinPrice,
      maxPrice: elementaryMaxPrice
    });
  } catch (err) { next(err); }
}

const getAllLikedBooks = async (req, res, next) => {
  try {
    const {
      page = '1',
      limit,
      userId
    } = req.query

    if (!userId && !limit) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'Missing required query parameters',
      );
    }

    const offset = ((+page) - 1) * (+limit);
    const books = await models.Book.findAll({
      include: [
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
    return res.status(200).json({ books: books, booksCount: count });
  } catch (err) { next(err); }
}

const getBook = async (req, res, next) => {
  try {
    const {
      bookId,
      userId,
    } = req.query;

    if (!userId && !bookId) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'Missing required query parameters',
      );
    }

    const book = await models.Book.findOne({
      include: [
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

    const user = await book.getBookRatings({
      where: { id: +userId }
    });

    if (user.length === 0) {
      return res.status(200).json(answer);
    }

    answer.userRating = user[0].BookRating.rating;
    return res.status(200).json(answer);
  } catch (err) { next(err); }
}

const getRecommendedBooks = async (req, res, next) => {
  try {
    const {
      limit,
      userId,
      bookId,
    } = req.query;

    if (!userId && !bookId && !limit) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'Missing required query parameters',
      );
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
    return res.status(200).json(recommendations);
  } catch (err) { next(err); }
}

const changeRating = async (req, res, next) => {
  try {
    const {
      bookId,
      userId,
      rating,
    } = req.body;

    if (!userId && !bookId && !rating) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'Missing required query parameters',
      );
    }

    const [user, created] = await models.BookRating.findOrCreate({
      where: {
        BookId: bookId,
        UserId: userId
      },
      defaults: {
        rating: rating
      }
    });

    if (user) {
      await models.BookRating.update({
        rating: rating,
      }, {
        where: {
          BookId: bookId,
          UserId: userId
        },
      })
    };

    const selectedBook = await models.Book.findOne({
      include: [
        {
          model: models.User,
          as: 'BookRatings',
          attributes: { exclude: ['password'] },
          through: {
            attributes: ['rating']
          }
        },
      ],
      where: {
        id: bookId
      },
    });

    let ratingSum = 0;
    selectedBook.BookRatings.map(item => { return ratingSum += item.BookRating.rating });
    let ratingAmount = selectedBook.BookRatings.length;

    for (let i = 0; i < selectedBook.BookRatings.length; i++) {
      if (selectedBook.BookRatings[i].BookRating.rating === null) {
        ratingAmount -= 1;
      }
    }

    let bookRating = Math.round(ratingSum / ratingAmount);

    models.Book.update({
      rating: bookRating,
    }, {
      where: {
        id: bookId,
      }
    });

    return res.status(200).json('Rating was changed');
  } catch (err) { next(err); }
}

const LikeUnLikeBook = async (req, res, next) => {
  try {
    const {
      userId,
      bookId,
      like = false,
    } = req.body;

    if (!userId && !bookId) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'Missing required query parameters',
      );
    }

    if (like === false) {
      models.LikedBook.destroy({
        where: {
          BookId: bookId,
          UserId: userId
        }
      })
      return res.status(200).json('Book was unliked');
    }

    models.LikedBook.create({
      BookId: bookId,
      UserId: userId
    })

    return res.status(200).json('Book was liked');
  } catch (err) { next(err); }
}

module.exports = {
  getAllBooks,
  getAllLikedBooks,
  getBook,
  getRecommendedBooks,
  changeRating,
  LikeUnLikeBook,
}