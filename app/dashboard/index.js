import './controller/index.js';
import dashBoardTemplate from './view/index.html';
import './style.scss';

export default {
  addRoutes($routeProvider) {
    $routeProvider.when('/dashboard', {
      templateUrl: dashBoardTemplate,
      controller: 'DashboardController'
    });
  }
};
