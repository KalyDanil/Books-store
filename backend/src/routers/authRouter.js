const express = require('express');
const authController = require('../controllers/authController');
const tokenVerify = require('../middlewares/tokenVerify');
const authorizationRouter = express.Router();

authorizationRouter.post('/registration', authController.registration);

authorizationRouter.get('/authorization', authController.authorization);

authorizationRouter.get('/authorization-by-token', tokenVerify, authController.authorizationByToken);

module.exports = authorizationRouter;
