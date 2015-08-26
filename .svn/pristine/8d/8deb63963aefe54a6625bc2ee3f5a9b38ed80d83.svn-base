/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "Megabet - Sport betting",
            "rus": "Букмекерская контора Megabet - Онлайн ставки",
            "arm": "Megabet բուքմեյքերական ընկերություն - Օնլայն խաղադրույքներ"
        },
        site_name: "Megabet",
        skin: 'megabet.am',
        googleAnalyticsId: false,
        yandexMetricaId: false,
        casinoEnabled: false,
        pokerEnabled: false,
        liveDealerEnabled: false,
        financialsEnabled: false,
        skillgamesEnabled: false, //enable skill Games,
        poolBettingEnabled: false, //enable pool betting
        enableNews: false,
        enableBannerUnderBetslip: false,
        redirectOnTablets: false,
        poolBettingResultsUrlPrefix : 'http://inplay.megabet.am/sites/default/public/toto/results/',
        about_company_text: {
            'eng' : "",
            'rus' : "",
            'arm' : ""
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
            'arm' : { 'short': 'HY', 'full': "Հայերեն"},
            'rus' : { 'short': 'RU', 'full': "Русский"}
        },
        oldVersionLink: null,
        liveChat: null,
        site_id: "90",
        registration: {
            defaultCurrency: 'USD',
            restrictedCountries: {}
        },
        availableCurrencies: ['USD'],
        transferEnabled: false
        //facebookUrl: "https://www.facebook.com/vbetcom",
        //googlePlusUrl: "https://plus.google.com/u/1/+Vbetlivebetting/",
        //twitterAccount: 'Vbet_com',
        //twitterHashTag: 'vbet'
    },
    'env': {
        showFifaCountdown: false
    },
    'swarm': {
        url: [{ url: "http://swarm.megabet.am:8083"}],
        websocket: [{ url: "ws://swarm.megabet.am:8083/"}]
    },
    xDomainSlaves: '{"https://swarm.megabet.am:8083" : "/xdomain-proxy.html"}',
    'payments': [
    ]

});

CMS.constant('SkinWPConfig', {

    additionalSections: {
        tournament: {
            name: 'Tournaments', // translate##Tournaments##
            placement: 'other',   // if 'topmenu' top menu subitem will be added
            rootPageSlug: {
                'eng': 'tournament-eng',
                'rus': 'tournament-ru',
                'arm': 'tournament-arm'
            }
        }
    },
    wpUrl: 'http://www.megabet.am/json',  // WordpResss instance serving pages, banners
    wpBaseHost: 'www.megabet.am'  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {});

VBET5.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/', {redirectTo: '/sport/', template: ''});

}]);