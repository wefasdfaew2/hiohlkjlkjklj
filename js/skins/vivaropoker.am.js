/*
 *   All config values specified here will be merged with main config and will override its values
 *
 */
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "Vivaropoker - Sport betting, Poker, Casino, Online Games",
            "rus": "Букмекерская контора Vivaropoker - Онлайн ставки, покер, казино, онлайн игры",
            "arm": "Vivaropoker բուքմեյքերական ընկերություն - Օնլայն խաղադրույքներ, պոկեր, կազինո, նարդի, օնլայն խաղեր"
        },
        site_name: "Vivaro",
        skin: 'vbet.com',
        casinoEnabled: true,
        pokerEnabled: true,
        liveDealerEnabled: true,
        financialsEnabled: true,
        fantasyEnabled: true,
        ogwilEnabled: true,
        skillgamesEnabled: true,
        jackpotEnabled: true,
        sportSavedGamesEnabled: false,
        poolBettingEnabled: true, //enable pool betting
        virtualBettingEnabledInTopMenu: true,
        backGammonEnabledInTopMenu: true,
        beloteEnabledInTopMenu: true,
        enableNewsLinkInMenu: true,
        betHistoryEnabled: false,
        enableCasinoBalanceHistory: true, //enable casino balance history in top menu
        enableCasinoBetHistory: true, //enable casino balance history in top menu
        googleAnalyticsId: 'UA-29242337-11',
        redirectOnTablets: 'http://vivaropoker.am/mobile/',
        ageRestrictionInFooter: 21,
        freeBetEnabled: true,
        theVeryTopMenu: [{href: "#/fantasy/", label: "Fantasy Sports"}, {href: '#/financials/', label: "Financials"}, {href: "#/section/aoc", label: "AOC"}, {href: "#/freebet/", label: "Free Quiz"}, {href: "#/jackpot/", label: "Jackpot"}, {href: "#/promos/", label: "Promotions"}],
        newMenuItems: {liveCasino: true},
        aocLink: "/#/section/aoc",
        enableFeedbackButton: true,
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
            'arm' : { 'short': 'HY', 'full': "Հայերեն"},
            'rus' : { 'short': 'RU', 'full': "Русский"}
        },
        about_company_text: {
            'eng': "",
            'rus': "",
            'arm': ""
        },
        oldVersionLink: {
            onlyOnPage: '/casino/',
            eng: 'http://vivaropoker.am/?lan=eng',
            rus: 'http://vivaropoker.am/?lan=rus',
            arm: 'http://vivaropoker.am/?lan=arm'
        },
        liveChat: {
            isSfChat: false,
            siteId: 32814,
            codePlan: 357
        },
        site_id: "100",
        registration: {
            defaultCurrency: 'AMD',
            restrictedCountries: {},
            minimumAllowedAge: 21,
            minimumAllowedPokerAge: 21,
            requireDocNumber: true
        },
        personalDetails: {
            readOnlyFields: ['user_id', 'first_name', 'sur_name', 'birth_date', 'gender', 'email'],
            editableFields: ['country_code', 'city', 'address', 'phone_number'],
            requiredEditableFields: ['country_code', 'city', 'address']
        },
        poolBettingCurrencyName: 'AMD', //currency in which jackpot will be displayed in top menu
        availableCurrencies: ['AMD'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        facebookUrl: "https://www.facebook.com/vivaropoker.am",
        googlePlusUrl: "https://plus.google.com/u/0/+VivaropokerAm",
        instagramUserName : "vivaroland",
        twitterAccount: 'VivaroPoker',
        twitterHashTag: 'vivaro'
    },
    'swarm': {
        // TODO: switch to SSL once server is ready
        url: [
            { url: "http://swarm.vivaropoker.am:8084/", weight: 3},
            { url: "http://swarm-ye1.vivaropoker.am:8082/", weight: 4},
            { url: "http://swarm-ye2.vivaropoker.am:8082/", weight: 3}
        ],
        websocket: [
            { url: "ws://swarm.vivaropoker.am:8084/", weight: 3},
            { url: "ws://swarm-ye1.vivaropoker.am:8082/", weight: 4},
            { url: "ws://swarm-ye2.vivaropoker.am:8082/", weight: 3}
        ]
    },
    poker: {
        instantPlayLink: 'http://onlinepoker.betconstruct.com:8081/poker-client/poker/vivaro',
        balanceTimeout: 300000, // the period of requesting poker balance (in milliseconds),
        downloadLink: {
            windows: 'http://poker-updates.betconstruct.com/vivaropoker/VivaroPoker.exe',
            mac: 'http://poker-updates.betconstruct.com/vivaropoker/VivaroPoker.dmg',
            linux: 'http://poker-updates.betconstruct.com/vivaropoker/VivaroPoker.tar.gz'
        }
    },
    xDomainSlaves: '{"http://swarm.vivaropoker.am:8084" : "/xdomain-proxy.html", "http://swarm-ye1.vivaropoker.am:8082" : "/xdomain-proxy.html",  "http://swarm-ye2.vivaropoker.am:8082" : "/xdomain-proxy.html", "http://vivaropoker.am": "/global/partners/xdomain/xDomainProxy.html"}', //has to be JSON string

    'env': {
        lang: 'arm'
    },
    'betting': {
        bet_source: '42'
    },
    'payments': [
        {
            name: 'arca',
            canDeposit: true,
            canWithdraw: true,
            order: 3,
            depositInfoTextKey: 'deposit_info_arca', // translate##deposit_info_arca##
            withdrawInfoTextKey: 'withdraw_info_arca', // translate##withdraw_info_arca##
            withdrawFormFields: [
                {name: 'purse', type: 'text', label: 'Wallet id'},
                {name: 'name', type: 'text', label: 'Last name/surname, name, middle name'} //translate##Last name/surname, name, middle name##
            ]
        },
        {
            name: 'edram',
            canDeposit: true,
            canWithdraw: true,
            order: 2,
            depositInfoTextKey: 'deposit_info_edram', // translate##deposit_info_edram##
            withdrawInfoTextKey: 'withdraw_info_edram', // translate##withdraw_info_edram##
            withdrawFormFields: [
                {name: 'id', type: 'text', label: 'Wallet id'}
            ]
        },
        {
            name: 'mobidram',
            canDeposit: true,
            canWithdraw: false,
            order: 4,
            depositInfoTextKey: 'deposit_info_mobidram' // translate##deposit_info_mobidram##

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
        },
        {
            name: 'telcell',
            canDeposit: true,
            canWithdraw: false,
            order: 5,
            depositInfoTextKey: 'deposit_info_telcell', // translate##deposit_info_telcell##
            onlyInfoTextOnDeposit: true // this means that we won't show any form or button on deposit  page, including amount selection, only text

        },
        {
            name: 'tandem',
            canDeposit: true,
            canWithdraw: false,
            order: 6,
            depositInfoTextKey: 'deposit_info_tandem', // translate##deposit_info_tandem##
            onlyInfoTextOnDeposit: true // this means that we won't show any form or button on deposit  page, including amount selection, only text

        },
        {
            name: 'btabank',
            canDeposit: true,
            canWithdraw: false,
            order: 8,
            depositInfoTextKey: 'deposit_info_btabank', // translate##deposit_info_btabank##
            onlyInfoTextOnDeposit: true // this means that we won't show any form or button on deposit  page, including amount selection, only text

        },
        {
            name: 'vivarobet',
            canDeposit: false,
            canWithdraw: true,
            order: 10,
            isTransferToLinkedService: true,
            withdrawInfoTextKey: 'withdraw_info_tovivaropet' // translate##withdraw_info_tovivaropet##

        },
        {
            name: 'card',
            canDeposit: true,
            canWithdraw: false,
            order: 9,
            depositInfoText : {
                'arm': "Մուտքագրի՛ր ծածկագիրը և ստացի՛ր բոնուս",
                'rus': "Введите код и получите Ваш бонус",
                'eng': "Enter the code and get Your bonus"
            },
            depositFormFields: [
                {name: 'pin_code', type: 'text', label: 'PinCode', required: true} // translate##PinCode##
            ],
            depositPrefilledAmount: 1 //amount field won't be shown, instead will send this number
        }

    ]

});

CMS.constant('SkinWPConfig', {
    wpUrl: 'http://next.vivaropoker.am/json',  // WordpResss instance serving pages, banners
    wpBaseHost: 'next.vivaropoker.am',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host
    wpNewsUrl: {
        main: 'http://next.vivaropoker.am/newsjson'
    },  // WordpResss instance serving news
    wpNewsBaseHost: 'next.vivaropoker.am',  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
    additionalSections: {
        tournament: {
            name: 'Tournaments',
            placement: 'other',   // if 'topmenu' top menu subitem will be added
            rootPageSlug: {
                'eng': 'tournament-eng',
                'rus': 'tournament-ru',
                'arm': 'tournament-arm'
            }
        },
        casinopromotions: {
            name: 'Promotion',
            placement: 'other',   // if 'topmenu' top menu subitem will be added
            rootPageSlug: {
                'eng': 'casinopromotions-eng',
                'rus': 'casinopromotions-rus',
                'arm': 'casinopromotions-arm'
            }
        }
    },
    help: {
        pageSlugs: {
            'eng': 'help-root-poker-eng',
            'rus': 'help-root-poker-rus',
            'arm': 'help-root-poker-arm'
        }
    }
});

CASINO.constant('SkinCConfig', {
    cUrlPrefix: 'http://vivaropoker.am',
    cGamesUrl: '/global/v-play.php',
    cUrl: '/global/casinoGamesLoad.php',
    main : {
        partnerID: '100',
        filterByProvider: [],
        multiViewEnabled: true
    },
    login: {
        url: '/global/partners/rml.php'
    },
    balance: {
        url: '/global/cashier/cashier.php'
    },
    jackpot: {
        url_prefix: 'http://casino.vivarobet.am',
        url: '/jackpot/getJackpotData.php',
        partner_id: '1'
    },
    bonusPopUpUrl: 'http://www.youtube.com/embed/h4uOYdMP87g?rel=0&autoplay=1&controls=1'
});


//VBET5.config(['$routeProvider', function ($routeProvider) {
//    'use strict';
//    function redirectToVivaroBet(url, params) {
//        var redirector = function ($rootScope, $location) {
//            var additionalParams = '';
//            angular.forEach(params, function (param) { additionalParams += '&' + param + '=' + $location.search()[param]; });
//            window.location.replace('http://www.vivarobet.am/#' + url + '/?lang=' + $rootScope.env.lang + additionalParams);
//        };
//        redirector.$inject = ['$rootScope', '$location'];
//        return redirector;
//    }
//
//    $routeProvider.when('/sport/', {controller: redirectToVivaroBet('/sport', ['type']), template: ''});
//    $routeProvider.when('/news/', {controller: redirectToVivaroBet(''), template: ''});
//    $routeProvider.when('/poolbetting/', {controller: redirectToVivaroBet('/poolbetting'), template: ''});
//    $routeProvider.when('/freebet/', {controller: redirectToVivaroBet('/freebet'), template: ''});
//    $routeProvider.when('/', {redirectTo: '/poker/', template: ''});
//
//}]);