const Room = require('../models/room.model');
const Hotel = require('../models/hotel.model');
const { createError } = require('../utils/error');

async function createRoom(req, res, next) {
  const { hotelId } = req.params;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    await Hotel.findByIdAndUpdate(hotelId, {
      $push: { rooms: savedRoom._id },
    });
    return res
      .status(201)
      .json({ message: 'Room successfully created.', savedRoom });
  } catch (err) {
    return next(createError());
  }
}

async function updateRoom(req, res, next) {
  const { roomId } = req.params;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { $set: req.body },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: 'Room updated successfully!', room: updatedRoom });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
async function updateRoomAvailability(req, res, next) {
  const { roomId } = req.params;
  try {
    const updatedRoom = await Room.updateOne(
      { 'roomNumbers._id': roomId },
      { $addToSet: { 'roomNumbers.$.unavailableDate': req.body.dates } }
    );
    return res
      .status(200)
      .json({ message: 'Room updated successfully!', room: updatedRoom });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function deleteRoom(req, res, next) {
  const { hotelId, roomId } = req.params;
  try {
    await Room.findByIdAndDelete(roomId);
    await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomId } });
    return res.status(200).json({ message: 'Room deleted successfully!' });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function getRoom(req, res, next) {
  const { roomId } = req.params;
  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return next(createError(404, 'Room Not Found!'));
    }
    return res.status(200).json({ message: 'Room found!', room });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  updateRoomAvailability,
};
