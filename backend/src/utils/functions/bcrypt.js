const bcrypt = require('bcryptjs');
const config = require('../../config');

const salt = bcrypt.genSaltSync(config.saltRounds);

const passwordHash = (password) => {
  return bcrypt.hashSync(password, salt);
};

const passwordVerify = (password, userPassword) => {
  return bcrypt.compareSync(password, userPassword);
};

module.exports = {
  passwordHash,
  passwordVerify,
}