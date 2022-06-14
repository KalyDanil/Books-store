const createError = (statusCode, message) => {
  const err = new Error('');
  err.customPayload = {
    statusCode,
    message,
  };
  return err;
};

module.exports = createError;