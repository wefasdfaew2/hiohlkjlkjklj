/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "msl.ua",
            "rus": "msl.ua"
        },
        site_name: "msl.ua",
        site_id: "19",
        skin: 'msl.ua',
        casinoEnabled: false,
        pokerEnabled: false,
        liveDealerEnabled: false,
        financialsEnabled: false,
        skillgamesEnabled: false,
        showGameIds: true,
        redirectOnTablets: 'http://tablet.msl.ua/',
        videoEnabled: false,
        about_company_text: {
            'eng' : "(c) msl.ua",
            'rus' : "(c) msl.ua"
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
            'rus' : { 'short': 'RU', 'full': "Русский"}
        },
        registration: {
            defaultCurrency: 'USD',
            restrictedCountries: {}
        },
        liveChat: {
            siteId: 32814,
            codePlan: 357
        },
        availableCurrencies: ['EUR', 'USD'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        disableBetSlip: true,
        enableNews: false, // enable news on sport page
        enableBannerUnderBetslip: false, // enable banner under the betslip,
        disableHeaderNavigation: false, // hide header navbar,
        disableFooterNav: true, // disable wordpress content in footer,
//        disableFooter: true,
        disableHomepageNews: false,
        disableRegistrationAndLogin: true,
        copyrightSince: 2014
    },
    'env': {
        showFifaCountdown: false
    },
    'swarm': {
        url: [{ url: "http://swarm.betconstruct.com:8083/"}],
        websocket: [{ url: "ws://swarm.betconstruct.com:8083/"}]
    },
    xDomainSlaves: '{"http://swarm.betconstruct.com:8083" : "/xdomain-proxy.html"}', //has to be JSON string

    'payments': [
     ]

});

VBET5.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/', {redirectTo: '/sport/'});

}]);

CMS.constant('SkinWPConfig', {
//    wpUrl: 'http://www.msl.ua/json',  // WordpResss instance serving pages, banners
//    wpBaseHost: 'www.msl.ua',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
//    wpNewsUrl: 'http://www.msl.ua/newsjson',  // WordpResss instance serving news
//    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {});
