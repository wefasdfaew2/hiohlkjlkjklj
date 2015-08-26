/**
 * @ngdoc controller
 * @name vbet5.controller:betPrint
 * @description Bet Print
*/
angular.module('vbet5').controller('betPrint', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {
    'use strict';

    $scope.printBetEvent = function printBetEvent() {
        $scope.betData = JSON.parse(decodeURIComponent($location.search().data));
        $scope.userId = $location.search().userId;
        $timeout(print);
    };

    $scope.printCouponContent = function printCouponContent() {
        $scope.liveCalendarGames = topLevelLiveCalendarGames;
        $scope.marketEvents = topLevelMarketEvents;
        $timeout(print);
    };
}]);