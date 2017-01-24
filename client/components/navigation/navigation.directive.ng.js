'use strict';

angular.module('strollerDesertAppApp')
.directive('navigation', function() {
  return {
    restrict: 'EA',
    templateUrl: 'client/components/navigation/navigation.view.ng.html',
    replace: true,
    link: function(scope, elem, attrs) {
      scope.property = 'navigation';
    }
  };
});