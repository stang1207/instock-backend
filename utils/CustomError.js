// Create a new custom Error
class CustomError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

//Handler that's responsible for returning json error info
const CustomErrorHandler = (error, res) => {
  const { statusCode = 500, message = 'Something went wrong!' } = error;
  res.status(statusCode).json({
    statusCode,
    message,
  });
};

module.exports = { CustomError, CustomErrorHandler };
