const db = require('../database/models/index');
const createError = require('../utils/functions/errCreater');
const { StatusCodes } = require('http-status-codes');
const { passwordHash, passwordVerify } = require('../utils/functions/bcrypt');
const { jwtSign } = require('../utils/functions/jwt');
const { jsonTransformation } = require('../utils/functions/json');
const { emailValidate, passwordValidate } = require('../utils/functions/validation');

const { models } = db.sequelize;

const registration = async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body;

    if (!email && !password) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'Missing required body parameters',
      );
    }

    const emailValidation = await emailValidate(email);
    const passwordValidation  = await passwordValidate(password);

    if (emailValidation.errors || passwordValidation.errors) {
      throw createError(
        StatusCodes.NOT_ACCEPTABLE,
        emailValidation.errors ? emailValidation.errors[0] : passwordValidation.errors[0]
      );
    }

    const user = await models.User.create({
      email: email,
      password: passwordHash(password),
    });

    const answer = jsonTransformation(user);
    delete answer.password;
    answer.token = jwtSign(user.id);

    return res.status(200).json(answer);
  } catch (err) { next(err); }
}

const authorization = async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.query;

    if (!email && !password) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'Missing required body parameters',
      );
    }

    const user = await models.User.findOne({
      where: {
        email: email,
      }
    });

    if (user && passwordVerify(password, user.password)) {
      const answer = jsonTransformation(user);
      delete answer.password;
      answer.token = jwtSign(user.id);
      return res.status(200).json(answer);
    };

    throw createError(
      StatusCodes.BAD_REQUEST,
      'Wrong email or password',
    );
  } catch (err) { next(err); }
}

const authorizationByToken = async (req, res, next) => {
  try {
    const id = req.user.id;
    const getUser = async () => {
      const user = await models.User.findByPk(id,
        { attributes: { exclude: ['password'] } }
      );

      return res.status(200).json(user);
    };
    return getUser();
  } catch (err) { next(err); }
}

module.exports = {
  registration,
  authorization,
  authorizationByToken,
}