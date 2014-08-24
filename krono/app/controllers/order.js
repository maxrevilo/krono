import Ember from 'ember';

export default Ember.Controller.extend({

  isRecording: false,
  fileSrc: function() {
    var url = window.resolveLocalFileSystemURL(cordova.file.dataDirectory) + 'tmprecording.amr';
    console.log('**************** **************** ****************');
    console.log(url);
    return url;
    // return 'tmprecording.amr';

    // function createMedia(recordFileName,onMediaCreated){
    //   if (mediaVar != null) {
    //     onMediaCreated();
    //     return;
    //   }
    //   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
    //     fileSystem.root.getDirectory(“myApp”,{create:true},function(directory){
    //       directory.getFile(recordFileName, {
    //         create: true,
    //         exclusive: false
    //       }, function(fileEntry){
    //         console.log(“File ” + recordFileName + ” created at ” + fileEntry.fullPath);
    //         mediaVar = new Media(fileEntry.fullPath, onSuccess, onError);
    //         onMediaCreated();
    //       }, onError); //of getFile

    //     },onError);
    //   }, onError); //of requestFileSystem
    // }

  }.property(),

  actions: {

    record: function() {
      if (this.get('isRecording')) {
        this.send('stop');
      }
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

      // this.transitionToRoute('pending');

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

    upload: function() {


      // !! Assumes variable fileURL contains a valid URL to a text file on the device,
      //    for example, cdvfile://localhost/persistent/path/to/file.txt

      var win = function (r) {
          console.log("Code = " + r.responseCode);
          console.log("Response = " + r.response);
          console.log("Sent = " + r.bytesSent);
      }

      var fail = function (error) {
          alert("An error has occurred: Code = " + error.code);
          console.log("upload error source " + error.source);
          console.log("upload error target " + error.target);
      }

      var options = new FileUploadOptions();
      options.fileKey = "file";
      options.fileName = "tmprecording.amr";
      options.mimeType = "audio/AMR";

      var params = {};
      params.type = "AUDIO";
      options.params = params;

      // console.log('********* ********* ********* *********');
      // console.log(window.resolveLocalFileSystemURL(cordova.file.tempDirectory) + this.get('fileSrc'))
      // console.log(window.LocalFileSystem.TEMPORARY + this.get('fileSrc'));
      // console.log(LocalFileSystem.TEMPORARY + this.get('fileSrc'));

      var ft = new FileTransfer();
      // ft.upload('/storage/emulated/0/' + this.get('fileSrc'), encodeURI("https://krono-market.herokuapp.com/orders/1/messages"), win, fail, options);
      ft.upload(this.get('fileSrc'), encodeURI("https://krono-market.herokuapp.com/orders/1/messages"), win, fail, options);


    },

  },

});
