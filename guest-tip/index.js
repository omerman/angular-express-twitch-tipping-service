const { storeTip } = require('./db/index.js');

module.exports = (app, dbClient, io) => {
  app.post('/tip', (req, res) => {
    const {
      tipperName,
      username,
      amount,
      currency
    } = req.body;
    console.log('tip - post', 'params>', tipperName, username, amount, currency);
    storeTip(dbClient, { tipperName, username, amount, currency })
    .then(() => {
      res.status(200).end();
      io.emit('tip', {
        tipperName,
        username,
        amount,
        currency
      });
    })
    .catch(err => {
      console.log('tip - post', 'ERROR>', err);
      res.status(500).json({ message: err });
    });
  });
};
