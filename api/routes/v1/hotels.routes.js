const express = require('express');
const { verifyAdmin, verifyToken } = require('../../utils/verifyToken');
const {
  postHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotel,
  countByCity,
  countByType,
} = require('../../controllers/hotel.controller');

const routes = express.Router();


//GET City Count
routes.get('/countByCity', countByCity);

// GET Property Count
routes.get('/countByType', countByType);


//GET ALL Hotel
routes.get('/', getAllHotel);

//Create New Hotel
routes.post('/', verifyToken, verifyAdmin, postHotel);

//Get Hotel
routes.get('/:hotelId', getHotel);

//Update Hotel
routes.put('/:hotelId', verifyToken, verifyAdmin, updateHotel);

//Delete Hotel
routes.delete('/:hotelId', verifyToken, verifyAdmin, deleteHotel);




module.exports = routes;
