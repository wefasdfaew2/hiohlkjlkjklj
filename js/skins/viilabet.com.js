/*
 *   All config values specified here will be merged with main config and will override its values
 *
 */

/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "Vbet - Sport betting, Poker, Casino, Online Games",
            "jpn": "Vbet - Sport betting, Poker, Casino, Online Games",
            "kor": "Vbet - Sport betting, Poker, Casino, Online Games",
            "chi": "Vbet - Sport betting, Poker, Casino, Online Games",
            "tur": "Vbet - Sport betting, Poker, Casino, Online Games",
            "spa": "Vbet - Sport betting, Poker, Casino, Online Games",
            "por": "Vbet - Sport betting, Poker, Casino, Online Games",
            "geo": "Vbet - Sport betting, Poker, Casino, Online Games",
            "rus": "Букмекерская контора Vbet - Онлайн ставки, покер, казино, онлайн игры",
            "arm": "Vbet բուքմեյքերական ընկերություն - Օնլայն խաղադրույքներ, պոկեր, կազինո, նարդի, օնլայն խաղեր"
        },
        site_name: "VBET",
        skin: 'vbet.com',
        geoIPLangSwitch: true,
        oldHomepage: false,
        enableLandingPage: false,
        enableAccountVerification: true,
        enableSportsbookLayoutSwitcher: true,
        availableSportsbookViews: {modern: true, classic: true, asian: true},
        sportsClassicLayout: true,
        googleAnalyticsId: 'UA-29242337-7',
        yandexMetricaId: '24705809',
        fantasyEnabled: true,
        ogwilEnabled: true,
        casinoEnabled: true,
        liveCalendarEnabled: true,
        pokerEnabled: true,
        enableNewPoker: true,
        liveDealerEnabled: true,
        financialsEnabled: true,
        statsHostname: 'http://statistics.betconstruct.com/#/en/external/page/h2h',  // hostname for statistics. when clicking on game statistics icon, popup on this hostname is open,
        headerStatisticsLink: "http://statistics.betconstruct.com/vbet#/en/statistics/competition/566/5358/entity/454",
        enableH2HStat: true,
        jackpotEnabled: true,
        poolBettingEnabled: true, //enable pool betting
        enableHeaderAnnouncement: false,
        showFavoriteGamesInSportList: true,
        showFinancialsInSportList: 222,   // false to hide,  any number to show (number is used as 'order' field to define it's position among sports)
        freeBetEnabled: true,
        showEachWay: true,
        logoutTime: 900, // seconds , set to 0 or false to disable
        showVirtualsInSportList: 5,
        enableCasinoBalanceHistory: true, //enable casino balance history in top menu
        enableCasinoBetHistory: true, //enable casino balance history in top menu
        enableBonusCancellation: true, // enable canceling bonus
        enablePrematchMultiView: true,
        virtualBettingEnabledInTopMenu: false,
        virtualSportEnabledInTopMenu: true,
        backGammonEnabledInTopMenu: true,
        beloteEnabledInTopMenu: true,
        showWithdrawRequestsTab: true,
        headerMessageIcon: {
            enabled: true,
            alwaysShow: true
        },
        ageRestrictionInFooter: 18,
        haveFaq: true,
        openHelpAsPopup: true,
        enablePromotions: true,
        aocEnabled: true, // enable AOC link in main menu
        enableFeedbackButton: true,
        availableVideoProviderIds: [1, 3, 5, 7, 8, 11, 12, 15, 16, 999999],
        aocLink: "#/section/aoc",
        theVeryTopMenu: [{href: "#/fantasy/", label: "Fantasy Sports"}, {
            href: '#/financials/',
            label: "Financials"
        }, {href: "#/section/aoc", label: "AOC"}, {href: "#/freebet/", label: "Free Quiz"}, {
            href: "#/jackpot/",
            label: "Jackpot"
        }, {href: "#/promos/", label: "Promotions"}],
        newMenuItems: {liveCasino: true},
        enableDepositLimits: false,
        balanceDefaultPage: 'deposit',
        showPointsBalance: true,
        allowTimeFormatChange: true,
        menuOrder: ['live', 'sport', 'virtual-sports', 'belote', 'backgammon', 'virtual-betting', 'casino', 'poolbetting', 'poker', 'livedealer', 'games', 'ogwil'],
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng': {'short': 'EN', 'full': "English", order: 1},
            'spa': {'short': 'ES', 'full': "Español", order: 2},
            'arm': {'short': 'HY', 'full': "Հայերեն", order: 4},
            'rus': {'short': 'RU', 'full': "Русский", order: 3},
            'por': {'short': 'PT', 'full': "Português", order: 5},
            'tur': {'short': 'TR', 'full': "Türkçe", order: 6},
            'kor': { 'short': 'KO', 'full': "한국의", order: 7},
            'jpn': { 'short': 'JP', 'full': "日本語", order: 8},
            'chi': { 'short': 'CH', 'full': "Chinese", order: 9},
            'geo': {'short': 'KA', 'full': "ქართული", order: 10}
        },
        twitterFeed: {
            enabled: true,
            refreshInterval: 300000, //5min
            hashTag: 'live', //only tweets having this hashtag will be shown
            count: 20, //count of tweets to load (before filtering with hashtag)
            user: {
                'arm': 'vivaro_bet',
                'eng': 'vbet_com',
                'spa': 'vbet_com',
                'geo': 'vbet_com',
                'por': 'vbet_com',
                'tur': 'vbet_com',
                'kor': 'vbet_com',
                'jpn': 'vbet_com',
                'chi': 'vbet_com',
                'rus': 'livebettingru'
            }
        },
        remindToRenewBalance: {
            enabled: true,
            page: 'deposit',
            threshold: 0.5,
            interval: 14400000 //4 hours
        },
        redirectOnTablets: 'http://tablet.vbet.com/',
        poolBettingResultsUrlPrefix: 'http://www.vbet.com/results/',
        about_company_text: {
            'eng': "Vbet is operated by Radon B.V. registered in the Commercial register of Curacao no. 126922 and has a sublicense CIL pursuant to Master gaming License №5536/JAZ. Radon Limited DSLR Notaries (Suite 750), Ftieh St. Birkirkara Bypass, Birkirkara BKR 2940, Malta under the license of the fully owned Curacao N.V.",
            'chi': "Vbet is operated by Radon B.V. registered in the Commercial register of Curacao no. 126922 and has a sublicense CIL pursuant to Master gaming License №5536/JAZ. Radon Limited DSLR Notaries (Suite 750), Ftieh St. Birkirkara Bypass, Birkirkara BKR 2940, Malta under the license of the fully owned Curacao N.V.",
            'jpn': "Vbet is operated by Radon B.V. registered in the Commercial register of Curacao no. 126922 and has a sublicense CIL pursuant to Master gaming License №5536/JAZ. Radon Limited DSLR Notaries (Suite 750), Ftieh St. Birkirkara Bypass, Birkirkara BKR 2940, Malta under the license of the fully owned Curacao N.V.",
            'spa': "Vbet is operated by Radon B.V. registered in the Commercial register of Curacao no. 126922 and has a sublicense CIL pursuant to Master gaming License №5536/JAZ. Radon Limited DSLR Notaries (Suite 750), Ftieh St. Birkirkara Bypass, Birkirkara BKR 2940, Malta under the license of the fully owned Curacao N.V.",
            'geo': "Vbet is operated by Radon B.V. registered in the Commercial register of Curacao no. 126922 and has a sublicense CIL pursuant to Master gaming License №5536/JAZ.  Radon Limited DSLR Notaries (Suite 750), Ftieh St. Birkirkara Bypass, Birkirkara BKR 2940, Malta under the license of the fully owned Curacao N.V.",
            'por': "Vbet is operated by Radon B.V. registered in the Commercial register of Curacao no. 126922 and has a sublicense CIL pursuant to Master gaming License №5536/JAZ.",
            'tur': "Vbet is operated by Radon B.V. registered in the Commercial register of Curacao no. 126922 and has a sublicense CIL pursuant to Master gaming License №5536/JAZ.",
            'kor': "Vbet is operated by Radon B.V. registered in the Commercial register of Curacao no. 126922 and has a sublicense CIL pursuant to Master gaming License №5536/JAZ.",
            'rus': "Vbet управляется со стороны Radon B.V., который зарегистрирован в Коммерческом регистре Кюрасао под номером 126922 и имеет сублицензию CIL в соответствии с Master gaming License #5536/JAZ. Radon Limited DSLR Notaries (Suite 750), Ftieh St. Birkirkara Bypass, Birkirkara BKR 2940, Malta under the license of the fully owned Curacao N.V.",
            'arm': "Vbet –ը գործում է Radon BV-ի անունից, որը գրանցված է Կյուրասաոի առեւտրային ռեգիստրում 126922 համարով և ունի CIL ենթաարտոնագիր՝ համաձայն Master gaming License #5536/JAZ:  Radon Limited DSLR Notaries (Suite 750), Ftieh St. Birkirkara Bypass, Birkirkara BKR 2940, Malta under the license of the fully owned Curacao N.V."
        },
        //flashVersionLink: {
        //    eng: 'http://inplay.vbet.com/inplay/?language=en',
        //    rus: 'http://inplay.vbet.com/inplay/?language=ru',
        //    arm: 'http://inplay.vbet.com/inplay/?language=hy'
        //},
        oldVersionLink: false,
        additionalLink: {
            eng: {link: 'http://free.vbet.com/#/?lang=eng', text: 'Free Vbet'},
            chi: {link: 'http://free.vbet.com/#/?lang=eng', text: 'Free Vbet'},
            jpn: {link: 'http://free.vbet.com/#/?lang=eng', text: 'Free Vbet'},
            tur: {link: 'http://free.vbet.com/#/?lang=eng', text: 'Free Vbet'},
            kor: {link: 'http://free.vbet.com/#/?lang=eng', text: 'Free Vbet'},
            spa: {link: 'http://free.vbet.com/#/?lang=spa', text: 'Free Vbet'},
            geo: {link: 'http://free.vbet.com/#/?lang=geo', text: 'Free Vbet'},
            por: {link: 'http://free.vbet.com/#/?lang=por', text: 'Free Vbet'},
            rus: {link: 'http://free.vbet.com/#/?lang=rus', text: 'Free Vbet'},
            arm: {link: 'http://free.vbet.com/#/?lang=arm', text: 'Free Vbet'}
        },
        liveChat: {
            isLiveAgent: true,
            liveAgentID: 'b0170f5a'
        },

        site_id: "13",
        registration: {
            defaultCurrency: 'USD',
            restrictedCountries: {
                'AM': 'http://www.vivaro.am',
                'GB': null,
                'FR': null,
                'US': null,
                'DK': null,
                'EE': null,
                'FM': null
            },
            mailIsSentAfterRegistration: true,
            securityQuestion: {
                enabled: true
            }
        },
        loadPopularGamesForSportsBook: {
            enabled: true,
            level: 'competition',  // game or competition
            type: 'promoted' // promoted or favorite
            //testSiteId: 23 // for debug purpose set to false by default
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
        instagramUserName: "vbet_official",
        twitterAccount: 'Vbet_com',
        twitterHashTag: 'vbet'
    },
    regConfig: {
        "rightCol": [{
            "title": "Country",
            "name": "country_id",
            "type": "select",
            "required": true,
            "classes": "city-form-block new",
            "customAttrs": [{"ng-include": "getTemplate(\"templates/slider/countries.html\")"}, {"ng-init": "preFillRegionalData()"}, {"ng-change": "checkIfCountryIsRestricted();"}],
            "customValidation": "<div class=\"city-form-block\" ng-class=\"{error: countryIsRestricted}\"> <div class=\"form-error-text\"> <div class=\"error-icon-f\"></div><p trans ng-show=\"countryIsRestricted\">Registration on this site is not permitted in selected country.</p><p ng-show=\"altUrl4RestrictedCountry\"><span trans>You can register here:</span> <a href=\"{{altUrl4RestrictedCountry}}\">{{altUrl4RestrictedCountry}}</a></p></div>"
        }, {
            "title": "City",
            "name": "city",
            "placeholder": "Enter here",
            "type": "text",
            "required": true,
            "classes": "registration-form-city city",
            "customAttrs": [{"required": "required"}],
            "validation": [{"name": "required", "message": "This field is required"}]
        }, {
            "title": "Address",
            "name": "address",
            "type": "text",
            "placeholder": "Enter here",
            "required": true,
            "classes": "form-text",
            "customAttrs": [{"required": "required"}],
            "validation": [{"name": "required", "message": "This field is required"}]
        }, {
            "title": "Contact number",
            "name": "phone_code",
            "type": "text",
            "required": true,
            "classes": "form-text phone-code",
            "customAttrs": [{"country-code-validate": ""}, {"deValidate": ""}, {"ng-maxlength": "5"}, {"required": "required"}, {"prevent-input": "[^0-9]+"}],
            "validation": [{"name": "countryCode", "message": "Country code is not correct"}, {
                "name": "required",
                "message": "Country code is not correct"
            }]
        }, {
            "title": "",
            "name": "phone_number",
            "type": "text",
            "required": true,
            "placeholder": "Enter number",
            "hasCustomHtml": true,
            "classes": "reg-form-input-number phone_number",
            "customAttrs": [{"ng-pattern": "/^[0-9 ]+$/"}, {"required": "required"}, {"prevent-input": "/^[\\S ]+$/"}],
            "validation": [{"name": "invalid", "message": "Invalid phone number"}, {
                "name": "duplicate",
                "message": "Duplicate phone number"
            }, {"name": "failedsms", "message": "Failed to send sms"}, {
                "name": "required",
                "message": "This field is required"
            }, {
                "name": "pattern",
                "message": "Please, enter valid phone number: only digits are allowed - no spaces, letters and/or symbols"
            }]
        }, {
            "title": "Currency",
            "name": "currency_name",
            "type": "select",
            "required": true,
            "classes": "select-block big",
            "customAttrs": [{"ng-options": "c for c in  conf.availableCurrencies track by c"}, {"ng-disabled": "currencyDisabled"}],
            "validation": []
        }, {
            "title": "Promo code",
            "name": "promo_code",
            "type": "text",
            "required": false,
            "placeholder": "Enter here",
            "classes": "form-text",
            "customAttrs": [{"ng-disabled": "hasPromoCode"}],
            "validation": []
        }, {
            "title": "Security question",
            "name": "security_question",
            "type": "select",
            "required": true,
            "classes": "select-block big",
            "customAttrs": [{'ng-init': 'registrationData.security_question = conf.registration.securityQuestion.questions[0]'}],
            "optionsData": "<option ng-repeat=\"q in conf.registration.securityQuestion.questions track by $index\" value=\"{{q| translate}}\">{{q| translate}}</option>",
            "validation": []
        }, {
            "title": "Security answer",
            "name": "security_answer",
            "type": "text",
            "required": true,
            "placeholder": "Enter here",
            "classes": "form-seq-quest",
            "customAttrs": [{"required": "required"}],
            "validation": [{"name": "required", "message": "This field is required"}]
        }]
    },
    'env': {
        showFifaCountdown: false,
        preMatchMultiSelection: false
    },
    'betting': {
        enableExpressBonus: false,
        expressBonusType: 2, //1: regular bonus 2,3,4,5..% ; 2: 2-5,10,15,20,25,30,30..30 %;
        enableEachWayBetting: true,
        enableHorseRacingBetSlip: true // SP, new bet types, etc.
    },
    'swarm': {

        url: [{url: "https://swarm.vbet.com"}],
        websocket: [{url: "wss://swarm.vbet.com/"}]
    },
    poker: {
        instantPlayLink: 'http://onlinepoker.betconstruct.com:8081/poker-client/poker/vbet',
        instantPlayTarget: '',
        downloadLink: {
            '@replace': true,
            windows: 'http://poker-updates.betconstruct.com/vbet/Vbet%20Poker.exe',
            mac: 'http://poker-updates.betconstruct.com/vbet/Vbet%20Poker.dmg',
            android: 'javascript:alert("Coming soon")'
        }
        /*betaDownloadLink: {
            windows: 'http://vbet.rhinobit.eu/downloadFile.php?do=xp',
            linux: 'http://vbet.rhinobit.eu/en/get-started/cardroom-download',
            mac: 'http://vbet.rhinobit.eu/downloadFile.php?do=mac'
        }*/
    },
    belote: {
        instantPlayTarget: ''
    },
    backgammon: {
        instantPlayTarget: '',
        downloadLink: {
            windows: 'http://casino.vbet.com/nardi/VGammon-1.1.27-Setup.exe'
        }
    },
    xDomainSlaves: '{"https://swarm.vbet.com" : "/xdomain-proxy.html", "http://casino.vbet.com" : "/global/partners/xdomain/xDomainProxy.html"}',
    'payments': [
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
            //stayInSameTabOnDeposit: true, //will submit external "confirm" form in same tab
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
            name: 'netellernew',
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
                {name: 'email', type: 'text', label: 'Email'}, // translate##Account Id##
                {name: 'secure_id', type: 'text', label: 'Secure Id'}   // translate##Secure Id##
            ],
            withdrawFormFields: [
                {name: 'email', type: 'text', label: 'Email'} // translate##Account Id##
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
        },
        {
            name: 'wirecard',
            displayName: "WireCard",
            canDeposit: true,
            canWithdraw: false,
            order: 9,
            depositInfoTextKey: 'deposit_info_wirecard',
            info: {
                "USD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "EUR" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "RUB" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "UAH" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null}
            }
        },
        {
            name: 'wirecardnew',
            displayName: "WireCard",
            canDeposit: false,
            canWithdraw: true,
            order: 1,
            withdrawInfoText: 'withdraw_info_wirecard',
            withdrawFormFields: [
                {name: 'CreditCardNumber', type: 'text', label: 'CreditCardNumber', required: true},  // translate##Phone##
                {name: 'ExpirationYear', type: 'text', label: 'ExpirationYear', required: true},  // translate##Phone##
                {name: 'ExpirationMonth', type: 'text', label: 'ExpirationMonth', required: true},  // translate##Phone##
                {name: 'CardHolderName', type: 'text', label: 'CardHolderName', required: true}  // translate##Phone##
            ]

        },
        {
            name: 'yandex',
            displayName: "Yandex Money",
            canDeposit: true,
            canWithdraw: false,
            order: 10,
            depositInfoTextKey: 'deposit_info_yandex',
            withdrawInfoTextKey: 'withdraw_info_yandex',
            onlyInfoTextOnWithdraw: true, // this means that we won't show any form or button on deposit  page, including amount selection, only text
            info: {
                "USD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "EUR" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "RUB" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "UAH" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null}
            }
        },
        {
            name: 'yandexinvois',
            displayName: "Yandex Invoice",
            canDeposit: true,
            canWithdraw: false,
            order: 11,
            depositInfoTextKey: 'deposit_info_yandex',
            withdrawInfoTextKey: 'withdraw_info_yandex',
            onlyInfoTextOnWithdraw: true, // this means that we won't show any form or button on deposit  page, including amount selection, only text
            info: {
                "USD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "EUR" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "RUB" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "UAH" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null}
            }
        },
        {
            name: 'yandexbank',
            displayName: "Yandex Bank",
            canDeposit: true,
            canWithdraw: false,
            order: 12,
            depositInfoTextKey: 'deposit_info_yandex',
            withdrawInfoTextKey: 'withdraw_info_yandex',
            onlyInfoTextOnWithdraw: true, // this means that we won't show any form or button on deposit  page, including amount selection, only text
            info: {
                "USD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "EUR" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "RUB" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "UAH" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null}
            }
        },
        {
            name: 'yandexcash',
            displayName: "Yandex Cash",
            canDeposit: true,
            canWithdraw: false,
            order: 13,
            depositInfoTextKey: 'deposit_info_yandex',
            withdrawInfoTextKey: 'withdraw_info_yandex',
            onlyInfoTextOnWithdraw: true, // this means that we won't show any form or button on deposit  page, including amount selection, only text
            info: {
                "USD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "EUR" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "RUB" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "UAH" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null}
            }
        },
        {
            name: 'yandexprbank',
            displayName: "Yandex Promsvyazbank ",
            canDeposit: true,
            canWithdraw: false,
            order: 14,
            depositInfoTextKey: 'deposit_info_yandex',
            withdrawInfoTextKey: 'withdraw_info_yandex',
            onlyInfoTextOnWithdraw: true, // this means that we won't show any form or button on deposit  page, including amount selection, only text
            info: {
                "USD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "EUR" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "RUB" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "UAH" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null}
            }
        },
        {
            name: 'card',
            canDeposit: true,
            canWithdraw: false,
            displayName: "Card",
            order: 12,
            info: {
                "USD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: null, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "EUR" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: null, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "RUB" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: null, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "UAH" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: null, maxDeposit: null, minWithdraw: 1, maxWithdraw: null}
            },
            depositInfoText : {
                'arm': "Մուտքագրի՛ր ծածկագիրը և ստացի՛ր բոնուս",
                'rus': "Введите код и получите Ваш бонус",
                'eng': "Enter the code and get Your bonus",
                'tur': "Enter the code and get Your bonus",
                'kor': "Enter the code and get Your bonus",
                'spa': "Ingrese el código y obtine la bono",
                'por': "Ingrese el código y obtine la bono"
            },
            depositFormFields: [
                {name: 'pin_code', type: 'text', label: 'PinCode', required: true} // translate##PinCode##
            ],
            depositPrefilledAmount: 1 //amount field won't be shown, instead will send this number
        },
        {
            name: 'astropay',
            canDeposit: true,
            canWithdraw: true,
            displayName: "AstroPay",
            order: 13,
            info: {
                "USD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "EUR" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "RUB" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "UAH" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: 0.1, maxDeposit: null, minWithdraw: 1, maxWithdraw: null}
            },
            depositFormFields: [
                {name: 'x_card_num', type: 'text', maxlength: 16, label: 'Card Number'},  // translate##x_card_num##
                {name: 'x_card_code', type: 'text', maxlength: 4, label: 'Card code'},  // translate##x_card_code##
                {name: 'x_exp_date_mm', type: 'text', maxlength: 2, label: 'Expiry date(mm)'},  // translate##x_exp_date_yy##
                {name: 'x_exp_date_yy', type: 'text', maxlength: 4, label: 'Expiry date(yyyy)'}  // translate##x_exp_date_yy##
            ],
            depositInfoText: {
                'eng': 'AstroPay Card - our anonymous, virtual prepaid card and e-wallet, for customers who dont want to expose their personal information when making online transactions. Register for free, choose the value of the card you want to purchase and pay in local currency using the most popular payment methods in your country.It is an immediate solution. Simply purchase your card, make your payment and receive an e-mail with your AstroPay Card details ready for use.',
                'rus': 'AstroPay Card - наша анонимная, предоплаченная виртуальная карточка и электронный кошелек для пользователей, которые не хотят вскрывать свои личные данные при онлайн транзакциях.  Регистрируйтесь бесплатно, выбирайте величину карточки, которую хотите купить и платите местной валютой самыми популярными платежными методами в Вашей стране. Это быстрое решение. Просто купите карточку, осуществите платеж и получайте электронное письмо с готовыми к использованию данными Вашей карточки AstroPay.',
                'arm': 'AstroPay Card-ը մեր անանուն վիրտուալ նախօրոք վճարված քարտն ու էլեկտրոնային դրամապանակն է այն հաճախորդների համար, որոնք չեն ցանկանում բացահայտել իրենց ինքնությունը առցանց գործարքներ կատարելիս: Գրանցվեք անվճար, ընտրեք քարտի արժեքը և վճարեք տեղական տարադրամով Ձեր երկրում ամենատարածված վճարային տարբերակներով:  Քարտը գործում է անմիջապես: Պարզապես գնեք այն և կատարեք վճարումը, որպեսզի ստանաք AstroPay քարտի տվյալներով էլեկտրոնային նամակը:'
            },
            withdrawInfoText: {
                'eng': 'AstroPay Card - our anonymous, virtual prepaid card and e-wallet, for customers who dont want to expose their personal information when making online transactions. Register for free, choose the value of the card you want to purchase and pay in local currency using the most popular payment methods in your country.It is an immediate solution. Simply purchase your card, make your payment and receive an e-mail with your AstroPay Card details ready for use.',
                'rus': 'AstroPay Card - наша анонимная, предоплаченная виртуальная карточка и электронный кошелек для пользователей, которые не хотят вскрывать свои личные данные при онлайн транзакциях.  Регистрируйтесь бесплатно, выбирайте величину карточки, которую хотите купить и платите местной валютой самыми популярными платежными методами в Вашей стране. Это быстрое решение. Просто купите карточку, осуществите платеж и получайте электронное письмо с готовыми к использованию данными Вашей карточки AstroPay.',
                'arm': 'AstroPay Card-ը մեր անանուն վիրտուալ նախօրոք վճարված քարտն ու էլեկտրոնային դրամապանակն է այն հաճախորդների համար, որոնք չեն ցանկանում բացահայտել իրենց ինքնությունը առցանց գործարքներ կատարելիս: Գրանցվեք անվճար, ընտրեք քարտի արժեքը և վճարեք տեղական տարադրամով Ձեր երկրում ամենատարածված վճարային տարբերակներով:  Քարտը գործում է անմիջապես: Պարզապես գնեք այն և կատարեք վճարումը, որպեսզի ստանաք AstroPay քարտի տվյալներով էլեկտրոնային նամակը:'
            },
            //withdrawInfoTextKey: 'withdraw_info_astropay', // translate##withdraw_info_astropay##
            withdrawFormFields: [
                {name: 'email', type: 'text', label: 'Email'}
            ]
        },
        {
            name: 'DengiOnline_LiqPay',
            canDeposit: true,
            canWithdraw: false,
            order: 14,
            depositInfoText:  {
                eng : "",
                rus : "Liqpay - это электронная платежная система, которая представляет собой универсальный платежный инструмент для расчетов за товары и услуги в интернет-магазинах. Это платежная система, которая позволяет легко и быстро отправлять деньги с пластиковых карт VISA или MasterCard на виртуальный счет в системе «LiqPAY». Виртуальный счет в системе «LiqPAY» - это номер мобильного телефона в международном формате. Вывод денег с виртуального счета в системе «LiqPAY» возможен только на пластиковые карты VISA."
            }
        },
        {
            name: 'DengiOnline_EasyPay',
            canDeposit: true,
            canWithdraw: false,
            order: 15,
            depositInfoText:  {
                eng : "",
                rus : "Как оплачивать услуги за EasyPay: 1. Пользователь на сайте выбирает оплата при помощи EasyPay. 2. Заполняет предлагаемый счет. 3. Входит в свой электронный кошелек EasyPay и оплачивает счет в разделе 'Оплата'.<br />Минимальная сумма пополнения: 50 RUR"
            }
        },
        {
            name: 'unionpay',
            canDeposit: true,
            canWithdraw: false,
            displayName: "UnionPay",
            order: 16,
            info: {
                "USD" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: null, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "EUR" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: null, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "RUB" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: null, maxDeposit: null, minWithdraw: 1, maxWithdraw: null},
                "UAH" : { depositFee: 0, withdrawFee: 0, depositProcessTime: 0, withdrawProcessTime: 12,  minDeposit: null, maxDeposit: null, minWithdraw: 1, maxWithdraw: null}
            },
            depositFormFields: [
                {name: 'bank_id', type: 'select', label: 'Bank Name', options: [{value: "1", text: "ICBC 中國工商銀行"}, {value: "2", text: "ABC China中國農業銀行"}, {value: "3", text: "Bank Of China中國銀行"}, {value: "4", text: "China Construction Bank 中國建設銀行"}, {value: "5", text: "Bank of Communications交通銀行"}, {value: "6", text: "China Everbright Bank中國光大銀行"}, {value: "7", text: "SPD Bank上海浦東發展銀行"}, {value: "8", text: "Bank of Beijing 北京銀行"}, {value: "9", text: "CGB china廣東發展銀行"}, {value: "10", text: "Ping An bank平安銀行"},
                    {value: "11", text: "Industrial Bank 興業銀行"}, {value: "12", text: "CMB China招商銀行"}, {value: "13", text: "Shenzhen Development Bank 深圳發展銀行"}, {value: "14", text: "POSTAL SAVINGS BANK OF CHINA中國郵政儲蓄銀行"}, {value: "15", text: "HUAXIA BANK華夏銀行"}, {value: "16", text: "China Minsheng Banking民生銀行"}]}  // translate##Email##
            ]
        }

    ],
    paymentByCurrency: {
        deposit: {
            'USD': ["skrill", "skrill1tap", "webmoney", "qiwi", "neteller", "moneta", "ukash", "ecocard", "wirecard", "yandex", "astropay"],
            'EUR': ["skrill", "skrill1tap", "webmoney", "qiwi", "neteller", "moneta", "ukash", "ecocard", "card", "wirecard", "yandex", "astropay"],
            'RUB': ["webmoney", "qiwi", "moneta", "ecocard", "centili", "neteller", "ukash", "wirecard", "yandex"],
            'UAH': ['webmoney', "ukash", "wirecard", "yandex"],
            'AMD': ["edram", "arca", "telcell", "btabank", "mobidram", "paytopay", "tandem"]
        },
        withdraw: {
            'USD': ["skrill", "webmoney", "qiwi", "neteller", "moneta", "ecocard", "astropay"],
            'EUR': ["skrill", "webmoney", "qiwi", "neteller", "moneta", "ecocard", "astropay"],
            'RUB': ["webmoney", "qiwi", "moneta", "neteller", "ecocard"],
            'UAH': ['webmoney'],
            'AMD': ['edram', 'arca']
        }
    }

});

CMS.constant('SkinWPConfig', {
    hiddenNewsCategoryIds: [],
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
                'chi': 'tournament-eng',
                'jpn': 'tournament-eng',
                'spa': 'tournament-spa',
                'por': 'tournament-por',
                'tur': 'tournament-eng',
                'kor': 'tournament-eng',
                'arm': 'tournament-arm'
            }
        },
        casinopromotions: {
            name: 'Promotion',
            placement: 'other',   // if 'topmenu' top menu subitem will be added
            rootPageSlug: {
                'eng': 'casinopromotions-eng',
                'chi': 'casinopromotions-eng',
                'jpn': 'casinopromotions-eng',
                'tur': 'casinopromotions-eng',
                'kor': 'casinopromotions-eng',
                'geo': 'casinopromotions-geo',
                'spa': 'casinopromotions-spa',
                'por': 'casinopromotions-por',
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
                'chi': 'aoc-eng',
                'jpn': 'aoc-eng',
                'tur': 'aoc-eng',
                'kor': 'aoc-eng',
                'spa': 'aoc-spa',
                'por': 'aoc-por',
                'geo': 'aoc-geo',
                'rus': 'aoc-rus',
                'arm': 'aoc-arm'
            },
            bannersOnPages: {
                'get-started': {
                    'eng': 'aoc-start-eng',
                    'chi': 'aoc-start-eng',
                    'jpn': 'aoc-start-eng',
                    'tur': 'aoc-start-eng',
                    'kor': 'aoc-start-eng',
                    'spa': 'aoc-start-spa',
                    'geo': 'aoc-start-geo',
                    'rus': 'aoc-start-rus',
                    'arm': 'aoc-start-arm'
                },
                backgammon: {
                    'eng': 'aoc-backgammon-eng',
                    'chi': 'aoc-backgammon-eng',
                    'jpn': 'aoc-backgammon-eng',
                    'tur': 'aoc-backgammon-eng',
                    'kor': 'aoc-backgammon-eng',
                    'spa': 'aoc-backgammon-spa',
                    'geo': 'aoc-backgammon-geo',
                    'rus': 'aoc-backgammon-rus',
                    'arm': 'aoc-backgammon-arm'
                },
                belote: {
                    'eng': 'aoc-belote-eng',
                    'chi': 'aoc-belote-eng',
                    'jpn': 'aoc-belote-eng',
                    'tur': 'aoc-belote-eng',
                    'kor': 'aoc-belote-eng',
                    'spa': 'aoc-belote-spa',
                    'geo': 'aoc-belote-geo',
                    'rus': 'aoc-belote-rus',
                    'arm': 'aoc-belote-arm'
                },
                poker: {
                    'eng': 'aoc-poker-eng',
                    'chi': 'aoc-poker-eng',
                    'jpn': 'aoc-poker-eng',
                    'tur': 'aoc-poker-eng',
                    'kor': 'aoc-poker-eng',
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
            'chi': 'help-root-eng',
            'jpn': 'help-root-eng',
            'por': 'help-root-eng',
            'tur': 'help-root-eng',
            'kor': 'help-root-eng',
            'geo': 'help-root-eng'
        },
        popupPageSlugs: {
            'spa': 'help-popup-eng',
            'chi': 'help-popup-eng',
            'jpn': 'help-popup-eng',
            'por': 'help-popup-eng',
            'tur': 'help-popup-eng',
            'kor': 'help-popup-eng',
            'geo': 'help-popup-eng'
        }
    },
    bannerSlugs: {
        homepageRotatingBanners: {
            'spa': 'homepage-selected-game-eng',
            'chi': 'homepage-selected-game-eng',
            'jpn': 'homepage-selected-game-eng',
            'por': 'homepage-selected-game-eng',
            'tur': 'homepage-selected-game-eng',
            'kor': 'homepage-selected-game-eng',
            'geo': 'homepage-selected-game-eng'
        },
        homepageBanners: {
            'spa': 'homepage-banners-eng',
            'chi': 'homepage-banners-eng',
            'jpn': 'homepage-banners-eng',
            'por': 'homepage-banners-eng',
            'tur': 'homepage-banners-eng',
            'kor': 'homepage-banners-eng',
            'geo': 'homepage-banners-eng'
        },
        homepageRightBanners: {
            'spa': 'homepage-banners-right-eng',
            'chi': 'homepage-banners-right-eng',
            'jpn': 'homepage-banners-right-eng',
            'por': 'homepage-banners-right-eng',
            'tur': 'homepage-banners-right-eng',
            'kor': 'homepage-banners-right-eng',
            'geo': 'homepage-banners-right-eng'
        },
        poker: {
            'spa' : 'poker-eng',
            'chi' : 'poker-eng',
            'jpn' : 'poker-eng',
            'por' : 'poker-eng',
            'tur' : 'poker-eng',
            'kor' : 'poker-eng',
            'geo' : 'poker-eng'
        },
        backgammon: {
            'spa' : 'backgammon-eng',
            'chi' : 'backgammon-eng',
            'jpn' : 'backgammon-eng',
            'por' : 'backgammon-eng',
            'tur' : 'backgammon-eng',
            'kor' : 'backgammon-eng',
            'geo' : 'backgammon-eng'
        },
        belote: {
            'spa' : 'belote-eng',
            'chi' : 'belote-eng',
            'jpn' : 'belote-eng',
            'por' : 'belote-eng',
            'tur' : 'belote-eng',
            'kor' : 'belote-eng',
            'geo' : 'belote-eng'
        },
        casino: {
            'spa' : 'casino-eng',
            'chi' : 'casino-eng',
            'jpn' : 'casino-eng',
            'por' : 'casino-eng',
            'tur' : 'casino-eng',
            'kor' : 'casino-eng',
            'geo' : 'casino-eng'
        },
        livecasino: {
            'spa' : 'livedealer-banners-eng',
            'chi' : 'livedealer-banners-eng',
            'jpn' : 'livedealer-banners-eng',
            'por' : 'livedealer-banners-eng',
            'tur' : 'livedealer-banners-eng',
            'kor' : 'livedealer-banners-eng',
            'geo' : 'livedealer-banners-eng'
        }
    },
    poker: {
        mainPageSlugs: {
            'spa': 'poker-eng',
            'chi': 'poker-eng',
            'jpn': 'poker-eng',
            'por': 'poker-eng',
            'tur': 'poker-eng',
            'kor': 'poker-eng',
            'geo': 'poker-eng'
        },
        leaderboardWidget: {        //leaderboard block on homepage
            'spa': 'homepage-poker-leaderboard-eng',
            'chi': 'homepage-poker-leaderboard-eng',
            'jpn': 'homepage-poker-leaderboard-eng',
            'por': 'homepage-poker-leaderboard-eng',
            'tur': 'homepage-poker-leaderboard-eng',
            'kor': 'homepage-poker-leaderboard-eng',
            'geo': 'homepage-poker-leaderboard-eng'
        },
        newsCategorySlugs: {
            'spa': 'poker-eng',
            'chi': 'poker-eng',
            'jpn': 'poker-eng',
            'por': 'poker-eng',
            'tur': 'poker-eng',
            'kor': 'poker-eng',
            'geo': 'poker-eng'
        },
        tournamentCategorySlugs: {
            'spa': 'poker-tournament-eng',
            'chi': 'poker-tournament-eng',
            'jpn': 'poker-tournament-eng',
            'por': 'poker-tournament-eng',
            'tur': 'poker-tournament-eng',
            'kor': 'poker-tournament-eng',
            'geo': 'poker-tournament-eng'
        }
    },
    backgammon: {
        mainPageSlugs: {
            'spa': 'backgammon-eng',
            'chi': 'backgammon-eng',
            'jpn': 'backgammon-eng',
            'por': 'backgammon-eng',
            'tur': 'backgammon-eng',
            'kor': 'backgammon-eng',
            'geo': 'backgammon-eng'
        }
    },
    belote: {
        mainPageSlugs: {
            'spa': 'belote-eng',
            'chi': 'belote-eng',
            'jpn': 'belote-eng',
            'por': 'belote-eng',
            'tur': 'belote-eng',
            'kor': 'belote-eng',
            'geo': 'belote-eng'
        }
    },
    promotions: {
        newsCategorySlugs: {
            'spa': 'promotions-eng',
            'chi': 'promotions-eng',
            'jpn': 'promotions-eng',
            'tur': 'promotions-eng',
            'kor': 'promotions-eng',
            'por': 'promotions-eng'
        }
    },
    'chinese-poker': {
        newsCategorySlugs: {
            'spa': 'chinese-poker-eng',
            'chi': 'chinese-poker-eng',
            'jpn': 'chinese-poker-eng',
            'por': 'chinese-poker-eng',
            'tur': 'chinese-poker-eng',
            'kor': 'chinese-poker-eng',
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
    liveCasino: {
        view3DEnabled: true
    },
    login: {
        url: '/global/partners/rml.php'
    },
    balance: {
        url: '/global/cashier/cashier.php'
    },
    jackpot: {
        url: '/jackpot/getJackpotData.php'
    },
    bonusPopUpUrl: false
});
