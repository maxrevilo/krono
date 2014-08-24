import Ember from 'ember';

export default Ember.Controller.extend({

  products: [],

  updateProducts: function() {
    var self = this;
    this.store.find('product').then(function(data) {
      self.set('products', data);
    });
  }.on('init'),

  transitionObserver: function() {
    var status = this.get('model.status');

    if (status === 4) {
      this.transitionToRoute('order.pickup', this.get('model'));
    }
  }.observes('model.status'),

  annotations: [
    'No tenemos Coca Cola, tenemos Pepsi.',
    'No tenemos Leche Entera, tenemos Leche deslactosada'
  ],

});
