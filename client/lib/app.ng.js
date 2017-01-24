angular.module('strollerDesertAppApp', [
  'angular-meteor',
  'ui.router',
  'ui.bootstrap',
  'angularUtils.directives.dirPagination',
  'accounts.ui',
  'gridster',
  'chart.js'
]);

onReady = function() {
  angular.bootstrap(document, ['strollerDesertAppApp']);
};

if(Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
