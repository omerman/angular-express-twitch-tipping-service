import App from 'app/app.js';

function GuestTipController($scope) {
  console.log('GuestTipController controller');
  $scope.data = {
    amount: 5
  };
}
GuestTipController.$inject = ['$scope'];
App.controller('GuestTipController', GuestTipController);
