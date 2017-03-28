const { getMostRecentTips } = require('./db/index.js');

module.exports = (app, dbClient) => {
  app.get('/dashboard', (req, res) => {
    const { username } = req.query;
    console.log('dashboard - get', 'params>', username);
    getMostRecentTips(dbClient, { username })
    .then(() => {
      res.status(200).end();
    })
    .catch(err => {
      console.log('dashboard - get', 'ERROR>', err);
      res.status(500).json({ message: err });
    });
  });
};
