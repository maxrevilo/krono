import Ember from 'ember';

var Router = Ember.Router.extend({
  location: KronoENV.locationType
});

Router.map(function() {
  this.route('order');
  this.route('pending');
});

export default Router;
