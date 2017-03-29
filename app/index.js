import App from 'app/app.js';
import guestTipSubModule from './guest-tip/index.js';
import dashboardSubModule from './dashboard/index.js';
import overlaySubModule from './overlay/index.js';
import './style.scss';

function config($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(false);

  dashboardSubModule.addRoutes($routeProvider);
  guestTipSubModule.addRoutes($routeProvider);
  overlaySubModule.addRoutes($routeProvider);

  // routes
  $routeProvider.otherwise({
    redirectTo: '/tip'
  });
}
// safe dependency injection
// this prevents minification issues
config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider'];

App.config(config);
