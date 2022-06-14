const db = require('../database/models/index');
const { StatusCodes } = require('http-status-codes');
const createError = require('../utils/functions/errCreater');
const { passwordHash, passwordVerify } = require('../utils/functions/bcrypt');
const { emailValidate, passwordValidate } = require('../utils/functions/validation');

const { models } = db.sequelize;

const edit = async (req, res, next) => {
  try {
    const {
      email,
      fullName
    } = req.body;

    if (!email && !fullName) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'Missing required query parameters',
      );
    }

    const id = req.user.id;

    const emailValidation = await emailValidate(email);

    if (emailValidation.errors) {
      throw createError(
        StatusCodes.NOT_ACCEPTABLE,
        emailValidation.errors[0]
      );
    }

    db.sequelize.models.User.update({
      fullName: fullName,
      email: email
    }, {
      where: {
        id: id
      }
    })
    return res.status(200).json('User are updated.');
  } catch (err) { next(err); }
}

const editPassword = async (req, res, next) => {
  try {
    const {
      oldPassword,
      newPassword
    } = req.body;

    if (!oldPassword && !newPassword) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'Missing required query parameters',
      );
    }

    const id = req.user.id;
    const user = await models.User.findByPk(id);

    if (!passwordVerify(oldPassword, user.password)) {
      res.json('Wrong old password.');
      throw createError(
        StatusCodes.NOT_FOUND,
        'Wrong old password.',
      );
    }

    const passwordValidation  = await passwordValidate(newPassword);
    if (passwordValidation.errors) {
      throw createError(
        StatusCodes.NOT_ACCEPTABLE,
        passwordValidation.errors[0]
      );
    }

    models.User.update({
      password: passwordHash(newPassword)
    }, {
      where: {
        id: id
      }
    })
    return res.status(200).json('Password are updated.');
  } catch (err) { next(err); }
}

const delete1 = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await models.User.destroy({
      where: {
        id: id
      }
    })
    if (user !== null) {
      return res.status(200).json('User is deleted.')
    }

    res.json('User is not found.');
    throw createError(
      StatusCodes.NOT_FOUND,
      'User is not found.',
    );
  } catch (err) { next(err); }
}

const uploadAvatar = async (req, res, next) => {
  try {
    const id = req.user.id;
    const image = req.file.filename;

    if (!image) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'Missing required file parameter',
      );
    }

    db.sequelize.models.User.update({
      avatar: image
    }, {
      where: {
        id: id
      }
    })
    return res.status(200).json('Avatar was uploaded');
  } catch (err) { next(err); }

}

module.exports = {
  edit,
  editPassword,
  delete1,
  uploadAvatar
}