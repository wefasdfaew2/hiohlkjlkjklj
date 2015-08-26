/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "terminal.starbet.msk.ru",
            "rus": "terminal.starbet.msk.ru"
        },
        site_name: "terminal.starbet.msk.ru",
        site_id: 82,
        skin: 'terminal.starbet.msk.ru',
        casinoEnabled: false,
        pokerEnabled: false,
        liveDealerEnabled: false,
        financialsEnabled: false,
        skillgamesEnabled: false,
        disableDepositPage: true,
        disableWithdrawPage: true,
        disableHeaderMessages: true,
        sportsAlwaysOnTop: true,
        disableEditingPersonalInfo: true,
        disableFooterCopyrightBlock: true,
        enableTimeZoneSelect: true,
        settingsDefaultPage: 'changepassword', // details, changepassword
        redirectOnTablets: 'http://tablet.terminal.starbet.msk.ru/',
        videoEnabled: false,
        'rfid': {
            loginWIthRFID: true,
            promptRFIDPassword: false,
            allowAccessWithoutRfid: true
        },
        balanceDefaultPage: 'balanceHistory',
        about_company_text: {
            'eng' : "(c) terminal.starbet.msk.ru",
            'rus' : "(c) terminal.starbet.msk.ru"
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
            'rus' : { 'short': 'RU', 'full': "Русский"}
        },
        registration: {
            defaultCurrency: 'GEL',
            restrictedCountries: {}
        },
        personalDetails: {
            readOnlyFields: ['user_id', 'first_name', 'sur_name', 'birth_date']
        },
        liveChat: false,
        availableCurrencies: ['RUB', 'USD'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: false, // enable news on sport page
        enableBannerUnderBetslip: false, // enable banner under the betslip,
        disableFooter: false,
        disableFooterNav: true, // disable wordpress content in footer,
        disableHomepageNews: true,
        disableRegistrationAndLogin: true,
        copyrightSince: 2014
    },
    'env': {
        lang: 'rus',
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
//    wpUrl: 'http://www.terminal.starbet.msk.ru/json',  // WordpResss instance serving pages, banners
//    wpBaseHost: 'www.terminal.starbet.msk.ru',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
//    wpNewsUrl: 'http://www.terminal.starbet.msk.ru/newsjson',  // WordpResss instance serving news
//    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {});


VBET5.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/', {redirectTo: '/sport/'});

}]);