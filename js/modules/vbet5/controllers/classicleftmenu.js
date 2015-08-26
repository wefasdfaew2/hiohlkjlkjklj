/**
 * @ngdoc controller
 * @name vbet5.controller:classicleftmenuCtrl
 * @description classic view left menu controller
 *
 */
angular.module('vbet5.betting').controller('classicleftmenuCtrl', ['$rootScope', '$scope', 'Utils', 'Zergling', '$q', 'GameInfo', 'Storage', 'Config', 'Translator', function ($rootScope, $scope, Utils, Zergling, $q, GameInfo, Storage, Config, Translator) {
    'use strict';
    var liveGamesLastData;
    var allSubscriptions = {};
    var leftMenuLiveGamesSubsribtionProgress = null;


    //setting some initial values
    $scope.liveFilters = {
        withVideo: !!Storage.get('liveFiltersWithVideo'),
        disableRegions: Storage.get('liveFiltersDisableRegions') || !Config.main.selectRegionsByDefault
    };

    $scope.leftMenuClosed = Storage.get('leftMenuToggleState') === undefined ? false : Storage.get('leftMenuToggleState');
    $scope.$emit('leftMenu.closed', $scope.leftMenuClosed); //update other views
    Config.env.live = true;
    $scope.activeGameId = null;
    $scope.gameCounts = {0: 0, 1: 0};
    $scope.leftMenuState = Storage.get("leftMenuState") || { live: { sport: {}, region: {}, competition: {}}, prematch: {sport: {}, region: {}}};
    $scope.leftMenuFavorites = [];

    var favoriteGames = {};

    $scope.$watch('leftMenuState', function (leftMenuState) { Storage.set("leftMenuState", leftMenuState); }, true);

    /**
     * @ngdoc method
     * @name toggleLive
     * @methodOf vbet5.controller:classicleftmenuCtrl
     * @description Toggles  live/pre-match
     *
     */
    $scope.toggleLive = function toggleLive() {
        Config.env.live = !Config.env.live;
        $rootScope.$broadcast('toggleLive');
    };

    /**
     * @ngdoc method
     * @name subscribeToAllGameCounts
     * @methodOf vbet5.controller:classicleftmenuCtrl
     * @description  Subscribes to live or pre-match all games counts and updates $scope's gameCounts object properties
     * @param {Number} type game type, 0-pre-match or 1-live
     */
    $scope.subscribeToAllGameCounts = function subscribeToAllGameCounts(type) {
        var request = {
            'source': 'betting',
            'what': {'game': '@count'},
            'where': {'game': {'type': type}}
        };
        if ($scope.customSportAliasFilter) {
            request.where.sport = request.where.sport || {};
            request.where.sport.alias = $scope.customSportAliasFilter;
        }
        Zergling.subscribe(
            request,
            function (data) {
                $scope.gameCounts[type] = data.game;
            }
        )
            .then(function (result) {
                if (result.subid) {
                    allSubscriptions[result.subid] = result.subid;
                }
                if (result.data) {
                    $scope.gameCounts[type] = result.data.game;
                }
            })['catch'](function (reason) {
                console.warn('subscribeToAllGameCounts error:', reason);
            });
    };


    function updateFavoriteGames(game, sport, region, competition) {
        favoriteGames[game.id] = game;
        game.sport = {id: sport.id};
        game.region = {id: region.id};
        game.competition = {id: competition.id};
        $scope.leftMenuFavorites = Utils.objectToArray(favoriteGames);
        console.log("$scope.leftMenuFavorites", $scope.leftMenuFavorites);
    }

    /**
     * @ngdoc method
     * @name updateMenuLiveGames
     * @methodOf vbet5.controller:classicleftmenuCtrl
     * @description  updates lef menu live games
     * @param {Object} data live data object
     */
    function updateMenuLiveGames(data) {
        console.log('updateMenuLiveGames', data);
        liveGamesLastData = data;

        angular.forEach(data.sport, function (sport) {
            sport.regions = [];
            sport.game = 0;
            angular.forEach(sport.region, function (region) {
                region.competitions = [];
                region.game = 0;
                angular.forEach(region.competition, function (competition) {
                    competition.games = [];
                    competition.gameCount = 0;
                    competition.region = {alias: region.alias};
                    angular.forEach(competition.game, function (game) {
                        game.additionalEvents = Config.main.showEventsCountInMoreLink ? game.events_count : game.markets_count;
                        if ($rootScope.myGames.indexOf(game.id) !== -1) {
                            updateFavoriteGames(game, sport, region, competition);
                        } else if (!$rootScope.multiViewLiveOpenedGamesIds || $rootScope.multiViewLiveOpenedGamesIds.indexOf(game.id) === -1) {
                            competition.games.push(game);
                            region.game++;
                            competition.gameCount++;
                        }
                    });
                    competition.games.sort(function (a, b) {return a.start_ts - b.start_ts; });
                    region.competitions.push(competition);
                });
                region.competitions.sort(Utils.orderSortingFn);
                sport.regions.push(region);
                sport.game += region.game;
            });
        });

        $scope.leftMenuLiveSports = Utils.objectToArray(data.sport).sort(Utils.orderSortingFn);
        console.log("$scope.leftMenuLiveSports", $scope.leftMenuLiveSports);
    }

    /**
     * @ngdoc method
     * @name loadLeftMenuLive
     * @methodOf vbet5.controller:classicleftmenuCtrl
     * @description  loads left menu live part
     */
    function loadLeftMenuLive() {
        function doSubscribe() {
            var deferred = $q.defer();
            leftMenuLiveGamesSubsribtionProgress = deferred.promise;
            var request = {
                'source': 'betting',
                'what': {
                    'sport': ['id', 'name', 'alias', 'order'],
                    'competition': ['id', 'order', 'name'],
                    'region': ['id', 'name', 'alias'],
                    game: ['id', 'start_ts', 'team1_name', 'team2_name', 'type', 'info', 'events_count', 'markets_count', 'is_blocked', 'video_id']
                },
                'where': {
                    'sport': {'id': {'@nin': GameInfo.VIRTUAL_SPORT_IDS}},
                    'game': {'type': 1}
                }
            };
            if ($scope.liveFilters.withVideo) {
                request.where.game['@or'] = GameInfo.getVideoFilter();
            }
            $scope.leftMenuLiveLoading = true;
            Zergling.subscribe(
                request,
                updateMenuLiveGames
            )
                .then(function (result) {
                    deferred.resolve(result.subid);
                    if (result.subid) {
                        allSubscriptions[result.subid] = result.subid;
                    }
                    if (result.data) {
                        updateMenuLiveGames(result.data);
                    }
                    $scope.leftMenuLiveLoading = false;
                })['catch'](function (reason) {
                    $scope.leftMenuLiveLoading = false;
                    deferred.resolve(null);
                    console.log('Error:', reason);
                });
        }

        if (leftMenuLiveGamesSubsribtionProgress === null) {
            doSubscribe();
        } else {
            leftMenuLiveGamesSubsribtionProgress.then(function (subId) {
                Zergling.unsubscribe(subId);
                doSubscribe();
            });
        }
    }

    /**
     * @ngdoc method
     * @name toggleVideoFilter
     * @methodOf vbet5.controller:classicleftmenuCtrl
     * @description  toggles video filter(if on , only games with video will be selected)
     */
    $scope.toggleVideoFilter = function toggleVideoFilter() {
        $scope.liveFilters.withVideo = !$scope.liveFilters.withVideo;
        Storage.set('liveFiltersWithVideo', $scope.liveFilters.withVideo);
        loadLeftMenuLive();
    };


    /**
     * @ngdoc method
     * @name toggleGameFavorite
     * @methodOf vbet5.controller:classicleftmenuCtrl
     * @description  adds or removes(depending on if it's already there) game from 'my games' by emitting an event
     * @param {Object} game game object
     */
    $scope.toggleGameFavorite = function toggleGameFavorite(game) {
        if (!$rootScope.myGames || $rootScope.myGames.indexOf(game.id) === -1) {
            $scope.$emit('game.addToMyGames', game);
            updateMenuLiveGames(liveGamesLastData);
        } else {
            $scope.$emit('game.removeGameFromMyGames', game);
            updateMenuLiveGames(liveGamesLastData);
        }
    };

    /**
     * @ngdoc method
     * @name toggleRegionsFilter
     * @methodOf vbet5.controller:classicleftmenuCtrl
     * @description  toggles region filter(if off, games in all regions will be selected)
     */
    $scope.toggleRegionsFilter = function toggleRegionsFilter() {
        $scope.liveFilters.disableRegions = !$scope.liveFilters.disableRegions;
        Storage.set('liveFiltersDisableRegions', $scope.liveFilters.disableRegions);
        console.log($scope.liveFilters.disableRegions);
        //loadLeftMenuLive();
    };

    /**
     * @ngdoc method
     * @name toggleLeftMenu
     * @methodOf vbet5.controller:classicleftmenuCtrl
     * @description  expands(or collapses if expanded) left menu
     *
     * @param {boolean} val - set concrate value
     */
    $scope.toggleLeftMenu = function (val) {
        if (val !== undefined) {
            $scope.leftMenuClosed = !val;
        } else {
            $scope.leftMenuClosed = !$scope.leftMenuClosed;
        }
        Storage.set('leftMenuToggleState', $scope.leftMenuClosed);
        $scope.$emit('leftMenu.closed', $scope.leftMenuClosed);
    };

    /**
     * @ngdoc method
     * @name gameClicked
     * @methodOf vbet5.controller:classicleftmenuCtrl
     * @description  game click handler
     *
     * @param {Object} game game object
     * @param {Object} competition competition object
     */
    $scope.gameClicked = function gameClicked(game, competition) {
        $scope.activeGameId = game.id;
        console.log("gameClicked", game, competition);
        $rootScope.$broadcast("leftMenu.gameClicked", {game: game, competition: competition});
        updateMenuLiveGames(liveGamesLastData);
    };

    $scope.$on('multiView.gameRemoved', function () {
        console.log("multiView.gameRemoved");
        updateMenuLiveGames(liveGamesLastData);
    });

    $scope.$on('$destroy', function () {
        Zergling.unsubscribe(Utils.objectToArray(allSubscriptions));
    });

    loadLeftMenuLive();
}]);
