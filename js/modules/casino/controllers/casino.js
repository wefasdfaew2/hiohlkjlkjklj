/**
 * @ngdoc controller
 * @name CASINO.controller:casinoCtrl
 * @description
 * casino page controller
 */

CASINO.controller('casinoCtrl', ['$rootScope', '$scope', '$sce', '$location', '$timeout', '$filter', 'CConfig', 'Zergling', 'casinodata', 'Utils', 'CasinoUtils', 'Translator', 'CasinoCache', 'analytics', function ($rootScope, $scope, $sce, $location, $timeout, $filter, CConfig, Zergling, casinodata,  Utils, CasinoUtils, Translator, CasinoCache, analytics) {
    'use strict';

    $scope.mainCategories = null;
    $scope.moreCategories = null;
    $scope.selectedCategoryGames = [];
    $scope.slideIndex = 0;
    $scope.gamesInfo = [];
    $scope.viewCount = 1;
    $scope.selectedProvider = '';
    $scope.cConf = {
        iconsUrl: CConfig.cUrlPrefix + CConfig.iconsUrl,
        backGroundUrl: CConfig.cUrlPrefix + CConfig.backGroundUrl,
        gpTransferEnabled: CConfig.main.gaminatorTransferEnabled,
    };

    function groupPopularsToGroups(popularGames, popularsPerGroup) {
        var i, g, j, groups = [];
        for (i = 0, g = 0, j = popularGames.length; i < j; i += 1) {
            if (groups[g] === undefined) {
                groups[g] = [];
            }
            groups[g].push(popularGames[i]);
            if (groups[g].length === popularsPerGroup) {
                g++;
            }
        }
        return groups;
    }

    function createCategoriesMoreDropdown() {
        if ($scope.categories && $scope.categories.length) {
            $scope.mainCategories = $scope.categories.length > $scope.numberOfMainCategories ? $scope.categories.slice(0, $scope.numberOfMainCategories) : $scope.categories;
            $scope.moreCategories = Utils.getPartToShowInColumns($scope.categories, $scope.numberOfMainCategories, CConfig.main.moreColumnNumber, 'categoryName');
            //$scope.moreCategories = Utils.getAdditionalItems($scope.categories, $scope.numberOfMainCategories, 'categoryName', 'category');
        }
    }

    function createPopularsPerGroups() {
        if ($scope.popularGames && $scope.popularGames.length) {
            var numberOfGroups = $scope.wideMode ? 7: 4;
            $scope.popularsPerGroups = groupPopularsToGroups($filter('filter')($scope.popularGames, {'providerFilter': $scope.selectedProvider}), numberOfGroups);
            $scope.slideIndex = 0;
        }
    }

    //Watch categories list and (re)generate the "more" dropdown block as they change
    $scope.$watch('categories', createCategoriesMoreDropdown);

    //Watch popularGames list and (re)generate the  popularsPerGroups as the change
    $scope.$watch('popularGames', createPopularsPerGroups);

    $scope.$on('widescreen.on', function () {
        $scope.numberOfMainCategories = CConfig.main.maxVisibleCategoriesWide;
        $scope.numberOfRecentGames = CConfig.main.numberOfRecentGamesWide;
        $scope.wideMode = true;
        createCategoriesMoreDropdown();
        createPopularsPerGroups();
    });

    $scope.$on('widescreen.off', function () {
        $scope.numberOfMainCategories = CConfig.main.maxVisibleCategories;
        $scope.numberOfRecentGames = CConfig.main.numberOfRecentGames;
        $scope.wideMode = false;
        createCategoriesMoreDropdown();
        createPopularsPerGroups();
        //checkViewDetails();
    });

    $scope.$on('middlescreen.on', function () { $scope.middleMode = true; });
    $scope.$on('middlescreen.off', function () { $scope.middleMode = false; });

    /**
     * @ngdoc method
     * @name loadAllGames
     * @methodOf CASINO.controller:casinoCtrl
     * @description loads populars and top slot games lists using {@link CASINO.service:casinodata casinodata} service's **getCategory** method
     */
    function loadHomePageGames() {
        if ($scope.selectedCategory.category === 'AllGames') {
            var allGamesData = CasinoCache.get('AllGames' + CConfig.main.partnerID);
            if (allGamesData !== undefined) {
                prepareFeaturedGames(allGamesData);
            } else {
                casinodata.getFilterOptions().then(function (response) {
                    if (response.data) {
                        var allHPGames = CasinoUtils.filterByGameProvider(Utils.objectToArray(response.data.games), CConfig.main.filterByProvider);
                        var actualCasinoGames = removeNonCasinoGames(allHPGames);
                        var preparedGames = CasinoUtils.setGamesFunMode(actualCasinoGames);
                        CasinoCache.put('AllGames' + CConfig.main.partnerID, preparedGames);
                        prepareFeaturedGames(preparedGames);
                    }
                });
            }
        } else {
            var popularGamesData = CasinoCache.get(CConfig.main.popularGamesID + CConfig.main.partnerID);
            if (popularGamesData !== undefined) {
                preparePopularGames(popularGamesData);
            } else {
                casinodata.getCategory(CConfig.main.popularGamesID, CConfig.main.partnerID).then(function (response) {
                    var populars = CasinoUtils.filterByGameProvider(response.data, CConfig.main.filterByProvider);
                    var preparedPopulars = CasinoUtils.setGamesFunMode(populars);
                    CasinoCache.put(CConfig.main.popularGamesID + CConfig.main.partnerID, preparedPopulars);
                    preparePopularGames(preparedPopulars);
                });
            }

            var topSlotsData = CasinoCache.get(CConfig.main.topSlotsID + CConfig.main.partnerID);
            if (topSlotsData !== undefined) {
                prepareFeaturedGames(topSlotsData);
            } else {
                casinodata.getCategory(CConfig.main.topSlotsID, CConfig.main.partnerID).then(function (response) {
                    var topSlots = CasinoUtils.filterByGameProvider(response.data, CConfig.main.filterByProvider);
                    var preparedTopSlots = CasinoUtils.setGamesFunMode(topSlots);
                    CasinoCache.put(CConfig.main.topSlotsID + CConfig.main.partnerID, preparedTopSlots);
                    prepareFeaturedGames(preparedTopSlots);
                });
            }
        }
    };

    function removeNonCasinoGames(games) {
        var i, j = games.length;
        for (i = 0; i < j; i += 1) {
            if (games[i].gameCategory === CConfig.skillGames.categoryName || games[i].gameCategory === CConfig.liveCasino.categoryName || games[i].isMobile === 'Y') {
                games.splice(i--, 1);
                j--;
            }
        }
        return games;
    }

    function preparePopularGames(games) {
        if (!$rootScope.conf.ogwilEnabled) {  // remove ogwil game if it's in popular games and it's disabled from config
            for (var i = 0, length = games.length; i < length; i += 1) {
                if (games[i].id === '1314') {
                    games.splice(i, 1);
                    break;
                }
            }
        }

        $scope.popularGames = games;
        findAndOpenGame(games);
    };

    /**
    * @name findAndOpenGame
    * @param games games array
    * @description get gameId from $location, find game in games and open it
    */
    function findAndOpenGame(games) {
        var searchParams = $location.search();

        if (searchParams.game !== undefined) {
            var game, gameID = parseInt(searchParams.game, 10);

            for (var i = 0, count = games.length; i < count; i += 1) {
                if (games[i].id == gameID) {
                    game = games[i];
                    break;
                }
            }

            if (game !== undefined) {
                var gameType;
                if (searchParams.type !== undefined) {
                    var typeOfGame = searchParams.type;
                    switch (typeOfGame) {
                        case "demo":
                        case "fun":
                            gameType = $rootScope.env.authorized && $scope.selectedCategory.id == '35' ? "real" : "fun";
                            $scope.openGame(game, gameType);
                            break;
                        case "real":
                            if ($rootScope.env.authorized) {
                                $scope.openGame(game, "real");
                            } else {
                                var gameInfo = {};
                                gameInfo.gameID = game.gameID;
                                if (game.gameType && typeof  game.gameType == 'string') {
                                    game.gameType = JSON.parse(game.gameType);
                                }
                                gameInfo.game = game;
                                $rootScope.casinoGameOpened = 1;
                                $scope.gamesInfo.push(gameInfo);
                                var casinoLoginTimer;
                                var casinoLoggedIn = $scope.$on('login.loggedIn', function () {
                                    casinoLoggedIn();

                                    $timeout.cancel(casinoLoginTimer);
                                    if (gameInfo && gameInfo.gameID == game.gameID) {
                                        $scope.openGame(game, "real");
                                    }
                                });
                                casinoLoginTimer = $timeout(function() {
                                    casinoLoggedIn();
                                    if (gameInfo && gameInfo.gameID == game.gameID) {
                                        if (!$rootScope.env.authorized) {
                                            $scope.closeGame();
                                            $rootScope.$broadcast("openLoginForm");
                                        } else {
                                            $scope.openGame(game, "real");
                                        }
                                    }
                                }, 4000);
                            }
                            break;
                        default:
                            gameType = $rootScope.env.authorized ? 'real' : 'fun';
                            $scope.openGame(game, gameType);
                    }
                } else {
                    gameType = $rootScope.env.authorized ? 'real' : 'fun';
                    $scope.openGame(game, gameType);
                }
            }
        }
    };

    /**
     * @ngdoc method
     * @name loadCategories
     * @methodOf CASINO.controller:casinoCtrl
     * @description loads categories list using {@link CASINO.service:casinodata casinodata} service's **getAction** method
     */
    $scope.loadCategories = function loadCategories() {
        if(CConfig.main.multiViewEnabled || CConfig.main.filterByProviderEnabled) {
            loadAllGamesAndFilterOptions();
        }
        var data = CasinoCache.get('categories' + CConfig.main.partnerID);
        if (data !== undefined) {
            prepareCategories(data);
            return;
        }

        casinodata.getAction('getCategories', CConfig.main.partnerID).then(function (response) {
            if (response.data) {
                var result = response.data;
                var i, j, cLength = result.length;
                var filterByCategoryOptions = CConfig.main.filterByCategory.concat([CConfig.skillGames.categoryName, CConfig.liveCasino.categoryName]);
                var fLength = filterByCategoryOptions.length;

                for (i = 0; i < fLength; i += 1) {
                    for (j = 0; j < cLength; j += 1) {
                        if (result[j].category === filterByCategoryOptions[i]) {
                            result.splice(j--, 1);
                            cLength--;
                        }
                    }
                }

                var categories = sortCategories(result);
                var numberOfHPCategories = 0;
                // maybe it's not a good idea, but it's needed for translate categoryNames
                for (i = 0, j = categories.length; i < j; i += 1) {
                    categories[i].categoryName = Translator.get(categories[i].categoryName);
                    if (categories[i].category == CConfig.main.topSlotsID || categories[i].category == CConfig.main.popularGamesID) {
                        numberOfHPCategories++;
                    }
                }
                if (CConfig.main.showAllGamesOnHomepage) {
                    categories.unshift({
                        id: undefined,
                        category: 'AllGames',
                        categoryName: Translator.get('All games')
                    });
                } else if (numberOfHPCategories === 2) {
                    categories.unshift({id: undefined, categoryName: Translator.get('Home')});
                }

                CasinoCache.put('categories' + CConfig.main.partnerID, categories);
                prepareCategories(categories);
            }
        });
    };

    function prepareCategories(categories) {
        $scope.categories = categories;
        var category, i, j, categoryID;
        var searchParams = $location.search();

        if (searchParams.category !== undefined) {
            categoryID = parseInt(searchParams.category, 10);
            for (i = 0, j = categories.length; i < j; i += 1) {
                if (categories[i].id == categoryID) {
                    category = categories[i];
                }
            }
        }
        category = category || categories[0];
        if (searchParams.provider !== undefined) {
            if (CConfig.main.filterByProviderEnabled) {
                $scope.selectedProvider = searchParams.provider === 'all' ? '' : searchParams.provider;
            } else {
                $location.search('provider', undefined);
            }
        }

        $scope.selectCategory(category);
    };

    function sortCategories(categories) {
        var result = [];
        var sorting = CConfig.main.categories;
        var i, catCount = categories.length;
        var j, sortCount = sorting.length;

        for (i = 0; i < sortCount; i++) {
            for (j = 0; j < catCount; j++) {
                if (sorting[i] == categories[j].id) {
                    result.push(categories.splice(j,1)[0]);
                    catCount--;
                    break;
                }
            }
        }

        result = result.concat(categories);

        return result;
    };

    /**
     * @ngdoc method
     * @name loadAllGamesAndFilterOptions
     * @methodOf CASINO.controller:casinoCtrl
     * @description  loads all games and filter options list using {@link CASINO.service:casinodata casinodata} service's **getFilterOptions** method
     */
    function loadAllGamesAndFilterOptions() {
        $scope.agSelectedCategory = 'CasinoGames';
        $scope.popUpSearchInput = '';
        var isDataSaved = true;
        if (CConfig.main.filterByProviderEnabled) {
            var filterData = CasinoCache.get('filterOptions' + CConfig.main.partnerID);
            if (filterData !== undefined) {
                $scope.filterOptions = filterData;
            } else {
                isDataSaved = false;
            }
        }
        if (CConfig.main.multiViewEnabled) {
            var gamesData = CasinoCache.get('allGames' + CConfig.main.partnerID);
            if (gamesData !== undefined) {
                $scope.allGames = CasinoCache.get('allGames' + CConfig.main.partnerID);
            } else {
                isDataSaved = false;
            }
        }
        if (!isDataSaved) {
            casinodata.getFilterOptions().then(function (response) {
                if (response.data) {
                    if (CConfig.main.filterByProviderEnabled) {
                        $scope.filterOptions = Utils.objectToArray(response.data.providers).length > 1 ? response.data.providers : null;

                        //maybe it's not a good idea, but  it's needed for hide unavailable providers from providers filter
                        if ($scope.filterOptions !== null && CConfig.main.filterByProvider.length !== 0) {
                            var unavailableProviders = CConfig.main.filterByProvider;
                            for (var i = 0; i < unavailableProviders.length; i += 1) {
                                if ($scope.filterOptions[unavailableProviders[i]]) {
                                    $scope.filterOptions[unavailableProviders[i]] = null;
                                }
                            }
                        }

                        CasinoCache.put('filterOptions' + CConfig.main.partnerID, $scope.filterOptions);
                    }
                    if (CConfig.main.multiViewEnabled) {
                        var multiViewGames = CasinoUtils.getMultiviewGames(Utils.objectToArray(response.data.games));
                        var filteredMultiViewGames = CasinoUtils.filterByGameProvider(multiViewGames, CConfig.main.filterByProvider);
                        $scope.allGames = CasinoUtils.setGamesFunMode(filteredMultiViewGames);
                        CasinoCache.put('allGames' + CConfig.main.partnerID, $scope.allGames);
                    }
                }
            });
        }
    };

    /**
     * @ngdoc method
     * @name selectCategory
     * @methodOf CASINO.controller:casinoCtrl
     * @description  select category to show category games
     */
    $scope.selectCategory = function selectCategory(category) {
        // if ($scope.selectedCategory && $scope.selectedCategory.id == category.id) {
        //     return;
        // }
        $scope.selectedCategoryAllGames = [];
        $scope.selectedCategoryGames = [];
        $scope.numberOfRecentGames = $scope.wideMode ? CConfig.main.numberOfRecentGamesWide : CConfig.main.numberOfRecentGames;
        $scope.selectedCategory = category;

        $location.search('category', category.id);

        if (category.id === undefined) {
            loadHomePageGames();
        } else {
            var data = CasinoCache.get(category.category + CConfig.main.partnerID);
            if(data !== undefined) {
                prepareFeaturedGames(data);
            } else {
                casinodata.getCategory(category.category, CConfig.main.partnerID).then(function (response) {
                    var responsedGames = CasinoUtils.filterByGameProvider(response.data, CConfig.main.filterByProvider);
                    var preparedGames = CasinoUtils.setGamesFunMode(responsedGames);
                    CasinoCache.put(category.category + CConfig.main.partnerID, preparedGames);
                    prepareFeaturedGames(preparedGames);
                });
            }
        }
    };

    function prepareFeaturedGames(games) {
        $scope.selectedCategoryAllGames =  games;
        findAndOpenGame(games);
        fiterFeaturedGames();
    }

    function fiterFeaturedGames() {
        if ($scope.selectedCategoryAllGames) {
            var currentProvider = $scope.selectedProvider == '' ? 'all' : $scope.selectedProvider;
            $location.search('provider', currentProvider);
            $scope.selectedCategoryGames = $filter('filter')($scope.selectedCategoryAllGames, {'providerFilter': $scope.selectedProvider});
        }
    }

    /**
     * @ngdoc method
     * @name setJustForMoment
     * @methodOf CASINO.controller:casinoCtrl
     * @description exposes {@link vbet5.service:Utils#setJustForMoment Utils.setJustForMoment} method to casinoCtrl's $scope
     *
     * @param {string} name scope variable name
     * @param {mixed} value value to set
     * @param {number} [time] optional. time in milliseconds
     */
    $scope.setJustForMoment = function setJustForMoment(name, value, time) {
        Utils.setJustForMoment($scope, name, value, time);
    };

    /**
     * @ngdoc method
     * @name loadMoreGames
     * @methodOf CASINO.controller:casinoCtrl
     * @description  Increases number of recent games to show by 8 and loads them
     */
    $scope.loadMoreGames = function loadMoreGames() {
        $scope.numberOfRecentGames += $scope.wideMode ? CConfig.main.increaseByWide : CConfig.main.increaseBy;
    };

    /**
     * @ngdoc method
     * @name slideToLeft
     * @methodOf CASINO.controller:casinoCtrl
     * @description  Decreases index of popular games slider to show previous 4 games
     */
    $scope.slideToLeft = function slideToLeft() {
        $scope.slideIndex--;
    };

    /**
     * @ngdoc method
     * @name slideToRight
     * @methodOf CASINO.controller:casinoCtrl
     * @description  Increases index of popular games slider to show next 4 games
     */
    $scope.slideToRight = function slideToRight() {
        $scope.slideIndex++;
    };

    /**
     * @ngdoc method
     * @name openGameInNewWindow
     * @methodOf CASINO.controller:casinoCtrl
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
     * @name openGame
     * @methodOf CASINO.controller:casinoCtrl
     * @param {Object} game game object
     * @param {String} gameType gameType string
     * @description  opens login form if it needed, or generates casino game url and opens it
     */
    $scope.openGame = function openGame(game, gameType, tableId) {
        $scope.showAllGames = false;
        $rootScope.env.showSlider = false;
        $rootScope.env.sliderContent = '';

        if (gameType === undefined) {
            gameType = $rootScope.env.authorized || !CConfig.main.funModeEnabled ? 'real' : 'fun';
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
        var tableInfo = tableId !== undefined ? "&table_id=" + tableId : "";
        gameInfo.tableId = tableId;
        var gameUrl;

        //the url of game doesn't come from backend is correct
        //if (game.gameInfo && game.gameInfo.targetOpenLink && game.gameInfo.targetOpenLink !== "") {
        //    if(game.gameInfo.targetOpenLink.indexOf('http') === -1) {
        //        game.gameInfo.targetOpenLink = CConfig.cUrlPrefix + game.gameInfo.targetOpenLink;
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

            if (gameType == "fun" && game.gameCategory == 'VirtualBetting') {
                gameType = "demo";
            }
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
                        gameInfo.loadingUserData = false;
                        var userInfo = '&token=' + response.result.token + '&username=' + response.result.username + '&currency=' + response.result.currency + '&userid=' + response.result.id + '&nickname=' + response.result.nickname + '&firstname=' + $rootScope.profile.first_name + '&lastname=' + $rootScope.profile.last_name;
                        gameInfo.gameUrl = $sce.trustAsResourceUrl(gameUrl + userInfo);
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
     * @methodOf CASINO.controller:casinoCtrl
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

    };

    /**
     * @ngdoc method
     * @name isFromSaved
     * @methodOf CASINO.controller:casinoCtrl
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
     * @methodOf CASINO.controller:casinoCtrl
     * @description send events for adds or removes(depending on if it's already there) game from 'my casino games'
     * @param {Object} game Object
     */
    $scope.toggleSaveToMyCasinoGames = function toggleSaveToMyCasinoGames(game) {
        CasinoUtils.toggleSaveToMyCasinoGames($rootScope, game);
    };

    function openCasinoGame(event, game, gameType) {
        if ($scope.viewCount === 1) {
            if ($scope.gamesInfo.length === 1) {
                $scope.closeGame();
            }
            $scope.openGame(game, gameType);
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

    $scope.$on("casino.openGame", openCasinoGame);

    /**
     *  get categoryID from $location, find category in categories and select it
     */
    $scope.$on('openCasinoBannerLink', function () {
        var searchParams = $location.search();

        if (searchParams.provider !== undefined) {
            if (CConfig.main.filterByProviderEnabled) {
                $scope.selectedProvider = searchParams.provider === 'all' ? '' : searchParams.provider;
            } else {
                $location.search('provider', undefined);
            }
        }
        if (searchParams.category !== undefined) {
            var categoryID = parseInt(searchParams.category, 10);

            for (var i = 0, j = $scope.categories.length; i < j; i += 1) {
                if ($scope.categories[i].id == categoryID) {
                    $scope.selectCategory($scope.categories[i]);
                    return;
                }
            }
        }

        $scope.selectCategory({id: undefined});
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

    $scope.$watch('env.authorized', function () {
        if ($scope.gamesInfo && $scope.gamesInfo.length) {
            CasinoUtils.refreshOpenedGames($scope);
        }
    });

    $scope.$on('casino.selectVirtualBetting', function () {
        var category = {id: CConfig.virtualBetting.categoryId, category: CConfig.virtualBetting.categoryName};
        $scope.selectCategory(category);
        $scope.selectedProvider = '';
    });

    $scope.$watch('selectedProvider', function () {
        createPopularsPerGroups();
        fiterFeaturedGames();
    });

    /**
     * @ngdoc method
     * @name changeView
     * @methodOf CASINO.controller:casinoCtrl
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
     * @methodOf CASINO.controller:casinoCtrl
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
        $scope.agSelectedCategory = 'CasinoGames';
        $scope.popUpGames = CasinoUtils.getCasinoPopUpGames($scope.allGames, $scope.agSelectedCategory, $scope.popUpSearchInput, $scope.gamesInfo);
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
     * @methodOf CASINO.controller:casinoCtrl
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
     * @methodOf CASINO.controller:casinoCtrl
     * @description find game by id in opened games and relaod it
     *
     * @param {String} category the category of request
     */
    $scope.gaminatorTransfer = function gaminatorTransfer(category) {
        CasinoUtils.gpTransfer(category, $scope.gpTransferModel);
    };

    /**
     * for live casino in multiple view mode: listen to messages from other windows to change livedealer options when needed
     */
    $scope.$on('livedealer.redirectGame', function (event, message) {
        CasinoUtils.adjustLiveCasinoGame($scope, message);
    });
}]);