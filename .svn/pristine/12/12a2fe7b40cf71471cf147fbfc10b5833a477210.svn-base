/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "parasino5.com",
            "rus": "parasino5.com"
        },
        site_name: "parasino5.com",
        site_id: "76",
        skin: 'parasino5.com',
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
            'eng' : "(c) parasino5.com",
            'tur' : "(c) parasino5.com",
            'rus' : "(c) parasino5.com"
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
            'tur' : { 'short': 'TR', 'full': "Türkçe"},
            'rus' : { 'short': 'RU', 'full': "Русский"}
        },
        timeZonePerLanguage: {
            'rus' : '+04:00',
            'tur' : '+03:00'
        },
        registration: {
            defaultCurrency: 'EUR',
            restrictedCountries: {}
        },
        liveChat: null,
        availableCurrencies: ['EUR', 'USD', 'GBP', 'TRY'],
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
        documentDomain: true,  // true means set top level domain as document.domain
        profileNotAvailable: true,
        balanceRefreshPeriod: 30000, //milliseconds, if 0 or null will be disabled
        notifyOnResize: true //if enabled, will call partner's provided callback function on every resize, passing it the frame size
    },
    'env': {
        showFifaCountdown: false
    },
    'swarm': {
        url: [{ url: "http://swarm.parasino5.com:8085/"}],
        websocket: [{ url: "ws://swarm.parasino5.com:8085/"}]
    },
    xDomainSlaves: '{"http://swarm.parasino5.com:8085" : "/xdomain-proxy.html"}', //has to be JSON string

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
