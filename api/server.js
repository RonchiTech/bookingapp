const mongoose = require('mongoose');

const app = require('./index');

async function mongoConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected to MongoDB');
});

async function startServer() {
  await mongoConnect();
  app.listen(process.env.PORT, () => {
    console.log('App is listening on port ' + process.env.PORT);
  });
}

startServer();
