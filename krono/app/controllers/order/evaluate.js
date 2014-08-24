import Ember from 'ember';

export default Ember.Controller.extend({

  products: [],

  updateProducts: function() {
    var self = this;
    this.store.find('product').then(function(data) {
      self.set('products', data);
    });
  }.on('init'),

  annotations: [
    'No tenemos Coca Cola, tenemos Pepsi.',
    'No tenemos Leche Entera, tenemos Leche deslactosada'
  ],

});
