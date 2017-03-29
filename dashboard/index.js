const { getMostRecentTips } = require('./db/index.js');

module.exports = (app, dbClient) => {
  app.get('/dashboard/tips', (req, res) => {
    const { username } = req.session;
    if (username === undefined) {
      res.status(403).json({ message: 'Please authenticate first.' });
    } else {
      console.log('dashboard - get', 'params>', username);
      getMostRecentTips(dbClient, { username })
      .then(mostRecentTipsArray => {
        res.status(200).json(mostRecentTipsArray);
      })
      .catch(err => {
        console.log('dashboard - get', 'ERROR>', err);
        res.status(500).json({ message: err });
      });
    }
  });
};
