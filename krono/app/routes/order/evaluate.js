import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.modelFor('order');
  },

  // transitionObserver: function() {
  //   alert('transition changed');
  //   var status = this.get('controller.model.status');

  //   if (status == '1') {
  //     this.transitionTo('order.evaluate', this.get('controller.model'));
  //   }
  // }.observes('controller.model.status'),

});
