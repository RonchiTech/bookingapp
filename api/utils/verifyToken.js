const jwt = require('jsonwebtoken');
const { createError } = require('./error');

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log('Verifying token');
  if (!token) {
    return next(createError(401, 'You are not authenticated!'));
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return next(createError(403, 'Invalid Token!'));
    }
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  if (req.user.id === req.params.id) {
    next();
  } else {
    return next(createError(403, 'You are not authorized!'));
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return next(createError(403, 'You are not authorized!'));
  }
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
