const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { createError } = require('../utils/error');

async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;
    // const newUser = new User(req.body); //but we need to hash the password for security
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ message: 'User has been created', status: 'ok' });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return next(createError(400, 'No User Found!'));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(createError(400, 'Invalid Username or Password!'));
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY
    );
    const userInfo = {
      email: user.email,
      username: user.username,
    };
    return res.cookie('access_token', token, { httpOnly: true }).status(200).json({ userInfo });
    // return res.status(200).json({ userInfo });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
