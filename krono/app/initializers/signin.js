import Ember from 'ember';

export default {
  name: 'signin',

  initialize: function() {
    var url = 'https://krono-market.herokuapp.com/auth/auto_signup/';
    Ember.$.post(url, function(data) {
      console.log(data)
    });
  }

};
