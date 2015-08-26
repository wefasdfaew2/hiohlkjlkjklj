/**
 * @ngdoc controller
 * @name CASINO.controller:specialGamesCtrl
 * @description
 * special games pages controller
 */

angular.module('casino').controller('specialGamesCtrl', ['$rootScope', '$scope', '$sce', '$location', '$timeout', '$window', '$q', 'Script', 'CConfig', 'Config', 'DomHelper', 'Translator', 'Zergling', 'AuthData', function ($rootScope, $scope, $sce, $location, $timeout, $window, $q, Script, CConfig, Config, DomHelper, Translator, Zergling, AuthData) {
    'use strict';
    var timezoneIsAvailable = $q.defer();
    function getUrl() {
        $scope.frameUrl = null;
        $scope.frameMode = null;
        var externalID,  gameUrl, prefix = CConfig.cUrlPrefix + CConfig.cGamesUrl + '?partnerid=' + CConfig.main.partnerID + '&gameid=';
        var pathContent = $location.path().split('/');
        switch (pathContent[1]) {
        case 'fantasy':
            if (CConfig.fantasySports.externalURL) {
                gameUrl = CConfig.fantasySports.externalURL + '?partnerid=' + CConfig.main.partnerID;
                if ($rootScope.env.authorized) {
                    var authData = AuthData.get();
                    gameUrl = gameUrl + '&sport_token=' + authData.auth_token + '&sport_userid=' + authData.user_id;
                }
            } else {
                gameUrl = prefix + CConfig.fantasySports.gameID + "&provider=" + CConfig.fantasySports.provider + '&gmtShift=' + Config.env.selectedTimeZone.split(':')[0] + '&lan=' + Config.env.lang;
            }
            externalID = CConfig.fantasySports.externalID;
            break;
        case 'ogwil':
            gameUrl = prefix + CConfig.ogwil.gameID + "&provider=" + CConfig.ogwil.provider + '&lan=' + Config.env.lang;
            externalID = CConfig.ogwil.externalID;
            break;
        case 'financials':
            gameUrl = prefix + CConfig.financials.gameID + "&provider=" + CConfig.financials.provider + '&lan=' + Config.env.lang;
            externalID = CConfig.financials.externalID;
            break;
        case 'game':
            gameUrl = prefix + pathContent[2] + "&provider=" + pathContent[4] + '&lan=' + Config.env.lang;
            externalID = pathContent[6];
            break;
        case 'belote':
            gameUrl = prefix + CConfig.belote.gameID + "&provider=" + CConfig.belote.provider + '&lan=' + Config.env.lang;
            externalID = CConfig.belote.externalID;
            $scope.initialFrameSize = CConfig.belote.initialSize;
            if (Config.belote.redirectOnGame) {
                $rootScope.footerMovable = true; // in this case the footer will hidden
            }
            break;
        case 'backgammon':
            gameUrl = prefix + CConfig.backgammon.gameID + "&provider=" + CConfig.backgammon.provider + '&lan=' + Config.env.lang;
            externalID = CConfig.backgammon.externalID;
            $scope.initialFrameSize = CConfig.backgammon.initialSize;
            if (Config.backgammon.redirectOnGame) {
                $rootScope.footerMovable = true; // in this case the footer will hidden
            }
            break;
        case 'poker':
            gameUrl = Config.poker.instantPlayLink;
            break;
        }
        if (gameUrl) {
            if ($rootScope.env.authorized && externalID && pathContent[1] !== 'poker') {
                $scope.frameMode = 'real';
                $scope.loadingUserData = true;
                Zergling.get({'game_id': parseInt(externalID)}, 'casino_auth').then(function (response) {
                    $scope.loadingUserData = false;
                    if (response && response.result) {
                        if (response.result.has_error == "False") {
                            var userInfo = '&token=' + response.result.token + '&username=' + response.result.username + '&currency=' + response.result.currency + '&userid=' + response.result.id + '&nickname=' + response.result.nickname + '&firstname=' + $rootScope.profile.first_name + '&lastname=' + $rootScope.profile.last_name;
                            $scope.frameUrl = $sce.trustAsResourceUrl(gameUrl + userInfo + '&mode=real');
                        } else if (response.result.has_error == "True") {
                            console.log('error occurred in user data');
                        }
                    }
                }, function (failResponse) {
                    $scope.loadingUserData = false;
                });
            } else {
                $scope.frameMode = 'fun';
                $timeout(function () {
                    $scope.frameUrl = $sce.trustAsResourceUrl(gameUrl + (pathContent[1] !== 'poker' ? '&mode=fun' : ''));
                }, 20);
            }
        }
    }

    function init() {
        var title;
        switch ($location.path().split('/')[1]) {
        case 'ogwil':
            title = Translator.get('OGWIL');
            break;
        case 'financials':
            title = Translator.get('Financials');
            break;
        case 'fantasy':
            title = Translator.get('Fantasy Sports');
            break;
        case 'game':
            title = Translator.get('Casino');
            break;
        }
        if (title) {
            $rootScope.setTitle(title);
        }

        $rootScope.footerMovable = true;

        if (Config.env.selectedTimeZone) {
            getUrl();
            timezoneIsAvailable.resolve(Config.env.selectedTimeZone);
        } else {
            var timeZonePromise = $rootScope.$watch('env.selectedTimeZone', function () {
                if ($rootScope.env.selectedTimeZone) {
                    timeZonePromise();
                    timezoneIsAvailable.resolve(Config.env.selectedTimeZone);
                    getUrl();
                }
            });
        }
    }

    $scope.$watch('env.authorized', function () {
        if ($scope.frameUrl) { getUrl(); }
    });

    $scope.loadExternalSportsbook = function loadExternalSportsbook() {
        console.log('loadScript');
        $window.betConstructCallbackHandler = function (params) {
            console.log('betConstructCallbackHandler', params);
        };
        var deepLink = "";
        if ($location.search().type !== undefined) {
            if ($location.search().game !== undefined) {
                deepLink = "&deeplink=" + ($location.search().type == "1" ? "live/" : "line/game/") + $location.search().game;
                console.log("deepLink: ", deepLink, $location.search().type);
            } else if ($location.search().type) {
                deepLink = "&page=" + ($location.search().type ? 'live' : 'prematch');
            }
        }
        timezoneIsAvailable.promise.then(function (tz) {
            var url = Config.main.liveModule.url +
                '/partner_api/initHtmlWidget.js.php?containerID=BetConstructObject&lang=' +
                ($scope.liveModuleLangMapping[Config.env.lang] || 'eng') +
                '&callbackName=betConstructCallbackHandler&AuthToken=anonymous&widget=widget_embed&skinName=' +
                Config.main.liveModule.skin +
                deepLink +
                '&gmt=' + tz.split(':')[0] + '&beforeInit=getZergling';

            Script('https://code.jquery.com/jquery-1.11.2.min.js', function () {
                console.log('loading sportsbook script', url);
                $scope.sportsbookLoading = false;
                Script(url);
            });
        });
    };

    $scope.liveModuleLangMapping = {
        "rus": 'rus',
        "eng": 'eng',
        "lit": 'lit',
        "geo": 'geo',
        "chi": 'chn',
        "tur": 'tur',
        "fre": 'fra',
        "spa": 'spa',
        "srp": 'srp',
        "est": 'est',
        "lav": 'lav',
        "mne": 'mne',
        "kor": 'kor',
        "ger": 'ger'
    };

    /*
     * calculates the possible sizes of the popup window and opens game in there
     */
    function popUpGame() {
        var scale, scaleWidth, scaleHeight;
        var percent = 0.85, windowWidth = 900, windowHeight = 900; // initial size of popUp
        var screenResolution = DomHelper.getScreenResolution();

        if ($scope.initialFrameSize) {
            scaleWidth = percent * screenResolution.x / $scope.initialFrameSize.width;
            scaleHeight = percent * screenResolution.y / $scope.initialFrameSize.height;
            scale = Math.min(scaleWidth, scaleHeight);
            windowWidth = scale * $scope.initialFrameSize.width;
            windowHeight = scale * $scope.initialFrameSize.height;
        }
        $window.open($scope.frameUrl, '', 'width=' + windowWidth + ',height=' + windowHeight + ',menubar=no,toolbar=no,location=no,scrollbars=no,resizable=yes');
    }

    /**
     * @ngdoc method
     * @name frameControll
     * @methodOf CASINO.controller:specialGamesCtrl
     * @description depends on action, opened game refreshed or opened it in popup window
     * @param {String} action 'refresh' or 'popup'
     */
    $scope.frameControll = function frameControll(action) {
        if (action === 'refresh') {
            getUrl();
        } else if (action === 'popup') {
            popUpGame();
        }
    };

    init();

    $rootScope.$on('profile', function () {
        $window.postMessage({userData: AuthData.get()}, "*");
    });

    $scope.$on("$destroy", function () {
        $scope.frameUrl = null;
    });
}]);
