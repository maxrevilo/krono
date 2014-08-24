import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    cancelOrder: function() {
      var self = this;
      var order = this.get('model');
      console.log('Order = ' + JSON.stringify(order));
      // order.set('status', 3);
      // order.save().then(function() {
      //   self.transitionTo('ordering');
      // }).catch(function(error) {
      //   console.log('Error = ' + JSON.stringify(error));
      // });

      var url = 'https://krono-market.herokuapp.com/orders/' + order.id;
      Ember.$.ajax({
        url: url,
        type: 'PUT',
        data: {
          status: 3
        },
        complete: function() {
          self.transitionToRoute('ordering');
        }
      });
    },
  },

});
