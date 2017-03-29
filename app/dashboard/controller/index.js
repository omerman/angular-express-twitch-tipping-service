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
  const redirectUri = window.location.href;
  if (twitchCode) {
    const authenticationPromise = tipsApi.authenticate({ twitchCode, clientId, redirectUri });
    authenticationPromise.then(username => {
      const socket = ioClient();
      socket.on('tip', tip => {
        if (tip.username === username) {
          const { tipperName, amount } = tip;
          alert(`You got a new tip in the amount of ${amount}! from "${tipperName}"`); // very simplifed.. I never use `window.alert` on real projects..
          $scope.$apply(() => {
            $scope.tips.push({ tipperName, amount });
          });
        }
      });
    }).catch(err => {
      // Assuming code is incorrect.
      // TODO: reload route without params.
    });
    authenticationPromise.then(() => tipsApi.getUserTips()).then(tips => {
      $scope.$apply(() => {
        $scope.tips = tips;
      });
    });
  } else {
    window.location.href = twitchApi.getLoginUrl({ clientId });
  }
  console.log('DashboardController controller is up and loaded');
}
DashboardController.$inject = ['$scope', '$routeParams'];
App.controller('DashboardController', DashboardController);
