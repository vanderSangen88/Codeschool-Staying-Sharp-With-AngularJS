angular.module("NoteWrangler")
.directive("nwCategoryItem", function(){
    return {
        restrict: "E",
        templateUrl: "/templates/directives/nw-category-item.html",
        scope: {
            category: "="
        },
        require: "^nwCategorySelect",
        link: function(scope, element, attrs, nwCategorySelectCtrl){
            scope.makeActive = function(){
                nwCategorySelectCtrl.setActiveCategory(scope.category);
            }
            scope.categoryActive = function(){
               return nwCategorySelectCtrl.getActiveCategory() === scope.category.name; 
            }
        }
    };
});