'use strict';

angular.module('myApp.home')
    .controller('HomeCtrl', ['$scope', 'store', function($scope, store) {
        $scope.cards = store.cards;

        $scope.addCard = function () {
          store.addCard();
        };

        $scope.$watch('cards', function(newVal, oldVal) {
            if (newVal != oldVal) {
                store.update();
            }
        }, true);
    }]);