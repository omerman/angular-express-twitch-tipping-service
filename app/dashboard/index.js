import './controller/index.js';
import dashBoardTemplate from './view/index.html';
import './style.scss';

export default {
  addRoutes($routeProvider) {
    $routeProvider.when('/tip', {
      templateUrl: guestTipTemplate,
      controller: 'GuestTipController',
      controllerAs: 'guestTip'
    });
  }
};
