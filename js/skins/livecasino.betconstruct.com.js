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
        skin: 'livecasino.betconstruct.com',
        enableSportsbookLayoutSwitcher: true,
        sportsClassicLayout: true,
        fantasyEnabled: true,
        ogwilEnabled: false,
        casinoEnabled: false,
        pokerEnabled: false,
        liveDealerEnabled: true,
        financialsEnabled: false,
        jackpotEnabled: false,
        poolBettingEnabled: false, //enable pool betting
        enableHeaderAnnouncement: false,
        showFavoriteGamesInSportList: true,
        showFinancialsInSportList: 222,   // false to hide,  any number to show (number is used as 'order' field to define it's position among sports)
        showVirtualsInSportList: 220,
        enableCasinoBalanceHistory: true, //enable casino balance history in top menu
        enableCasinoBetHistory: true, //enable casino balance history in top menu
        enablePrematchMultiView: true,
        virtualBettingEnabledInTopMenu: true,
        backGammonEnabledInTopMenu: true,
        beloteEnabledInTopMenu: true,
        ageRestrictionInFooter: 18,
        haveFaq: true,
        openHelpAsPopup: true,
        enablePromotions: true,
        aocEnabled: false, // enable AOC link in main menu
        enableFeedbackButton: true,
        availableVideoProviderIds: [1, 3, 5, 7, 8, 11, 12, 15, 999999],
        aocLink: "#/section/aoc",
        theVeryTopMenu: [{href: "#/fantasy/", label: "Fantasy Sports"}, {href: '#/financials/', label: "Financials"}, {href: "#/section/aoc", label: "AOC"}, {href: "#/freebet/", label: "Free Quiz"}, {href: "#/jackpot/", label: "Jackpot"}, {href: "#/promos/", label: "Promotions"}],
        newMenuItems: {liveCasino: true},
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
        availableCurrencies: ['USD', 'EUR', 'RUB', 'UAH', 'AMD'],
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
        enableEachWayBetting: true,
        enableHorseRacingBetSlip: true // SP, new bet types, etc.
    },
    'swarm': {

        url: [{ url: "https://swarm.vbet.com:8080"}],
        websocket: [{ url: "wss://swarm.vbet.com:8080/"}]
    },
    xDomainSlaves: '{"https://swarm.vbet.com:8080" : "/xdomain-proxy.html", "http://casino.vbet.com" : "/global/partners/xdomain/xDomainProxy.html"}',
    'payments': [
        {
            name: 'arca',
            displayName: "ArCa",
            canDeposit: true,
            canWithdraw: true,
            order: 103,
            depositInfoTextKey: 'deposit_info_arca', // translate##deposit_info_arca##
            withdrawInfoTextKey: 'withdraw_info_arca', // translate##withdraw_info_arca##
            withdrawFormFields: [
                {name: 'purse', type: 'text', label: 'Wallet id'},
                {name: 'name', type: 'text', label: 'Last name/surname, name, middle name'} //translate##Last name/surname, name, middle name##
            ],
            info: {
                "AMD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12, minDeposit: null, maxDeposit: null, minWithdraw: 500, maxWithdraw: 200000}
            }
        },
        {
            name: 'edram',
            displayName: "Edram",
            canDeposit: true,
            canWithdraw: true,
            order: 102,
            depositInfoTextKey: 'deposit_info_edram', // translate##deposit_info_edram##
            withdrawInfoTextKey: 'withdraw_info_edram', // translate##withdraw_info_edram##
            withdrawFormFields: [
                {name: 'id', type: 'text', label: 'Wallet id'}
            ],
            info: {
                "AMD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12, minDeposit: null, maxDeposit: null, minWithdraw: 0, maxWithdraw: 100000}
            }
        },
        {
            name: 'cash',
            displayName: "Cash",
            canDeposit: true,
            canWithdraw: true,
            hideDepositButton: true,
            order: 101,
            hasBetShops: true,
            depositInfoTextKey: 'deposit_info_cash', // translate##deposit_info_cash##
            withdrawInfoTextKey: 'withdraw_info_cash', // translate##withdraw_info_cash##
            info: {
                "AMD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12, minDeposit: null, maxDeposit: null, minWithdraw: 0, maxWithdraw: 100000}
            }
        },
        {
            name: 'telcell',
            displayName: "Telcell",
            canDeposit: true,
            canWithdraw: false,
            order: 104,
            depositInfoTextKey: 'deposit_info_telcell', // translate##deposit_info_telcell##
            onlyInfoTextOnDeposit: true, // this means that we won't show any form or button on deposit  page, including amount selection, only text
            info: {
                "AMD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: null, minDeposit: null, maxDeposit: null, minWithdraw: 0, maxWithdraw: null}
            }
        },
        {
            name: 'tandem',
            displayName: "Tandem",
            canDeposit: true,
            canWithdraw: false,
            order: 106,
            depositInfoTextKey: 'deposit_info_tandem', // translate##deposit_info_tandem##
            onlyInfoTextOnDeposit: true, // this means that we won't show any form or button on deposit  page, including amount selection, only text
            info: {
                "AMD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: null, minDeposit: null, maxDeposit: null, minWithdraw: 0, maxWithdraw: null}
            }
        },
        {
            name: 'btabank',
            displayName: "BTA Bank",
            canDeposit: true,
            canWithdraw: false,
            order: 108,
            depositInfoTextKey: 'deposit_info_btabank', // translate##deposit_info_btabank##
            onlyInfoTextOnDeposit: true, // this means that we won't show any form or button on deposit  page, including amount selection, only text
            info: {
                "AMD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: null, minDeposit: null, maxDeposit: null, minWithdraw: 0, maxWithdraw: null}
            }
        },
        {
            name: 'mobidram',
            displayName: "MobiDram",
            canDeposit: true,
            canWithdraw: false,
            order: 109,
            depositInfoTextKey: 'deposit_info_mobidram', // translate##deposit_info_mobidram##
            info: {
                "AMD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: null, minDeposit: null, maxDeposit: 200000, minWithdraw: 0, maxWithdraw: null}
            }
        },
        {
            name: 'paytopay',
            displayName: "PayToPay",
            canDeposit: true,
            canWithdraw: false,
            order: 110,
            depositInfoTextKey: 'deposit_info_paytopay', // translate##deposit_info_paytopay##
            onlyInfoTextOnDeposit: true, // this means that we won't show any form or button on deposit  page, including amount selection, only text
            info: {
                "AMD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: null, minDeposit: 1000, maxDeposit: null, minWithdraw: 0, maxWithdraw: null}
            }
        },
        //{
        //    name: 'vivaropoker',
        //    canDeposit: false,
        //    canWithdraw: true,
        //    order: 11,
        //    isTransferToLinkedService: true,
        //    linkedServiceType: 'poker',
        //    withdrawInfoTextKey: 'withdraw_info_topoker' // translate##withdraw_info_topoker##
        //
        //},
        {
            name: 'freevivaro',
            canDeposit: false,
            canWithdraw: true,
            withdrawPrefilledAmount: 250,
            order: 999,
            isTransferToLinkedService: true,
            linkedServiceType: 'free',
            withdrawInfoText: {
                arm: "Վիվարոն Ձեզ տալիս է հնարավորություն ամեն օր փոխանցել 250 դրամ Vivarobet.am-ի հաշվից դեպի Free.vivarobet.am: Այն կվերածվի 1000 վիրտուալ միավորի, որով կարող եք կատարել խաղադրույքներ Free.vivarobet.am կայքում:<br /> Ուշադրություն՝<br /> փոխանցումը կարող եք կատարել օրեկան 4 անգամ:",
                rus: "Виваро дает Вам возможность ежедневно переводить 250 драмов со счета Vivarobet.am на Free.vivarobet.am. Сумма будет превращена в 1000 виртуальных очков, которыми Вы сможете делать ставки на сайте Free.vivarobet.am. <br /> Внимание! <br /> Переводить сумму можно ежедневно 4 раза.",
                eng: "Vivaro gives you an opportunity to daily transfer 250 dram from your Vivarobet.am account to Free.vivarobet.am. The sum will be converted to 1000 virtual points, with which you can afterwards make bets on Free.vivarobet.am. <br /> Please, mind that you can make 4 transfers per day."
            }

        },
        {
            name: 'skrill1tap',
            info: {
                "USD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24, minDeposit: 5, maxDeposit: 1000, minWithdraw: 1, maxWithdraw: null},
                "EUR" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24, minDeposit: 5, maxDeposit: 1000, minWithdraw: 1, maxWithdraw: null},
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
            ],
            predefinedFields: {
                '1tap' : true
            }
        },
        {
            name: 'skrill',
            info: {
                "USD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24, minDeposit: 5, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "EUR" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 24, minDeposit: 5, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
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
            order: 3,
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
            order: 4,
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
            order: 5,
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
            order: 6,
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
            order: 26,
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
            order: 7,
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
            order: 8,
            depositInfoTextKey: 'deposit_info_centili' // translate##deposit_info_cash##
        }

    ],
    paymentByCurrency: {
        deposit: {
            'USD': ["skrill", "skrill1tap", "webmoney", "qiwi", "neteller", "moneta", "ukash", "ecocard"],
            'EUR': ["skrill", "skrill1tap", "webmoney", "qiwi", "neteller", "moneta", "ukash", "ecocard"],
            'RUB': ["webmoney", "qiwi", "moneta", "ecocard", "centili", "neteller", "ukash"],
            'UAH': ['webmoney', "ukash"],
            'AMD': ["edram", "arca", "telcell", "btabank", "mobidram", "paytopay", "tandem"]
        },
        withdraw: {
            'USD': ["skrill", "webmoney", "qiwi", "neteller", "moneta","ecocard"],
            'EUR': ["skrill", "webmoney", "qiwi", "neteller", "moneta", "ecocard"],
            'RUB': ["webmoney", "qiwi", "moneta", "neteller", "ecocard"],
            'UAH': ['webmoney'],
            'AMD': ['edram', 'arca']
        }
    }

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
            name: 'Tournaments',
            placement: 'other',   // if 'topmenu' top menu subitem will be added
            rootPageSlug: {
                'eng': 'tournament-eng',
                'rus': 'tournament-ru',
                'geo': 'tournament-geo',
                'spa': 'tournament-spa',
                'arm': 'tournament-arm'
            }
        },
        casinopromotions: {
            name: 'Promotion',
            placement: 'other',   // if 'topmenu' top menu subitem will be added
            rootPageSlug: {
                'eng': 'casinopromotions-eng',
                'geo': 'casinopromotions-geo',
                'spa': 'casinopromotions-spa',
                'rus': 'casinopromotions-rus',
                'arm': 'casinopromotions-arm'
            }
        },
        aoc: {
            name: 'AOC',
            placement: 'other',   // if 'topmenu' top menu subitem will be added
            enableCustomTemplate: {
                'poker': 'templates/poker/calculator.html'
            },
            rootPageSlug: {
                'eng': 'aoc-eng',
                'spa': 'aoc-spa',
                'geo': 'aoc-geo',
                'rus': 'aoc-rus',
                'arm': 'aoc-arm'
            },
            bannersOnPages: {
                'get-started': {
                    'eng': 'aoc-start-eng',
                    'spa': 'aoc-start-spa',
                    'geo': 'aoc-start-geo',
                    'rus': 'aoc-start-rus',
                    'arm': 'aoc-start-arm'
                },
                backgammon: {
                    'eng': 'aoc-backgammon-eng',
                    'spa': 'aoc-backgammon-spa',
                    'geo': 'aoc-backgammon-geo',
                    'rus': 'aoc-backgammon-rus',
                    'arm': 'aoc-backgammon-arm'
                },
                belote: {
                    'eng': 'aoc-belote-eng',
                    'spa': 'aoc-belote-spa',
                    'geo': 'aoc-belote-geo',
                    'rus': 'aoc-belote-rus',
                    'arm': 'aoc-belote-arm'
                },
                poker: {
                    'eng': 'aoc-poker-eng',
                    'geo': 'aoc-poker-geo',
                    'spa': 'aoc-poker-spa',
                    'rus': 'aoc-poker-rus',
                    'arm': 'aoc-poker-arm'
                }
            }
        }
    },
    help: {
        pageSlugs: {
            'spa': 'help-root-eng',
            'geo': 'help-root-eng'
        },
        popupPageSlugs: {
            'spa': 'help-popup-eng',
            'geo': 'help-popup-eng'
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
        casino: {
            'spa' : 'casino-eng'
        }
    },
    'chinese-poker': {
        newsCategorySlugs: {
            'spa': 'chinese-poker-eng',
            'geo': 'chinese-poker-eng'
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
        filterByProviderEnabled: true,
        storedbonusPopUpLifetime: 259200000 // 3days
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
    bonusPopUpUrl: false
});
