/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5, CMS */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            'eng': "BonanzaWin"
        },
        site_name: "BonanzaWin",
        casinoEnabled: false,
        pokerEnabled: false,
        showMyGamesInBetslip: true,
        facebookUrl: null,
        googlePlusUrl: null,
        twitterAccount: null,
        showFavoriteGamesInSportList: true,
        selectFavoritesByDefault: true, // will select favorites instead of 1st sport if there are favorite games
        twitterHashTag: 'BonanzaWin',
        skin: "bonanzawin.com",
        site_id: "23",
        integrationMode: true,
        videoEnabled: false,
        showPopularGames: true,
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
                              // ('@replace' property won't be present in result object)
            'eng' : { 'short': 'EN', 'full': "English"}
            //'rus' : { 'short': 'RU', 'full': "Русский"}
        },
        disableHeader: true,
        disableHeaderNavigation: true,
        disableFooter: true,
        enableNews: false,
        enableBannerUnderBetslip: true,
        hideBetslipBannerWhenBetslipIsNotEmpty: false,
        showPromotedGames: {
            betslipBanners: {
                game: 2,
                competition: 1
            }
        },
        betTypes: [
            {name: 'single', value: 1},
            {name: 'express', value: 2},
            {name: 'system', 'value': 3}
        ]
    },
    partner: {
        documentDomain: 'bonanzawin.com',  // both parent and iframe have to set  window.document.domain = documentDomain for cross-subdomain JS to work
        profileNotAvailable: true,
        notifyOnResize: true, //if enabled, will call partner's provided callback function on every resize, passing it the frame size
        balanceRefreshPeriod: 30000 //milliseconds, if 0 or null will be disabled
    },
    'env': {
        showFifaCountdown: false,
        defaultUpcomingPeriodIndex: 5
    },
    'betting': {
        enableExpressBonus: true
    },
    'swarm': {
        url: [{ url: "https://swarm.bonanzawin.com/"}],
        websocket: [{ url: "wss://swarm.bonanzawin.com/"}]
    },
    xDomainSlaves: '{"https://swarm.bonanzawin.com" : "/xdomain-proxy.html"}'

});

CMS.constant('SkinWPConfig', {
    wpUrl: 'http://sportsbook.bonanzawin.com/json',  // WordpResss instance serving pages, banners
    wpNewsUrl: {
        main: 'http://sportsbook.bonanzawin.com/newsjson'
    },  // WordpResss instance serving news
    wpBaseHost: 'sportsbook.bonanzawin.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host
    wpNewsBaseHost: 'www.vbet.com' // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

//Override default page
VBET5.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/', {redirectTo: '/sport/'});

}]);

CASINO.constant('SkinCConfig', {});