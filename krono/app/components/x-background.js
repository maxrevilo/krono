import Ember from "ember";

export default Ember.Component.extend({

  tagName: 'x-background',

  setupImage: function() {
    var imgSource = this.get('imgSource');
    if (imgSource) {
      this.$().css('background-image', 'url(' + imgSource + ')');
    }
  }.observes('imgSource').on('didInsertElement'),

});
