angular.module("NoteWrangler")
.directive("nwCategorySelect", ['$scope', function($scope, Category){
    return {
        replace: true,
        restrict: "E",
        templateUrl: "/templates/directives/nw-category-select.html",
        link: function(scope, element, attrs){ // Data access should be done from the link function
            scope.categories = Category.query();
        },
        controller: function($scope) {
            this.getActiveCategory = function(){
                return $scope.activeCategory;
            }
            this.setActiveCategory = function(category){
                $scope.activeCategory = category.name;
            }
            return this;
        }
    };
}]);