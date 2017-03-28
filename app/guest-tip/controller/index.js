/* eslint-disable no-param-reassign */
import App from 'app/app.js';
import tipsApi from 'app/core/rest/tips-api.js';

function GuestTipController($scope) {
  $scope.data = {
    currency: 'DOLLAR'
  };
  $scope.tip = () => {
    console.log($scope.data);
    tipsApi.tip($scope.data).then(() => {
      alert(`${$scope.data.tipperName} Thank you for the tip!`); // very simplifed.. I never use `window.alert` on real projects..
    }, err => {
      console.error(err);
      alert('Something went wrong :<'); // very simplifed.. I never use `window.alert` on real projects..
    });
    console.log('GuestTipController controller is up and loaded');
  };
}
GuestTipController.$inject = ['$scope'];
App.controller('GuestTipController', GuestTipController);
