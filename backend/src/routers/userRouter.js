const express = require("express");
const userController = require("../controllers/userController");
const tokenVerify = require("../controllers/tokenVerify");
const avatarUpload = require('../controllers/avatarUpload');
const userRouter = express.Router();

userRouter.put('/edit', tokenVerify, userController.edit);

userRouter.put('/editPassword', tokenVerify, userController.editPassword);

userRouter.delete('/delete', tokenVerify, userController.delet);

userRouter.post('/avatarUpload', avatarUpload, tokenVerify, userController.uploadAvatar);

module.exports = userRouter;