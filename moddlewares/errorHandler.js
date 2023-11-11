//create an error handler
export const errorHandler = (error, req, res, next) => {
  //status code
  const status = res.statusCode ? res.statusCode : 500;
  //send res
  res.status(status).json({ message: error.message });
};
