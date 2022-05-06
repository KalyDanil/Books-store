const express = require("express");
const booksController = require("../controllers/booksController");
const booksRouter = express.Router();

booksRouter.get('/', booksController.getAllBooks);
booksRouter.get('/genres', booksController.getAllGenres);

module.exports = booksRouter; 