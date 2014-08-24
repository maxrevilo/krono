import Ember from 'ember';

var Router = Ember.Router.extend({
  location: KronoENV.locationType
});

Router.map(function() {
  this.route('ordering');
  this.resource('order', { path: '/order/:order_id' }, function() {
    this.route('pending');
    this.route('evaluate');
  });
});

export default Router;
