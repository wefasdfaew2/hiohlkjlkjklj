/**
 * @ngdoc controller
 * @name vbet5.controller:ResultsController
 * @description
 * ResultsController controller
 */
angular.module('vbet5.betting').controller('ResultsController', ['$scope', 'Zergling', 'Moment', 'Translator', 'Utils',
    function ($scope, Zergling, Moment, Translator, Utils) {
        'use strict';

        var request = {}, defaultGameList = true;
        $scope.requestData = {};
        $scope.today = Moment.get().format("YYYY-MM-DD");
        $scope.requestData.dateFrom = $scope.today;
        $scope.requestData.dateTo = $scope.today;
        $scope.sortByDate = false;
        $scope.todayResult = false;

        $scope.todayGameList = null;
        $scope.todayGameListLoaded = false;
        $scope.gamesResult = null;
        $scope.gameListLoaded = false;
        $scope.dateOptions = { showWeeks: 'false' };

        $scope.openFrom = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedFrom = true;
        };
        $scope.openTo = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedTo = true;
        };

        /**
         * @ngdoc method
         * @name loadSports
         * @description load game list
         * @methodOf vbet5.controller:ResultsController
         */
        function loadSports() {
            Zergling.get(
                {
                    'source': 'betting',
                    'what': {'sport': ['id', 'name']}
                },
                'get'
            ).then(function (result) {
                //console.log('Games list', result.data.sport);
                if (result.data.sport) {
                    $scope.sportList = Utils.objectToArray(result.data.sport);
                    $scope.requestData.sport = $scope.sportList[0];
                    $scope.requestData.live = false;
                }
                    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!:', $scope.sportList);
                $scope.updateRegion();

            })['catch'](function (reason) {
                console.log('Error:', reason);
            });
        }

        loadSports();


        /**
         * @ngdoc method
         * @name updateRegion
         * @description update region list depending sport
         * @methodOf vbet5.controller:ResultsController
         */
        $scope.updateRegion = function () {
            Zergling.get(
                {
                    'source': 'betting',
                    'what': {
                        'region': ['id', 'name']
                    },
                    'where': {
                        'sport': {'id': $scope.requestData.sport.id}
                    }
                },
                'get'
            ).then(function (result) {
                //console.log('Region list', result);
                $scope.regionList = Utils.objectToArray(result.data.region);
                if ($scope.todayResult) {
                    $scope.requestData.region = '';
                } else {
                    $scope.requestData.region = $scope.regionList[0];
                }
                $scope.updateCompetition();

            })['catch'](function (reason) {
                console.log('Error:', reason);
            });
        };

        /**
         * @ngdoc method
         * @name updateCompetition
         * @description update competition list depending region
         * @methodOf vbet5.controller:ResultsController
         */
        $scope.updateCompetition = function () {
            if (!$scope.requestData.region) {
                $scope.requestData.competition = '';
                $scope.competitionList = [];
                return;
            }
            Zergling.get(
                {
                    'source': 'betting',
                    'what': {
                        'competition': ['id', 'name']
                    },
                    'where': {
                        'region': {'id': $scope.requestData.region.id}
                    }
                },
                'get'
            ).then(function (result) {
                //console.log('Competition list', result);
                $scope.competitionList = Utils.objectToArray(result.data.competition);
                $scope.requestData.competition = $scope.competitionList[0];
                if (defaultGameList) { $scope.searchGames(); defaultGameList = false; }

            })['catch'](function (reason) {
                console.log('Error:', reason);
            });
        };

        /**
         * @ngdoc method
         * @name searchGames
         * @description load search result of game data
         * @methodOf vbet5.controller:ResultsController
         */
        $scope.searchGames = function () {
            $scope.gameListLoaded = true;
            $scope.todayResult = false;
            request.from_date = Moment.get($scope.requestData.dateFrom).format("YYYY-MM-DD");
            request.to_date =  Moment.get($scope.requestData.dateTo).format("YYYY-MM-DD");
            request.sport_id = $scope.requestData.sport.id;
            request.region_id = $scope.requestData.region ?  $scope.requestData.region.id : '';
            request.competition_id = $scope.requestData.competition ? $scope.requestData.competition.id : '';
            console.log(request);

            Zergling.get(request, 'get_result_games').then(function (result) {
                console.log('searchGames data', result);
                $scope.gameListLoaded = false;
                $scope.sortByDate = false;
                $scope.gamesResult = [];
                if (result.games.game) {
                    if (result.games.game[0]) { // checking if game is array (if one game, then game is object)
                        angular.forEach(result.games.game, function (game) {
                            if (Moment.get(game.date) <= Moment.get()) {
                                $scope.gamesResult.push(game);
                            }
                        });
                    } else if (Moment.get(result.games.game.date) <= Moment.get()) {
                        $scope.gamesResult[0] = result.games.game;
                    }
                }
            })['catch'](function (reason) {
                console.log('Error:', reason);
                $scope.gameListLoaded = false;
            });
        };

        /**
         * @ngdoc method
         * @name adjustFromDate
         * @description adjusted 'FromDate' dataPicker if FromDate is higher than ToDate
         * @methodOf vbet5.controller:ResultsController
         */
        $scope.adjustFromDate = function () {
            if (Moment.get($scope.requestData.dateFrom) > Moment.get($scope.requestData.dateTo)) {
                $scope.requestData.dateFrom = Moment.get($scope.requestData.dateTo).format("YYYY-MM-DD");
            }
        };

        /**
         * @ngdoc method
         * @name todayResults
         * @description load Today's Result data for all game type
         * @methodOf vbet5.controller:ResultsController
         */
        $scope.todayResults = function () {
            var requestTodayResults = {};
            requestTodayResults.from_date = Moment.get().format("YYYY-MM-DD") + ' 00:00:00';
            requestTodayResults.to_date =  Moment.get().format("YYYY-MM-DD") + ' 23:59:59';
            $scope.todayGameListLoaded = true;
            Zergling.get(requestTodayResults, 'get_result_games').then(function (result) {
                console.log('todayResults data!!!!!!!!!!!!!!!!!!!', result);
                if (result.games.game) {
                    $scope.todayGameList = {};
                    angular.forEach(result.games.game, function (game) {
                        if (game.sport_id && game.competition_name) {
                            game.name = game.competition_name.split('.').slice(0, 1)[0];
                            if (Moment.get(game.date) <= Moment.get()) {
                                if (!$scope.todayGameList[game.sport_id]) {
                                    $scope.todayGameList[game.sport_id] = [];
                                }
                                $scope.todayGameList[game.sport_id].push(game);
                                $scope.todayGameListLoaded = false;
                            }
                        }
                    });
                    console.log('todayResults data', $scope.todayGameList);
                }
            })['catch'](function (reason) {
                console.log('Error:', reason);
                $scope.todayGameListLoaded = false;
            });
        };

        /**
         * @ngdoc method
         * @name resultsBySport
         * @description load Today's Result of game data depend game type
         * @methodOf vbet5.controller:ResultsController
         */
        $scope.resultsBySport = function (sportId) {
            console.log(sportId);
            console.log('Todays Results By Game Name', $scope.todayGameList[sportId]);
            $scope.todayResult = true;
            $scope.sortByDate = false;
            $scope.gamesResult = [];
            $scope.gamesResult = $scope.todayGameList[sportId];
            if ($scope.sportList) {
                angular.forEach($scope.sportList, function (sport) {
                    if (sport.id == sportId) {
                        $scope.requestData.sport = sport;
                        $scope.updateRegion();
                    }
                });
            }
        };

    }]);