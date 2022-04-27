const express = require("express");
const booksController = require("../controllers/booksController");
const booksRouter = express.Router();

booksRouter.get('/', booksController.getAllBooks);

module.exports = booksRouter; 