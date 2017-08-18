angular.module('NoteWrangler')
.controller('NotesIndexController', ['$scope', 'Note', 'Tweetable', function ($scope, Note, Tweetable){
    $scope.notes = Note.query();
    // Note.all()
    // .success(function(data){
    //     $scope.notes = data;
    // });
    $scope.tweetThatNote = function(noteToTweet) {
        Tweetable(noteToTweet)
        .success(function(status){
          console.log(status);
        });
      };
}]);