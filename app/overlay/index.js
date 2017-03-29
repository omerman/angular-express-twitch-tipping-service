import './controller/index.js';
import overlayTemplate from './view/index.html';
import './style.scss';

export default {
  addRoutes($routeProvider) {
    $routeProvider.when('/overlay', {
      templateUrl: overlayTemplate,
      controller: 'OverlayController'
    });
  }
};
