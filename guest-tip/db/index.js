const mongoose = require('mongoose');

const COLLECTION = {
  GUEST_TIPS: 'guest_tips'
};
const storeTip = (dbClient, { tipperName, username, amount, currency }) => {
  return new Promise((resolve, reject) => {
    const id = mongoose.Types.ObjectId();
    dbClient.collection(COLLECTION.GUEST_TIPS).insert({
      _id: id,
      tipperName,
      username,
      amount,
      currency
    }, err => {
      if (err) {
        reject(err);
      } else {
        resolve(id);
      }
    });
  });
};

module.exports = {
  storeTip
};
