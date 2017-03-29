/* eslint-disable no-param-reassign */
import App from 'app/app.js';
import tipsApi from 'app/core/rest/tips-api.js';
import ioClient from 'socket.io-client';

const username = 'OPteroNN'; // Old username I had when I was playing Counter-Strike in the 7th grade.

function DashboardController($scope) {
  $scope.tips = undefined; // initial state, just to be clear on $scope.tips possible states.
  $scope.user = {
    username
  };
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

  tipsApi.getUserTips({ username }).then(tips => {
    $scope.$apply(() => {
      $scope.tips = tips;
    });
  });
  console.log('DashboardController controller is up and loaded');
}
DashboardController.$inject = ['$scope'];
App.controller('DashboardController', DashboardController);
