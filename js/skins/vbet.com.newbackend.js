/*
 *   All config values specified here will be merged with main config and will override its values
 *
 */

/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "Vbet - Sport betting, Poker, Casino, Online Games",
            "spa": "Vbet - Sport betting, Poker, Casino, Online Games",
            "geo": "Vbet - Sport betting, Poker, Casino, Online Games",
            "rus": "Букмекерская контора Vbet - Онлайн ставки, покер, казино, онлайн игры",
            "arm": "Vbet բուքմեյքերական ընկերություն - Օնլայն խաղադրույքներ, պոկեր, կազինո, նարդի, օնլայն խաղեր"
        },
        site_name: "VBET",
        skin: 'vbet.com',
        enableSportsbookLayoutSwitcher: true,
        sportsClassicLayout: true,
        googleAnalyticsId: 'UA-29242337-7',
        yandexMetricaId: '24705809',
        fantasyEnabled: true,
        ogwilEnabled: true,
        casinoEnabled: true,
        pokerEnabled: true,
        liveDealerEnabled: true,
        financialsEnabled: true,
        poolBettingEnabled: true, //enable pool betting
        enableHeaderAnnouncement: false,
        showFavoriteGamesInSportList: true,
        showFinancialsInSportList: 222,   // false to hide,  any number to show (number is used as 'order' field to define it's position among sports)
        showVirtualsInSportList: 220,
        enableCasinoBalanceHistory: true, //enable casino balance history in top menu
        enableCasinoBetHistory: true, //enable casino balance history in top menu
        enablePrematchMultiView: true,
        virtualBettingEnabledInTopMenu: false,
        virtualSportEnabledInTopMenu: true,
        backGammonEnabledInTopMenu: true,
        showEachWay: true,
        beloteEnabledInTopMenu: true,
        ageRestrictionInFooter: 18,
        haveFaq: true,
        openHelpAsPopup: true,
        enablePromotions: true,
        aocEnabled: true, // enable AOC link in main menu
        videoEnabled: true,
        disableVirtualSportsCountDown: true,
        availableVideoProviderIds: [1, 3, 5, 7, 8, 11, 12, 15, 999999],
        aocLink: "#/section/aoc",
        theVeryTopMenu: [{href: "#/fantasy/", label: "Fantasy Sports"}, {href: '#/financials/', label: "Financials"}, {href: "#/section/aoc", label: "AOC"}, {href: "#/freebet/", label: "Free Quiz"}, {href: "#/jackpot/", label: "Jackpot"}, {href: "#/promos/", label: "Promotions"}],
        newMenuItems: {games: true, liveCasino: true},
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English", order: 1},
            'spa' : { 'short': 'ES', 'full': "Español", order: 2},
            'arm' : { 'short': 'HY', 'full': "Հայերեն", order: 4},
            'rus' : { 'short': 'RU', 'full': "Русский", order: 3},
            'geo' : { 'short': 'KA', 'full': "ქართული", order: 5}
        },
        twitterFeed: {
            enabled: true,
            refreshInterval: 300000, //5min
            hashTag: 'live', //only tweets having this hashtag will be shown
            count: 20, //count of tweets to load (before filtering with hashtag)
            user: {
                'arm' : 'vivaro_bet',
                'eng' : 'vbet_com',
                'spa' : 'vbet_com',
                'geo' : 'vbet_com',
                'rus' : 'livebettingru'
            }
        },
        remindToRenewBalance: {
            enabled: true,
            page: 'deposit',
            threshold: 0.5,
            interval: 14400000 //4 hours
        },
        redirectOnTablets: 'http://tablet.vbet.com/',
        poolBettingResultsUrlPrefix : 'http://www.vbet.com/results/',
        about_company_text: {
            'eng' : "Vbet is operated by Radon B.V. registered in the Commercial register of Curacao no. 126922 and has a sublicense CIL pursuant to Master gaming License №5536/JAZ.",
            'spa' : "Vbet is operated by Radon B.V. registered in the Commercial register of Curacao no. 126922 and has a sublicense CIL pursuant to Master gaming License №5536/JAZ.",
            'geo' : "Vbet is operated by Radon B.V. registered in the Commercial register of Curacao no. 126922 and has a sublicense CIL pursuant to Master gaming License №5536/JAZ.",
            'rus' : "Vbet управляется со стороны Radon B.V., который зарегистрирован в Коммерческом регистре Кюрасао под номером 126922 и имеет сублицензию CIL в соответствии с Master gaming License #5536/JAZ.",
            'arm' : "Vbet –ը գործում է Radon BV-ի անունից, որը գրանցված է Կյուրասաոի առեւտրային ռեգիստրում 126922 համարով և ունի CIL ենթաարտոնագիր՝ համաձայն Master gaming License #5536/JAZ:"
        },
        //flashVersionLink: {
        //    eng: 'http://inplay.vbet.com/inplay/?language=en',
        //    rus: 'http://inplay.vbet.com/inplay/?language=ru',
        //    arm: 'http://inplay.vbet.com/inplay/?language=hy'
        //},
        oldVersionLink: false,
        additionalLink: {
            eng:  { link: 'http://free.vbet.com/#/?lang=eng', text: 'Free Vbet'},
            spa:  { link: 'http://free.vbet.com/#/?lang=spa', text: 'Free Vbet'},
            geo:  { link: 'http://free.vbet.com/#/?lang=geo', text: 'Free Vbet'},
            rus:  { link: 'http://free.vbet.com/#/?lang=rus', text: 'Free Vbet'},
            arm:  { link: 'http://free.vbet.com/#/?lang=arm', text: 'Free Vbet'}
        },
        liveChat: {
            isSfChat: false,
            siteId: 32814,
            codePlan: 357
        },
        site_id: "4",
        registration: {
            defaultCurrency: 'USD',
            restrictedCountries: {'AM' : 'http://www.vivaro.am', 'GB': null},
            mailIsSentAfterRegistration: true
        },
        personalDetails: {
            readOnlyFields: ['user_id', 'first_name', 'sur_name', 'birth_date', 'gender', 'email'],
            editableFields: ['country_code', 'city', 'address', 'phone_number'],
            requiredEditableFields: ['country_code', 'city', 'address']
        },
        availableCurrencies: ['USD', 'EUR', 'RUB', 'UAH'],
        facebookUrl: "https://www.facebook.com/vbetcom",
        googlePlusUrl: "https://plus.google.com/u/1/+Vbetlivebetting/",
        youtubeUrl: "https://www.youtube.com/user/VIVARObetting",
        vkontakteUrl: "http://vk.com/vbetcom",
        instagramUserName : "vbet_official",
        twitterAccount: 'Vbet_com',
        twitterHashTag: 'vbet'
    },
    'env': {
        showFifaCountdown: false,
        preMatchMultiSelection: false
    },
    'betting': {
        enableExpressBonus: true,
        enableHorseRacingBetSlip: true, // SP, new bet types, etc.
        enableEachWayBetting: true
    },
    'swarm': {
        url: [{url: "https://swarm.vbet.com"}],
        websocket: [{url: "wss://swarm.vbet.com/"}]
        //url: [{ url: "http://swarm2.betconstruct.com:8484/"}],
        //websocket: [{ url: "ws://swarm2.betconstruct.com:8484/"}]
    },
    xDomainSlaves: '{"https://swarm.vbet.com:8080" : "/xdomain-proxy.html", "http://casino.vbet.com" : "/global/partners/xdomain/xDomainProxy.html"}',
    'payments': [
        {
            name: 'skrill1tap',
            info: {
                "USD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24, minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "EUR" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24, minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "RUB" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24, minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "UAH" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24, minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null}
            },
            displayName: 'Skrill 1 Tap',
            canDeposit: true,
            canWithdraw: false,
            order: 2,
            depositInfoTextKey: 'deposit_info_skrill_1tap', // translate##deposit_info_skrill_1tap##
            stayInSameTabOnDeposit: true, //will submit external "confirm" form in same tab
            depositFormFields: [
                {name: 'email', type: 'email', label: 'Email'}  // translate##Email##
            ],
            predefinedFields: {
                '1tap' : true
            }
        },
        {
            name: 'skrill',
            info: {
                "USD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24, minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "EUR" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24, minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "RUB" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24, minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "UAH" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24, minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null}
            },
            displayName: 'Skrill',
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
            info: {
                "USD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 72, minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "EUR" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 72, minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "RUB" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 72, minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "UAH" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 72, minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null}
            },
            displayName: 'WebMoney',
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
            info: {
                "USD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: 350},
                "EUR" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: 280},
                "RUB" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: 14500},
                "UAH" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: 4700}
            },
            displayName: 'Qiwi',
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
            info: {
                "USD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "EUR" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "RUB" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "UAH" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null}
            },
            displayName: 'Neteller',
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
            info: {
                "USD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "EUR" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "RUB" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "UAH" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null}
            },
            displayName: 'Moneta.ru',
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
            info: {
                "USD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "EUR" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "RUB" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "UAH" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null}
            },
            displayName: 'EcoCard',
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
            info: {
                "USD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "EUR" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "RUB" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "UAH" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null}
            },
            displayName: 'UKash',
            canDeposit: true,
            canWithdraw: false,
            order: 5,
            depositInfoTextKey: 'deposit_info_ukash', // translate##deposit_info_ukash##
            withdrawInfoTextKey: 'withdraw_info_ukash' // translate##withdraw_info_ukash##
        },

        {
            name: 'centili',
            info: {
                "USD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "EUR" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "RUB" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "UAH" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null}
            },
            displayName: 'Beeline',
            canDeposit: true,
            canWithdraw: false,
            order: 7,
            depositInfoTextKey: 'deposit_info_centili' // translate##deposit_info_cash##
        },
        {
            name: 'bitcoin',
            info: {
                "USD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "EUR" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "RUB" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "UAH" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null}
            },
            displayName: 'Bitcoin',
            canDeposit: false,
            canWithdraw: false,
            depositFormFields: [
                {click: 'getBcString', type: 'button', label: 'Account Id'} // translate##Account Id##  // "click" defines $scope's function name that will be called on button click
            ],
            order: 11,
            depositInfoTextKey: 'deposit_info_bitcoin' // translate##deposit_info_bitcoin##
        }
    ]

});

CMS.constant('SkinWPConfig', {
    wpUrl: 'http://www.vbet.com/json',  // WordpResss instance serving pages, banners
    wpNewsUrl:  {
        main: 'http://www.vbet.com/json'
    },  // WordpResss instance serving news
    wpBaseHost: 'www.vbet.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host
    wpNewsBaseHost: 'www.vbet.com', // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
    seoFilesGenerationActive: true,
    additionalSections: {
        tournament: {
            name: 'Tournaments', // translate##Tournaments##
            placement: 'other',   // if 'topmenu' top menu subitem will be added
            rootPageSlug: {
                'eng': 'tournament-eng',
                'spa': 'tournament-eng',
                'rus': 'tournament-ru',
                'arm': 'tournament-arm'
            }
        },
        casinopromotions: {
            name: 'Promotion',
            placement: 'other',   // if 'topmenu' top menu subitem will be added
            rootPageSlug: {
                'eng': 'casinopromotions-eng',
                'spa': 'casinopromotions-eng',
                'rus': 'casinopromotions-rus',
                'arm': 'casinopromotions-arm'
            }
        },
        aoc: {
            name: 'AOC',
            enableCustomTemplate: {
                'poker': 'templates/poker/calculator.html'
            },
            placement: 'other',   // if 'topmenu' top menu subitem will be added
            rootPageSlug: {
                'eng': 'aoc-eng',
                'spa': 'aoc-eng',
                'rus': 'aoc-rus',
                'arm': 'aoc-arm'
            },
            bannersOnPages: {
                'get-started': {
                    'eng': 'aoc-start-eng',
                    'spa': 'aoc-start-eng',
                    'rus': 'aoc-start-rus',
                    'arm': 'aoc-start-arm'
                },
                backgammon: {
                    'eng': 'aoc-backgammon-eng',
                    'spa': 'aoc-backgammon-eng',
                    'rus': 'aoc-backgammon-rus',
                    'arm': 'aoc-backgammon-arm'
                },
                belote: {
                    'eng': 'aoc-belote-eng',
                    'spa': 'aoc-belote-eng',
                    'rus': 'aoc-belote-rus',
                    'arm': 'aoc-belote-arm'
                },
                poker: {
                    'eng': 'aoc-poker-eng',
                    'spa': 'aoc-poker-eng',
                    'rus': 'aoc-poker-rus',
                    'arm': 'aoc-poker-arm'
                }
            }
        }
    },
    help: {
        pageSlugs: {
            'spa': 'help-root-eng'
        },
        popupPageSlugs: {
            'spa': 'help-popup-eng'
        }
    },
    bannerSlugs: {
        homepageRotatingBanners: {
            'spa': 'homepage-selected-game-eng'
        },
        homepageBanners: {
            'spa': 'homepage-banners-eng'
        },
        homepageRightBanners: {
            'spa': 'homepage-banners-right-eng'
        },
        poker: {
            'spa' : 'poker-eng'
        },
        casino: {
            'spa' : 'casino-eng'
        }
    },
    poker: {
        mainPageSlugs: {
            'spa': 'poker-eng'
        },
        newsCategorySlugs: {
            'spa': 'poker-eng'
        }
    },
    'chinese-poker': {
        newsCategorySlugs: {
            'spa': 'chinese-poker-eng'
        }
    }
});

CASINO.constant('SkinCConfig', {
    cUrlPrefix: 'http://casino.vbet.com',
    cGamesUrl: '/global/v-play.php',
    cUrl: '/global/casinoGamesLoad.php',
    main : {
        partnerID: '4',
        multiViewEnabled: true,
        filterByProviderEnabled: true
    },
    login: {
        url: '/global/partners/rml.php'
    },
    balance: {
        url: '/global/cashier/cashier.php'
    },
    bonusPopUpUrl: '' // youtube video url for showing bonus video
});
