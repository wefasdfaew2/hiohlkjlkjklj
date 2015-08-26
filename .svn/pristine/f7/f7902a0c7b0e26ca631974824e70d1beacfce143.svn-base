/**
 * @ngdoc controller
 * @name vbet5.controller:featuredgameCtrl
 * @description
 * Open Games controller
 */
angular.module('vbet5.betting').controller('featuredgameCtrl', ['$rootScope', '$scope', '$interval', '$q', 'Zergling', 'Utils', 'Moment', 'Config', 'WPConfig', 'content', function ($rootScope, $scope, $interval, $q, Zergling, Utils, Moment, Config, WPConfig, content) {
    'use strict';

    var popularGameSubId;

    /**
     * @ngdoc method
     * @name getOnlyTime
     * @methodOf vbet5.controller:gameCtrl
     * @description parses the game.info.current_game_time object in order to remove all unnecessary info, that comes with this object, and returns only the time
     * @param {string} timeObj contains current time object
     * @returns {string} current time
     */
    function getOnlyTime(timeObj) {
        return timeObj && (timeObj.indexOf(':') > 0) ? timeObj.substr((timeObj.indexOf(':') - 2), 5) : ' ';
    }

    /**
     * @ngdoc method
     * @name updateFeaturedGame
     * @methodOf vbet5.controller:featuredgameCtrl
     * @description selects most popular game and saves in  **$scope.mostPopularLiveGame**
     *
     * @param {object} data object containing games data
     */
    function updateFeaturedGame(data) {
        if (data.sport === null) {
            return; //keep the game there is subscription update is empty
        }
        var mostPopularGame = null, maxEventsCount = 0;
        angular.forEach(data.sport, function (sport) {
            angular.forEach(sport.region, function (region) {
                angular.forEach(region.competition, function (competition) {
                    angular.forEach(competition.game, function (game) {
                        if (game.events_count > maxEventsCount) {
                            mostPopularGame = game;
                            mostPopularGame.sportId = sport.id;
                            mostPopularGame.sportAlias = sport.alias;
                            mostPopularGame.sportName = sport.name;
                            mostPopularGame.competitionId = competition.id;
                            mostPopularGame.competitionName = competition.name;
                            mostPopularGame.regionId = region.id;
                            maxEventsCount = game.events_count;
                        }
                    });
                });
            });
        });

        if (mostPopularGame) {
            mostPopularGame.event = Utils.getItemBySubItemProperty(mostPopularGame.event, 'type', ['P1', 'P2', 'X']);

            if (mostPopularGame.info !== undefined && mostPopularGame.info.current_game_time > 0) {
                mostPopularGame.info.current_game_time = getOnlyTime(mostPopularGame.info.current_game_time);
            }
        } else {
            $scope.getOneLiveGame();
        }

        $scope.mostPopularLiveGame = mostPopularGame;
    }


    /**
     * @ngdoc method
     * @name getOneLiveGame
     * @methodOf vbet5.controller:featuredgameCtrl
     * @description loads a live game having large event count,
     *
     * @param {Number} [minEventsCount] optional. minimal amount of events that game should have
     * @param {Boolean} [minEventsCount] optional. minimal events count that game may have
     */
    $scope.getOneLiveGame = function getOneLiveGame(minEventsCount) {
        var getPreMatch = (minEventsCount === 0);
        minEventsCount = minEventsCount || 512;

        var request = {
            'source': 'betting',
            'what': {
                'sport': ['id', 'alias', 'name'],
                'competition' : ['id', 'name'],
                'region' : ['id'],
                'game': [['id', 'start_ts', 'team1_name', 'team2_name', 'info', 'events_count', 'markets_count', 'type']],
                'event': ['price', 'type']
            },
            'where': {}
        };


        if (Config.main.showPromotedGamesOnHomepage.enabled) {
            $scope.promotedGameIsPresent = true;
            request.where[Config.main.showPromotedGamesOnHomepage.level] = {};
            request.where[Config.main.showPromotedGamesOnHomepage.level][Config.main.showPromotedGamesOnHomepage.type] = {'@contains': parseInt(Config.main.site_id, 10)};
        } else {
            request.where.game = {
                'type': getPreMatch ? 0 : 1,
                'events_count': {
                    '@gt': getPreMatch ? 1 : minEventsCount
                },
                '@limit': 50
            };
        }

        Zergling.subscribe(request, updateFeaturedGame)
            .then(function (result) {
                if (result.subid) {
                    popularGameSubId = result.subid;
                }
                if (Utils.isObjectEmpty(result.data.sport)) {
                    // too many weird conditions, I know. these have to be refactored later
                    if (Config.main.showPromotedGamesOnHomepage.level === 'game') {
                        Config.main.showPromotedGamesOnHomepage.level = 'competition';
                    } else {
                        Config.main.showPromotedGamesOnHomepage.enabled = false;
                        $scope.promotedGameIsPresent = false;
                    }
                    if (!getPreMatch || Config.main.showPromotedGamesOnHomepage.enabled) {
                        $scope.getOneLiveGame(parseInt(minEventsCount / 2, 10));
                    } else {
                        $interval(function () {getOneLiveGame(); }, 10000, 1);
                    }
                    Zergling.unsubscribe(popularGameSubId);
                    popularGameSubId = null;
                    return;
                }
                updateFeaturedGame(result.data);

            })['catch'](function (reason) {
                console.log('Error:', reason);
            });
    };



    /**
     * @ngdoc method
     * @name getPopularGames
     * @methodOf vbet5.controller:featuredgameCtrl
     * @description loads all promoted games
     */
    var getPopularGames = function (gamesOfCompetition) {
        var request = {
            'source': 'betting',
            'what': { game: ['team1_name', 'team2_name', 'id', 'type'], 'event': [], market: ['id'], sport: ['id'], competition: ['id', 'name'], region: ['id']},
            'where': {event: {type: {'@in': ['P1', 'X', 'P2']}}}
        };
        request.where[gamesOfCompetition] = {'promoted': {'@contains': parseInt(Config.main.site_id, 10)}};

        Zergling.get(request).then(function (response) {
            console.log('!!!!!!!!!! response', response.data);
            angular.forEach(response.data.sport, function (sport) {
                angular.forEach(sport.region, function (region) {
                    angular.forEach(region.competition, function (competition) {
                        angular.forEach(competition.game, function (game) {
                            angular.forEach(game.market, function (market) {
                                game.events = Utils.createMapFromObjItems(market.event, 'type');
                                game.sport = {id: sport.id};
                                game.region = {id: region.id};
                                game.competition = {id: competition.id, name: competition.name};
                                game.market = {id: market.id};
                                $scope.popularGames.push(game);
                            });
                        });
                    });
                });
            });
            console.log('!!!!! popularGames length', $scope.popularGames.length);
            console.log('!!!!! popularGames', $scope.popularGames);
        })['catch'](function (reason) {
            console.log('PromotedGames data ERROR reason', reason);
        });

        return $scope.popularGames;
    };

    /**
     * @ngdoc method
     * @name popularGames
     * @methodOf vbet5.controller:featuredgameCtrl
     * @description loads all promoted games from competition and game at once
     */
    var popularGames = function () {
        $scope.popularGames = [];
        getPopularGames('competition');
        getPopularGames('game');
    };
    // just for test
    popularGames();


    $rootScope.$on('$routeChangeSuccess', function () {
        if (popularGameSubId) {
            Zergling.unsubscribe(popularGameSubId);
            popularGameSubId = null;
        }
    });

}]);