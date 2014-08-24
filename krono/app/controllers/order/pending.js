import Ember from 'ember';

export default Ember.Controller.extend({

  transitionObserver: function() {
    var status = this.get('model.status');

    if (status == '1') {
      this.transitionToRoute('order.evaluate', this.get('model'));
    }
  }.observes('model.status'),

  updateOrder: function() {
    var self = this;
    var order = this.get('model');
    var url = 'https://krono-market.herokuapp.com/orders/' + order.id;
    Ember.$.ajax({
      url: url,
      type: 'GET',
      complete: function(res) {
        // console.log(url);
        // console.log(JSON.stringify(order));
        // console.log(JSON.stringify(res));
        res = JSON.parse(res.responseText);
        // console.log(res);
        // console.log('Response = ' + res);
        // self.store.push('order', {
        //   id: res.id,
        //   status: res.status,
        // });

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
  },

  // actions: {
  //   cancelOrder: function() {
  //     var self = this;
  //     var order = this.get('model');
  //     console.log('Order = ' + JSON.stringify(order));
  //     // order.set('status', 3);
  //     // order.save().then(function() {
  //     //   self.transitionTo('ordering');
  //     // }).catch(function(error) {
  //     //   console.log('Error = ' + JSON.stringify(error));
  //     // });

  //     var url = 'https://krono-market.herokuapp.com/orders/' + order.id;
  //     Ember.$.ajax({
  //       url: url,
  //       type: 'PUT',
  //       data: {
  //         status: 3
  //       },
  //       complete: function() {
  //         self.transitionToRoute('ordering');
  //       }
  //     });
  //   },
  // },

});
