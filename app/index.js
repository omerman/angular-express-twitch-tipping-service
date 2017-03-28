import App from 'app/app.js';
import guestTipSubModule from './guest-tip/index.js';
import './style.scss';

/**
 * App routing
 *
 * You can leave it here in the config section or take it out
 * into separate file
 *
 */
function config($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(false);

  guestTipSubModule.addRoutes($routeProvider);

  // routes
  $routeProvider.otherwise({
    redirectTo: '/tip'
  });
    // .when('/contact', {
    //   templateUrl: 'views/contact.html',
    //   controller: 'MainController',
    //   controllerAs: 'main'
    // })
    // .when('/setup', {
    //   templateUrl: 'views/setup.html',
    //   controller: 'MainController',
    //   controllerAs: 'main'
    // })
  // $httpProvider.interceptors.push('authInterceptor');
}
// safe dependency injection
// this prevents minification issues
config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider'];

App.config(config);
