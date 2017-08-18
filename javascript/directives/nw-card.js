'use strict';

angular.module("NoteWrangler")
.directive("nwCard", function(){
    var num = 1;
    return {
        restrict: "E",
        templateUrl: "templates/directives/nw-card.html",
        scope: {
            header: "=",
            description: "=",
            id: "=",
            image: "="
        },
        link: function(scope, element, attrs){
            element.on("click", function(){
                element("div.card p").toggleClass("hidden");
            });
            console.log(attrs.header);
        },
    }
});