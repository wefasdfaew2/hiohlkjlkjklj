/* global CASINO */
/**
 * @ngdoc service
 * @name CASINO.service:casinocache
 * @description
 * CasinoCache
 */
CASINO.factory('CasinoCache', ['$cacheFactory', function ($cacheFactory) {
    'use strict';
    return $cacheFactory('CasinoCache', {});
}]);
