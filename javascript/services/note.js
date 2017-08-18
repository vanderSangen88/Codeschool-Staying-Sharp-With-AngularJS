angular.module("NoteWrangler")
.factory("Note", ['$resource', function NoteFactory($resource) { // the naming convention <name> + <recipe>
    return $resource(
        "/notes/:id", {}, {    
            update: {
                method: "PUT"
            }
        });
    // return {
    //     all: function() {
    //         return $http({
    //             method: "GET", 
    //             url: "/notes"
    //         });
    //     },
    //     find: function(id){
    //         return $http({
    //             method: "GET", 
    //             url: "/notes" + id
    //         });
    //     },
    //     update: function(noteObj) {
    //         return $http({
    //             method: "PUT", 
    //             url: "/notes", 
    //             data: noteObj
    //         });
    //     },
    //     create: function(noteObj) {
    //         return $http({
    //             method: "POST", 
    //             url: "/notes", 
    //             data: noteObj
    //         });
    //     }
    // };
}]);