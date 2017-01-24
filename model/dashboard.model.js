Dashboard = new Mongo.Collection('dashboard');

Dashboard.allow({
  insert: function(userId, dashboard) {
    return userId;
  },
  update: function(userId, dashboard, fields, modifier) {
    return userId;
  },
  remove: function(userId, dashboard) {
    return userId;
  }
});