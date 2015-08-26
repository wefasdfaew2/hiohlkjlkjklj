/*
 *   All config values specified here will be merged with main config and will override its values
 *
 */
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "Vivarocasino - Casino, Live Casino, OGWIL, Financials",
            "rus": "Vivarocasino - Casino, Live Casino, OGWIL, Financials",
            "arm": "Vivarocasino - Casino, Live Casino, OGWIL, Financials"
        },
        site_name: "Vivaro",
        skin: 'free.vivarobet.am',
        googleAnalyticsId: 'UA-29242337-39',
        localStorageKeyNamePrefix: 'free.vivarobet.am_',
        enableSportsbookLayoutSwitcher: true,
        sportEnabled: false,
        casinoEnabled: true,
        pokerEnabled: false,
        fantasyEnabled: false,
        ogwilEnabled: true,
        liveDealerEnabled: true,
        financialsEnabled: true,
        skillgamesEnabled: false,
        poolBettingEnabled: false, //enable pool betting
        freeBetEnabled: false,
        iphoneEnabled: false,
        casinoSavedGamesEnabled: false,
        enableHeaderAnnouncement: true,
        enableCasinoBalanceHistory: true, //enable casino balance history in top menu
        enableCasinoBetHistory: true,
        headerAnnouncementLink: 'http://www.vivarobet.am/#/?action=withdraw&system=freevivaro',
        headerAnnouncementTarget: '_blank',
        showFinancialsInSportList: false,   // false to hide,  any number to show (number is used as 'order' field to define it's position among sports)
        transferEnabled: false,
        showFavoriteGamesInSportList: true,
        videoEnabled: false,
        statsHostname: 'vivarobet.am',  // hostname for statistics. when clicking on game statistics icon, popup on this hostname is open,
        enableHpBannerInsteadLiveGame: true,
        redirectOnTablets:  false,
        poolBettingResultsUrlPrefix : 'http://flash.vivarobet.am/sites/default/public/toto/results/',
        sportsOnLeft: false,
        ageRestrictionInFooter: 18,
        enableFeedbackButton: true,
        homepagePageType: 'casino',
        balanceTypesToHideInHistory: ["7", "9", "12", "13", "14", "15"],
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
            'arm' : { 'short': 'HY', 'full': "Հայերեն"},
            'rus' : { 'short': 'RU', 'full': "Русский"}
        },
        about_company_text: {
            'eng' : "(c) vivarobet.am",
            'rus' : "(c) vivarobet.am",
            'arm' : "(c) vivarobet.am"
        },
        flashVersionLink:  null,
        oldVersionLink: null,
        liveChat: {
            isLiveAgent: true,
            liveAgentID: '61181374'
        },
        odnoklassnikiIntegration: {
            enable: true,
            settings: {
                clientId: '1107409152',
                scopeType: 'VALUABLE_ACCESS',
                responseType: 'token',
                redirectUri: 'http://free.vivarobet.am/odnoklassniki.html'
            }
        },
        facebookIntegration: {
            enable: true,
            appId: '357210747789595'
        },
        disableDepositPage: true,
        disableWithdrawPage: true,
        balanceDefaultPage: 'history',
        casinoBalanceDefaultPage: 'casinoBalanceHistory',
        site_id: "801",
        enableSameDayGamesInTimezone: "+04:00",
        registration: {
            askAboutSpecifyingLoginPass: true,
            defaultCurrency: 'VC',
            restrictedCountries: {},
            requireDocNumber: true,
            requireSmsValidation: false,
            minimumAllowedAge: 18,
            minimumAllowedPokerAge: 21,
            requirePhoneNumber: true,
            phoneNumberPattern: /^0(91|99|96|43|55|95|41|93|94|77|98|49)[0-9]{6}$/,
            phoneNumberLength: '9',
            replacePhoneNumberAreaCode: {'from': /^0/, 'to': '374'},
            defaultCountryCode: 'AM'
        },
        personalDetails: {
            readOnlyFields: ['user_id', 'first_name', 'sur_name', 'birth_date', 'gender', 'email','doc_number'],
            editableFields: ['country_code', 'city', 'address', 'phone_number'],
            requiredEditableFields: ['country_code', 'city', 'address']
        },
        poolBettingCurrencyName: 'AMD', // currency in which jackpot will be displayed in top menu
        availableCurrencies: ['VC'],
        balanceFractionSize: 0, // number of decimal places to round the balance value to(when displaying)
        facebookUrl: "https://www.facebook.com/vivarobetarmenia",
        googlePlusUrl: "https://plus.google.com/+VivaropokerAm",
        twitterAccount: 'vivaro_bet',
        twitterHashTag: 'vivaro',
        showPaymentSystemsInFooter: true,
        freeWinnersEnabled: true,
        additionalMenuItems: [
            {
                arm: {title: "500 միավոր", link: "#/winners/", cssclass: 'results'},
                rus: {title: "500 очков", link: "#/winners/", cssclass: 'results'},
                eng: {title: "500 points", link: "#/winners/", cssclass: 'results'}
            }
        ]
    },
    'customTemplates': ['free/main.html'],
    'swarm': {
        // TODO: switch to SSL once server is ready
        url: [
            { url: "http://swarm.vivarobet.am:8082/", weight: 1},
            { url: "http://swarm-ye1.vivarobet.am:8082/", weight: 4},
            { url: "http://swarm-ye2.vivarobet.am:8082/", weight: 3}
        ],
        websocket: [
            { url: "ws://swarm.vivarobet.am:8082/", weight: 1},
            { url: "ws://swarm-ye1.vivarobet.am:8082/", weight: 4},
            { url: "ws://swarm-ye2.vivarobet.am:8082/", weight: 3}
        ]
    },
    xDomainSlaves: '{"http://swarm.vivarobet.am:8082" : "/xdomain-proxy.html", "http://swarm-ye1.vivarobet.am:8082" : "/xdomain-proxy.html" , "http://swarm-ye2.vivarobet.am:8082" : "/xdomain-proxy.html" }', //has to be JSON string

    'env': {
        showFifaCountdown: false,
        lang: 'arm'
    },
    'betting': {
        bet_source: '42'
    },
    'payments': []

});

CMS.constant('SkinWPConfig', {
    seoFilesGenerationActive: false,
    wpUrl: 'http://free.vivarocasino.am/json',  // WordpResss instance serving pages, banners
    wpNewsUrl: {
        main: 'http://free.vivarocasino.am/newsjson'
    },  // WordpResss instance serving news
    wpBaseHost: 'free.vivarocasino.am',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host
    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {
    cUrlPrefix: 'http://games.free.vivarocasino.am',
    cGamesUrl: '/global/v-play.php',
    cUrl: '/global/casinoGamesLoad.php',
    main : {
        partnerID: '801',
        multiViewEnabled: true,
        funModeEnabled: true,
        downloadEnabled: false,
        showAllGamesOnHomepage: true,
        numberOfRecentGames: 100, //initial number of recent games to show
        numberOfRecentGamesWide: 140 //initial number of recent games to show in wide screen mode
    },
    login: {
        url: '/global/partners/rml.php'
    },
    balance: {
        url: '/global/cashier/cashier.php'
    }
});