'use strict';

angular.module('strollerDesertAppApp')

.config(['ChartJsProvider', '$urlRouterProvider','$locationProvider', function(ChartJsProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  ChartJsProvider.setOptions({
    chartColors: ['#FF5252', '#FF8A80'],
    responsive: true
  });

}]).run(['$rootScope', '$state', function($rootScope, $state) {

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    switch(error) {
      case 'AUTH_REQUIRED':
      case 'FORBIDDEN':
      case 'UNAUTHORIZED':
        $state.go('login');
        break;
    }
  });



}]);
