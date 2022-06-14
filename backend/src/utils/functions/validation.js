const yup = require('yup');
require('yup-password')(yup);

const schema = yup.object().shape({
  fullName: yup.string(),
  email: yup.string().email(),
  password: yup.string().password(),
});

const emailValidate = async (email) => {
  return await schema.validate({
    email: email,
  }).catch(function (err) {
    return err
  });
};

const passwordValidate = async (password) => {
  return await schema.validate({
    password: password,
  }).catch(function (err) {
    return err
  });
};

module.exports = {
  emailValidate,
  passwordValidate
}