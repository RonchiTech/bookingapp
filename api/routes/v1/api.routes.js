const express = require('express');

const authRoute = require('./auth.routes');
const hotelsRoute = require('./hotels.routes');
const roomsRoute = require('./rooms.routes');
const usersRoute = require('./users.routes');

const api = express();

api.use('/auth', authRoute);
api.use('/hotels', hotelsRoute);
api.use('/rooms', roomsRoute);
api.use('/users', usersRoute);

module.exports = api;
