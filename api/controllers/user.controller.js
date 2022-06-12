const User = require('../models/user.model');
const { createError } = require('../utils/error');

async function getAllUser(req, res, next) {
  try {
    const users = await User.find();
    if (!users) {
      return next(createError(404, 'No Users Found!'));
      // return res.status(404).json({ message: 'Users not found' });
    }
    return res.status(200).json({ message: 'Hotesl found!', users });
  } catch (err) {
    console.log(err);
    // err.status = 500;
    // err.message = 'Fetching Users not successful. Please try again later.';
    next(err);
  }
}

async function putUser(req, res, next) {
  const { userId } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: 'User updated successfully!', User: updatedUser });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function deleteUser(req, res, next) {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete(userId);
    return res.status(200).json({ message: 'User deleted successfully!' });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function getUser(req, res, next) {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, 'User Not Found!'));
    }
    return res.status(200).json({ message: 'User found!', user });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { putUser, deleteUser, getUser, getAllUser };
