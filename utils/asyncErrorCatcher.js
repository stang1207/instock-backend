//Async error catcher middleware
const asyncErrorCatcher = (callbackFunc) => {
  return function (req, res, next) {
    return callbackFunc(req, res, next).catch((err) => {
      return next(err);
    });
  };
};

module.exports = { asyncErrorCatcher };
