angular.module('NoteWrangler')
.controller('NotesIndexController', function($http){
    var controller = this;
    $http({method: 'GET', url: '/notes'})
    .success(function(data){
        controller.notes = data;
    });
});