const express = require('express');
const { verifyAdmin, verifyToken } = require('../../utils/verifyToken');
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  // getAllRoom,
  updateRoomAvailability,
} = require('../../controllers/room.controller');

const routes = express.Router();

//GET ALL Room
// routes.get('/', getAllRoom);

//Create New Room
routes.post('/:hotelId', verifyToken, verifyAdmin, createRoom);

//Get Room
routes.get('/:roomId', getRoom);

//Update Room
routes.put('/:roomId', verifyToken, verifyAdmin, updateRoom);

routes.put('/availability/:roomId', updateRoomAvailability)

//Delete Room
routes.delete('/:hotelId/:roomId', verifyToken, verifyAdmin, deleteRoom);

module.exports = routes;
