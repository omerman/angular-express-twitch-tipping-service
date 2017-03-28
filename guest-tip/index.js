const { storeTip } = require('./db/index.js');

module.exports = (app, dbClient) => {
  app.post('/tip', (req, res) => {
    const {
      username,
      amount,
      currency
    } = req.body;

    storeTip(dbClient, { username, amount, currency })
    .then(() => {
      res.status(200).end();
    })
    .catch(() => {
      res.status(500).json({
        message: 'Could not tip right now :<. Please Try again later.'
      });
    });
  });
};
