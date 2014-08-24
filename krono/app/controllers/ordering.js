import Ember from 'ember';

export default Ember.Controller.extend({

  isRecording: false,
  fileSrc: function() {
    // var url = window.resolveLocalFileSystemURL(cordova.file.dataDirectory) + 'tmprecording.amr';
    var url = 'tmprecording.amr';
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

      this.send('upload');

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

      var self = this;

      var win = function (r) {
          console.log("Code = " + r.responseCode);
          console.log("Response = " + r.response);
          console.log("Sent = " + r.bytesSent);

          // {"messages": [{"order_number": "CRDJJ7", "user_id": 50, "_created_at": "2014-08-24T05:28:58.462489", "file": "media/2014/08/24/messages/audio/tmprecording_0MWeO4H.amr"}], "user_id": 50, "_created_at": "2014-08-24T05:28:58.431410", "status": 80, "number": "CRDJJ7"}:

          var res = JSON.parse(r.response);
          var messages_ids = [];
          res.messages.forEach(function(message) {
            self.store.push('message', {
              id: message.id,
              user_id: message.user_id,
              file: message.file
            });
            messages_ids.push(message.id);
          });

          var params = {
            id: res.id,
            status: res.status,
            messages: messages_ids
          };

          var order = self.store.push('order', params);
          self.transitionToRoute('order.pending', order);
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
      options.chunkedMode = false;

      var params = {};
      params['type'] = "AUDIO";
      options.params = params;

      window.resolveLocalFileSystemURL('file:///storage/emulated/0/' + this.get('fileSrc'), function(fileEntry) {
        var realUrl = fileEntry.toURL();
        console.log("real URL", realUrl);

        var ft = new FileTransfer();
        ft.upload(realUrl, encodeURI("https://krono-market.herokuapp.com/orders/"), win, fail, options);

      });
    },

  },

});
