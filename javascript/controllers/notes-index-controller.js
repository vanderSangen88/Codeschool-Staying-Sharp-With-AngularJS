angular.module('NoteWrangler')
.controller('NotesIndexController', ['$http', '$scope', function($http, $scope){
    $http({method: 'GET', url: '/notes'})
    .success(function(data){
        $scope.notes = data;
    });
});