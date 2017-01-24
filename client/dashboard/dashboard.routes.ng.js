'use strict'

angular.module('strollerDesertAppApp')
.config(function($stateProvider) {
  $stateProvider
  .state('dashboard', {
    url: '/',
    templateUrl: 'client/dashboard/dashboard.view.ng.html',
    controller: 'DashboardCtrl',
    // resolve: {
    //   currentUser: ['$meteor', function($meteor) {
    //     return $meteor.requireUser();
    //   }]
    // }
  });
});
