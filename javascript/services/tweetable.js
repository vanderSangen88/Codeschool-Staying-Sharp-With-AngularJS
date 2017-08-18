angular.module('NoteWrangler')
.provider("Tweetable", [function TweetableProvider(){
    this.$get = function($http){
        return function(potentialTweet){
            return $http({
            method: 'POST', 
            url: 'http://gentle-spire-1153.herokuapp.com/tweet', 
            data: {
                description: potentialTweet
            }
            });
        };
    };
}]);