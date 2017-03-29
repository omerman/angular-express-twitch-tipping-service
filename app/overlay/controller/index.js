/* eslint-disable no-param-reassign */
import App from 'app/app.js';
import tipsApi from 'app/core/rest/tips-api.js';
import twitchApi from 'app/core/rest/twitch-api.js';
import getTwitchClientId, { ROUTES } from 'app/core/get-twitch-client-id.js';
import ioClient from 'socket.io-client';

const OVERLAY_TIME = 5000; // time in seconds

function OverlayController($scope, $routeParams) {
  const { code: twitchCode } = $routeParams;
  const clientId = getTwitchClientId(ROUTES.OVERLAY);
  const redirectUri = `${window.location.host}${window.location.pathname}`;
  if (twitchCode) {
    const authenticationPromise = tipsApi.authenticate({ twitchCode, clientId, redirectUri });
    authenticationPromise.then(({ username }) => {
      const socket = ioClient();
      socket.on('tip', tip => { // ~~ unsafe, better ways to handle ~~
        if (tip.username === username) {
          $scope.$apply(() => {
            $scope.tip = tip;
            setTimeout(() => {
              $scope.$apply(() => {
                $scope.tip = undefined;
              });
            }, OVERLAY_TIME);
          });
        }
      });
    });
  } else {
    twitchApi.getLoginUrl({ clientId }).then(url => {
      window.location.href = url;
    });
  }
  console.log('OverlayController controller is up and loaded');
}
OverlayController.$inject = ['$scope', '$routeParams'];
App.controller('OverlayController', OverlayController);
