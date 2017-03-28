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
  getUserTips({ username }) {
     // For starters frontend sends username.. username should come from server, and be stored in a session/ valid token
    return fetch(`dashboard?username=${username}`, {
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
  }
};
