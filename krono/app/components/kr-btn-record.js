import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  classNames: ['btn-record'],

  classNameBindings: ['isTouching:btn-record-touch'],
  isTouching: false,

  touchStart: function() {
    this.sendAction('start');
    this.set('isTouching', true);
  },

  touchEnd: function() {
    this.sendAction('stop');
    this.set('isTouching', false);
  }

});
