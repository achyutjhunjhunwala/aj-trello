'use strict';

angular.module('myApp.home')
    .factory('cardStorage', function ($q, $resource) {

        var STORAGE_ID = 'trello-card',
            store;

        store = {
            cards: [],

            _getFromLocalStorage: function () {
                return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
            },

            _saveToLocalStorage: function (cards) {
                localStorage.setItem(STORAGE_ID, JSON.stringify(cards));
            },

            checkAndCreate: function() {
                var queryObj;

                if (!localStorage.getItem(STORAGE_ID)) {
                    queryObj = $resource('/mocks/data.json');

                    return queryObj.get(function(data) {
                        store._saveToLocalStorage(data.cards);
                    });
                }
            },

            addCard: function() {
                var card = {
                    "card" : []
                },
                deferred = $q.defer();

                store.cards.push(card);
                store._saveToLocalStorage(store.cards);
                deferred.resolve(store.cards);

                return deferred.promise;
            },

            get: function () {
                var deferred = $q.defer();

                angular.copy(store._getFromLocalStorage(), store.cards);
                deferred.resolve(store.cards);

                return deferred.promise;
            },

            save: function (item, card) {
                var deferred = $q.defer();

                card.push(item);

                store._saveToLocalStorage(store.cards);
                deferred.resolve(store.cards);

                return deferred.promise;
            },

            remove: function (id, card) {
                var deferred = $q.defer(),
                    i, obj;

                for(i = 0; i < card.length; i++) {
                    obj = card[i];

                    if(id === obj.id) {
                        card.splice(i, 1);
                        i--;
                    }
                }

                store._saveToLocalStorage(store.cards);
                deferred.resolve(store.cards);

                return deferred.promise;
            },

            update: function () {
                var deferred = $q.defer();

                store._saveToLocalStorage(store.cards);
                deferred.resolve(true);

                return deferred.promise;
            }
        };

        return store;
    });