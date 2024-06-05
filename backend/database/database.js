const mongoose = require('mongoose');

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log('Database Connected ..');
  } catch (error) {
    console.error('Database connection error: ', error);
    process.exit(1);
  }
};

module.exports = databaseConnection;
