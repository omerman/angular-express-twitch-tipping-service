const mongoose = require('mongoose');

const COLLECTION = {
  GUEST_TIPS: 'guest_tips'
};
const storeTip = (dbClient, { username, amount, currency }) => {
  return new Promise((resolve, reject) => {
    const userFlowId = mongoose.Types.ObjectId();
    dbClient.collection(COLLECTION.GUEST_TIPS).insert({
      _id: userFlowId,
      username,
      amount,
      currency
    }, err => {
      if (err) {
        reject(err);
      } else {
        resolve(userFlowId);
      }
    });
  });
};

module.exports = {
  storeTip
};
