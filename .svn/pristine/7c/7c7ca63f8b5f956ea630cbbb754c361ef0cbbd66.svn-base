/*
 *   All config values specified here will be merged with main config and will override its values
 *
 */
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "euro88.com"
        },
        site_name: "euro88.com",
        site_id: "39",
        skin: 'euro88.com',
        casinoEnabled: true,
        pokerEnabled: false,
        liveDealerEnabled: true,
        financialsEnabled: false,
        skillgamesEnabled: false,
        enableSportsbookLayoutSwitcher: false,
        sportsClassicLayout: true, //is modern by default
        ogwilEnabled: false,
        redirectOnTablets: 'http://tablet.euro88.com/',
        videoEnabled: false,
        about_company_text: {
            'eng' : "(c) euro88.com"
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
            'kor' : { 'short': 'KO', 'full': "한국의"},
            'chi' : { 'short': 'CH', 'full': "简体中文"},
            'rus' : { 'short': 'RU', 'full': "Русский"},
            'fre' : { 'short': 'FR', 'full': "Français"},
            'spa' : { 'short': 'ES', 'full': "Español"}

        },
        registration: {
            defaultCurrency: 'WON',
            restrictedCountries: {}
        },
        liveChat: {
            isSfChat:true,
            siteId: 32814,
            codePlan: 357
        },
        additionalMenuItems: [
            {
                eng: {title: "News", link: "#/news", cssclass: ''},
                tur: {title: "Haberler", link: "#/news", cssclass: ''}
            }
        ],
        availableCurrencies: ['WON','EUR','USD','RUB','UAH'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: true, // enable news on sport page
        enableBannerUnderBetslip: false, // enable banner under the betslip,
        disableFooterNav: false, // disable wordpress content in footer,
        disableHomepageNews: false,
        copyrightSince: 2014,
        showAllAvailablePaymentSystems: true,
    },
    'env': {
        showFifaCountdown: false,
        lang: 'kor'
    },
    'swarm': {
        url: [{ url: "http://swarm.betconstruct.com:8084/"}],
        websocket: [{ url: "ws://swarm.betconstruct.com:8084/"}]
    },
    xDomainSlaves: '{"http://swarm.betconstruct.com:8084" : "/xdomain-proxy.html"}', //has to be JSON string

    'payments': [
        {
            name: 'europayment',
            canDeposit: true,
            canWithdraw: true,
            order: 1,
            customDepositTemplate: "templates/payments/euro88_deposit.html",
            customWithdrawTemplate: "templates/payments/euro88_withdraw.html"
        }
    ]

});

CMS.constant('SkinWPConfig', {
//   wpUrl: 'http://www.euro88.com/json',  // WordpResss instance serving pages, banners
//  wpBaseHost: 'www.euro88.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
//  wpNewsUrl: 'http://www.euro88.com/newsjson',  // WordpResss instance serving news
    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {
    cUrlPrefix: 'http://games.euro88.com',
    cGamesUrl: '/global/v-play.php',
    cUrl: '/global/casinoGamesLoad.php',
    main: {
        partnerID: '39'
    },
    login: {
        url: '/global/partners/rml.php'
    },
    balance: {
        url: '/global/cashier/cashier.php'
    }
});

VBET5.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/', {redirectTo: '/sport/'});

}]);