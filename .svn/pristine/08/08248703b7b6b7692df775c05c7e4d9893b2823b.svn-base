/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "victoryroom.com"
        },
        site_name: "victoryroom.com",
        site_id: "10",
        skin: 'victoryroom.com',
        googleAnalyticsId: 'UA-54085329-1',
        sportEnabled: true,
        poolBettingEnabled: true, //enable pool betting
        casinoEnabled: true,
        pokerEnabled: true,
        liveDealerEnabled: true,
        financialsEnabled: false,
        skillgamesEnabled: true,
        redirectOnTablets: 'http://tablet.victoryroom.com/',
        videoEnabled: false,
        about_company_text: {
            'eng' : "(c) victoryroom.com"
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
            'chi' : { 'short': 'CH', 'full': "Chinese"},
            'spa' : { 'short': 'ES', 'full': "Español"},
            'rus' : { 'short': 'RU', 'full': "Русский"}
        },
        registration: {
            defaultCurrency: 'USD',
            restrictedCountries: {}
        },
        liveChat: {
			isSfChat: true,
            siteId: 32814,
            codePlan: 357
        },
        availableCurrencies: ['USD', 'EUR'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: true, // enable news on sport page
        enableBannerUnderBetslip: false, // enable banner under the betslip,
        disableFooterNav: false, // disable wordpress content in footer,
        disableHomepageNews: false,
        disableDepositPage: false,
        poweredByInFooter: false,
        copyrightSince: 2014,
        balanceDefaultPage: 'balanceHistory'
    },
    'env': {
        showFifaCountdown: false
    },
    'swarm': {
        url: [{ url: "http://swarm.betconstruct.com:8084/"}],
        websocket: [{ url: "ws://swarm.betconstruct.com:8084/"}]
    },
    poker: {
        balanceTimeout: 300000, // the period of requesting poker balance (in milliseconds),
        downloadLink: {
            windows: 'http://poker-updates.betconstruct.com/victoryroom/Victoryroom%20Poker.exe',
            mac: 'http://poker-updates.betconstruct.com/victoryroom/Victoryroom%20Poker.dmg',
            linux: 'http://poker-updates.betconstruct.com/victoryroom/Victoryroom%20Poker.tar.gz'
        },
		instantPlayLink: 'http://onlinepoker.betconstruct.com:8081/poker-client/poker/victoryroom'
    },
    xDomainSlaves: '{"http://swarm.victoryroom.com:8084" : "/xdomain-proxy.html"}', //has to be JSON string

    'payments': [
        {
            name: 'skrill',
            canDeposit: true,
            canWithdraw: true,
            order: 1,
            // translate##deposit_info_skrill##   <--- these are special comments that tell translation
            // generation script that key inside hashes has to be included in translation table
            depositInfoTextKey: 'deposit_info_skrill',
            withdrawInfoTextKey: 'withdraw_info_skrill', // translate##withdraw_info_skrill##
            stayInSameTabOnDeposit: true, //will submit external "confirm" form in same tab
            //these external form field values will be set to current URL in app,
            // so when user makes or cancels payment, he'll return to our page
            depositFormFields: [
                {name: 'email', type: 'email', label: 'Email'}  // translate##Email##
            ],
            withdrawFormFields: [
                {name: 'email', type: 'email', label: 'Email', required: true},  // translate##Email##
                {name: 'name', type: 'text', label: 'Name'} // translate##Name##
            ]
        },
        {
            name: 'webmoney',
            canDeposit: true,
            canWithdraw: true,
            order: 2,
            depositInfoTextKey: 'deposit_info_webmoney',     // translate##deposit_info_webmoney##
            withdrawInfoTextKey: 'withdraw_info_webmoney',     // translate##withdraw_info_webmoney##
            withdrawFormFields: [
                {name: 'name', type: 'text', label: 'Name'}, // translate##Name##
                {name: 'purse', type: 'text', label: 'Purse'} // translate##Purse##
            ]
        },
        {
            name: 'qiwi',
            canDeposit: true,
            canWithdraw: true,
            order: 3,
            depositInfoTextKey: 'deposit_info_qiwi', // translate##deposit_info_qiwi##
            withdrawInfoTextKey: 'withdraw_info_qiwi', // translate##withdraw_info_qiwi##
            depositFormFields: [{name: 'wallet_id', type: 'text', label: 'Wallet id'}],// translate##Wallet id##
            withdrawFormFields: [{name: 'wallet_id', type: 'text', label: 'Wallet id'}] // translate##Wallet id##
        },
        {
            name: 'neteller',
            canDeposit: true,
            canWithdraw: true,
            order: 4,
            depositInfoTextKey: 'deposit_info_neteller', // translate##deposit_info_neteller##
            withdrawInfoTextKey: 'withdraw_info_neteller', // translate##withdraw_info_neteller##
            depositFormFields: [
                {name: 'account_id', type: 'text', label: 'Account Id'}, // translate##Account Id##
                {name: 'secure_id', type: 'text', label: 'Secure Id'}   // translate##Secure Id##
            ],
            withdrawFormFields: [
                {name: 'id', type: 'text', label: 'Account Id'} // translate##Account Id##
            ]
        },
        {
            name: 'moneta',
            canDeposit: true,
            canWithdraw: true,
            order: 5,
            depositInfoTextKey: 'deposit_info_moneta', // translate##deposit_info_moneta##
            withdrawInfoTextKey: 'withdraw_info_moneta', // translate##withdraw_info_moneta##
            depositFormFields: [],
            withdrawFormFields: [
                {name: 'email', type: 'text', label: 'Email'}, // translate##Email##
                {name: 'name', type: 'text', label: 'Name'}, // translate##Name##
                {name: 'id', type: 'text', label: 'Wallet id'} // translate##Wallet id##
            ]
        },
        {
            name: 'ecocard',
            canDeposit: true,
            canWithdraw: true,
            order: 6,
            depositInfoTextKey: 'deposit_info_ecocard', // translate##deposit_info_ecocard##
            withdrawInfoTextKey: 'withdraw_info_ecocard', // translate##withdraw_info_ecocard##
            depositFormFields: [],
            withdrawFormFields: [
                {name: 'account', type: 'text', label: 'Account Id'} // translate##Account Id##
            ]
        },
        {
            name: 'ukash',
            canDeposit: false,
            canWithdraw: false,
            order: 5,
            depositInfoTextKey: 'deposit_info_ukash', // translate##deposit_info_ukash##
            withdrawInfoTextKey: 'withdraw_info_ukash' // translate##withdraw_info_ukash##
        }
    ]

});

CMS.constant('SkinWPConfig', {
    wpUrl: 'http://www.victoryroom.com/json',  // WordpResss instance serving pages, banners
    wpBaseHost: 'www.victoryroom.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
    wpNewsUrl: {
        main: 'http://www.victoryroom.com/json'
    },  // WordpResss instance serving news
    wpNewsBaseHost: 'www.victoryroom.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {
    cUrlPrefix: 'http://games.victoryroom.com',
    cGamesUrl: '/global/v-play.php',
    cUrl: '/global/casinoGamesLoad.php',
    main: {
        partnerID: '10',
        multiViewEnabled: true
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
    $routeProvider.when('/', {redirectTo: '/casino/', template: ''});

}]);