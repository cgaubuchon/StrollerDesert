'use strict'

angular.module('strollerDesertAppApp')
.controller('DashboardCtrl', function($scope, $document, $rootScope) {
  var $BODY = $document.find('body'),
      $SIDEBAR_MENU = $BODY.find('#sidebar-menu'),
      $LEFT_COL = $BODY.find('.left_col'),
      $SIDEBAR_FOOTER = $BODY.find('.sidebar-footer'),
      $RIGHT_COL = $BODY.find('.right_col'),
      $NAV_MENU = $BODY.find('.nav_menu'),
      $FOOTER = $BODY.find('footer');

  $scope.viewName = 'Dashboard';
  $scope.charts = [];

  $scope.gridsterOpts = {
      columns: 6, // the width of the grid, in columns
      pushing: true, // whether to push other items out of the way on move or resize
      floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
      swapping: false, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
      width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
      colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
      rowHeight: 330, // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
      margins: [10, 10], // the pixel distance between each widget
      outerMargin: false, // whether margins apply to outer edges of the grid
      sparse: false, // "true" can increase performance of dragging and resizing for big grid (e.g. 20x50)
      isMobile: false, // stacks the grid items if true
      mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
      mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
      minColumns: 1, // the minimum columns the grid must have
      minRows: 1, // the minimum height of the grid, in rows
      maxRows: 100,
      defaultSizeX: 2, // the default width of a gridster item, if not specifed
      defaultSizeY: 1, // the default height of a gridster item, if not specified
      minSizeX: 1, // minimum column width of an item
      maxSizeX: null, // maximum column width of an item
      minSizeY: 1, // minumum row height of an item
      maxSizeY: null, // maximum row height of an item
      resizable: {
         enabled: true,
         handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
         stop: function(event, $element, widget) {
           console.log($scope.charts[ angular.element($element[0]).attr('chart-index') ]);
           $scope.charts[ angular.element($element[0]).attr('chart-index') ].$broadcast("$reload", {});
         }
      },
      draggable: {
         enabled: true, // whether dragging items is supported
         handle: '.x_title', // optional selector for drag handle
      }
  };

  $scope.chart_labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  $scope.chart_series = ['Steps'];
  $scope.chart_data = [
    [65, 59, 80, 81, 56, 55, 40]
  ];

  //Default charts to be shown if not in user profile
  $scope.dashboardItems = [
    { sizeX: 6, sizeY: 1, row: 0, col: 0, minSizeY: 1, type: 'total-steps', title: "Total Steps" }, //stroll taker
    { sizeX: 2, sizeY: 1, row: 1, col: 0, minSizeY: 1, type: 'goal-remaining-steps', title: "Steps Until Next Goal" }, //stroll taker
    { sizeX: 2, sizeY: 1, row: 1, col: 2, minSizeY: 1, type: 'total-goals', title: "Total Deserts Delivered" }, //stroll taker
    { sizeX: 2, sizeY: 1, row: 1, col: 4, minSizeY: 1, type: 'desert-makers', title: "Desert Makers" }, //stroll taker
    { sizeX: 2, sizeY: 1, row: 1, col: 2, minSizeY: 1, type: 'children-effected', title: "Total Children with Desert" }, // both
    { sizeX: 2, sizeY: 1, row: 1, col: 4, minSizeY: 1, type: 'total-steps-encouraged', title: "Total Steps Encouraged" }, // desert maker
    { sizeX: 2, sizeY: 1, row: 2, col: 0, minSizeY: 1, type: 'all-deliveries', title: "Deliveries" }, //desert maker
    { sizeX: 2, sizeY: 1, row: 2, col: 2, minSizeY: 1, type: 'total-steps', title: "Total Daily Steps" },
    { sizeX: 2, sizeY: 1, row: 2, col: 4, minSizeY: 1, type: 'total-steps', title: "Total Daily Steps" },
    { sizeX: 2, sizeY: 1, row: 3, col: 0, minSizeY: 1, type: 'total-steps', title: "Total Daily Steps" },
    { sizeX: 2, sizeY: 1, row: 4, col: 2, minSizeY: 1, type: 'total-steps', title: "Total Daily Steps" }
  ];



  var setContentHeight = function () {
      // reset height
      $RIGHT_COL.css('min-height', $(window).height());

      var bodyHeight = $BODY.outerHeight(),
          footerHeight = $BODY.hasClass('footer_fixed') ? 0 : $FOOTER.height(),
          leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
          contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

      // normalize content
      contentHeight -= $NAV_MENU.height() + footerHeight;

      $RIGHT_COL.css('min-height', contentHeight);
  };

  //Simple navigation toggle for large/small navs
  $scope.toggleNavigation = function(){
        if ($BODY.hasClass('nav-md')) {
            $SIDEBAR_MENU.find('li.active ul').hide();
            $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
        } else {
            $SIDEBAR_MENU.find('li.active-sm ul').show();
            $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
        }

        $BODY.toggleClass('nav-md nav-sm');

        setContentHeight();
  };

  //Add charts to track any time they may change in size
  $scope.$on('chart-create', function (evt, chart) {
    $scope.charts.splice(chart.options.gridIndex, 0, chart);
    console.log($scope.charts);
  });


});
