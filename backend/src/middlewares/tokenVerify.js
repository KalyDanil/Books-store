const db = require('../database/models/index');
const { StatusCodes } = require('http-status-codes');
const createError = require('../utils/functions/errCreater');
const { jwtVerify } = require('../utils/functions/jwt');
const { models } = db.sequelize;

module.exports = tokenVerify = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      throw createError(
        StatusCodes.UNAUTHORIZED,
        'Log in.',
      );
    }
   
    const decoded = jwtVerify(token);
    const user = await models.User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: decoded.id,
      }
    });
    
    if (!user) {
      throw createError(
        StatusCodes.NOT_FOUND,
        'User is not found',
      );
    }
   
    req.user = user;
    next();
  } catch (err) { next(err); }
}