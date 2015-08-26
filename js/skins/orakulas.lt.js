/*
 *   All config values specified here will be merged with main config and will override its values
 *
 */
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "orakulas.lt",
            "rus": "orakulas.lt"
        },
        site_name: "orakulas.lt",
        site_id: "8",
        skin: 'orakulas.lt',
        showMyGamesInBetslip: true,
        integrationMode: true,
        casinoEnabled: false,
        pokerEnabled: false,
        liveDealerEnabled: false,
        financialsEnabled: false,
        skillgamesEnabled: false,
        redirectOnTablets: false,
        videoEnabled: true,
        availableVideoProviderIds: [16, 17],
        sportsClassicLayout: true,
        showFavoriteGamesInSportList: true,
        selectFavoritesByDefault: true, // will select favorites instead of 1st sport if there are favorite games
        useLadderForFractionalFormat: true,
        about_company_text: {
            'eng' : "(c) orakulas.lt",
            'rus' : "(c) orakulas.lt"
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
        availableCurrencies: ['EUR', 'GBP', 'USD'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: false, // enable news on sport page
        enableBannerUnderBetslip: false, // enable banner under the betslip,
        disableFooterNav: true, // disable wordpress content in footer,
        disableFooter: true,
        disableHomepageNews: true,
        disableHeader: true,
        disableHeaderNavigation: true,
        animationAndVideoOnLeft: true,
        roundDecimalCoefficients: true,
        copyrightSince: 2014,
        customSportsBook: {
            enabled: true,
            externalBetSLip: true,
            classic: {
                showPrematch: false,
                showLive: true,
                showMarkets: true,
                showBetSlip: false
            }
        }
    },
    partner: {
        documentDomain: true,  // both parent and iframe have to set  window.document.domain = documentDomain for cross-subdomain JS to work
        profileNotAvailable: true,
        balanceRefreshPeriod: 30000 //milliseconds, if 0 or null will be disabled
    },
    'env': {
        showFifaCountdown: false,
        oddFormat: 'fractional',
        authorized: true
    },
    betting: {
        storedBetslipLifetime: 1
    },
    'swarm': {
        url: [{ 'url': 'http://swarm2.betconstruct.com:8484/' }],
        websocket: [{url: "ws://swarm2.betconstruct.com:8484/", weight: 100}]
    },
    xDomainSlaves: '{"https://swarm.orakulas.lt:8085" : "/xdomain-proxy.html"}', //has to be JSON string

    'payments': [
    ]

});

VBET5.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/', {redirectTo: '/sport/'});

}]);

VBET5.run(['$rootScope', function ($rootScope) {
    $rootScope.profile = $rootScope.profile || {};
    $rootScope.profile.balance = 1;
}]);

CMS.constant('SkinWPConfig', {
    wpUrl: 'http://sportsbook.orakulas.lt/json', // WordpResss instance serving pages, banners
    wpBaseHost: 'http://sportsbook.orakulas.lt'  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
//    wpNewsUrl: 'http://www.sportsbook.finnplay.com/newsjson',  // WordpResss instance serving news
//    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {});
