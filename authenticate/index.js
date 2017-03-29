const request = require('request');

const CLIENT_IDS = {
  DASHBOARD_LOCAL: '22wbe38tmqmd276z7qmqjzgl6vufh2',
  OVERLAY_LOCAL: 'kric4td921grvys4c247y7ovexz910'
};
const authConfig = {
  [CLIENT_IDS.DASHBOARD_LOCAL]: {
    clientSecret: 'lfojjct5tujcv8asssjhd16b7r08g6',
    redirectUri: 'http://locaalhost:8080/#!/dashboard'
  },
  [CLIENT_IDS.OVERLAY_LOCAL]: {
    clientSecret: 'zr7ezi5by22o4yu7l26j72ybyp6sa6',
    redirectUri: 'http://locaalhost:8080/#!/overlay'
  }
};

module.exports = app => {
  app.post('/authenticate', (req, res) => {
    const { clientId, twitchCode } = req.body;
    const { clientSecret, redirectUri } = authConfig[clientId];
    const authUrl = (
      'https://api.twitch.tv' +
      '&grant_type=authorization_code' +
      `?client_id=${clientId}` +
      `&client_secret=${clientSecret}` +
      `&redirect_uri=${redirectUri}` +
      `&code=${twitchCode}`
    );
    request.post(authUrl, (error, response, body) => {
      if (error) {
        console.log('authenticate - request ERROR - error', error);
      } else if (response) {
        if (response.statusCode !== 200) {
          console.log('authenticate - response ERROR - response ', response);
          console.log('authenticate - response ERROR - body', body);
          res.status(500).json({ message: 'Could not authenticate via twitch.' });
        } else {
          const { access_token: accessToken } = body;
          Object.assign(req.session, {
            accessToken
          });
          const userUrl = 'https://api.twitch.tv/kraken/user';
          const headers = {
            Accept: 'application/vnd.twitchtv.v5+json',
            'Client-ID': clientId,
            Authorization: `OAuth ${accessToken}`
          };
          request.post({
            url: userUrl,
            headers
          }, (error2, response2, body2) => {
            if (error2) {
              console.log('authenticate>userdata - request ERROR - error', error2);
            } else if (response.statusCode !== 200) {
              console.log('authenticate>userdata - response ERROR - response ', response2);
              console.log('authenticate>userdata - response ERROR - body', body2);
              res.status(500).json({ message: 'Could not get user data via twitch.' });
            } else {
              const { name: username } = body;
              if (username) {
                Object.assign(req.session, {
                  username
                });
                res.status(200).json({ username });
              }
            }
          });
        }
      }
    });
  });
};
