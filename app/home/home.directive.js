angular.module('myApp.home')
    .directive('keyPressEnter', function() {
        return function(scope, element, attrs) {
            element.bind('keydown keypress', function(event) {
                if (event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.keyPressEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    })

    .directive('trelloCard', function(cardStorage) {
        return {
            restrict: 'EA',
            scope: {
                data: '=data'
            },
            templateUrl: 'home/partials/card.html',
            transclude: true,
            link: function(scope, element, attrs) {
                scope.newItem = '';

                scope.addItem = function(card) {
                    var item = {
                        title: scope.newItem.trim(),
                        id: (new Date()).getTime()
                    };

                    if (item.title) {
                        cardStorage.save(item, card)
                            .then(function success() {
                                scope.newItem = '';
                            });
                    }
                };

                scope.removeItem = function(id, card) {
                    cardStorage.remove(id, card);
                };
            }
        };
    });