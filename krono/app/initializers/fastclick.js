import Ember from 'ember';

export default {
  name: 'fastclick',
  initialize: function() {
    FastClick.attach(document.body);
  }
};
