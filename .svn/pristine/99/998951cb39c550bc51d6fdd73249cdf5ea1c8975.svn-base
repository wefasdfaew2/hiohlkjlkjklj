/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "terminal.vbet.com",
            "rus": "terminal.vbet.com"
        },
        site_name: "terminal.vbet.com",
        site_id: 33, //"18",
        skin: 'terminal.vbet.com',
        casinoEnabled: false,
        pokerEnabled: false,
        liveDealerEnabled: false,
        financialsEnabled: false,
        skillgamesEnabled: false,
        disableDepositPage: true,
        disableWithdrawPage: true,
        redirectOnTablets: 'http://tablet.terminal.vbet.com/',
        videoEnabled: false,
        'rfid': {
            loginWIthRFID: true,
            promptRFIDPassword: false,
            allowAccessWithoutRfid: true
        },
        balanceDefaultPage: 'balanceHistory',
        about_company_text: {
            'eng' : "(c) terminal.vbet.com",
            'rus' : "(c) terminal.vbet.com"
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
        personalDetails: {
            readOnlyFields: ['user_id', 'first_name', 'sur_name', 'birth_date']
        },
        liveChat: false,
        availableCurrencies: ['RUB', 'USD','EUR'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: false, // enable news on sport page
        enableBannerUnderBetslip: false, // enable banner under the betslip,
        disableFooter: true,
        disableFooterNav: true, // disable wordpress content in footer,
        disableHomepageNews: true,
        disableRegistrationAndLogin: true,
        copyrightSince: 2014
    },
    'env': {
        lang: 'eng',
        showFifaCountdown: false
    },
    'betting': {
        disableNumpad: false
    },
    'swarm': {
        sendSourceInRequestSession: true,
        sendTerminalIdlInRequestSession: true,
        url: [{ url: "http://swarm.betconstruct.com:8084/"}],
        websocket: [{ url: "ws://swarm.betconstruct.com:8084/"}]
//        websocket: [{ url: "wss://10.32.5.83:8181/"}]
    },
    xDomainSlaves: '{"http://swarm.betconstruct.com:8084" : "/xdomain-proxy.html"}', //has to be JSON string

    'payments': []

});

CMS.constant('SkinWPConfig', {
//    wpUrl: 'http://www.terminal.vbet.com/json',  // WordpResss instance serving pages, banners
//    wpBaseHost: 'www.terminal.vbet.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
//    wpNewsUrl: 'http://www.terminal.vbet.com/newsjson',  // WordpResss instance serving news
//    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {});


VBET5.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/', {redirectTo: '/sport/'});

}]);