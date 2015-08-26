/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "bets777.com",
            "rus": "bets777.com"
        },
        site_name: "bets777.com",
        site_id: "92",
        skin: 'bets777.com',
        casinoEnabled: false,
        pokerEnabled: false,
        showMyGamesInBetslip: true,
        facebookUrl: null,
        googlePlusUrl: null,
        twitterAccount: null,
        liveDealerEnabled: false,
        financialsEnabled: false,
        skillgamesEnabled: false,
        redirectOnTablets: 'http://tablet.bets777.com/',
        videoEnabled: false,
        about_company_text: {
            'eng' : "(c) bets777.com",
            'rus' : "(c) bets777.com"
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
            'rus' : { 'short': 'RU', 'full': "Русский"}
        },
        registration: {
            defaultCurrency: 'TRY',
            restrictedCountries: {}
        },
        liveChat: false,
        availableCurrencies: ['EUR', 'USD', 'TRY'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: false, // enable news on sport page
        enableBannerUnderBetslip: false, // enable banner under the betslip,
        disableHeader: true,
        disableHeaderNavigation: true,
        disableFooter: true,
        disableFooterNav: true, // disable wordpress content in footer,
        disableHomepageNews: false
    },
    'env': {
        showFifaCountdown: false
    },
    'swarm': {
        url: [{ url: "http://swarm.bets777.com:8085/"}],
        websocket: [{ url: "ws://swarm.bets777.com:8085/"}]
    },
    partner: {
        documentDomain: 'bets777.com',  // both parent and iframe have to set  window.document.domain = documentDomain for cross-subdomain JS to work
        profileNotAvailable: true,
        balanceRefreshPeriod: 30000 //milliseconds, if 0 or null will be disabled
    },
    xDomainSlaves: '{"http://swarm.bets777.com:8085" : "/xdomain-proxy.html"}', //has to be JSON string

    'payments': [
        {
            name: 'card',
            canDeposit: true,
            canWithdraw: false,
            order: 2,
            depositInfoTextKey: 'deposit_info_card', // translate##deposit_info_card##
            depositFormFields: [
                {name: 'pin_code', type: 'text', label: 'PinCode'} // translate##PinCode##
            ],
            depositPrefilledAmount: 1 //amount field won't be shown, instead will send this number
        },
        {
            name: 'cash',
            canDeposit: true,
            canWithdraw: true,
            hideDepositButton: true,
            order: 1,
            hasBetShops: true,
            depositInfoTextKey: 'deposit_info_cash', // translate##deposit_info_cash##
            withdrawInfoTextKey: 'withdraw_info_cash' // translate##withdraw_info_cash##
        }
    ]

});

CMS.constant('SkinWPConfig', {
});

CASINO.constant('SkinCConfig', {});

//Override default page
VBET5.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/', {redirectTo: '/sport/'});

}]);