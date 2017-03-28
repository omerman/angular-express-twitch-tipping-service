const mongoose = require('mongoose');

const connectionURL = process.env.MONGO_URI;

module.exports = {
  connect: () => {
    return new Promise((resolve, reject) => {
      console.log('Attempting connect db');
      const dbClient = mongoose.connect(connectionURL, {}, err => {
        if (err) {
          reject(err);
        } else {
          resolve(dbClient.connection);
        }
      });
    });
  }
};
