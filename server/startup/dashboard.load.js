Meteor.startup(function() {
  if(Dashboard.find().count() === 0) {
    var dashboard = [
      {
        'name': 'dashboard 1'
      },
      {
        'name': 'dashboard 2'
      }
    ];
    dashboard.forEach(function(dashboard) {
      Dashboard.insert(dashboard);
    });
  }
});