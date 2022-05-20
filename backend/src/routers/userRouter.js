const express = require("express");
const userController = require("../controllers/userController");
const tokenVerify = require("../controllers/tokenVerify");
const avatarUpload = require('../controllers/avatarUpload');
const userRouter = express.Router();

userRouter.put('/edit', tokenVerify, userController.edit);

userRouter.put('/edit-password', tokenVerify, userController.editPassword);

userRouter.delete('/delete', tokenVerify, userController.delet);

userRouter.post('/avatar-upload', avatarUpload, tokenVerify, userController.uploadAvatar);

module.exports = userRouter;