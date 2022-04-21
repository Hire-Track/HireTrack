const errorHandler = (err, req, res, next) => {
  // get status code of error, else 500 (server error)
  const statusCode = res.statusCode ? res.statusCode : 500

  // set status and respond with error message
  res.status(statusCode)
  res.json({
    message: err.message,
    // show stack only if in dev mode
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  })
}

module.exports = {
  errorHandler
}
