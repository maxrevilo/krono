import Ember from 'ember';

export default Ember.Controller.extend({

  isRecording: false,
  fileSrc: 'myrecording.mp3',

  actions: {

    record: function() {
      var src = this.get('fileSrc');
      var self = this;
      var mediaRec = new Media(src,
          function() {
              console.log("recordAudio():Audio Success");
              self.set('isRecording', false);
          },

          function(err) {
              console.log("recordAudio():Audio Error: "+ err.code);
              self.set('isRecording', false);
          });
      mediaRec.startRecord();
      this.set('mediaRec', mediaRec);
      this.set('isRecording', true);
    },

    stop: function() {

      var mediaRec = this.get('mediaRec');
      if (mediaRec) {
        mediaRec.stopRecord();
      }

    },

    play: function() {
      var src = this.get('fileSrc');
      var my_media = new Media(src,
          function () {
              console.log("playAudio():Audio Success");
          },
          function (err) {
              console.log("playAudio():Audio Error: " + err);
          }
      );
      my_media.play();
    },

  },

});
