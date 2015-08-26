/* global VBET5 */
/**
 * @ngdoc controller
 * @name vbet5.controller:searchCtrl
 * @description
 * Search controller
 */
VBET5.controller('searchCtrl', ['$rootScope', '$scope', '$timeout', '$interval', '$filter', '$route', '$q', '$window', '$location', 'keyboardManager', 'Config', 'Zergling',  'Storage',  'DomHelper', 'Utils', 'CasinoUtils', 'Intro', 'smoothScroll', 'Translator', 'analytics', 'AuthData', 'CConfig', 'casinodata', function ($rootScope, $scope, $timeout, $interval, $filter, $route, $q, $window,  $location, keyboardManager, Config, Zergling, Storage, DomHelper, Utils, CasinoUtils, Intro, smoothScroll, Translator, analytics, AuthData, CConfig, casinodata) {
    'use strict';

    $scope.iconsUrl = CConfig.cUrlPrefix + CConfig.iconsUrl;
    $scope.showSearchResults = false;
    $scope.showSearchCommandResults = false;


    /**
     * @ngdoc method
     * @name processResults
     * @methodOf vbet5.controller:searchCtrl
     * @description processes search results and writes them to $scope's searchResults array
     *
     * @param {Array} promises array of promises of search requests that will be resolved when search completes
     */
    function processResults(promises) {
        $q.all(promises).then(function (resultsSet) {
            $scope.searchResults = {};
            $scope.searchResultGameIds = []; //needed for keyboard navigation
            var order = 0;

            angular.forEach(resultsSet, function (data) {
                angular.forEach(data.data.sport, function (sport) {
                    angular.forEach(sport.region, function (region) {
                        angular.forEach(region.competition, function (competition) {
                            angular.forEach(competition.game, function (game) {
                                if ($scope.searchResults[sport.id] === undefined) {
                                    $scope.searchResults[sport.id] = {order: order++, results: []};
                                }
                                $scope.searchResults[sport.id].results.push({
                                    game: game,
                                    region: {name: region.name, id: region.id},
                                    competition: {name: competition.name, id: competition.id},
                                    sport: {id: sport.id, name: sport.name}
                                });
                                $scope.searchResultGameIds.push(game.id);
                            });
                        });
                    });
                });
            });
            $scope.showSearchResults = true;

            $scope.searchResults = Utils.objectToArray($scope.searchResults); // for sorting

            console.log('results - raw: ', resultsSet, ' flat: ', $scope.searchResults);
        });
    }

    /**
     * @ngdoc method
     * @name doSearch
     * @methodOf vbet5.controller:searchCtrl
     * @description performs search and flattens results gotten from swarm
     * flattened results are stored in $scope.searchResults
     *
     * search is done by sending 2 requests - for games and competitions
     * results are merged then
     *
     * @param {String} term search term
     */
    function doSearch(term) {
        console.log('doSearch', term);
        var termIsNumber = term && term.length && parseInt(term, 10).toString() === term;

        if (term && (term.length > 3 || (termIsNumber && Config.main.search.enableSearchByGameNumber))) {
            var like = {}, promiseComp, promiseGame;
            like[Config.env.lang] = term;

            // search for games
            var request = {
                'source': 'betting',
                'what': {
                    'competition': [],
                    'region': [],
                    'game': ['type', 'start_ts', 'team1_name', 'team2_name', 'id'],
                    'sport': []
                },
                'where': {
                    'game': {
                        '@limit': Config.main.search.limitGames,
                        '@or': [
                            {'team1_name': {'@like': like}},
                            {'team2_name': {'@like': like}}
                        ],
                        'type': {'@in': [0, 1]}
                    }
                }
            };

            if (termIsNumber && Config.main.search.enableSearchByGameNumber) {
                request.where.game['@or'].push({game_number: parseInt(term, 10)});
            }
            console.log('game search request:', request);
            promiseGame = Zergling.get(request);
            // search for competitions
            promiseComp = Zergling.get({
                'source': 'betting',
                'what': {
                    'competition': [],
                    'region': [],
                    'game': ['type', 'start_ts', 'team1_name', 'team2_name', 'id'],
                    'sport': []
                },
                'where': {
                    'competition': {
                        'name': {'@like': like}
                    },
                    'game': {
                        '@limit': Config.main.search.limitCompetitions,
                        'type': {'@in': [0, 1]}
                    }
                }
            });

            processResults([promiseGame, promiseComp]);
            console.log(term);
        } else {
            $scope.showSearchResults = false;
        }

    }

    /**
     * @ngdoc method
     * @name selectGameFromSearchResults
     * @methodOf vbet5.controller:searchCtrl
     *
     * @description  function is called by keyboardnavigation directive when result is selected.
     * navigates to result specified by **id**
     *
     * @param {String} id search result game id
     */
    $scope.selectGameFromSearchResults = function selectGameFromSearchResults(id) {
        angular.forEach($scope.searchResults, function (sportResult) {
            angular.forEach(sportResult.results, function (gameResult) {
                if (gameResult.game.id === id) {
                    $scope.goToResult(gameResult);
                }
            });

        });
    };



    /**
     * @ngdoc method
     * @name goToResult
     * @methodOf vbet5.controller:searchCtrl
     * @description  changes location search params to ones from result and reloads the view
     *
     *
     * @param {Object} result object
     */
    $scope.goToResult = function goToResult(result) {
        $scope.showSearchResults = false;
        $location.path('/sport');

        var currentParams = $location.search();

        if (currentParams.type == result.game.type && currentParams.sport == result.sport.id && currentParams.competition == result.competition.id && currentParams.region == result.region.id &&  currentParams.game == result.game.id) {
            return;
        }

        $location.search({
            type: result.game.type,
            sport: result.sport.id,
            competition: result.competition.id,
            region: result.region.id,
            game: result.game.id
        });
        $route.reload();
    };

    /**
     * Monitors search field and starts searching when user stopped typing
     */
    var currentSearchTermValue, searchWatcherPromise;
    function searchWatcher() {
        if ($scope.searchTerm && currentSearchTermValue !== $scope.searchTerm) {
            currentSearchTermValue = $scope.searchTerm;
            if (searchWatcherPromise) {
                $timeout.cancel(searchWatcherPromise);
            }
            searchWatcherPromise = $timeout(searchWatcher, 500);
        } else {
            doSearch($scope.searchTerm);
        }


    }

    $scope.$watch('searchTerm', searchWatcher);


    /**
     * @ngdoc method
     * @name selectCasinoGameFromSearchResults
     * @methodOf vbet5.controller:searchCtrl
     *
     * @description  function is called by keyboardnavigation directive when result is selected.
     * navigates to result specified by **id**
     *
     * @param {String} id search result game id
     */
    $scope.selectCasinoGameFromSearchResults = function selectCasinoGameFromSearchResults(id) {
        var i, count;
        for (i = 0, count = $scope.searchCommandResults.length; i < count; i += 1) {
            if ($scope.searchCommandResults[i].id == id) {
                $scope.openCasinoGame($scope.searchCommandResults[i]);
                break;
            }
        }
    };

    /**
     * @ngdoc method
     * @name doSearchCommand
     * @methodOf vbet5.controller:searchCtrl
     * @description performs search and flattens results gotten from casino data
     * flattened results are stored in $scope.searchCommandResults
     *
     * @param {String} command search command
     */

    function doSearchCommand(command) {
        if (command && command.length > 2) {
            casinodata.getSearchResult(command, CConfig.main.partnerID).then(function (response) {

                var responseData = CasinoUtils.filterByGameProvider(response.data, CConfig.main.filterByProvider);
                var availableGames = getCasinoAvailableGames(responseData);
                $scope.searchCommandResultGameIds = []; //needed for keyboard navigation
                var i, j;
                for (i = 0, j = availableGames.length;  i < j;  i += 1) {
                    $scope.searchCommandResultGameIds.push(availableGames[i].id);
                }

                $scope.showSearchCommandResults = true;
                $scope.searchCommandResults = availableGames;
            });
        } else {
            $scope.showSearchCommandResults = false;
        }
    }

    function getCasinoAvailableGames(games) {
        if (Config.main.skillgamesEnabled && Config.main.financialsEnabled && Config.main.liveDealerEnabled && Config.main.ogwilEnabled && Config.main.fantasyEnabled) {
            return games;
        }
        var i;
        for (i = 0; i < games.length; i += 1) {
            if (
                (!Config.main.skillgamesEnabled && games[i].gameCategory == 'SkillGames' && games[i].id != '706') ||
                    (!Config.main.liveDealerEnabled && games[i].gameCategory == 'LiveDealer') ||
                    (!Config.main.financialsEnabled && games[i].gameID == CConfig.financials.gameID) ||
                    (!Config.main.fantasyEnabled && games[i].gameID == CConfig.fantasySports.gameID) ||
                    (!Config.main.ogwilEnabled && games[i].gameID == CConfig.ogwil.gameID)
            ) {
                games.splice(i--, 1);
            }
        }
        return games;
    }

    /**
     * @ngdoc method
     * @name openCasinoGame
     * @methodOf vbet5.controller:searchCtrl
     * @param {Object} game game object
     * @description  broadcast game into casinoCtrl and hide casino search result
     */
    $scope.openCasinoGame = function openCasinoGame(game) {
        $scope.showSearchCommandResults = false;

        switch (game.gameID) {
        case CConfig.fantasySports.gameID:
            $location.url('/fantasy/');
            return;
        case CConfig.ogwil.gameID:
            if ($rootScope.casinoGameOpened < 2) {
                $location.url('/ogwil/');
                return;
            }
            break;
        case CConfig.financials.gameID:
            $location.url('/financials/');
            return;
        default:
            break;
        }

        if (!$rootScope.env.authorized && game.gameProvider === 'GMG') {
            $rootScope.$broadcast("openLoginForm");
            return;
        }

        var gameType = $rootScope.env.authorized || !CConfig.main.funModeEnabled ? 'real' : (game.gameCategory == 'VirtualBetting' || game.gameCategory == CConfig.liveCasino.categoryName || game.gameCategory == 'SkillGames' ? 'demo' : 'fun');
        if($rootScope.casinoGameOpened > 1 && $location.path() === '/casino/') {
            $rootScope.$broadcast('casino.openGame', game, gameType);
            return;
        }
        var page;
        switch (game.gameCategory) {
            case CConfig.skillGames.categoryName:
            page = 'games';
            break;
            case CConfig.liveCasino.categoryName:
            page = 'livedealer';
            break;
        default:
            page = 'casino';
        }

        if (page !== 'casino') {
            var unregisterRouteChangeSuccess =  $rootScope.$on('$routeChangeSuccess', function () {
                if (!$location.$$replace) {
                    $rootScope.$broadcast(page + '.openGame', game, gameType);
                    unregisterRouteChangeSuccess();
                }
            });
            $location.url('/' + page + '/');
        } else {
            $rootScope.$broadcast('casino.openGame', game, gameType);
        }
    };

    /**
     * Monitors search field and send search command to casinoCtrl when user stopped typing
     */
    var currentSearchCommandValue, searchCommandWatcherPromise;
    function searchCommandWatcher() {
        if ($scope.searchCommand && currentSearchCommandValue !== $scope.searchCommand) {
            currentSearchCommandValue = $scope.searchCommand;
            if (searchCommandWatcherPromise) {
                $timeout.cancel(searchCommandWatcherPromise);
            }
            searchCommandWatcherPromise = $timeout(searchCommandWatcher, 500);
        } else {
            doSearchCommand($scope.searchCommand);
        }
    }

    $scope.$watch('searchCommand', searchCommandWatcher);



    /**
     * @ngdoc method
     * @name searchEnter
     * @methodOf vbet5.controller:searchCtrl
     * @description  performs the search when keypress event is 'enter'(13)
     * @param {Object} event keypress event
     */
    $scope.searchEnter = function searchEnter(event) {
        if (event.which === 13) {
            if (['/', '/sport/', '/poolbetting/'].indexOf($location.path()) !== -1) {
                searchWatcher();
            } else {
                searchCommandWatcher();
            }
        }
    };

}]);