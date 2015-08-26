/**
 * @ngdoc controller
 * @name CASINO.controller:miniGamesCtrl
 * @description
 * mini games under betslip controller
 */

CASINO.controller('miniGamesCtrl', ['$rootScope', '$scope', '$sce', '$interval', '$timeout', 'CConfig','Zergling', function ($rootScope, $scope, $sce, $interval, $timeout, CConfig, Zergling) {
    'use strict';

    $scope.showGames = true;
    $scope.rotationPaused = false;
    var rotatePromise;

    $scope.$on('betslip.isEmpty', function () {
        $scope.showGames = true;
    });
    $scope.$on('betslip.hasEvents', function () {
        $scope.showGames = false;
    });

    function init() {
        $scope.index = 0;
        getUrl();

        if (CConfig.miniGames.games.length > 1) {
            rotatePromise = $interval(changeGame, CConfig.miniGames.rotationPeriod || 10000);
        }
    };

    function getUrl() {
        $scope.frameUrl = '';
        var game = CConfig.miniGames.games[$scope.index];
        var gameUrl = CConfig.cUrlPrefix + CConfig.cGamesUrl + '?' + "gameid=" + game.id + "&provider=" + game.provider + '&lan=' + $rootScope.env.lang + '&partnerid=' + CConfig.main.partnerID;

        if ($rootScope.env.authorized && game.externalID) {
            Zergling.get({'game_id': parseInt(game.externalID)}, 'casino_auth').then(function (response) {
                if (response && response.result) {
                    if (response.result.has_error == "False") {
                        var userInfo = '&token=' + response.result.token + '&username=' + response.result.username + '&currency=' + response.result.currency + '&userid=' + response.result.id + '&nickname=' + response.result.nickname + '&firstname=' + $rootScope.profile.first_name + '&lastname=' + $rootScope.profile.last_name;
                        $scope.frameUrl = $sce.trustAsResourceUrl(gameUrl +userInfo + '&mode=real');
                    } else if (response.result.has_error == "True") {
                        console.log('error');
                    }
                }
            }, function (failResponse) {
                console.log('failResponse');
            });
        } else {
            $timeout(function () {
                $scope.frameUrl = $sce.trustAsResourceUrl(gameUrl + '&mode=fun');
            }, 20);
        }
    };

    function changeGame() {
        if (!$scope.rotationPaused && $scope.showGames) {
            if ($scope.index < CConfig.miniGames.games.length - 1) {
                $scope.index++;
            } else {
                $scope.index = 0;
            }

            getUrl();
        }
    }

    $scope.$on('login.loggedIn', getUrl);
    $scope.$on('login.loggedOut', getUrl);

    init();

    $scope.$on('$destroy', function () {
        if (rotatePromise) {
            $interval.cancel(rotatePromise);
        }
    });
}]);
