angular.module('NoteWrangler')
.controller('NotesCreateController', ['$scope', 'Note', function ($scope, Note){
    this.saveNote = function(note){
        $scope.note = new Note();
        $scope.saveNote = function(note){
            $scope.errors = null;
            $scope.updating = true;
            // Note.create(note)
            note.$save(note)
            .catch(function(note){
            $scope.errors = [note.data.error];
            }).finally(function(){
                $scope.updating = false;
            });
        };
    };
}]);