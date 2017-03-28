const COLLECTION = {
  GUEST_TIPS: 'guest_tips'
};
const getMostRecentTips = (dbClient, { username }) => {
  return new Promise((resolve, reject) => {
    dbClient.collection(COLLECTION.GUEST_TIPS).find({}, { tipperName: 1, ammount: 1 }).toArray((err, mostRecentTipsArray) => {
      if (err) {
        reject(err);
      } else {
        resolve(mostRecentTipsArray);
      }
    });
  });
};

module.exports = {
  getMostRecentTips
};
