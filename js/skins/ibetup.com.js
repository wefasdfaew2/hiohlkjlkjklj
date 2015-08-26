/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "ibetup.com",
			"cze": "ibetup..com",
            "rus": "ibetup.com"
        },
        site_name: "ibetup.com",
        site_id: "102",
        skin: 'ibetup.com',
        casinoEnabled: true,
        pokerEnabled: false,
        fantasyEnabled: true,
        liveDealerEnabled: true,
        financialsEnabled: true,
        skillgamesEnabled: false,
        redirectOnTablets: 'http://tablet.ibetup.com/',
        videoEnabled: false,
        about_company_text: {
            'eng' : "(c) ibetup.com"
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
            'cze' : { 'short': 'CZ', 'full': "Český"},
            'ger' : { 'short': 'DE', 'full': "Deutsch"},
            'ita' : { 'short': 'IT', 'full': "Italiano"},
            'por' : { 'short': 'PT', 'full': "Português"},
            'pt-br' : { 'short': 'PT-BR', 'full': "Português do Brasil"},
            'spa' : { 'short': 'ES', 'full': "Español"},
            'rus' : { 'short': 'RU', 'full': "Русский"},
            'gre' : { 'short': 'GR', 'full': "Ελληνική"}
        },
        registration: {
            defaultCurrency: 'USD',
            restrictedCountries: {}
        },
        liveChat: {
            siteId: 32814,
            codePlan: 357
        },
        availableCurrencies: ['USD', 'EUR', 'RUB', 'CNY', 'CZK','BRL','JPY','NGN'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: true, // enable news on sport page
        enableBannerUnderBetslip: true, // enable banner under the betslip,
        disableFooterNav: false, // disable wordpress content in footer,
        disableHomepageNews: false,
        copyrightSince: 2014,
        poweredByInFooter: false,
        cssFiles: ['soccer-control.css', 'tennis-control.css', 'main.css', 'media.css', 'classic.css', 'flags.css',  'transitions.css', 'lib/introjs.min.css']
    },
    'env': {
        showFifaCountdown: false
    },
    'swarm': {
        url: [{ url: "http://swarm.betconstruct.com:8084/"}],
        websocket: [{ url: "ws://swarm.betconstruct.com:8084/"}]
    },
    xDomainSlaves: '{"http://swarm.betconstruct.com:8084" : "/xdomain-proxy.html"}', //has to be JSON string

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
    wpUrl: 'http://www.ibetup.com/json',  // WordpResss instance serving pages, banners
    wpBaseHost: 'www.ibetup.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
    wpNewsUrl: {
        main: 'http://www.ibetup.com/newsjson'
    },  // WordpResss instance serving news
    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {
    cUrlPrefix: 'http://games.ibetup.com',
    cGamesUrl: '/global/v-play.php',
    cUrl: '/global/casinoGamesLoad.php',
    main : {
        partnerID: '102',
        multiViewEnabled: true,
        filterByProviderEnabled: false,
        categories: [
            55, //highlights
            17, //tables games
            57, //slots
            56, //Card games
        ],
        filterByCategory: ['VirtualBetting']
    },
    login: {
        url: '/global/partners/rml.php'
    },
    balance: {
        url: '/global/cashier/cashier.php'
    }
});