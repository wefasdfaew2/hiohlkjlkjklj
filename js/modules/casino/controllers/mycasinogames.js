/**
 * @ngdoc controller
 * @name CASINO.controller:myCasinoGamesCtrl
 * @description
 *  "My casino games" controller.
 *  Responsible for managing and showing "my casino games" block.
 *  Games list is kept in $rootScope.myCasinoGames
 *  and is syncronized with local storage on every update(adding or removing a casino game)
 */

CASINO.controller('myCasinoGamesCtrl', ['$scope', '$rootScope', 'Storage', '$location', 'CConfig', function($scope, $rootScope, Storage, $location, CConfig) {
    'use strict';

    $scope.casinoGamesLoaded = false;
    $rootScope.myCasinoGames = Storage.get("myCasinoGames") || [];

    $scope.cConf = {
        iconsUrl: CConfig.cUrlPrefix + CConfig.iconsUrl,
        funModeEnabled: CConfig.main.funModeEnabled,
        providersThatHaveNotFunMode: CConfig.main.providersThatHaveNotFunMode,
        categoriesThatHaveNotFunMode: CConfig.main.categoriesThatHaveNotFunMode

    };
    /**
     * @ngdoc method
     * @name getVisibleGames
     * @methodOf CASINO.controller:myCasinoGamesCtrl
     * @description Returns array of visible games
     *
     * @param {Array} games all "my casino games"
     * @returns {Array} visible games
     */
    function getVisibleGames(games) {
        return games.slice(0).reverse().slice($scope.offset, $scope.offset + $scope.GAMES_TO_SHOW);
    }

    /**
     * @ngdoc method
     * @name showVisibleGames
     * @methodOf CASINO.controller:myCasinoGamesCtrl
     * @description get array of visible games and show their
     */
    function showVisibleGames() {
        $scope.offset = 0;
        $scope.casinoGamesLoaded = false;
        $scope.myCasinoSavedGames = getVisibleGames($rootScope.myCasinoGames);
        $scope.casinoGamesLoaded = true;
    }

    $scope.$on('widescreen.on', function () {
        $scope.GAMES_TO_SHOW = 5;
        showVisibleGames();
    });

    $scope.$on('widescreen.off', function () {
        $scope.GAMES_TO_SHOW = 4;
        showVisibleGames();
    });

    /**
     * @ngdoc method
     * @name slide
     * @methodOf CASINO.controller:myCasinoGamesCtrl
     * @description Slides visible games left or right by changing $scope's **offset** variable
     *
     * @param {String} direction direction, 'left' or 'right'
     */
    $scope.slide = function slide(direction) {
        if (direction === 'left') {
            if ($scope.offset > 0) {
                $scope.offset--;
            }
        } else if (direction === 'right') {
            if ($scope.offset < $rootScope.myCasinoGames.length - $scope.GAMES_TO_SHOW) {
                $scope.offset++;
            }
        }

        $scope.myCasinoSavedGames = getVisibleGames($rootScope.myCasinoGames);
    };

    /**
     * @ngdoc method
     * @name removeGameFromSaved
     * @methodOf CASINO.controller:myCasinoGamesCtrl
     * @description removes game from "my games" and updates scope and local storage
     *
     * @param {Number} gameID gameID number
     */

    $scope.removeGameFromSaved = function removeGameFromSaved(gameID) {
        var games = $rootScope.myCasinoGames, i, j;

        for (i = 0, j = games.length; i < j; i += 1) {
            if (games[i].id === gameID) {
                games.splice(i, 1);
                break;
            }
        }

        if ($scope.offset > 0 && $scope.offset + $scope.GAMES_TO_SHOW > games.length) {
            $scope.offset--;
        }

        $scope.myCasinoSavedGames = getVisibleGames(games);

        Storage.set("myCasinoGames", games);

        if (games.length === 0) {
            if ($rootScope.myGames.length) {
                $rootScope.env.sliderContent = 'savedGames';
            } else {
                $rootScope.env.showSlider = false;
                $rootScope.env.sliderContent = '';
            }
        }
    };

    /**
     * @ngdoc method
     * @name openGame
     * @methodOf CASINO.controller:myCasinoGamesCtrl
     * @description  open selected game
     */

    $scope.openGame = function openGame(game, gameType) {
        $rootScope.env.sliderContent = '';
        $rootScope.env.showSlider = false;

        var page, pagePath;
        if ($rootScope.casinoGameOpened > 1) {
            pagePath = $location.path();
            switch (pagePath) {
                case '/casino/':
                    page = 'casino';
                    break;
                case '/livedealer/':
                    page = 'livedealer';
                    break;
                case '/games/':
                    page = 'games';
            }
            $rootScope.$broadcast(page + '.openGame', game, gameType);
        } else {
            if (game.gameID == CConfig.ogwil.gameID) {
                if (gameType === 'real' && !$rootScope.env.authorized) {
                    $rootScope.$broadcast("openLoginForm");
                } else {
                    $location.url('/ogwil/');
                }
                return;
            }

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

            pagePath =  '/' + page + '/';
            if ($location.$$path === pagePath) {
                $rootScope.$broadcast(page + '.openGame', game, gameType);
            } else {
                var unregisterRouteChangeSuccess =  $rootScope.$on('$routeChangeSuccess', function () {

                    if (!$location.$$replace) {
                        $rootScope.$broadcast(page + '.openGame', game, gameType);
                        unregisterRouteChangeSuccess();
                    }
                });

                $location.url(pagePath);
            }
        }
    };

    $scope.$on('game.addToMyCasinoGames', function (event, game) {
        if ($rootScope.myCasinoGames === undefined) {
            $rootScope.myCasinoGames = [];
        }
        $rootScope.myCasinoGames.push(game);

        Storage.set('myCasinoGames', $rootScope.myCasinoGames);

        $scope.myCasinoSavedGames = getVisibleGames($rootScope.myCasinoGames);
    });

    $scope.$on('game.removeGameFromMyCasinoGames', function (event, game) {
        $scope.removeGameFromSaved(game.id);
    });
}]);
