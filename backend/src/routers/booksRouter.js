const express = require("express");
const booksController = require("../controllers/booksController");
const booksRouter = express.Router();

booksRouter.get('/', booksController.getAllBooks);
booksRouter.get('/liked-books', booksController.getAllLikedBooks);
booksRouter.get('/price-slider', booksController.getMinMaxPrice);
booksRouter.get('/genres', booksController.getAllGenres);
booksRouter.get('/book-page', booksController.getSelectedBook);
booksRouter.get('/book-page/recommendations', booksController.getRecommendedBooks);
booksRouter.put('/book-page/to-like', booksController.toLikeBook);
booksRouter.post('/book-page/comment', booksController.makeComment);
booksRouter.put('/book-page/change-rating', booksController.changeRating);
booksRouter.put('/book-page/add-to-cart', booksController.addBookToCart);
booksRouter.get('/cart', booksController.getCartBooks);

module.exports = booksRouter; 