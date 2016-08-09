'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/partials/home.html',
    controller: 'HomeCtrl',
    resolve: {
      store: function (cardStorage) {
        // Uncomment below code to load data from mock JSON
        // cardStorage.checkAndCreate();
        cardStorage.get();
        return cardStorage;
      }
    }
  });
}]);