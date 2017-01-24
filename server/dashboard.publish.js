'use strict'

Meteor.publish('dashboard', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfDashboard', Dashboard.find(where), {noReady: true});
  return Dashboard.find(where, options);
});
