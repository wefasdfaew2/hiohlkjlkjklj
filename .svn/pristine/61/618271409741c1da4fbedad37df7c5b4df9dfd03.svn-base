/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "eeegaming.com",
            "rus": "eeegaming.com"
        },
        site_name: "eeegaming.com",
        site_id: "124",
        skin: 'eeegaming.com',
        showMyGamesInBetslip: true,
        integrationMode: true,
        casinoEnabled: false,
        pokerEnabled: false,
        liveDealerEnabled: false,
        financialsEnabled: false,
        skillgamesEnabled: false,
        redirectOnTablets: false,
        videoEnabled: false,
        showFavoriteGamesInSportList: true,
        selectFavoritesByDefault: true, // will select favorites instead of 1st sport if there are favorite games
        about_company_text: {
            'eng' : "(c) eeegaming.com",
            'rus' : "(c) eeegaming.com"
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
            'rus' : { 'short': 'RU', 'full': "Русский"}
        },
        timeZonePerLanguage: {
            'rus' : '+04:00',
            'tur' : '+03:00'
        },
        registration: {
            defaultCurrency: 'USD',
            restrictedCountries: {}
        },
        liveChat: null,
        availableCurrencies: ['USD'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: false, // enable news on sport page
        enableBannerUnderBetslip: false, // enable banner under the betslip,
        disableFooterNav: true, // disable wordpress content in footer,
        disableFooter: true,
        disableHomepageNews: true,
        disableHeader: true,
        disableHeaderNavigation: true,
        copyrightSince: 2014
    },
    partner: {
        documentDomain: true,  // both parent and iframe have to set  window.document.domain = documentDomain for cross-subdomain JS to work
        profileNotAvailable: true,
        balanceRefreshPeriod: 30000, //milliseconds, if 0 or null will be disabled
        enableSigninRegisterCallbacks: true
    },
    'env': {
        showFifaCountdown: false
    },
    'swarm': {
        url: [{ url: "http://swarm.viralcasino.net:8085/"}],
        websocket: [{ url: "ws://swarm.viralcasino.net:8085/"}]
    },
    xDomainSlaves: '{"http://swarm.viralcasino.net:8085" : "/xdomain-proxy.html"}', //has to be JSON string

    'payments': [
     ]

});

VBET5.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/', {redirectTo: '/sport/'});

}]);


CMS.constant('SkinWPConfig', {
//    wpUrl: 'http://www.sportsbook.finnplay.com/json',  // WordpResss instance serving pages, banners
//    wpBaseHost: 'www.sportsbook.finnplay.com.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
//    wpNewsUrl: 'http://www.sportsbook.finnplay.com/newsjson',  // WordpResss instance serving news
//    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {});
