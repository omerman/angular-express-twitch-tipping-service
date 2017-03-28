/* eslint-disable no-param-reassign */
import App from 'app/app.js';

function DashboardController($scope) {
  $scope.tips = [];
  $scope.tip = () => {
    console.log($scope.data);
    fetch('tip', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify($scope.data)
    }).then(() => {
      alert(`${$scope.data.tipperName} Thank you for the tip!`); // very simplifed.. I never use `window.alert` on real projects..
    });
  };
  console.log('DashboardController controller is up and loaded');
}
DashboardController.$inject = ['$scope'];
App.controller('DashboardController', DashboardController);
