const Hotel = require('../models/hotel.model');
const { createError } = require('../utils/error');

async function getAllHotel(req, res, next) {
  try {
    const hotels = await Hotel.find();
    if (!hotels) {
      return next(createError(404, 'No Hotels Found!'));
      // return res.status(404).json({ message: 'Hotels not found' });
    }
    return res.status(200).json({ message: 'Hotesl found!', hotels });
  } catch (err) {
    console.log(err);
    // err.status = 500;
    // err.message = 'Fetching Hotels not successful. Please try again later.';
    next(err);
  }
}

async function postHotel(req, res, next) {
  try {
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    return res
      .status(200)
      .json({ message: 'Hotel created successfully!', hotel: savedHotel });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function updateHotel(req, res, next) {
  const { hotelId } = req.params;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      { $set: req.body },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: 'Hotel updated successfully!', hotel: updatedHotel });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function deleteHotel(req, res, next) {
  const { hotelId } = req.params;
  try {
    await Hotel.findByIdAndDelete(hotelId);
    return res.status(200).json({ message: 'Hotel deleted successfully!' });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function getHotel(req, res, next) {
  const { hotelId } = req.params;
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return next(createError(404, 'Hotel Not Found!'));
    }
    return res.status(200).json({ message: 'Hotel found!', hotel });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function countByCity(req, res, next) {
  const cities = req.query.cities.split(',');
  // console.log('Cities', cities);
  try {
    const list = [];
    // const list = await Promise.all(
    //   cities.map((city) => {
    //     return Hotel.countDocuments({ city: city }) ;
    //   })
    // );
    const newList = await Promise.all(
      cities.map(async (city) => {
        const count = await Hotel.countDocuments({ city: city });
        return { city: city, count: count };
      })
    );
    console.log('newList', newList);
    // if (!hotel) {
    //   return next(createError(404, 'Hotel Not Found!'));
    // }
    return res.status(200).json({ hotelCount: newList });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  postHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotel,
  countByCity,
};
