/**
 * @ngdoc controller
 * @name vbet5.controller:multiViewCtrl
 * @description
 * Sports live multiView controller
 */
angular.module('vbet5.betting').controller('multiViewCtrl', ['$rootScope', '$scope', '$location', '$timeout', 'Config', 'Zergling', 'Utils', 'Storage', 'GameInfo', function ($rootScope, $scope, $location, $timeout, Config, Zergling, Utils, Storage, GameInfo) {
    'use strict';
    $rootScope.footerMovable = true;

    function checkAvailabilityOfPreviousGames() {
        var prevGamesList = Storage.get('multiViewLiveOpenedGamesIds');
        if (!prevGamesList) {
            $rootScope.multiViewLiveOpenedGames = [];
            $rootScope.multiViewLiveOpenedGamesIds = [];
            return;
        }
        Zergling.get({
            'source': 'betting',
            'what': {
                'game': ['id']
            },
            'where': {'game': {'id': {'@in': prevGamesList}}}
        })
            .then(function (response) {
                if (response && response.data && response.data.game) {
                    $rootScope.multiViewLiveOpenedGames = Utils.objectToArray(response.data.game);
                    $rootScope.multiViewLiveOpenedGamesIds = Utils.objectToArrayFromProperty(response.data.game, 'id');
                }

            })['catch'](function (reason) {
                console.log(reason);
            });
    }

    /**
     * @ngdoc method
     * @name removeGameFromLsit
     * @methodOf vbet5.controller:multiViewCtrl
     * @description  remove game from multiview games
     */
    $scope.removeGameFromLsit = function removeGameFromLsit(gameId) {
        var idIndex = $rootScope.multiViewLiveOpenedGamesIds.indexOf(gameId);
        if (idIndex !== -1) {
            $rootScope.multiViewLiveOpenedGames = $rootScope.multiViewLiveOpenedGames.filter(function(el) {
                return el.id !== $rootScope.multiViewLiveOpenedGamesIds[idIndex];
            });
            $rootScope.multiViewLiveOpenedGamesIds.splice(idIndex, 1);
            if ($scope.openGame && $scope.openGame.id === gameId) { // selected game state
                $scope.openGame = null;
            }
        }
        $rootScope.$broadcast('multiView.gameRemoved');
    };

    /**
     * @ngdoc method
     * @name toggleVideoAndAnimationBox
     * @methodOf vbet5.controller:multiViewCtrl
     * @description  name says it all
     */
    $scope.toggleVideoAndAnimationBox = function toggleVideoAndAnimationBox() {
        $scope.hideVideoAndAnimationBox = !$scope.hideVideoAndAnimationBox;
    };

    $scope.$on('leftMenu.closed', function (event, isClosed) {
        $scope.leftMenuIsClosed = isClosed;
    });

    $scope.$on('leftMenu.gameClicked', function (event, data) {
        if ($rootScope.multiViewLiveOpenedGames.indexOf(data.game.id) === -1) {
            $rootScope.multiViewLiveOpenedGames.unshift(data.game);
            $rootScope.multiViewLiveOpenedGamesIds.unshift(data.game.id);
        }
    });

    $scope.$on('liveGame.headerClicked', function (event, game) {
        if (!$scope.openGame || $scope.openGame.id !== game.id) {
            $scope.openGame = game;
            prepareVideoAndAnimationData();
        }
    });

    $rootScope.$on('liveGame.gameRemoved', function (event, gameId) {
        if (gameId) {
            $scope.removeGameFromLsit(gameId);
        }
    });

    $scope.dropCallback = function (event, index, item) {
        $rootScope.multiViewLiveOpenedGamesIds.unshift(item.id);
        return item;
    };

    //switch to prematch sportsbook when prematch is selected from left menu
    $scope.$on('toggleLive', function () {
        if (!Config.env.live) {
            $location.path("/sport").search('type', 0);
        }
    });

    $scope.$watch("multiViewLiveOpenedGamesIds", function (newValue) {
        Storage.set('multiViewLiveOpenedGamesIds', newValue);
    }, true);

    function prepareVideoAndAnimationData() {
        var hasVideo = GameInfo.hasVideo($scope.openGame);

        if (hasVideo) {
            $scope.openGame.video_data = null;
            GameInfo.getVideoData($scope.openGame);
        }
        if (hasVideo && (Config.env.authorized || !$scope.openGame.last_event)) {
            $scope.openGame.activeFieldType = 'video';
        } else if ($scope.openGame.activeFieldType === undefined || $scope.openGame.activeFieldType === null) {
            $scope.openGame.activeFieldType = 'field';
        }
    }

    checkAvailabilityOfPreviousGames();
}]);