import Ember from 'ember';

export default Ember.Route.extend({

  afterModel: function() {
    var self = this;
    // var polling = Ember.run.later(this, function() {
    var polling = setInterval(function() {
      var order = self.controller.get('model');
      var url = 'https://krono-market.herokuapp.com/orders/' + order.id;
      Ember.$.ajax({
        url: url,
        type: 'GET',
        complete: function(res) {
          res = JSON.parse(res.responseText);
          console.log('Polled = ' + res);
          var messages_ids = [];
          res.messages.forEach(function(message) {
            self.store.push('message', {
              id: message.id,
              user_id: message.user_id,
              file: message.file
            });
            messages_ids.push(message.id);
          });
          var order = self.store.push('order', {
            id: res.id,
            status: res.status,
            messages: messages_ids
          });

        }
      });

    }, 1000);
    this.set('polling', polling);
  },

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
          self.transitionTo('ordering');
        }
      });
    },
  },

});
