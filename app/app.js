var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'rzModule', 'angular-rating', 'ngFileUpload']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      title: 'Inventory',
      templateUrl: 'partials/products.html',
      controller: 'productsCtrl'
    })
    .when('/Inventory', {
      title: 'Inventory',
      templateUrl: 'partials/products.html',
      controller: 'productsCtrl'
    })
    .when('/Recipes', {
      title: 'Recipes',
      templateUrl: 'partials/recipes.html',
      controller: 'recipeCtrl'
    })
    .when('/Ingredients', {
      title: 'Ingredients',
      templateUrl: 'partials/ingredients.html',
      controller: 'ingredientCtrl'
    })
    .when('/Library', {
      title: 'Library',
      templateUrl: 'partials/library.html',
      controller: 'libraryCtrl'
    })
    .when('/Conversions', {
      title: 'Conversions',
      templateUrl: 'partials/conversions.html',
      controller: ''
    })
    .otherwise({
      redirectTo: '/'
    });;
}]);
