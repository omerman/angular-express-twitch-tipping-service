const mongoose = require('mongoose');

const connectionURL = process.env.MONGO_URI;

module.exports = {
  connect: () => {
    return new Promise((resolve, reject) => {
      console.log('db - attempting to connect');
      const dbClient = mongoose.connect(connectionURL, {}, err => {
        if (err) {
          console.log('db - connection failed');
          reject(err);
        } else {
          console.log('db - connection successfull');
          resolve(dbClient.connection);
        }
      });
    });
  }
};
