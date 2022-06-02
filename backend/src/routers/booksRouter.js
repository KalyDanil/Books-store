const express = require("express");
const booksController = require("../controllers/booksController");
const cartController = require("../controllers/cartController");
const commentController = require("../controllers/commentController");
const booksRouter = express.Router();

booksRouter.get('/', booksController.getAllBooks);
booksRouter.get('/liked-books', booksController.getAllLikedBooks);
booksRouter.get('/book-page', booksController.getBook);
booksRouter.get('/book-page/recommendations', booksController.getRecommendedBooks);
booksRouter.put('/book-page/to-like', booksController.toLikeBook);
booksRouter.post('/book-page/comment', commentController.makeComment);
booksRouter.put('/book-page/change-rating', booksController.changeRating);
booksRouter.put('/book-page/add-to-cart', cartController.addBookToCart);
booksRouter.put('/book-page/change-books-amount', cartController.changeBooksAmount);
booksRouter.post('/book-page/delete-book-from-cart', cartController.deleteBookFromCart);
booksRouter.get('/cart', cartController.getCartBooks);

module.exports = booksRouter; 