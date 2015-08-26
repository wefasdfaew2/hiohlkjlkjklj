/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "Vbet - Sport betting, Poker, Casino, Online Games",
            "rus": "Букмекерская контора Vbet - Онлайн ставки, покер, казино, онлайн игры",
            "arm": "Vbet բուքմեյքերական ընկերություն - Օնլայն խաղադրույքներ, պոկեր, կազինո, նարդի, օնլայն խաղեր"
        },
        site_name: "VBET",
        skin: 'au.vbet.com',
        googleAnalyticsId: 'UA-29242337-7',
        yandexMetricaId: '24705809',
        casinoEnabled: true,
        pokerEnabled: true,
        liveDealerEnabled: true,
        financialsEnabled: true,
        poolBettingEnabled: true, //enable pool betting
        enableHeaderAnnouncement: false,
        showFavoriteGamesInSportList: true,
        phoneOnlyMarkets: {
            enable: true,
            phoneNumber: '+61280056940'
        },
//        enableCasinoBalanceHistory: true,
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
            'arm' : { 'short': 'HY', 'full': "Հայերեն"},
            'rus' : { 'short': 'RU', 'full': "Русский"}
        },
        twitterFeed: {
            enabled: true,
            refreshInterval: 300000, //5min
            hashTag: 'live', //only tweets having this hashtag will be shown
            count: 20, //count of tweets to load (before filtering with hashtag)
            user: {
                'arm' : 'vivaro_bet',
                'eng' : 'vbet_com',
                'rus' : 'livebettingru'
            }
        },
        redirectOnTablets: 'http://tablet.vbet.com/',
        poolBettingResultsUrlPrefix : 'http://www.vbet.com/results/',
        about_company_text: {
            'eng' : "Vbet is operated by Radon B.V. registered in the Commercial register of Curacao no. 126922 and has a sublicense CIL pursuant to Master gaming License №5536/JAZ.",
            'rus' : "Vbet управляется со стороны Radon B.V., который зарегистрирован в Коммерческом регистре Кюрасао под номером 126922 и имеет сублицензию CIL в соответствии с Master gaming License #5536/JAZ.",
            'arm' : "Vbet –ը գործում է Radon BV-ի անունից, որը գրանցված է Կյուրասաոի առեւտրային ռեգիստրում 126922 համարով և ունի CIL ենթաարտոնագիր՝ համաձայն Master gaming License #5536/JAZ:"
        },
        flashVersionLink: {
            eng: 'http://inplay.vbet.com/inplay/',
            rus: 'http://inplay.vbet.com/inplay/?language=ru',
            arm: 'http://inplay.vbet.com/inplay/?language=hy'
        },
        oldVersionLink: {
            eng: 'http://inplay.vbet.com/inplay/',
            rus: 'http://inplay.vbet.com/inplay/?language=ru',
            arm: 'http://inplay.vbet.com/inplay/?language=hy'
        },
        liveChat: {
			isSfChat: true,
            siteId: 32814,
            codePlan: 357
        },
        site_id: "4",
        registration: {
            defaultCurrency: 'USD',
            restrictedCountries: {'AM' : 'http://www.vivaro.am'},
            mailIsSentAfterRegistration: true
        },
        availableCurrencies: ['USD', 'EUR', 'RUB', 'UAH'],
        facebookUrl: "https://www.facebook.com/vbetcom",
        googlePlusUrl: "https://plus.google.com/u/1/+Vbetlivebetting/",
        youtubeUrl: "https://www.youtube.com/user/VIVARObetting",
        vkontakteUrl: "http://vk.com/vbetcom",
        twitterAccount: 'Vbet_com',
        twitterHashTag: 'vbet'
    },
    'env': {
        showFifaCountdown: false
    },
    'swarm': {
        url: [{ url: "https://swarm.vbet.com:8080"}],
        websocket: [{ url: "wss://swarm.vbet.com:8080/"}]
    },
    xDomainSlaves: '{"https://swarm.vbet.com:8080" : "/xdomain-proxy.html", "http://casino.vbet.com" : "/global/partners/xdomain/xDomainProxy.html"}',
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
        },

        {
            name: 'centili',
            canDeposit: true,
            canWithdraw: false,
            order: 7,
            depositInfoTextKey: 'deposit_info_centili' // translate##deposit_info_cash##
        }
    ]

});

CMS.constant('SkinWPConfig', {
    wpUrl: 'http://www.vbet.com/json',  // WordpResss instance serving pages, banners
    wpNewsUrl: {
        main: 'http://www.vbet.com/json'
    },  // WordpResss instance serving news
    wpBaseHost: 'www.vbet.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host
    wpNewsBaseHost: 'www.vbet.com', // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
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
    }
});

CASINO.constant('SkinCConfig', {
    cUrlPrefix: 'http://casino.vbet.com',
    cGamesUrl: '/global/v-play.php',
    cUrl: '/global/casinoGamesLoad.php',
    main : {
        partnerID: '4'
    },
    login: {
        url: '/global/partners/rml.php'
    },
    balance: {
        url: '/global/cashier/cashier.php'
    }
});
