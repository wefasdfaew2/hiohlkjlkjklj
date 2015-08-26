/**
 * @ngdoc controller
 * @name CASINO.controller:skillgamesCtrl
 * @description
 * skillgamesCtrl page controller
 */

CASINO.controller('skillgamesCtrl', ['$rootScope', '$scope', '$sce', '$location', '$window', '$timeout', 'CConfig', 'Zergling', 'casinodata', 'Utils', 'CasinoUtils', 'CasinoCache', 'Translator', 'analytics', 'content', function ($rootScope, $scope, $sce, $location, $window, $timeout, CConfig, Zergling, casinodata, Utils, CasinoUtils, CasinoCache, Translator, analytics, content) {
    'use strict';

    $scope.gamesInfo = [];
    $scope.viewCount = 1;

    $scope.cConf = {
        iconsUrl: CConfig.cUrlPrefix + CConfig.iconsUrl,
        backGroundUrl: CConfig.cUrlPrefix + CConfig.backGroundUrl,
        gpTransferEnabled: CConfig.main.gaminatorTransferEnabled,
        downloadEnabled: CConfig.main.downloadEnabled
    };

    $scope.$on('widescreen.on', function () {
        $scope.wideMode = true;
    });
    $scope.$on('widescreen.off', function () {
        $scope.wideMode = false;
    });
    $scope.$on('middlescreen.on', function () {
        $scope.middleMode = true;
    });
    $scope.$on('middlescreen.off', function () {
        $scope.middleMode = false;
    });

    /**
     * @ngdoc method
     * @name loadGames
     * @methodOf CASINO.controller:skillgamesCtrl
     * @description loads skill games list using {@link CASINO.service:casinodata casinodata} service's **getCategory** method
     * and assigns to scope's 'sports' variable
     */
    $scope.loadGames = function loadGames() {
        var skillGamesData = CasinoCache.get(CConfig.skillGames.categoryName + CConfig.main.partnerID);
        if (skillGamesData !== undefined) {
            prepareSkillGames(skillGamesData);
        } else {
            casinodata.getCategory(CConfig.skillGames.categoryName, CConfig.main.partnerID).then(function (response) {
                var responseData = response.data;
                var skillGames = [];
                for (var i = 0, j = responseData.length; i < j; i += 1) {
                    var game = responseData[i];
                    if (game.gameID !== CConfig.financials.gameID) {
                        game.gameType = JSON.parse(game.gameType);
                        game.gameInfo = JSON.parse(game.gameInfo);

                        if (game.gameType.isDownloadClient === 1 && game.gameInfo.downloadLink.indexOf('http') === -1) {
                            game.gameInfo.downloadLink = CConfig.cUrlPrefix + game.gameInfo.downloadLink;
                        }
                        if (game.gameType.realPlay === 1 && game.gameInfo.targetOpenLink.indexOf('http') === -1) {
                            game.gameInfo.targetOpenLink = CConfig.cUrlPrefix + game.gameInfo.targetOpenLink + '&lan=' + $rootScope.env.lang;
                        }
                        skillGames.push(game);
                    }
                }

              /*  if ($rootScope.conf.enableNewSkillGame) { // poker game
                    var pokerGame = {
                        gameID: 'VGSPoker',
                        gameCategory: 'SkillGames',
                        gameName: 'Poker',
                        gameProvider: 'VGS',
                        id: 'VGSPoker', // it must be int
                        gameType: {height: 0, isDownloadClient: 1, isOpenBlank: 1 ,playForFun: 0, ratio: "16:9", realPlay: 1, width: 0},
                        gameInfo: {
                            targetOpenLink: $rootScope.poker.instantPlayLink,
                            downloadLink: $rootScope.poker.downloadLink.windows,
                            downloadLinkLinux: $rootScope.poker.downloadLink.linux,
                            downloadLinkMac: $rootScope.poker.downloadLink.mac,
                            downloadLinkAndroid: $rootScope.poker.downloadLink.android,
                            betaDownloadLink: $rootScope.poker.betaDownloadLink
                        }
                    };
                    skillGames.unshift(pokerGame);
                } */
                var preparedSkillGames = CasinoUtils.setGamesFunMode(skillGames);
                CasinoCache.put(CConfig.skillGames.categoryName + CConfig.main.partnerID, preparedSkillGames);
                prepareSkillGames(preparedSkillGames);
            }, function (reason) {
                $scope.gamesPageLoaded = true;
            });
        }

        if (CConfig.main.multiViewEnabled) {
            getAllGames();
        }
    };

    /**
     * @ngdoc method
     * @name getAllGames
     * @methodOf CASINO.controller:casinoCtrl
     * @description  loads all games and filter options list using {@link CASINO.service:casinodata casinodata} service's **getFilterOptions** method
     */
    function getAllGames() {
        $scope.agSelectedCategory = 'SkillGames';
        $scope.popUpSearchInput = '';
        var gamesData = CasinoCache.get('allGames' + CConfig.main.partnerID);
        if (gamesData !== undefined) {
            $scope.allGames = CasinoCache.get('allGames' + CConfig.main.partnerID);
        } else {
            casinodata.getFilterOptions().then(function (response) {
                if (response.data) {
                    var multiViewGames = CasinoUtils.getMultiviewGames(Utils.objectToArray(response.data.games));
                    var filteredMultiViewGames = CasinoUtils.filterByGameProvider(multiViewGames, CConfig.main.filterByProvider);
                    $scope.allGames = CasinoUtils.setGamesFunMode(filteredMultiViewGames);
                    CasinoCache.put('allGames' + CConfig.main.partnerID, $scope.allGames);
                }
            });
        }
    };

    function prepareSkillGames(games) {
        //createTopMenu(games);
        $scope.games = games;
        $scope.gamesPageLoaded = true;
        var searchParams = $location.search();
        if (searchParams.game !== undefined) {
            var gameID = parseInt(searchParams.game, 10);
            for (var i = 0, count = games.length; i < count; i += 1) {
                if (games[i].id == gameID) {
                    var gameType = $rootScope.env.authorized || !CConfig.main.funModeEnabled ? 'real' : 'demo';
                    $timeout(function () {
                        $scope.openGame(games[i], gameType);
                    }, 100);
                    break;
                }
            }
        }
    };

    /**
     * @ngdoc method
     * @name openGameInNewWindow
     * @methodOf CASINO.controller:skillgamesCtrl
     * @description  calculates the possible sizes of the popup window and opens casino game in there
     */
    $scope.openGameInNewWindow = function openGameInNewWindow(id) {
        CasinoUtils.openPopUpWindow($scope.gamesInfo, id);
        $scope.closeGame(id);
    };

    /**
     * @ngdoc method
     * @name openGame
     * @methodOf CASINO.controller:skillgamesCtrl
     * @param {Object} game game object
     * @description  opens login form if it needed, or generates casino game url and opens it
     *
     * @param {string} id game id
     */
    $scope.openGame = function openGame(game, gameType, tableId) {
        $scope.showAllGames = false;
        $rootScope.env.showSlider = false;
        $rootScope.env.sliderContent = '';

        if (gameType === undefined) {
            gameType = $rootScope.env.authorized || !CConfig.main.funModeEnabled ? 'real' : 'demo';
        }
        analytics.gaSend('send', 'event', 'games', game.gameCategory || game.gameCat, {'page': $location.path(), 'eventLabel': ('Open ' + game.gameName + ' ' + gameType)});

        if (gameType === 'real' && !$rootScope.env.authorized) {
            $rootScope.$broadcast("openLoginForm");
            return;
        }
        if (game.gameInfo && typeof game.gameInfo == 'string') {
            game.gameInfo = JSON.parse(game.gameInfo);
        }
        if (game.gameType && typeof  game.gameType == 'string') {
            game.gameType = JSON.parse(game.gameType);
        }
        if (game.gameType && game.gameType.realPlay !== 1) {
            return;
        }

        var gameInfo = {};
        gameInfo.gameID = game.gameID;
        gameInfo.id = Math.random().toString(36).substr(2, 9);
        gameInfo.gameMode = gameType;
        gameInfo.toAdd = false;
        gameInfo.game = game; //need for refresh some games after loggin
        var gameOption = game.gameOptions ? game.gameOptions : "";
        var tableInfo = tableId !== undefined ? "&table_id=" + tableId : "";
        gameInfo.tableId = tableId;
        var gameUrl;

        //the url of game doesn't come from backend is correct
       // if (game.gameInfo && game.gameInfo.targetOpenLink && game.gameInfo.targetOpenLink !== "") {
       //     if (game.gameInfo.targetOpenLink.indexOf('http') === -1) {
       //         game.gameInfo.targetOpenLink = CConfig.cUrlPrefix + game.gameInfo.targetOpenLink;
       //     }
            //gameUrl = game.gameInfo.targetOpenLink;
       // } else {
            gameUrl = CConfig.cUrlPrefix + CConfig.cGamesUrl + '?gameid=' + game.gameID + '&mode=' + gameType + '&provider=' + game.gameProvider + gameOption;
       // }
        gameUrl = gameUrl + tableInfo + '&lan=' + $rootScope.env.lang + '&partnerid=' + CConfig.main.partnerID;

        //  also need to get token
        if (game.gameType.ratio === '0' && game.gameType.width !== 0 && game.gameType.height !== 0) {
            if ($scope.openedWindows == undefined) {
                $scope.openedWindows = {};
            }
            if ($scope.openedWindows[gameInfo.gameID] == undefined || $scope.openedWindows[gameInfo.gameID].closed) {
                $scope.openedWindows[gameInfo.gameID] = $window.open("", gameInfo.gameID, 'width=' + game.gameType.width + ',height=' + game.gameType.height + ',menubar=no,toolbar=no,location=no,scrollbars=no,resizable=yes');
                $scope.openedWindows[gameInfo.gameID].location = gameUrl;
            } else {
                $scope.openedWindows[gameInfo.gameID].focus();
            }
            return;
        }

        if ($scope.gamesInfo && $scope.gamesInfo.length > 1) {
            if (game.gameType.ratio === '0') {
                $scope.message = Translator.get('Sorry, this game cannot be opened in multi-view mode');
                return;
            }
            var usedProviders = [], usedGames = [], toAddIndex, i, j;
            for(i = 0; i < $scope.gamesInfo.length; i += 1) {
                var usedGame = $scope.gamesInfo[i].game;
                if (usedGame) {
                    if (usedGame.id === '599' && game.id === '599') {
                        $scope.message = Translator.get('This Game Is Already Opened In Multi Game View. Please Choose Another Game.'); //for BackGammon
                        return;
                    }
                    usedGames.push(usedGame);
                    if ((usedGame.gameProvider === 'MGS' || usedGame.gameProvider === 'BSG' || usedGame.gameProvider === 'GMG' || usedGame.gameProvider === 'NET') && usedProviders.indexOf(usedGame.gameProvider) === -1) {
                        usedProviders.push(usedGame.gameProvider);
                    }
                }
                if ($scope.gamesInfo[i].toAdd) {
                    toAddIndex = i;
                }
            }
            if (usedProviders.indexOf(game.gameProvider) !== -1) {
                for (j = 0; j < usedGames.length; j += 1) {
                    if (game.id === usedGames[j].id) {
                        $scope.message = Translator.get('This Game Is Already Opened In Multi Game View. Please Choose Another Game.');
                        return;
                    }
                }
                if (j === usedGames.length) {
                    $scope.message = Translator.get('It Is Possible To Play Only One Game Of The Same Provider In Multi Game View. Please Choose Another Game.');
                    return;
                }
            } else {
                if (toAddIndex !== undefined) {
                    $location.search('type', undefined);
                    $location.search('game', undefined);
                    addCurrentGame(gameInfo, gameUrl, toAddIndex);
                }
            }
        } else {
            $scope.gamesInfo = [];
            $location.search('game', game.id);
            $location.search('type', gameType);
            addCurrentGame(gameInfo, gameUrl, 0);
        }

        $rootScope.casinoGameOpened = $scope.gamesInfo.length;
    }

    function addCurrentGame(gameInfo, gameUrl, toAddIndex) {
        if (gameInfo.gameMode === 'real') {
            gameInfo.loadingUserData = true;
            $scope.gamesInfo[toAddIndex] = gameInfo;
            Zergling.get({'game_id': parseInt(gameInfo.game.externalID)}, 'casino_auth').then(function (response) {
                if (response && response.result) {
                    if (response.result.has_error == "False") {
                        var userInfo = '&token=' + response.result.token + '&username=' + response.result.username + '&currency=' + response.result.currency + '&userid=' + response.result.id + '&nickname=' + response.result.nickname + '&firstname=' + $rootScope.profile.first_name + '&lastname=' + $rootScope.profile.last_name;
                        gameInfo.gameUrl = $sce.trustAsResourceUrl(gameUrl + userInfo);
                        gameInfo.loadingUserData = false;
                    } else if (response.result.has_error == "True") {
                        $scope.message = Translator.get('casino_auth_error');
                        $scope.closeGame(gameInfo.id);
                    }
                }
            }, function (failResponse) {
                $scope.message = Translator.get('casino_auth_error');
                $scope.closeGame(gameInfo.id);
            });
        } else {
            gameInfo.gameUrl = $sce.trustAsResourceUrl(gameUrl);
            $scope.gamesInfo[toAddIndex] = gameInfo;
        }
    }

    /**
     * @ngdoc method
     * @name closeGame
     * @methodOf CASINO.controller:skillgamesCtrl
     * @description  close opened game
     */
    $scope.closeGame = function closeGame(id) {
        if (id === undefined) {
            $scope.gamesInfo = [];
            $scope.viewCount = 1;
            $rootScope.casinoGameOpened = 0;
        } else {
            var cauntOfGames = 0, i, count;
            for (i = 0, count = $scope.gamesInfo.length; i < count; i += 1) {
                if ($scope.gamesInfo[i].id === id) {
                    var uniqueId = Math.random().toString(36).substr(2, 9);
                    $scope.gamesInfo[i] = {gameUrl: '', id: uniqueId, toAdd: false};
                }
                if ($scope.gamesInfo[i].gameUrl !== '') {
                    cauntOfGames++;
                }
            }
            if (cauntOfGames === 0) {
                $scope.gamesInfo = [];
                $scope.viewCount = 1;
                $rootScope.casinoGameOpened = 0;
            }
        }
        $location.search('game', undefined);
        $location.search('type', undefined);
    };

    $scope.$watch('env.authorized', function () {
        if ($scope.gamesInfo && $scope.gamesInfo.length) {
            CasinoUtils.refreshOpenedGames($scope);
        }
    });

    $scope.$on('game.closeCasinoGame', function (ev, id) {
        if ($scope.gamesInfo && $scope.gamesInfo.length) {
            if (id === undefined) {
                $scope.closeGame();
            } else {
                var i, length = $scope.gamesInfo.length;
                for (i = 0; i < length; i += 1) {
                    if ($scope.gamesInfo[i].game && $scope.gamesInfo[i].game.id == id) {
                        $scope.closeGame($scope.gamesInfo[i].id);
                    }
                }
            }
        }
    });

    /**
     * @ngdoc method
     * @name isFromSaved
     * @methodOf CASINO.controller:skillgamesCtrl
     * @description  checks if game (that has gameID) is in myCasinoGames
     * @param {Number} gameId Number
     * @returns {boolean} true if current game is in myCasinoGames, false otherwise
     */
    $scope.isFromSaved = function isFromSaved(gameId) {
        var games = $rootScope.myCasinoGames || [], i, j;

        for (i = 0, j = games.length; i < j; i += 1) {
            if (games[i].id === gameId) {
                return true;
            }
        }

        return false;
    };

    /**
     * @ngdoc method
     * @name toggleSaveToMyCasinoGames
     * @methodOf CASINO.controller:skillgamesCtrl
     * @description send events for adds or removes(depending on if it's already there) game from 'my casino games'
     * @param {Object} game Object
     */
    $scope.toggleSaveToMyCasinoGames = function toggleSaveToMyCasinoGames(game) {
        CasinoUtils.toggleSaveToMyCasinoGames($rootScope, game);
    };

    function getGameById(gameID) {
        for (var i = 0, count = $scope.games.length; i < count; i += 1) {
            if ($scope.games[i].id === gameID) {
                return $scope.games[i];
            }
        }
    };

    function openSkillGame(event, game, gameType) {
        if ($scope.viewCount === 1) {
            if ($scope.gamesInfo && $scope.gamesInfo.length === 1) {
                $scope.closeGame();
            }
            if ($scope.games && $scope.games.length) {
                $scope.openGame(getGameById(game.id), gameType);
            } else {
                var gamesWatcherPromise = $scope.$watch('games', function () {
                    if ($scope.games && $scope.games.length) {
                        $scope.openGame(getGameById(game.id), gameType);
                        gamesWatcherPromise();
                    }
                });
            }
        } else {
            //games that are not resizable
            game.gameType = (typeof game.gameType) == 'string' ? JSON.parse(game.gameType) : game.gameType;
            if (game.gameType.ratio == "0") {
                $scope.message = Translator.get('Sorry, this game cannot be opened in multi-view mode');
            } else {
                var i, count = $scope.gamesInfo.length;
                for (i = 0; i < count; i += 1) {
                    if ($scope.gamesInfo[i].gameUrl === '') {
                        $scope.gamesInfo[i].toAdd = true;
                        $scope.openGame(game, gameType);
                        break;
                    }
                }
                if (i === count) {
                    $scope.message = Translator.get('Please close one of the games for adding new one');
                }
            }
        }
    };

    $scope.$on("games.openGame", openSkillGame);

    /**
     * @ngdoc method
     * @name changeView
     * @methodOf CASINO.controller:skillgamesCtrl
     * @description change view for applying functionality of multiple view in casino
     * @param {Int} view the Int
     */
    $scope.changeView = function changeView(view) {
        var i, gameInfo, uniqueId;
        if (view > $scope.gamesInfo.length) {
            for (i = $scope.gamesInfo.length; i < view; i++) {
                uniqueId = Math.random().toString(36).substr(2, 9);
                gameInfo = {gameUrl: '', id: uniqueId, toAdd: false};
                $scope.gamesInfo.push(gameInfo);
            }
            $scope.viewCount = view;
        } else if (view < $scope.gamesInfo.length) {
            var actualviews = 0, actualGames = [];
            for (i = 0; i < $scope.gamesInfo.length; i += 1) {
                if ($scope.gamesInfo[i].gameUrl !== '') {
                    gameInfo = $scope.gamesInfo[i];
                    actualGames.push(gameInfo);
                    actualviews++;
                }
            }
            if (actualviews <= view) {
                if (actualviews === 1 && view === 2) {
                    uniqueId = Math.random().toString(36).substr(2, 9);
                    gameInfo = {gameUrl: '', id: uniqueId, toAdd: false};
                    if ($scope.gamesInfo[0].gameUrl !== '') {
                        actualGames.push(gameInfo);
                    } else {
                        actualGames.unshift(gameInfo);
                    }
                }
                $scope.gamesInfo = actualGames;
                $scope.viewCount = view;
            } else {
                var numberOfNeeded = actualviews - view;
                $scope.message = Translator.get('Please close {1} game(s) to change view', [numberOfNeeded]);
            }
        }
        $rootScope.casinoGameOpened = $scope.gamesInfo.length;

        analytics.gaSend('send', 'event', 'multiview', {'page': $location.path(), 'eventLabel': 'multiview changed to ' + view});
    };

    /**
     * @ngdoc method
     * @name enableToAddGame
     * @methodOf CASINO.controller:skillgamesCtrl
     * @description enable current view for add new game and show container of all games
     * @param {String} id gameInfo id
     */
    $scope.enableToAddGame = function enableToAddGame(id) {
        for (var i = 0; i < $scope.gamesInfo.length; i += 1) {
            $scope.gamesInfo[i].toAdd = id === $scope.gamesInfo[i].id;
        }
        $scope.showAllGames = true;
        //we need to reinitialize filter options and selected category options
        $scope.popUpSearchInput = "";
        $scope.agSelectedCategory = 'SkillGames';
        $scope.popUpGames = CasinoUtils.getCasinoPopUpGames($scope.allGames, $scope.agSelectedCategory, $scope.popUpSearchInput, $scope.gamesInfo);
    };

    $scope.$watch('agSelectedCategory', function () {
        $scope.popUpGames = CasinoUtils.getCasinoPopUpGames($scope.allGames, $scope.agSelectedCategory, $scope.popUpSearchInput, $scope.gamesInfo);

        if ( $scope.agSelectedCategory === 'LiveDealer') {
            $scope.mvTablesInfo = {};
            CasinoUtils.setupTableInfo($scope.mvTablesInfo);
        }
    });

    $scope.$watch('popUpSearchInput', function () {
        $scope.popUpGames = CasinoUtils.getCasinoPopUpGames($scope.allGames, $scope.agSelectedCategory, $scope.popUpSearchInput, $scope.gamesInfo);
    });

    /**
     * @ngdoc method
     * @name refreshGame
     * @methodOf CASINO.controller:skillgamesCtrl
     * @description find game by id in opened games and relaod it
     *
     * @param {Int} id the games id
     */
    $scope.refreshGame = function refreshGame(id) {
        CasinoUtils.refreshCasinoGame($scope, id);
    };

    /**
     * transfer functionality for gaminator provider. It will be removed after 2 months
     */
    $scope.gpTransferModel = {};
    /**
     * @ngdoc method
     * @name gaminatorTransfer
     * @methodOf CASINO.controller:skillgamesCtrl
     * @description find game by id in opened games and relaod it
     *
     * @param {String} category the category of request
     */
    $scope.gaminatorTransfer = function gaminatorTransfer(category) {
        CasinoUtils.gpTransfer(category, $scope.gpTransferModel);
    };

    /**
     * @ngdoc method
     * @name getSkillGamesBanners
     * @methodOf CMS.controller:pagesCtrl
     * @description   populates $scope's **pokerTopBanners** variable with banner information got from cms
     **/
    $scope.getSkillGamesBanners = function getSkillGamesBanners(containerId) {
        containerId = containerId || 'skillgames-banners-' + $rootScope.env.lang;
        content.getWidget(containerId).then(function (response) {
            $scope.skilledGamesBanners = [];
            if (response.data && response.data.widgets && response.data.widgets[0]) {
                angular.forEach(response.data.widgets, function (widget) {
                    $scope.skilledGamesBanners.push(widget.instance);
                });
            }
        }, function (reason) {
            console.log(reason);
        });
    };

    /**
     * @ngdoc method
     * @name openCBannerLink
     * @methodOf CASINO.controller:skillgamesCtrl
     * @description   Track big-slider banners click
     *
     */
    $scope.openCBannerLink = function openCBannerLink() {
        analytics.gaSend('send', 'event', 'news', {'page': $location.path(), 'eventLabel': 'Skill Games banner click'});
    };

    /**
     * for live casino in multiple view mode: listen to messages from other windows to change livedealer options when needed
     */
    $scope.$on('livedealer.redirectGame', function (event, message) {
        CasinoUtils.adjustLiveCasinoGame($scope, message);
    });

  /*  function createTopMenu(games) {
        $scope.gamePages = [
            {name: 'Home', id: '-1'}
        ];
        var i, length = games.length;
        for (i = 0; i < length; i += 1) {
            var item = {
                name: games[i].gameName,
                id: games[i].id
            }
            $scope.gamePages.push(item)
        }

        $scope.selectedPage = $scope.gamePages[0];
    } */
}]);