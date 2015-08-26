/**
 * @ngdoc service
 * @name CASINO.service:casinodata
 * @description
 * provides methods for getting content from casino server
 */
CASINO.service('casinodata', ['CConfig', '$http', function (CConfig, $http) {
    'use strict';

    // maybe it's not a good idea keeping this in $http, but it's needed in $http.post
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";

    var casinodata = {};

    //var lang = $rootScope.env.lang;

    /**
     * @ngdoc method
     * @name getAllGames
     * @methodOf CASINO.service:casinodata
     * @description returns promise which will be resolved  with list of all games
     *
     * @param {string} partnerID. id of partner to get all games
     * @returns {Object} promise
     */
    casinodata.getAllGames = function getAllGames(partnerID) {
        return $http.post(CConfig.cUrlPrefix + CConfig.cUrl, {action: 'allgames', partnerID: partnerID});
    };

    /**
     * @ngdoc method
     * @name getAction
     * @methodOf CASINO.service:casinodata
     * @description returns promise which will be resolved  with list of current action
     *
     * @param {string} action. action
     * @param {string} partnerID. id of partner to get categories
     * @returns {Object} promise
     */
    casinodata.getAction = function getAction(action, partnerID) {
        return $http.post(CConfig.cUrlPrefix + CConfig.cUrl, {action: action, partnerID: partnerID});
    };

    /**
     * @ngdoc method
     * @name getCategory
     * @methodOf CASINO.service:casinodata
     * @description returns promise which will be resolved with Category containing games
     *
     * @param {string} partnerID. id of partner to get category
     * @param {string} categoryId. id of Category to get category games
     * @returns {Object} promise
     */
    casinodata.getCategory = function getCategory(categoryId, partnerID) {
        return $http.post(CConfig.cUrlPrefix + CConfig.cUrl, {
            action: 'bycat',
            param: categoryId,
            partnerID: partnerID
        });
    };

    /**
     * @ngdoc method
     * @name getSearchResult
     * @methodOf CASINO.service:casinodata
     * @description returns promise which will be resolved  with the list of researching game results
     *
     * @param {string} searchCommand search term
     * @param {string} partnerID. id of partner
     * @returns {Object} promise
     */
    casinodata.getSearchResult = function getSearchResult(searchCommand, partnerID) {
        return $http.post(CConfig.cUrlPrefix + CConfig.cUrl, {
            action: 'searchGame',
            searchQ: searchCommand,
            partnerID: partnerID
        });
    };

    /**
     * @ngdoc method
     * @name getFilterOptions
     * @methodOf CASINO.service:casinodata
     * @description returns promise which will be resolved  with the list of all games and filtering options
     *
     * @returns {Object} promise
     */
    casinodata.getFilterOptions = function getFilterOptions() {
        return $http.post(CConfig.cUrlPrefix + CConfig.cUrl, {action: 'getGamesJson'});
    };

    /**
     * @ngdoc method
     * @name getJackpotLeadersList
     * @methodOf CASINO.service:casinodata
     * @description returns promise which will be resolved  with the list of leaders
     *
     * @param {string} partnerID. id of partner
     * @returns {Object} promise
     */
    casinodata.getJackpotLeadersList = function getJackpotLeadersList(partnerID) {
        return $http.post(CConfig.cUrlPrefix + CConfig.jackpot.url, {partnerID: partnerID});
    };

    return casinodata;
}]);