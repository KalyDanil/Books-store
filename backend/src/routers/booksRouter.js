const express = require("express");
const booksController = require("../controllers/booksController");
const booksRouter = express.Router();

booksRouter.get('/', booksController.getAllBooks);
booksRouter.get('/liked-books', booksController.getAllLikedBooks);
booksRouter.get('/price-slider', booksController.getMinMaxPrice);
booksRouter.get('/genres', booksController.getAllGenres);
booksRouter.get('/bookPage', booksController.getSelectedBook);
booksRouter.get('/bookPage/recommendations', booksController.getRecommendedBooks);
booksRouter.put('/bookPage/to-like', booksController.toLikeBook);
booksRouter.post('/bookPage/comment', booksController.makeComment);
booksRouter.put('/bookPage/changeRating', booksController.changeRating);
booksRouter.put('/bookPage/add-to-cart', booksController.addBookToCart);
booksRouter.get('/cart', booksController.getCartBooks);

module.exports = booksRouter; 