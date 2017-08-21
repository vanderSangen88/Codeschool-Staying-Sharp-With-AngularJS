# Codeschool-Staying-Sharp-With-AngularJS

## ! The first version of Angular is now being known as AngularJS whereas versions of Angular which are 2.0 and above are now known as just Angular.

### 1.1 Wiring Together Views

#### Routes:

It's best to encapsulate each controller, filter, service or directive into their own file and give them their own directory. And separate files for each controller/filter/service or directive.

1. Using ngView:  
*in index.html*
```HTML
<div ng-view></div>
```
2. Loading the ngRoute library:  
*in index.html*
```html
<script src="js/vendor/angular-route.js"></script>
```
3. Importing ngRoute module:  
*in app.js*
```js
angular.module("NoteWrangler", ['ngRoute'])
```
4. Defining routes:  
*in routes.js*
```js
angular.module('NoteWrangler')
.config(function($routeProvider){});
```
Setting your app module to a variable and reusing that variable is **bad practice**.  
Re-declare your application module in every new file.

#### Defining Routes With $routeProvider:
*in routes.js*
```js
.when(path, route);
```
Adds a new route definition to the ```$route``` service.

```js
.otherwise(params);
```
Sets route definition that will be used on route change when no other route definition is matched.

Usage:
```js
$routeProvider.when('/notes', {
  templateUrl: '/templates/pages/notes/index.html'
})
.when('/users', {
  templateUrl: '/templates/pages/users/index.html'
})
.when('/', {
  templateUrl: '/templates/pages/notes/index.html'
})
.otherwise({redirectTo: '/'});
```

### 1.5 Logic in Our Routes

#### Outside Route Controller:
To link an existing controller:  
*in notes-index-controller.js*
```js
angular.module('NoteWrangler')
.controller('NotesIndexController', function(){

});
```
*in routes.js*
```js
...
templateUrl: '/templates/pages/notes/index.html',
controller: 'NotesIndexController',
controllerAs: 'indexController'
...
```
#### Assigning Notes to this.notes:
To grab notes, use the $http GET method and assign them to a variable on the controllers scope:  
*in notes-index-controller.js*
```js
...
var controller = this;
$http({method: 'GET', url: '/notes'})
.success(function(data){
  controller.notes = data;
});
...
```
#### Displaying Notes:
To display a list of all the notes, use ngRepeat to loop through them.  

We'll say ng-repeat equals note in, our alias, indexController .notes.  
*in notes/index.html*
```html
<div class="note-wrapper">
  <a class="card-notes" ng-repeat="note in indexController.notes">
  </a>
</div>
```

#### Displaying a Single Note:
1. First we'll give each note-anchor an ngHref that will plug-in the note-id to the path.  
*in index.html*
```html
...
<a class="card-notes"
    ng-repeat="note in indexController.notes"
    ng-href="#/notes/{{note.id}}">
</a>
...
```
2. Then in our routes, let's define our note-id route. We'll say .when slash notes slash colon id. The colon id is specifying that a route parameter is here.  
3. After that we'll pass in the templateUrl and controller for notes-show and give that controller an alias.  
*in routes.js*
```js
...
.when('/notes/:id', {
  templateUrl: '/templates/pages/notes/show.html',
  controller: 'NotesShowController',
  controllerAs: 'showController'
});
...
  ```

  #### $routeParams to Read the Parameters:
You can use ```$routeParams``` in order to grab that node-id out of the url.

4. So back in our NotesShowController, we can pass in dollarSign routeParams into our function
5. and then we can create a get method and append that routeParams.id at the end of it to fetch the data for that single note.  
6. We're attaching ```this``` to ```var controller``` outside the success-callback. Then inside the success we're saying ```controller.note``` and set it equal to ```data```. This-keyword inside the callback no longer references the controller, so we have to do it this way.  
*in notes-show-controller.js*
```js
angular.module('NoteWrangler')
.controller('NotesShowController', function($http, $routeParams){ // 4.
  var controller = this; // 6.
  $http({method: 'GET', url: '/notes/' + $routeParams.id}) // 5.
  .success(function(data){
    controller.note = data;
  });
});
```
7. Lastly, we'll create our notesShowTemplate that will display the information for that one single note:  
*in notes/show.html*
```html
<div class="card">
  <h1>{{note.title}}</h1>
  <p>Created by: {{note.user || note.user.username}}</p>
  <h3>Description:</h3>
  <p>{{note.description}}</p>
  <h3>Contents:</h3>
  <p>{{note.content}}</p>
</div>
```

#### Creating a New Note:
Our NotesCreateController is going to need a method that our form can call to save a new note.  
1. Inside our note-create-controller we're going to attach a saveNote-function.  
2. Inside that function's parameters we'll pass it ```note```. That note is the note's data that we're getting send from our form.  
3. Then we'll make an http-call with a method of POST, give it the url that we are sending our data to  
4. and lastly the note object which contains all of the new note's information.

  What if our http-call fails?  
  We need to be able to give this feedback to our user.
5. So let's go ahead and create a this.errors variable and set it equal to null. Currently there are no errors.  
6. Then we'll declare the catch-callback, which will only be called if there is an error.
7. We'll assign that error to the variable we've just created.  
  *in note-create-controller.js*
```js
angular.module('NoteWrangler')
.controller('NotesCreateController', function($http){
    var controller = this;
    this.saveNote = function(note){ // 1. & 2.
        controller.errors = null; // 5.
        $http({method: 'POST', url: '/notes', data: note}) // 3. & 4. | passing 'note' as data option
        .catch(function(note){ // 6.
            controller.errors = note.data.error; // 7.
        });
    };
});
```
  If you wanted to display this in our template, you could
8. use an ngIf there is an error then go ahead and display that error.  
*in the template*
```html
<p ng-if="createController.errors"> {{ createController.errors }} </p>
```
---

### 2.1 $scope

### 2.2 Scope-a-dope - QUIZ
When using the ```controllerAs``` syntax, the controller's context (```this```) attaches things to the current ```scope```behind the scenes. **TRUE**

### 2.5 Scope the Config object

#### Isolating the Scope:
Give the directive object a property called scope and set it to an empty object.  
*in nw-card.js*
```js
...
  scope: {},
...
```
#### Passing Header Into the directive:
Isolating the scope breaks the access to the parent' scope. Therefor
1. set the note instance to a header variable and
2. print it out in the template.  
*in notes.html*
```html
<nw-card header="{{note.title}}"></nw-card> <!-- 1. -->
```
*in nw-card.html*
```html
<h2 class="h3">{{header}}</h2> <!-- 2. -->
```

#### A Way to Pass In a Header:
To tell the directive it might receive a header variable and to bind it to the scope, some configuration is needed.
1. Inside the scope set ```header``` to the ```"@"``` character. This tells the directive it passes in a string.  
*in nw-card.js*
```js
...
  scope: {
    header: "@" // @ passes in a string
  }
...
```
There are 3 options when binding data to an isolate scope: @, =, and & characters.
- ```"@"``` passes in a string.
- ```"="``` two-way binds an object.
- ```"&"``` ??

#### Add Multiple Bindings:
To display more then just the header, pass in as many bindings as you need to that object.  
*in nw-card.js*
```js
...
  scope {
    header: "=",
    icon: "="
  }
...
```

#### Difference Between $scope and Scope Object:
The Scope Object is used to isolate a directive' scope. Whereas the $scope in the controller is used to set values or functions on the scope.

### 2.6 Default Scope - QUIZ
By default, directives use their parent's scope. **TRUE**

### 2.7 Setting on Scope - QUIZ
When setting ```$scope.title``` inside a directive using the default scope, we are actually setting a variable named title on the parent $scope. **TRUE**

### 2.10 Link
Objective: Click on each note to display the note's description.

The link function is run after the directive has been compiled and linked up.  
*in nw-card.js*
```js
...
  return {
      link: function(){
        $("div.card").on("click", function(){
          $("div.card p").toggleClass("hidden");
        });
      }
  }
...
```
But this still searches the entire DOM... Luckely ```link``` has an element parameter.
The first parameter is scope, the second is the element. The element refers to the outermost element of the included template, which in our case is the div with the class card.  
*in nw-card.js*
```js
...
  return {
    link: function(scope, element){
        element.on("click", function(){
          element("div.card p").toggleClass("hidden"); // No longer searches the entire DOM
        });
    }
  }
...
```
Link has an additional ```attrs``` parameter which allows access any of the attributes that are set on the directives element.  
*in nw-card.js*
```js
  ...
    link: function(scope, element, attrs){
      ...
      console.log(attrs.header);
    }
  ...
```

**The link function is the *PERFECT* place to do DOM-manipulation and any logic-functionality in the directive.**

#### Strict Contextual Escaping service:
It tells AngularJS "I trust this as HTML; Don't worry about escaping HTML that could be potentially unsafe".

### 2.11 DOM Manipulation - QUIZ
**Inside a directive's ```link``` function** is the proper place to access the HTML element within a directive.

---
## Services Level 3 - 5 Recipes and a Factory

### 3.1 A Service for Our Data Calls
Services are responsible for connecting and getting data, and then sharing it across our application.

There are 5 total recipes that range in complexity and customization.
1. Value; used often. The simplest service recipe used for sharing a value that is used throughout your app repeatedly.
2. Factory; most commonly used. Shares methods and objects.
3. Service; rarely used. Shares instances of methods and objects.
4. Provider; commonly used. Shares methods and objects (like a Factory), but allows for configuration.
5. Constant; used less often. Shares a value witin application configuration.

Factory and Provider are the two most commonly used for creating a Service.

#### Creating a Service With the Factory Recipes
Use the Factory recipe to register the service with our app module.  
*in note.js*
```js
angular.module("NoteWrangler") // <ModuleName>
.factory("Note", [function NoteFactory(){ // <ServiceName> <ServiceName>Factory
  ...  
}]);
```

#### Injecting Factory Service
1. To use the factory, inject it into the function
2. then call it  

*in notes-index-controller.js*
```js
angular.module("NoteWrangler")
.controller("NotesIndexControlller", function($scope, Note){
  Note.all()
  .success(function(data){
    $scope.notes = data;
  });
});
```

### 3.4 A Service for an Outside API

#### Providing Our App With Gravatar Images
In order to access someone's Gravatar, we need to hash their email address and append it to a URL.
1. Hash user's email address into a hash. (test@test.nl => bf4ee76b5f3a6bfed26bca5460bc3f22)
2. Add this hash onto a Gravatar URL (http://www.gravatar.com/avatar/bf4ee...png)
3. Use this URL in a template with an ```ng-src``` attribute.

*in index.html*
```html
<!-- Include lib for hashing -->
<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js"></script>
```
*in gravatar.js*
```js
// Create new Factory called Gravatar
angular.module("NoteWrangler")
.factory("Gravatar", function GravatarFactory(){
    var avatarSize = 80; // Default size
    var avatarUrl = "http://www.gravatar.com/avatar/";
    return function(email){
        return avatarUrl // 2.
        + CryptoJS.MD5(email) // 1.
        + "?size=" + avatarSize.toString();
    };
});
```
*in users-index-controller.js*
```js
angular.module("NoteWrangler")
.controller("UsersIndexController", function($scope, Gravatar){
    $scope.gravatarUrl = function(email){
        return Gravatar(email);
    }
});
```
*in users/index.html*
```html
<nw-card ... image="gravatarUrl(user.email)"></nw-card>
```
*in nw-card.html*
```html
...
<img ng-src="{{image}}" ng-if="image" /> <!-- 3. -->
...
```

### 3.7 Providers

#### Current Gravatar Factory
Use a provider recipe instead to make the ```avatarSize``` configurable.

Providers run before everything else, so the only thing you can inject into them is other providers.

**When defining a factory recipe, an empty Provider with the $get method set to your factory function is automatically created under the hood.**

To convert the factory in a provider:
1. Change ```.factory``` to ```.provider```.
2. Wrap the ```return``` with an anonymous function and set it equal to this.$get.

To make it configurable:
1. Create a function in the provider.
2. Add configuration to the main module.
3. Pass in the configurable setting.

### 3.10 $resource

#### Installing Angular resource
The ngResource module is not included with the AngularJS core by default - We need to download it from code.angularjs.org and include it here: js/vendor/angular-resource.js.  
*in index.html*
```html
<script src="js/vendor/angular-resource.js"></script>
```

#### Including ngResource in Our App module
*in app.js*
```js
angular.module("NoteWrangler", ['ngRoute', 'ngResource'])

```

#### $resource shortened our code
To get a single resource ```Note.get({id: $routeParams.id})```.  
To get all resources ```Note.query()```.  
To delete resources ```Note.$delete()```.  
To create a new resource ```$scope.note = new Note(); note.$save()```.

#### Creating Custom $resource Methods
*in note.js*
```js
...
  return $resource('/notes/:id', {}, {
    update: {
      method: "PUT"
    }
  });
...
```

---
## Reusable Directives Level 4

### 4.1 Helping Child and Parent Communicate

#### Creating a Category Select Directive
*in index.html*
```html
<nw-category-select></nw-category-select>
```
*in new nw-category-select.js*
```js
angular.module("NoteWrangler")
.directive("nwCategorySelect", ['$scope', function($scope, Category){
    return {
        replace: true,
        restrict: "E",
        templateUrl: "/templates/directives/nw-category-select.html"
    };
});
```

#### Retrieving a List of Categories
*in nw-category-select.js*
```js
...
link: function(scope, element, attrs){ // Data access should be done from the link function
  scope.categories = Category.query();
}
...
```

#### Mocking Up Templates
*in new nw-category-select.html*
```html
<div class="sort-menu">
  <h2>Categories</h2>
  <div class="card">
    <!-- Child Select Items Go Here -->
    <nw-category-item
      ng-repeat="category in categories"
      category="category">
    </nw-category-item>
  </div>
</div>
```

*in new nw-category-item.html*
```html
<a class="sort-menu-item">
  <i class="icon left {{category.icon}}"></i>
  {{category.name}} {{category.Count()}}
</a>
```

#### Creating Our Inner Child directive
*in new nw-category-item.js*
```js
angular.module("NoteWrangler")
.directive("nwCategoryItem", function() {
  return {
    restrict: "E",
    templateUrl: "/templates/directives/nw-category-item.html",
    scope: {
      category: "="
    }
  };
});
```
#### Where to Keep Track of Active Category
In nwCategorySelect, manage the activeCategory and allow the inner nwCategoryItems to get or set the active value when they need to.

#### Defining Our setActiveCategory function
*in nw-category-select.js*
```js
...
  controller: function($scope){
    this.setActiveCategory = function(category) {
      $scope.activeCategory = category.name;
    }
  }
...
```

#### Inner categoryItems Need Parent's Method
Have each child require their parent's directive.
*in nw-category-item.js*
```js
...
  require: "^nwCategorySelect"
...
```

#### Adding Link's 4th Parameter; the parent's controller.
*in nw-category-item.js*
```js
...
  link: function(scope, element, attrs, nwCategorySelectCtrl){
    scope.makeActive = function(){
      nwCategorySelectCtrl.setActiveCategory(scope.category);
    }
  }
...
```

#### Calling makeActive with ngClick
*in nw-category-item.html*
```html
<a
  class="sort-menu-item"
  ng-click="makeActive()">
    ...
</a>
```

#### Creating categoryActive()
*in nw-category-select.js*
```js
...
  controller: function($scope){
    this.getActiveCategory = function() {
        return $scope.activeCategory;
    }
    ...
    return this;
  }
...
```

#### Creating a Method to Toggle Active styles
*in nw-category-item.js*
```js
...
link: function(scope, element, attrs, nwCategorySelectCtrl){
  ...
  scope.categoryActive = function() {
    return nwCategorySelectCtrl.getActiveCategory() === scope.category.name;
  }
}
...
```

*in nw-category-item.html*
```html
<a
  ...
  ng-class="'active': categoryActive()">
    ...
</a>
```
