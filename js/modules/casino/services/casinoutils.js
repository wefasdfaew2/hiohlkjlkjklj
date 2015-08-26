/* global CASINO */
/**
 * @ngdoc service
 * @name CASINO.service:CasinoUtils
 * @description
 * Utility functions
 */

CASINO.service('CasinoUtils', ['$rootScope', '$timeout', '$window', '$sce', 'DomHelper', 'Zergling', 'CConfig', function ($rootScope, $timeout, $window, $sce, DomHelper, Zergling, CConfig) {
    'use strict';
    var CasinoUtils = {};

    /**
     * @ngdoc method
     * @name filterByGameProvider
     * @methodOf CASINO.service:CasinoUtils
     * @description returns filtered games
     * @param {Array} games the array
     * @param {Array} providers the list of providers
     *
     * @return {Array} games
     */
    CasinoUtils.filterByGameProvider = function filterByGameProvider(games, providers) {
        if (!providers || !providers.length) {
            return games;
        }
        var i, j;
        for (i = 0; i < providers.length; i += 1) {
            for (j = 0; j < games.length; j += 1) {
                if (games[j].gameProvider === providers[i]) {
                    games.splice(j, 1);
                    j--;
                }
            }
        }

        return games;
    };

    /**
     * @ngdoc method
     * @name setGamesFunMode
     * @methodOf CASINO.service:CasinoUtils
     * @description returns games by adding hasFunMode property
     * @param {Array} games the array
     * @param {Array} providers the list of providers
     *
     * @return {Array} games
     */
    CasinoUtils.setGamesFunMode = function setGamesFunMode(games) {
        if (!games[0].hasOwnProperty('hasFunMode')) {
            var i, length = games.length;
            for (i = 0; i < length; i += 1) {
                games[i].hasFunMode = CConfig.main.funModeEnabled && CConfig.main.providersThatHaveNotFunMode.indexOf(games[i].gameProvider) === -1 && CConfig.main.categoriesThatHaveNotFunMode.indexOf(games[i].gameCategory) === -1;
            }
        }

        return games;
    };

    /**
     * @ngdoc method
     * @name getCasinoPopUpGames
     * @methodOf CASINO.service:CasinoUtils
     * @description  returns an array of those games that can be played in multiviev mode
     *
     * @param {Array} allGames array of all games
     * @param {String} selectedCategory selected category name
     * @param {String} searchTerm term of input field
     * @param {Array} gamesInfo array of objects (object contains information about played casino game)
     * @returns {Array} games the array
     */
    CasinoUtils.getCasinoPopUpGames = function getCasinoPopUpGames(allGames, selectedCategory, searchTerm, gamesInfo) {
        var games = [];
        if (allGames && allGames.length) {
            var i, count = allGames.length;
            var usedProviders = [], game, isNardiOpened = false;
            for (i = 0; i < gamesInfo.length; i += 1) {
                game = gamesInfo[i].game;
                if (game && (game.gameProvider === 'MGS' || game.gameProvider === 'BSG' || game.gameProvider === 'GMG' || game.gameProvider === 'NET') && usedProviders.indexOf(game.gameProvider) === -1) {
                    usedProviders.push(game.gameProvider);
                }
                if (game && game.id == '599'){
                    isNardiOpened = true;
                }
            }
            var category;
            for (i = 0; i < count; i += 1) {
                category = allGames[i].gameCategory;
                if ((category === selectedCategory || (selectedCategory === 'CasinoGames' && category !== 'LiveDealer' && category !== 'SkillGames' && category !== 'VirtualBetting')) && (searchTerm === '' || allGames[i].gameName.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1)) {
                    if (selectedCategory !== 'CasinoGames' || !usedProviders.length || usedProviders.indexOf(allGames[i].gameProvider) === -1) {
                        if (!isNardiOpened || allGames[i].id != '599') {
                            games.push(allGames[i]);
                        }
                    }
                }
            }
        }

        return games;
    };

    /**
     * @ngdoc method
     * @name getMultiviewGames
     * @methodOf CASINO.service:CasinoUtils
     * @description  returns an array of those games that can be played in multiviev mode (remove mobile games, the games
     * that do not resizable, the games that do not have realPlay mode, financials game and fantasy sport.)
     *
     * @param {Array} allGames array of all games
     * @returns {Array} games the array
     */
    CasinoUtils.getMultiviewGames = function getMultiviewGames(allGames) {
        var i, count = allGames.length;
        for (i = 0; i < count; i += 1) {
            if (allGames[i].id !== '1291' && allGames[i].id !== '1541' && (allGames[i].isMobile === 'Y' || allGames[i].gameType.ratio === '0' || allGames[i].gameType.realPlay !== 1 || allGames[i].id === '706' || allGames[i].id === '1297')) {
                allGames.splice(i, 1);
                i--;
                count--;
            }
        }
        return allGames;
    };

    /**
     * @ngdoc method
     * @name toggleSaveToMyCasinoGames
     * @methodOf CASINO.service:CasinoUtils
     * @description send events for adds or removes(depending on if it's already there) game from 'my casino games'
     *
     * @param {Object} scope the rootScope
     * @param {Object} game Object
     */
    CasinoUtils.toggleSaveToMyCasinoGames = function toggleSaveToMyCasinoGames(scope, game) {
        var myCasinoGames = scope.myCasinoGames || [], i, j;
        for (i = 0, j = myCasinoGames.length; i < j; i += 1) {
            if (myCasinoGames[i].id === game.id) {
                scope.$broadcast('game.removeGameFromMyCasinoGames', game);
                break;
            }
        }
        if (j === myCasinoGames.length) {
            //game is not from myCasinoGames
            scope.$broadcast('game.addToMyCasinoGames', game);
        }
    };

    /**
     * @ngdoc method
     * @name refreshCasinoGame
     * @methodOf CASINO.service:CasinoUtils
     * @description find game by id in opened games and relaod it
     *
     * @param {Object} scope the scope
     * @param {Int} id gameInfo id
     */
    CasinoUtils.refreshCasinoGame = function refreshCasinoGame(scope, id) {
        var i , length = scope.gamesInfo.length;
        for (i = 0; i < length; i += 1) {
            if (scope.gamesInfo[i].id === id) {
                var mode = scope.gamesInfo[i].gameMode;
                var currentGame = scope.gamesInfo[i].game;
                var tableId = scope.gamesInfo[i].tableId;
                scope.gamesInfo[i] = {gameUrl: '', id: id, toAdd: true};
                scope.openGame(currentGame, mode, tableId);
                break;
            }
        }
    };

    /**
     * @ngdoc method
     * @name refreshOpenedGames
     * @methodOf CASINO.service:CasinoUtils
     * @description  if user logged in refresh open games that do not have mode "play for fun" and open in real mode, or
     *               if user logged out close games that opened in real mode
     *
     * @param {Object} scope the scope
     */
    CasinoUtils.refreshOpenedGames = function refreshOpenedGames(scope) {
        var i = 0, count = scope.gamesInfo.length;
        if ($rootScope.env.authorized) {
            for (; i < count; i += 1) {
                if (scope.gamesInfo[i].game && (scope.gamesInfo[i].game.gameID == CConfig.ogwil.gameID ||
                    scope.gamesInfo[i].game.gameCategory == CConfig.virtualBetting.categoryName ||
                    scope.gamesInfo[i].game.gameCategory == CConfig.liveCasino.categoryName ||
                    scope.gamesInfo[i].game.gameCategory == CConfig.skillGames.categoryName)) {
                    var infoId = scope.gamesInfo[i].id;
                    var currentGame = scope.gamesInfo[i].game;
                    var tableId = scope.gamesInfo[i].tableId;
                    scope.gamesInfo[i] = {gameUrl: '', id: infoId, toAdd: true};
                    scope.openGame(currentGame, 'real', tableId);
                }
            }
        } else {
            for (; i < count; i += 1) {
                if (scope.gamesInfo[i].gameUrl !== '' && scope.gamesInfo[i].gameMode === 'real') {
                    scope.closeGame($scope.gamesInfo[i].id);
                }
            }
        }
    };

    /**
     * @ngdoc method
     * @name openPopUpWindow
     * @methodOf CASINO.service:CasinoUtils
     * @description  finds game object, then calculates the possible sizes of the popup window and opens casino game in there
     *
     * @param {Array} gamesInfo the array of objects: object contains game and informations about the game
     * @param {String} id game id
     */
    CasinoUtils.openPopUpWindow = function openPopUpWindow(gamesInfo, id) {
        var gameInfo, scale, scaleWidth, scaleHeight;
        var percent = 0.85, windowWidth = 900, windowHeight = 900; // initial size of popUp
        var screenResolution = DomHelper.getScreenResolution();
        for (var i = 0, count = gamesInfo.length; i < count; i += 1) {
            if (gamesInfo[i].id === id) {
                gameInfo = gamesInfo[i];
                break;
            }
        }
        if (gameInfo.game.gameType.width && gameInfo.game.gameType.height) {
            scaleWidth = percent * screenResolution.x / gameInfo.game.gameType.width;
            scaleHeight = percent *  screenResolution.y / gameInfo.game.gameType.height;
            scale = Math.min(scaleWidth, scaleHeight);
            windowWidth = scale * gameInfo.game.gameType.width;
            windowHeight = scale * gameInfo.game.gameType.height;
        } else if (gameInfo.game.gameType.ratio) {
            var ratios =  gameInfo.game.gameType.ratio.split(':');
            var initialWidth = percent * screenResolution.y * ratios[0] / ratios[1];
            scaleWidth =percent *  screenResolution.x / initialWidth;
            scale = Math.min(scaleWidth, 1);
            windowWidth = scale * initialWidth;
            windowHeight = scale * screenResolution.y * percent;
        }
        var windowUrl = gameInfo.gameUrl;
        if (gameInfo.game.gameCategory === CConfig.liveCasino.categoryName) {
            windowUrl += '&popup=true';
        }
        $window.open(windowUrl, gameInfo.gameID, 'width=' + windowWidth + ',height=' + windowHeight + ',menubar=no,toolbar=no,location=no,scrollbars=no,resizable=yes');
    };

    /**
     * @ngdoc method
     * @name gpTransfer
     * @methodOf CASINO.service:CasinoUtils
     * @description find game by id in opened games and relaod it
     *
     * @param {String} category the category of request
     * @param {Object} transferModel object that contains some keys for request
     */
    CasinoUtils.gpTransfer = function gpTransfer(category, gpTransferModel) {
        gpTransferModel.transferInProgress = true;
        var request, method = 'transfer';
        switch (category) {
            case 'getBalance':
                request = {product: 'Gaminator'};
                method = 'get_balance';
                break;
            case 'fromCasino':
                request = {
                    'from_product': 'Casino',
                    'to_product': 'Gaminator',
                    'amount': gpTransferModel.fromCasinoAmount
                };
                break;
            case 'fromGaminator':
                request = {
                    'from_product': 'Gaminator',
                    'to_product': 'Casino',
                    'amount': gpTransferModel.fromGameAmount
                };
                break;
            default:
                break;
        };

        Zergling.get(request, method).then(function (response) {
            gpTransferModel.fromCasinoAmount = '';
            gpTransferModel.fromGameAmount = '';
            gpTransferModel.transferInProgress = false;
            gpTransferModel.messageType = (response.result !== undefined && response.result !== 0) ? 'error' : 'success';
            if (gpTransferModel.messageType === 'success') {
                if (method === 'transfer') {
                    gpTransferModel.gpAmount = response.details.balance;
                    updateCasinoBalance();
                } else {
                    gpTransferModel.gpAmount = response.balance;
                }
            };
        })['catch'](function (reason) {
            gpTransferModel.transferInProgress = false;
            gpTransferModel.messageType = 'error';
        });
    };

    function updateCasinoBalance() {
        Zergling.get({product: 'Casino'}, 'get_balance').then(function (response) {
            $rootScope.env.casinoBalance = response;
        });
    }

    /**
     * @ngdoc method
     * @name setupTableInfo
     * @methodOf CASINO.service:CasinoUtils
     * @description prepare url to open tables
     *
     * @param {Object} tableInfo object that contains url of tables
     */
    CasinoUtils.setupTableInfo = function setupTableInfo(tableInfo) {
        var urlPrefix = CConfig.cUrlPrefix + CConfig.cGamesUrl + '?gameid=VGS102&provider=VGS&table_id=-1&lan=' + $rootScope.env.lang + '&partnerid=' + CConfig.main.partnerID;
        if ($rootScope.env.authorized) {
            tableInfo.loadingUserData = true;
            Zergling.get({'game_id': 102}, 'casino_auth').then(function (response) {
                if (response && response.result) {
                    if (response.result.has_error == "False") {
                        var userInfo = '&token=' + response.result.token + '&username=' + response.result.username + '&currency=' + response.result.currency + '&userid=' + response.result.id + '&nickname=' + response.result.nickname + '&firstname=' + $rootScope.profile.first_name + '&lastname=' + $rootScope.profile.last_name;
                        tableInfo.url = $sce.trustAsResourceUrl(urlPrefix + userInfo + '&mode=real');
                        tableInfo.loadingUserData = false;
                    } else if (response.result.has_error == "True") {
                        tableInfo.loadingUserData = false;
                    }
                }
            }, function (failResponse) {
                tableInfo.loadingUserData = false;
            });
        } else {
            tableInfo.url = $sce.trustAsResourceUrl(urlPrefix + '&mode=fun');
        }
    };

    /**
     * @ngdoc method
     * @name adjustLiveCasinoGame
     * @methodOf CASINO.service:CasinoUtils
     * @description changes game and tableId in gameInfo or finds and opens game
     *
     * @param {Object} scope the scope
     * @param {Object} message object that contains game info
     * @param {Array} games array of games
     */

    CasinoUtils.adjustLiveCasinoGame = function adjustLiveCasinoGame(scope, message, games) {
        games = games || scope.allGames;
        var i, length, oldGame, newGame;

        for(i = 0, length = games.length; i < length; i += 1) {
            if (message.data.provider + message.data.gameId === games[i].gameID) {
                newGame = games[i];
            }
            if (message.data.provider + message.data.lastGameId === games[i].gameID) {
                oldGame = games[i];
            }
        }

        if (message.data.isMinnyLobby) {
            i = 0, length = scope.gamesInfo.length;
            if (oldGame) {
                for (; i < length; i += 1) {
                    if (scope.gamesInfo[i].game && scope.gamesInfo[i].game.id === oldGame.id) {
                        scope.gamesInfo[i].game = newGame;
                        scope.gamesInfo[i].tableId = message.data.tableId;
                        break;
                    }
                }
            } else {
                for (; i < length; i += 1) {
                    if (scope.gamesInfo[i].game && scope.gamesInfo[i].game.id === newGame.id) {
                        scope.gamesInfo[i].tableId = message.data.tableId;
                        break;
                    }
                }
            }
        } else {
            scope.openGame(newGame, undefined, message.data.tableId);
        }
    };

    return CasinoUtils;
}]);
