//Async error middleware
const asyncWrapper = (callbackFunc) => {
  return function (req, res, next) {
    return callbackFunc(req, res, next).catch((err) => {
      next(err);
    });
  };
};

module.exports = { asyncWrapper };
