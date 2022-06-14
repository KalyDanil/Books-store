const { StatusCodes, ReasonPhrases } = require('http-status-codes');

module.exports = globalErrHandler = (err, req, res, next) => {
  if (err.customPayload) {
    console.log(err.customPayload.message);
    return res.status(err.customPayload.statusCode).json(err.customPayload.message);
  };

  console.log(ReasonPhrases.INTERNAL_SERVER_ERROR);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
};