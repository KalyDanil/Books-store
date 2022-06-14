const jsonTransformation = (user) => {
  return JSON.parse(JSON.stringify(user))
};

module.exports = {
  jsonTransformation
};