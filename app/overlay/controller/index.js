/* eslint-disable no-param-reassign */
import App from 'app/app.js';
import ioClient from 'socket.io-client';

const OVERLAY_TIME = 5000; // time in seconds

function OverlayController($scope, $routeParams) {
  const socket = ioClient();
  socket.on('tip', tip => {
    if (tip.username === $routeParams.username) {
      $scope.$apply(() => {
        $scope.tip = tip;
        setTimeout(() => {
          $scope.tip = undefined;
        }, OVERLAY_TIME);
      });
    }
  });
  console.log('OverlayController controller is up and loaded');
}
OverlayController.$inject = ['$scope', '$routeParams'];
App.controller('OverlayController', OverlayController);
