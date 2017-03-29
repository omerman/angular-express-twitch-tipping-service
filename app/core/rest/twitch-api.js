export default {
  getLoginUrl({ clientId }) {
    const redirectUri = window.location.href;
    return Promise.resolve(`https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_read`);
  },
  getUserName() {
    return 'omer';
  }
};
