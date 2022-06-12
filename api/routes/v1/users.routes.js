const express = require('express');
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require('../../utils/verifyToken');
const {
  putUser,
  deleteUser,
  getUser,
  getAllUser,
} = require('../../controllers/User.controller');

const routes = express.Router();

//auth checker
routes.get('/authenticated', verifyToken, (req, res) => {
  return res.status(200).json({ user: req.user });
});

routes.get('/checkuser/:id', verifyToken, verifyUser, (req, res) => {
  return res.status(200).json({ message: 'You own this account' });
});

routes.get('/checkadmin/:id', verifyToken,verifyAdmin, (req, res) => {
  console.log('Sending response...', req.user);
  return res.status(200).json({ message: 'Hello Admin' });
});

//GET ALL User
routes.get('/', verifyAdmin, getAllUser);

//Get User
routes.get('/:userId', verifyUser, getUser);

//Update User
routes.put('/:userId', verifyUser, putUser);

//Delete User
routes.delete('/:userId', verifyUser, deleteUser);

module.exports = routes;
