const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maximumCapacity: {
      type: Number,
      required: true,
    },
    roomNumbers: [
      { number: { type: Number }, unavailableDate: { type: [Date] } },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room', RoomSchema);
