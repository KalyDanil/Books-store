const db = require('../database/models/index');
const { Op } = require('sequelize');
const { StatusCodes } = require('http-status-codes');
const createError = require('../utils/functions/errCreater');

const { models } = db.sequelize;

const addBookToCart = async (req, res, next) => {
  try {
    const {
      userId,
      bookId,
    } = req.body;

    if (!userId && !bookId) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'Missing required query parameters',
      );
    }

    const [user, created] = await models.CartBook.findOrCreate({
      where: {
        BookId: bookId,
        UserId: userId
      },
    });

    return res.status(200).json('Book was added');
  } catch (err) { next(err); }
}

const changeBooksAmount = async (req, res, next) => {
  try {
    const {
      userId,
      bookId,
      amount,
    } = req.body;

    if (!userId && !bookId && !amount) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'Missing required query parameters',
      );
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
  } catch (err) { next(err); }
}

const deleteBookFromCart = async (req, res, next) => {
  try {
    const {
      userId,
      bookId,
    } = req.body;

    if (!userId && !bookId) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'Missing required query parameters',
      );
    }

    const cartBook = await models.CartBook.destroy({
      where: {
        BookId: bookId,
        UserId: userId
      },
    });

    return res.status(200).json('Book was deleted');
  } catch (err) { next(err); }
}

const getCartBooks = async (req, res, next) => {
  try {
    const {
      userId,
    } = req.query;

    if (!userId) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'Missing required query parameters',
      );
    }

    const user = await models.User.findOne({
      include: [
        {
          model: models.Book,
          as: 'CartBooks',
          attributes: { exclude: ['password'] },
          through: {
            attributes: ['amount']
          }
        },
      ],
      where: { id: userId },
      order: [
        [{ model: models.Book, as: 'CartBooks' }, 'name']
      ]
    });

    return res.status(200).json(user.CartBooks);
  } catch (err) { next(err); }
}

module.exports = {
  addBookToCart,
  changeBooksAmount,
  deleteBookFromCart,
  getCartBooks,
}