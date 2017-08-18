angular.module('NoteWrangler')
.controller('NotesShowController', ['$scope', '$routeParams', 'Note', function($scope, $routeParams, Note){
    $scope.note = Note.get({
        id: $routeParams.id
    });
    // Note.find($routeParams.id)
    // .success(function(data){
    //     $scope.note = data;
    // });
}]);