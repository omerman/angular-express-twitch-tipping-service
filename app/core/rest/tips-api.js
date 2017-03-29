export default {
  tip({ tipperName, username, amount, currency }) {
    return fetch('tip', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ tipperName, username, amount, currency })
    }).then(response => {
      if (response.status === 200) {
        return Promise.resolve();
      } else {
        return response.json().then(({ message }) => Promise.reject(message));
      }
    }, err => {
      return Promise.reject(err);
    });
  },
  getUserTips() {
    return fetch('dashboard/tips', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return response.json().then(({ message }) => Promise.reject(message));
      }
    }, err => {
      return Promise.reject(err);
    });
  },
  authenticate({ twitchCode, clientId }) {
    return fetch('authenticate', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ twitchCode, clientId })
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return response.json().then(({ message }) => Promise.reject(message));
      }
    }, err => {
      return Promise.reject(err);
    });
  }
};
