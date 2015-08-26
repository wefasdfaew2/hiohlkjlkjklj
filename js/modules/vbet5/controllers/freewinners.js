/* global VBET5 */
/**
 * @ngdoc controller
 * @name vbet5.controller:freeWinnersCtrl
 * @description
 * lottery controller.
 */
VBET5.controller('freeWinnersCtrl', ['$scope', 'Zergling', function ($scope, Zergling) {
    'use strict';

    $scope.loadWinners = function loadWinners() {
        Zergling
            .get({}, 'free_winners')
            .then(function (data) {
                console.log('winners', data);
                $scope.winners = data.winners.splice(0, 7);
                var i, ids = [];
                for (i = $scope.winners.length - 1; i >= 0; i--) {
                    if (ids.indexOf($scope.winners[i].client_id.toString()) !== -1) {
                        $scope.winners[i].client_id = $scope.winners[i].client_id.toString() + '_2';
                    }
                    ids.push($scope.winners[i].client_id.toString());
                }
                console.log('winners processed', $scope.winners);
                $scope.winnerSliderSet(0);
            });
    };

    $scope.loadRankingTable = function loadRankingTable() {
        Zergling
            .get({}, 'ranking_table')
            .then(function (data) {

                $scope.players = data.rankings;
                //angular.forEach($scope.players, function (player) {
                //    //player.amount = Math.abs(player.amount);
                //});

                console.log('loadRankingTable', data);
            });
    };

    $scope.winnerSliderSet = function winnerSliderSet(num) {

        if (!$scope.winners) {
            return;
        }

        $scope.winnerSliderInfo = {};
        $scope.winnerSliderInfo.count = Math.floor(($scope.winners.length + 2)  / 3);
        $scope.winnerSliderInfo.dots = new Array($scope.winnerSliderInfo.count);

        if (num < 0) {
            num = $scope.winnerSliderInfo.count - 1;
        }

        if (num >$scope.winnerSliderInfo.count - 1) {
            num = 0;
        }

        $scope.winnerSliderInfo.dots[num] = true;
        $scope.winnerSliderInfo.slide = num;

        var r;
        $scope.winnerSliderInfo.slides = [];
        for (r = 0; r < 3; r++) {
            if ($scope.winners[num * 3 + r]) {
                $scope.winnerSliderInfo.slides.push($scope.winners[num * 3 + r]);
            }
        }

    }
}]);