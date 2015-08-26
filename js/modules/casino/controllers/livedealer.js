/**
 * @ngdoc controller
 * @name CASINO.controller:livedealerCtrl
 * @description
 * casino page controller
 */

CASINO.controller('livedealerCtrl', ['$rootScope', '$scope', '$sce', '$location', '$interval', '$timeout', 'Storage', 'CConfig', 'casinodata', 'Utils', 'CasinoUtils', 'DomHelper', 'Translator', 'CasinoCache', 'Zergling', 'WPConfig', 'content', 'analytics', function ($rootScope, $scope, $sce, $location, $interval, $timeout, Storage, CConfig, casinodata, Utils, CasinoUtils, DomHelper, Translator, CasinoCache, Zergling, WPConfig, content, analytics) {
    'use strict';

    $scope.games = [];
    $scope.gamesInfo = [];
    $scope.viewCount = 1;
    $scope.errorStatus = 0;
    $scope.liveGamesConf = CConfig.liveCasino;
    $scope.cConf = {
        iconsUrl: CConfig.cUrlPrefix + CConfig.iconsUrl,
        backGroundUrl: CConfig.cUrlPrefix + CConfig.backGroundUrl,
        gpTransferEnabled: CConfig.main.gaminatorTransferEnabled
    };

    $scope.$on('widescreen.on', function () { $scope.wideMode = true; });
    $scope.$on('widescreen.off', function () { $scope.wideMode = false; });
    $scope.$on('middlescreen.on', function () { $scope.middleMode = true; });
    $scope.$on('middlescreen.off', function () { $scope.middleMode = false; });

    function init() {
        if ($scope.liveGamesConf.view3DEnabled || $scope.liveGamesConf.viewStyle === '3DView') { //footer must be movable for only for 3D View
            $rootScope.footerMovable = true;
        }
        loadDealerPages();
        loadGames();
    }

    /**
     * @ngdoc method
     * @name loadGames
     * @methodOf CASINO.controller:livedealerCtrl
     * @description loads live dealer games list using {@link CASINO.service:casinodata casinodata} service's **getCategory** method
     * and assigns to scope's 'games' variable
     */
    function loadGames() {
        var gamesData = CasinoCache.get(CConfig.liveCasino.categoryName + CConfig.main.partnerID);
        if (gamesData !== undefined  && gamesData.length) {
            prepareGames(gamesData);
        } else {
            casinodata.getCategory(CConfig.liveCasino.categoryName, CConfig.main.partnerID).then(function (response) {
                if (response.data.length) {
                    var availableGames = CasinoUtils.filterByGameProvider(response.data, CConfig.main.filterByProvider);
                    var preparedGames = CasinoUtils.setGamesFunMode(availableGames);
                    CasinoCache.put(CConfig.liveCasino.categoryName + CConfig.main.partnerID, preparedGames);
                    prepareGames(preparedGames);
                } else {
                    $scope.errorStatus = 1;
                }
            }, function (reason) {
                $scope.errorStatus = 1;
            });
        };

        //check and show bonus popUp if it need
        if (CConfig.bonusPopUpUrl) {
            getBonusPopUpOptions();
        } else if ($rootScope.env.authorized && $scope.liveGamesConf.jackpot.showPopUp && !Storage.get('lcJackpotPopUp')) {
            getJackpotList();
        }
    };

    function getBonusPopUpOptions() {
        var searchParams = $location.search();
        if (!searchParams.game) {
            var wasShownPopUp = Storage.get('lcBonusPopUp');
            if (!wasShownPopUp) {
                Storage.set('lcBonusPopUp', true, CConfig.main.storedbonusPopUpLifetime);
                $rootScope.$broadcast('youtube.videourl', CConfig.bonusPopUpUrl);
            }
        }
    }

    function prepareGames(games) {
        var isInKeno = $location.path() === '/keno/' || $location.path() === '/keno';
        if (!isInKeno) {
            $scope.games = games;

            if (CConfig.main.multiViewEnabled) {
                getAllGames();
            }
            if ($scope.liveGamesConf.view3DEnabled || $scope.liveGamesConf.viewStyle === '3DView') {
                prepareView3DDisplay();
                load3DViewTopBanners();
            } else if ($scope.liveGamesConf.viewStyle === 'SliderView') {
                if (!$scope.liveGamesConf.disableProvidersFilter) {
                    initProvidersList();
                }
            }
        } else {
            var kenoGames = [], length = games.length;
            for (var i = 0; i < length; i += 1) {
                if (games[i].id === $scope.liveGamesConf.games.keno.id || games[i].id === $scope.liveGamesConf.games.draw.id) {
                    kenoGames.push(games[i]);
                }
            }
            $scope.games = kenoGames;
            $scope.firstView = false;
            $scope.liveGamesConf.allViewsEnabled = false;
            $scope.liveGamesConf.view3DEnabled = true;
        }

        findAndOpenGame();
    };

    /**
     * @ngdoc method
     * @name getAllGames
     * @methodOf CASINO.controller:livedealerCtrl
     * @description  loads all games and filter options list using {@link CASINO.service:casinodata casinodata} service's **getFilterOptions** method
     */
    function getAllGames() {
        $scope.agSelectedCategory = 'LiveDealer';
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

    function findAndOpenGame() {
        var searchParams = $location.search();
        if (searchParams.game !== undefined) {
            var gameID = parseInt(searchParams.game, 10);
            var game = getGameById(gameID);
            if (game) {
                $scope.openGame(game);
            }
        }
    }

    /**
     * @ngdoc method
     * @name openGameInNewWindow
     * @methodOf CASINO.controller:livedealerCtrl
     * @description  calculates the possible sizes of the popup window and opens casino game in there
     *
     * @param {string} id game id
     */
    $scope.openGameInNewWindow = function openGameInNewWindow(id) {
        CasinoUtils.openPopUpWindow($scope.gamesInfo, id);
        $scope.closeGame(id);
    };

    /**
     * @ngdoc method
     * @name openTables
     * @methodOf CASINO.controller:livedealerCtrl
     * @param {Object} game game object
     * @param {String} gameType gameType string
     * @description  opens login form if it needed, or generates live casino tables url and opens it
     */
    $scope.openTables = function openTables(game, gameType) {
        if (!gameType) {
            gameType = $rootScope.env.authorized || !CConfig.main.funModeEnabled ? 'real' : 'fun';
        }
        if (gameType === 'real' && !$rootScope.env.authorized) {
            $rootScope.$broadcast("openLoginForm");
            return;
        }
        var data = CConfig.liveCasino.games;
        //other games haven't tables
        if (game.id === data.roulette.id || game.id === data.blackjack.id || game.id === data.baccarat.id || game.id === data.betOnPoker.id || game.id === data.betOnBaccarat.id) {
           var gameUrl = CConfig.cUrlPrefix + CConfig.cGamesUrl + '?gameid=' + game.gameID + '&provider=' + game.gameProvider + '&lan=' + $rootScope.env.lang + '&partnerid=' + CConfig.main.partnerID;
            $scope.tablesControll = {game: game};
            if (gameType === 'real') {
                $scope.tablesControll.loadingUserData = true;
                Zergling.get({'game_id': parseInt(game.externalID)}, 'casino_auth').then(function (response) {
                    if (response && response.result) {
                        if (response.result.has_error == "False") {
                            var userInfo = '&token=' + response.result.token + '&username=' + response.result.username + '&currency=' + response.result.currency + '&userid=' + response.result.id + '&nickname=' + response.result.nickname + '&firstname=' + $rootScope.profile.first_name + '&lastname=' + $rootScope.profile.last_name;
                            $scope.tablesControll.url = $sce.trustAsResourceUrl(gameUrl + userInfo + '&mode=' + gameType);
                            $scope.tablesControll.loadingUserData = false;
                        } else if (response.result.has_error == "True") {
                            $scope.message = Translator.get('casino_auth_error');
                            $scope.tablesControll = null;
                        }
                    }
                }, function (failResponse) {
                    $scope.message = Translator.get('casino_auth_error');
                    $scope.tablesControll = null;
                });
            } else {
                $scope.tablesControll.url = $sce.trustAsResourceUrl(gameUrl + '&mode=' + gameType);
            }
        } else {
            $scope.openGame(game, gameType);
        }
    };

    /**
     * @ngdoc method
     * @name openGame
     * @methodOf CASINO.controller:livedealerCtrl
     * @param {Object} game game object
     * @param {String} gameType gameType string
     * @description  opens login form if it needed, or generates casino game url and opens it
     */
    $scope.openGame = function openGame(game, gameType, tableId) {
        $scope.showAllGames = false;
        $rootScope.env.showSlider = false;
        $rootScope.env.sliderContent = '';

        if (gameType === undefined) {
            gameType = $rootScope.env.authorized || !CConfig.main.funModeEnabled ? 'real' : 'demo';
        }
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

        var gameInfo = {};
        gameInfo.gameID = game.gameID;
        gameInfo.id = Math.random().toString(36).substr(2, 9);

        gameInfo.gameMode = gameType;
        gameInfo.toAdd = false;
        gameInfo.game = game; //need for refresh some games after loggin
        var gameOption = game.gameOptions ? game.gameOptions : "";
        var gameUrl;
        var tableInfo = tableId !== undefined ? "&table_id=" + tableId : "";

        if ($scope.gamesInfo.length < 2) {
             if (tableId !== undefined) {
                 $location.search('table', tableId);
             } else {
                 var searchParams = $location.search();
                 if (searchParams.table !== undefined) {
                     tableId = searchParams.table;
                     tableInfo = "&table_id=" + tableId;
                 }
             }
        }
        gameInfo.tableId = tableId;

        //the url of game doesn't come from backend is correct
        //if (game.gameInfo && game.gameInfo.targetOpenLink && game.gameInfo.targetOpenLink !== "") {
        //    if (game.gameInfo.targetOpenLink.indexOf('http') === -1) {
       //         game.gameInfo.targetOpenLink = CConfig.cUrlPrefix + game.gameInfo.targetOpenLink;
        //    }
        //    gameUrl = game.gameInfo.targetOpenLink;
       // } else {
            gameUrl = CConfig.cUrlPrefix + CConfig.cGamesUrl + '?gameid=' + game.gameID + '&mode=' + gameType + '&provider=' + game.gameProvider + gameOption;
       // }
        gameUrl = gameUrl + tableInfo + '&lan=' + $rootScope.env.lang + '&partnerid=' + CConfig.main.partnerID;

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
    };

    function addCurrentGame(gameInfo, gameUrl, toAddIndex) {
        if (gameInfo.gameMode === 'real') {
            gameInfo.loadingUserData = true;
            $scope.gamesInfo[toAddIndex] = gameInfo;
            Zergling.get({'game_id': parseInt(gameInfo.game.externalID)}, 'casino_auth').then(function (response) {
                if (response && response.result) {
                    if (response.result.has_error == "False") {
                        var userInfo = '&token=' + response.result.token + '&username=' + response.result.username + '&currency=' + response.result.currency + '&userid=' + response.result.id;
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
     * @methodOf CASINO.controller:livedealerCtrl
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

        $location.search('type', undefined);
        $location.search('game', undefined);
        $location.search('table', undefined);
    };

    /**
     * @ngdoc method
     * @name isFromSaved
     * @methodOf CASINO.controller:livedealerCtrl
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
     * @methodOf CASINO.controller:livedealerCtrl
     * @description send events for adds or removes(depending on if it's already there) game from 'my casino games'
     * @param {Object} game Object
     */
    $scope.toggleSaveToMyCasinoGames = function toggleSaveToMyCasinoGames(game) {
        CasinoUtils.toggleSaveToMyCasinoGames($rootScope, game);
    };

    function getGameById(gameID) {
        for(var i = 0, count = $scope.games.length; i < count;  i += 1) {
            if ($scope.games[i].id == gameID) {
                return $scope.games[i];
            }
        }
    }

    function openLiveDealerGame(event, game, gameType) {
        if ($scope.viewCount === 1) {
            // if ($scope.gamesInfo.length === 1) {
            //     $scope.closeGame();
            // }
            //
            if ($scope.games.length) {
                $scope.openTables(getGameById(game.id), gameType);
                // $scope.openGame(getGameById(game.id), gameType);
            } else {
                var gamesWatcherPromise = $scope.$watch('games', function() {
                    if ($scope.games.length) {
                        $scope.openTables(getGameById(game.id), gameType);
                        //$scope.openGame(getGameById(game.id), gameType);
                        gamesWatcherPromise();
                    }
                });
            }
        } else {
            //games that are not resizable
            var typeOfGame = (typeof game.gameType) == 'string' ? JSON.parse(game.gameType) : game.gameType;
            if (typeOfGame.ratio == "0") {
                $scope.message = Translator.get('Sorry, this game cannot be opened in multi-view mode');
            } else {
                var i, count = $scope.gamesInfo.length;
                for (i = 0; i < count; i += 1) {
                    if ($scope.gamesInfo[i].gameUrl === '') {
                        $scope.gamesInfo[i].toAdd = true;
                        if (game.gameCategory === CConfig.liveCasino.categoryName) {
                            $scope.openTables(game, gameType);
                        } else {
                            $scope.openGame(game, gameType);
                        }
                        break;
                    }
                }
                if (i === count) {
                    $scope.message = Translator.get('Please close one of the games for adding new one');
                }
            }
        }
    }

    $scope.$on("livedealer.openGame", openLiveDealerGame);

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

    $scope.$watch('env.authorized', function () {
        if ($scope.gamesInfo && $scope.gamesInfo.length) {
            CasinoUtils.refreshOpenedGames($scope);
        }

        if ($rootScope.env.authorized && $scope.liveGamesConf.jackpot.showPopUp && !Storage.get('lcJackpotPopUp')) {
            getJackpotList();
        }

        //refresh tables container if it's opened
        if ($scope.tablesControll) {
            var tableGame = $scope.tablesControll.game;
            $scope.tablesControll = null;

            $timeout(function () {
                var gameUrl = CConfig.cUrlPrefix + CConfig.cGamesUrl + '?gameid=' + tableGame.gameID + '&provider=' + tableGame.gameProvider + '&lan=' + $rootScope.env.lang + '&partnerid=' + CConfig.main.partnerID;
                if ($rootScope.env.authorized) {
                    $scope.tablesControll = {loadingUserData: true, game: tableGame};
                    //get user data
                    Zergling.get({'game_id': parseInt(tableGame.externalID)}, 'casino_auth').then(function (response) {
                        if (response && response.result) {
                            if (response.result.has_error == "False") {
                                var userInfo = '&token=' + response.result.token + '&username=' + response.result.username + '&currency=' + response.result.currency + '&userid=' + response.result.id;
                                $scope.tablesControll.url = $sce.trustAsResourceUrl(gameUrl + userInfo + '&mode=' + 'real');
                                $scope.tablesControll.loadingUserData = false;
                            } else if (response.result.has_error == "True") {
                                $scope.message = Translator.get('casino_auth_error');
                                $scope.tablesControll = null;
                            }
                        }
                    }, function (failResponse) {
                        $scope.message = Translator.get('casino_auth_error');
                        $scope.tablesControll = null;
                    });
                } else {
                    $scope.tablesControll = {
                        game: tableGame,
                        url: $sce.trustAsResourceUrl(gameUrl + '&mode=demo')
                    }
                }
            }, 20);
        }
    });

    /**
     * listen to messages from other windows to change livedealer options when needed
     */
    $scope.$on('livedealer.redirectGame', function (event, message) {
        CasinoUtils.adjustLiveCasinoGame($scope, message, $scope.games);

        if (message.data.isMinnyLobby) {
            var searchParams = $location.search();
            if (searchParams.game !== undefined) {
                $location.search('game', $scope.games[i].id);
                $location.search('table', message.data.tableId);
            }
        } else {
            $scope.tablesControll = null;
        }
    });

    /**
     * @ngdoc method
     * @name openDealerGame
     * @methodOf CASINO.controller:livedealerCtrl
     * @description find the dealers game and open it
     * @param {Object} dealerInfo the object that contain infomration for current dealer
     */
    $scope.openDealerGame = function openDealerGame(dealerInfo) {
        if ($scope.games && $scope.games.length) {
            var game, i, length = $scope.games.length;
            for (i = 0; i < length; i += 1) {
                if ($scope.games[i].serverGameID == dealerInfo.game_id) {
                    game = $scope.games[i];
                    break;
                }
            }

            if (game) {
                $scope.selectDealerPage($scope.dealerPages[0]);
                $scope.openGame(game, undefined, dealerInfo.table_id);
            }
        }
    };

    /**
     * @ngdoc method
     * @name changeView
     * @methodOf CASINO.controller:livedealerCtrl
     * @description change view for applying functionality of multiple view in casino
     * @param {Int} view the Int
     */
    $scope.changeView = function changeView(view) {
        var i, gameInfo, uniqueId;
        if(view > $scope.gamesInfo.length) {
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

        analytics.gaSend('send', 'event', 'multiview',  {'page': $location.path(), 'eventLabel': 'multiview changed to ' + view});
    };

    /**
     * @ngdoc method
     * @name enableToAddGame
     * @methodOf CASINO.controller:livedealerCtrl
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
        $scope.agSelectedCategory = 'LiveDealer';
        $scope.popUpGames = CasinoUtils.getCasinoPopUpGames($scope.allGames, $scope.agSelectedCategory, $scope.popUpSearchInput, $scope.gamesInfo);
        $scope.mvTablesInfo = {};
        CasinoUtils.setupTableInfo($scope.mvTablesInfo);
    };

    $scope.$watch('agSelectedCategory', function(){
        $scope.popUpGames = CasinoUtils.getCasinoPopUpGames($scope.allGames, $scope.agSelectedCategory, $scope.popUpSearchInput, $scope.gamesInfo);

        if ( $scope.agSelectedCategory === 'LiveDealer') {
            $scope.mvTablesInfo = {};
            CasinoUtils.setupTableInfo($scope.mvTablesInfo);
        }
    });
    $scope.$watch('popUpSearchInput', function(){
        $scope.popUpGames = CasinoUtils.getCasinoPopUpGames($scope.allGames, $scope.agSelectedCategory, $scope.popUpSearchInput, $scope.gamesInfo);
    });

    /**
     * @ngdoc method
     * @name refreshGame
     * @methodOf CASINO.controller:livedealerCtrl
     * @description find game by id in opened games and relaod it
     *
     * @param {Int} id the games id
     */
    $scope.refreshGame = function refreshGame(id) {
        CasinoUtils.refreshCasinoGame($scope, id);
    };

    /**
     * @ngdoc method
     * @name loadDealerPages
     * @methodOf CASINO.controller:livedealerCtrl
     * @description loads poker pages from cms and selects first one
     */
    function loadDealerPages() {
        $scope.dealerPagesLoaded = false;

        if (Utils.isObjectEmpty($scope.dealerPages)) {
            content.getPage('live-dealer-' + $rootScope.env.lang, true).then(function (data) {
                $scope.dealerPagesLoaded = true;
                $scope.dealerPages = [];
                if (data.data.page && data.data.page.children) {
                    $scope.dealerPages = data.data.page.children;
                    var i, j;
                    for (i = 0; i < $scope.dealerPages.length; i++) {
                        $scope.dealerPages[i].title = $sce.trustAsHtml($scope.dealerPages[i].title);
                        $scope.dealerPages[i].content = $sce.trustAsHtml($scope.dealerPages[i].content);
                        for (j = 0; j < $scope.dealerPages[i].children.length; j++) {
                            $scope.dealerPages[i].children[j].title = $sce.trustAsHtml($scope.dealerPages[i].children[j].title);
                            $scope.dealerPages[i].children[j].content = $sce.trustAsHtml($scope.dealerPages[i].children[j].content);
                        }
                    }
                    var page = checkForDealerPageDeepLink() || $scope.dealerPages[0];
                    $scope.selectDealerPage(page);
                }
            }, function (reason) {
                $scope.dealerPages = [];
                $scope.dealerPagesLoaded = true;
            });
        }
    };

    function checkForDealerPageDeepLink(){
        if ($location.search().page) {
            var i, slug = $location.search().page;
            for (i = 0; i < $scope.dealerPages.length; i += 1) {
                if ($scope.dealerPages[i].slug === slug) {
                    return $scope.dealerPages[i];
                }
            }
        }

        return null;
    }

    /**
     * @ngdoc method
     * @name selectDealerPage
     * @methodOf CASINO.controller:livedealerCtrl
     * @description selects given poker page
     *
     * @param {Object} page page to select
     */
    $scope.selectDealerPage = function selectDealerPage(page) {
        if (!$scope.selectedDealerPage || $scope.selectedDealerPage.slug !== page.slug) {
            $scope.selectedDealerPage = page;
            $location.search('page', page.slug);

            if (page.slug === "meet-our-dealers") {
                $scope.ourDealers = getVisibleGames($scope.selectedDealerPage.children);
                //get dealerInfo
                getDealerInfo($scope.ourDealers[2].custom_fields.dealer_id[0]);
            }
        }
    };

    /**
     * @ngdoc method
     * @name slide
     * @methodOf CASINO.controller:livedealerCtrl
     * @description Slides visible games left or right
     *
     * @param {String} direction direction, 'left' or 'right'
     */
    $scope.slide = function slide(direction) {
        $scope.slideDirection = direction;
        var dealers = $scope.selectedDealerPage.children;

        if (direction === 'left') {
            dealers.unshift(dealers.pop());
        } else if (direction === 'right') {
            dealers.push(dealers.shift());
        }
        $scope.ourDealers = getVisibleGames(dealers);
        //get dealerInfo
        getDealerInfo($scope.ourDealers[2].custom_fields.dealer_id[0]);
    };

    function getVisibleGames(games) {
        return games.slice(0, 5);
    }

    /*
    * get dealer info according to dealerId
    */
    function getDealerInfo(dealerId) {
        $scope.dealerInfo = null;
        Zergling.get({'dealer_id': dealerId}, 'casino_live_dealer_info').then(function (response) {
            $scope.dealerInfo = response;
            if ($scope.dealerInfo.is_online) {
                $scope.dealerInfo.gameName = 'livecasino_' + $scope.dealerInfo.game_id +
                    ($scope.dealerInfo.game_id == '101' ? '_' + $scope.dealerInfo.table_id : '');
            }
        }, function (failResponse) {
            $scope.dealerInfo = {is_online: false};
        });
    }

    /**
     * transfer functionality for gaminator provider. It will be removed after 2 months
     */
    $scope.gpTransferModel = {};
    /**
     * @ngdoc method
     * @name gaminatorTransfer
     * @methodOf CASINO.controller:livedealerCtrl
     * @description find game by id in opened games and relaod it
     *
     * @param {String} category the category of request
     */
    $scope.gaminatorTransfer = function gaminatorTransfer(category) {
        CasinoUtils.gpTransfer(category, $scope.gpTransferModel);
    };

    /**
     * 3D view functionality
     */

    var rotatePromise;

    $scope.initSlidingView = function initSlidingView() {
        loadSlidingViewTopBanners();
    };

    /**
     * @ngdoc method
     * @name table3DClickHandler
     * @methodOf CASINO.controller:livedealerCtrl
     * @param {String} gameId id of selected game
     * @description  opens current tables or shows error message if the selected game is undefined
     */
    $scope.table3DClickHandler = function table3DClickHandler(gameId) {
        var game = getGameById(gameId);
        if (game) {
            var gameType = $rootScope.env.authorized || !CConfig.main.funModeEnabled ? 'real' : 'demo';
            $scope.openTables(game, gameType);
        } else {
            $scope.message = Translator.get('The game is not available');
        }
    };

    /**
     * @ngdoc method
     * @name view3DChangeArrowClick
     * @methodOf CASINO.controller:livedealerCtrl
     *
     * @description  change current view
     */
    $scope.view3DChangeArrowClick = function view3DChangeArrowClick() {
        $scope.firstView = !$scope.firstView;
    };

    /**
     * @ngdoc method
     * @name load3DViewTopBanners
     * @methodOf CASINO.controller:livedealerCtrl
     * @description loads poker 3d view top banners from cms
     */
    function load3DViewTopBanners() {
        if (Utils.isObjectEmpty($scope.top3DBanners)) {
            $scope.top3DBanners = {
                l1: {index: 0, rotationPaused: false, list: []},
                l2: {index: 0, rotationPaused: false, list: []},
                r1: {index: 0, rotationPaused: false, list: []},
                r2: {index: 0, rotationPaused: false, list: []}
            };
            content.getWidget(WPConfig.bannerSlugs.livecasino[$rootScope.env.lang]).then(function (response) {
                if (response.data && response.data.widgets && response.data.widgets[0]) {
                    var i, length = response.data.widgets.length;
                    for (i = 0; i < length; i += 1) {
                        var instance = response.data.widgets[i].instance;
                        switch (instance.align) {
                            case 'l1':
                                $scope.top3DBanners.l1.list.push(instance);
                                break;
                            case 'l2':
                                $scope.top3DBanners.l2.list.push(instance);
                                break;
                            case 'r1':
                                $scope.top3DBanners.r1.list.push(instance);
                                break;
                            case 'r2':
                                $scope.top3DBanners.r2.list.push(instance);
                                break;
                            default:
                                //$scope.top3DBanners.l1.list.push(instance);
                                break;
                        }
                    }
                }

                if ($scope.top3DBanners.l1.list.length > 1 || $scope.top3DBanners.l2.list.length > 1 || $scope.top3DBanners.r1.list.length > 1 || $scope.top3DBanners.r2.list.length > 1) {
                    rotatePromise = $interval(change3DBanners, CConfig.liveCasino.view3DBannersRotationPeriod);
                }
            });
        }
    }

    function loadSlidingViewTopBanners () {
        content.getPage(WPConfig['live-casino'].mainPageSlugs[$rootScope.env.lang], true).then(function (data) {
            $scope.productSlides = data.data.page ? data.data.page.children[0].children : [];
        });
    }

    /**
     * @ngdoc method
     * @name top3DBannerClickHandler
     * @methodOf CASINO.controller:livedealerCtrl
     * @description   check link and opens corresponding data
     *
     * @param {string} [link] optional
     */
    $scope.top3DBannerClickHandler = function top3DBannerClickHandler(link) {
        //analytics.gaSend('send', 'event', 'news', {'page': $location.path(), 'eventLabel': 'livecasino 3d view top banner click'});
        if (link === undefined || link === '') {
            return;
        }
        var unregisterlocationChangeSuccess = $rootScope.$on('$locationChangeSuccess', function () {
            unregisterlocationChangeSuccess();

            var searchParams = $location.search();
            if (searchParams.game !== undefined) {
                var gameID = parseInt(searchParams.game, 10);
                $scope.table3DClickHandler(gameID);
            } else if (searchParams.help !== undefined) {
                $rootScope.$broadcast('openHelpPage', {slug: searchParams.help, from: 'footer'}); //need to open helps sliders
            }
        });
    };

    /**
     * @ngdoc method
     * @name t3DBRotationControl
     * @methodOf CASINO.controller:livedealerCtrl
     * @param {String} currentBanner reference to current banner
     * @param {String} mouseEvent 'over' or 'out'
     *
     * @description  pause or play current banner by changing current rotationPaused attribute
     */
    $scope.t3DBRotationControl = function t3DBRotationControl(currentBanner, mouseEvent) {
        $scope.top3DBanners[currentBanner].rotationPaused = mouseEvent === 'over';
    };


    function change3DBanners() {
        if ($scope.firstView) {
            // rotate l1 banner
            if (!$scope.top3DBanners.l1.rotationPaused) {
                if ($scope.top3DBanners.l1.index < $scope.top3DBanners.l1.list.length - 1) {
                    $scope.top3DBanners.l1.index += 1;
                } else {
                    $scope.top3DBanners.l1.index = 0;
                }
            }
            // rotate r1 banner
            if (!$scope.top3DBanners.r1.rotationPaused) {
                if ($scope.top3DBanners.r1.index < $scope.top3DBanners.r1.list.length - 1) {
                    $scope.top3DBanners.r1.index += 1;
                } else {
                    $scope.top3DBanners.r1.index = 0;
                }
            }

        } else {
            // rotate l2 banner
            if (!$scope.top3DBanners.l2.rotationPaused) {
                if ($scope.top3DBanners.l2.index < $scope.top3DBanners.l2.list.length - 1) {
                    $scope.top3DBanners.l2.index += 1;
                } else {
                    $scope.top3DBanners.l2.index = 0;
                }
            }
            // rotate r2 banner
            if (!$scope.top3DBanners.r2.rotationPaused) {
                if ($scope.top3DBanners.r2.index < $scope.top3DBanners.r2.list.length - 1) {
                    $scope.top3DBanners.r2.index += 1;
                } else {
                    $scope.top3DBanners.r2.index = 0;
                }
            }
        }
    }

    function prepareView3DDisplay() {
        var FPGamesLength = 0, SPGamesLength = 0;
        var i, length = $scope.games.length;
        for (i = 0; i < length; i += 1) {
            switch ($scope.games[i].id) {
                case $scope.liveGamesConf.games.roulette.id:
                case $scope.liveGamesConf.games.blackjack.id:
                case $scope.liveGamesConf.games.baccarat.id:
                case $scope.liveGamesConf.games.betOnPoker.id:
                    FPGamesLength += 1;
                    break;
                case $scope.liveGamesConf.games.keno.id:
                case $scope.liveGamesConf.games.draw.id:
                    SPGamesLength += 1;
                    break;
            }
        }

        $scope.liveGamesConf.allViewsEnabled = FPGamesLength > 0 && SPGamesLength > 0;
        $scope.firstView = FPGamesLength > 0;
    }

    /**
     * @ngdoc method
     * @name getJackpotList
     * @methodOf CASINO.controller:livedealerCtrl
     *
     * @description  get Jackpot data for Jackpot Popup
     */
    function getJackpotList () {
        Zergling.get({'game_id': parseInt($scope.liveGamesConf.games.roulette.externalID)}, 'get_top_users')
            .then(function (response) {
                if(response.user_list && response.user_list.length) {
                    $scope.jackpotData = {
                        userList: response.user_list,
                        totalJackpot: response.total_jackpot,
                        userId: response.current_player_id
                    };
                }
            }, function (reason) {
                console.log(reason);
            });
    }

    /**
     * @ngdoc method
     * @name closeJackpotPopUp
     * @methodOf CASINO.controller:livedealerCtrl
     * @description  closes the popUp of jackpot and sets a local storage value not to show it again
     *
     * @param {Boolean} selected true , false or undefined
     */
    $scope.closeJackpotPopUp = function closeJackpotPopUp(selected) {
        Storage.set('lcJackpotPopUp', true, !selected ? $scope.liveGamesConf.jackpot.storedPopUpLifetime : null);
        $scope.jackpotData = null;
    };

    //one dimensional view

    function initProvidersList() {
        var i, length = $scope.games.length, providers = [];

        for (i = 0; i < length; i += 1) {
           if (providers.indexOf($scope.games[i].gameProvider) === -1) {
               providers.push($scope.games[i].gameProvider);
           }
        }
        if (providers.length > 1) {
            $scope.providerOptions = providers;
            $scope.selectedProvider = $scope.providerOptions[0];
        }
    }

    init();

    $scope.$on('$destroy', function () {
        if (rotatePromise) {
            $interval.cancel(rotatePromise);
        }
    });
}]);