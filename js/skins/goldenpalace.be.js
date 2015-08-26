/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "goldenpalace.be",
            "rus": "goldenpalace.be"
        },
        site_name: "goldenpalace.be",
        site_id: "5",
        skin: 'goldenpalace.be',
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
        showSearchInsideSportsbook: true, // will show search box inside sportsbook, under regions (needed for skins without menu)
        about_company_text: {
            'eng' : "(c) goldenpalace.be",
            'dut' : "(c) goldenpalace.be",
            'rus' : "(c) goldenpalace.be"
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
            'rus' : { 'short': 'RU', 'full': "Русский"},
            'dut' : { 'short': 'NL', 'full': "Nederlands"}
        },
        timeZonePerLanguage: {
            'rus' : '+04:00',
            'tur' : '+03:00'
        },
        registration: {
            defaultCurrency: 'TRY',
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
        copyrightSince: 2014
    },
    partner: {
        documentDomain: 'goldenpalace.be',  // both parent and iframe have to set  window.document.domain = documentDomain for cross-subdomain JS to work
        profileNotAvailable: true,
        balanceRefreshPeriod: 30000 //milliseconds, if 0 or null will be disabled
    },
    'env': {
        showFifaCountdown: false
    },
    'swarm': {
        url: [{ url: "https://swarm.goldenpalace.be:8087/"}],
        websocket: [{ url: "wss://swarm.goldenpalace.be:8087/"}]
    },
    xDomainSlaves: '{"https://swarm.goldenpalace.be:8087" : "/xdomain-proxy.html"}', //has to be JSON string

    'payments': [
    ]

});

VBET5.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/', {redirectTo: '/sport/'});

}]);


CMS.constant('SkinWPConfig', {
//    wpUrl: 'http://www.goldenpalace.be/json',  // WordpResss instance serving pages, banners
//    wpBaseHost: 'www.goldenpalace.be',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
//    wpNewsUrl: 'http://www.goldenpalace.be/newsjson',  // WordpResss instance serving news
//    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {});
