/* eslint-disable no-param-reassign */
import App from 'app/app.js';
import tipsApi from 'app/core/rest/tips-api.js';
import twitchApi from 'app/core/rest/twitch-api.js';
import getTwitchClientId, { ROUTES } from 'app/core/get-twitch-client-id.js';
import ioClient from 'socket.io-client';

function DashboardController($scope, $routeParams) {
  $scope.tips = undefined; // initial state, just to be clear on $scope.tips possible states.
  $scope.username = undefined;  // initial state, just to be clear on $scope.tips possible states.
  const { code: twitchCode } = $routeParams;
  const clientId = getTwitchClientId(ROUTES.DASHBOARD);
  const redirectUri = `${window.location.host}${window.location.pathname}`;
  if (twitchCode) {
    const authenticationPromise = tipsApi.authenticate({ twitchCode, clientId, redirectUri });
    authenticationPromise.then(({ username }) => {
      const socket = ioClient();
      socket.on('tip', tip => { // ~~ unsafe, better ways to handle ~~
        if (tip.username === username) {
          const { tipperName, amount } = tip;
          alert(`You got a new tip in the amount of ${amount}! from "${tipperName}"`); // very simplifed.. I never use `window.alert` on real projects..
          $scope.$apply(() => {
            $scope.tips.push({ tipperName, amount });
          });
        }
      });
      $scope.$apply(() => {
        $scope.username = username;
      });
      tipsApi.getUserTips().then(tips => {
        $scope.$apply(() => {
          $scope.tips = tips;
        });
      });
    }).catch(err => {
      console.log(err);
      alert('try reloading the page without query parameters.');
    });
  } else {
    twitchApi.getLoginUrl({ clientId }).then(url => {
      window.location.href = url;
    })
  }
  console.log('DashboardController controller is up and loaded');
}
DashboardController.$inject = ['$scope', '$routeParams'];
App.controller('DashboardController', DashboardController);
