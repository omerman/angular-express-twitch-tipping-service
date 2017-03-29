const request = require('request');

const CLIENT_IDS = {
  DASHBOARD_LOCAL: '22wbe38tmqmd276z7qmqjzgl6vufh2',
  OVERLAY_LOCAL: 'kric4td921grvys4c247y7ovexz910',
  DASHBOARD_PROD: 'f7k1plp3ps8zqkf4oubl7yeup441ce',
  OVERLAY_PROD: 'ajkgu38jiai2klomgkstvgkbs5sp44'
};
const authConfig = {
  [CLIENT_IDS.DASHBOARD_LOCAL]: {
    clientSecret: 'lfojjct5tujcv8asssjhd16b7r08g6',
    redirectUri: 'http://localhost:8080/dashboard'
  },
  [CLIENT_IDS.OVERLAY_LOCAL]: {
    clientSecret: 'zr7ezi5by22o4yu7l26j72ybyp6sa6',
    redirectUri: 'http://localhost:8080/overlay'
  },
  [CLIENT_IDS.DASHBOARD_PROD]: {
    clientSecret: 'v1x0m8u3rl96j9jppfghltvk34fbey',
    redirectUri: 'http://tip-tap.herokuapp.com/dashboard'
  },
  [CLIENT_IDS.OVERLAY_PROD]: {
    clientSecret: '50opsai5wfwevmjv7xssqvqoag4sq0',
    redirectUri: 'http://tip-tap.herokuapp.com/overlay'
  }
};

module.exports = app => {
  app.post('/authenticate', (req, res) => {
    const { clientId, twitchCode } = req.body;
    const { clientSecret, redirectUri } = authConfig[clientId];
    const authUrl = (
      'https://api.twitch.tv/kraken/oauth2/token' +
      '?grant_type=authorization_code' +
      `&client_id=${clientId}` +
      `&client_secret=${clientSecret}` +
      `&redirect_uri=${redirectUri}` +
      `&code=${twitchCode}`
    );
    request.post(authUrl, (error, response, body) => {
      if (error) {
        console.log('authenticate - request ERROR - error', error);
      } else if (response) {
        if (response.statusCode !== 200) {
          console.log('authenticate - response ERROR - body', body);
          res.status(500).json({ message: 'Could not authenticate via twitch.' });
        } else {
          const { access_token: accessToken } = JSON.parse(body);
          Object.assign(req.session, {
            accessToken
          });
          const userUrl = 'https://api.twitch.tv/kraken/user';
          const headers = {
            Accept: 'application/vnd.twitchtv.v5+json',
            'Client-ID': clientId,
            Authorization: `OAuth ${accessToken}`
          };
          request.get({
            url: userUrl,
            headers
          }, (error2, response2, body2) => {
            if (error2) {
              console.log('authenticate>userdata - request ERROR - error', error2);
            } else if (response2.statusCode !== 200) {
              console.log('authenticate>userdata - response ERROR - body', body2);
              res.status(500).json({ message: 'Could not get user data via twitch.' });
            } else {
              const { name: username } = JSON.parse(body2);
              console.log('yey', body2);
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
