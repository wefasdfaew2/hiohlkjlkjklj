/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "Free 2winbet - Sport betting, Poker, Casino, Online Games",
            "spa": "Free 2winbet - Sport betting, Poker, Casino, Online Games",
            "rus": "Букмекерская контора Free 2winbet - Онлайн ставки, покер, казино, онлайн игры",
            "arm": "Free 2winbet բուքմեյքերական ընկերություն - Օնլայն խաղադրույքներ, պոկեր, կազինո, նարդի, օնլայն խաղեր"
        },
        site_name: "Free.2winbet.gr",
        skin: 'free.2winbet.gr',
        googleAnalyticsId: 'UA-29242337-7',
        yandexMetricaId: '24705809',
        enableSportsbookLayoutSwitcher: false,
        fantasyEnabled: true,
        casinoEnabled: true,
        pokerEnabled: true,
        liveDealerEnabled: false,
        financialsEnabled: true,
        poolBettingEnabled: false, //enable pool betting
        enableHeaderAnnouncement: false,
        showFavoriteGamesInSportList: true,
        enableCasinoBalanceHistory: true, //enable casino balance history in top menu
        enableCasinoBetHistory: true, //enable casino balance history in top menu
        disableHomepageNews: true, //disable news block on homepage
        enableNews: false, // enable news on sport page
        videoEnabled: false, //enable game videos
        ageRestrictionInFooter: 21,
        remindToRenewBalance: {
            enabled: true,
            page: 'renew',
            threshold: 10,
            interval: 14400000 //4 hours
        },
        facebookIntegration: {
            enable: true,
            appId: '679441398804517'
        },  //enable facebook signup/signin
        enableInvites: true,  //enable invite functionality
        disableDepositPage: true,
        disableWithdrawPage: true,
        balanceDefaultPage: 'renew',
        enableFreeRenew: true,
//        enableCasinoBalanceHistory: true,

        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English", order: 2},
            'gre' : { 'short': 'GR', 'full': "Ελληνική", order: 1},
            'pol' : { 'short': 'PL', 'full': "Polski", order: 5},
            'cze' : { 'short': 'CZ', 'full': "Český", order: 6},
            'ger' : { 'short': 'DE', 'full': "Deutsch", order: 4},
            'ita' : { 'short': 'IT', 'full': "Italiano", order: 3},
            'por' : { 'short': 'PT', 'full': "Português", order: 8},
            'spa' : { 'short': 'ES', 'full': "Español", order: 7},
            'rus' : { 'short': 'RU', 'full': "Русский", order: 9}
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
        redirectOnTablets: false,
        poolBettingCurrencyName: 'VC',
        poolBettingResultsUrlPrefix : 'http://www.vbet.com/results/',
        about_company_text: {
            'eng' : "",
            'spa' : "",
            'rus' : "",
            'arm' : ""
        },
        flashVersionLink: false,
        oldVersionLink: false,
        liveChat: {
			isSfChat: true,
            siteId: 32814,
            codePlan: 357
        },
        site_id: "804",
        registration: {
            minimumAllowedAge: 21,
            defaultCurrency: 'VC',
            defaultCountryCode: 'US',
            restrictedCountries: {'AM' : 'http://www.vivaro.am'},
            mailIsSentAfterRegistration: true
        },
        personalDetails : {
            readOnlyFields: ['user_id', 'first_name', 'sur_name', 'gender', 'email'],
            editableFields: ['country_code', 'city', 'address', 'phone_number'],
            requiredEditableFields: []
        },
        availableCurrencies: ['VC'],
        facebookUrl: "https://www.facebook.com/freevbetcom",
        googlePlusUrl: "https://plus.google.com/u/0/b/111434329116562771640/111434329116562771640/about",
        youtubeUrl: "https://www.youtube.com/channel/UCZAIxku-9tb4FbguDMH14qw",
        vkontakteUrl: "http://vk.com/vbetcom",
        twitterAccount: 'Free_Vbet',
        twitterHashTag: 'freevbet'
    },
    'env': {
        showFifaCountdown: false,
        oddFormat: 'american'
    },
    'betting': {
        disableMaxBet: true
    },
    customTemplates: ["homepage/main.html", "slider/renew.html", "slider/invite.html", "headerannouncements.html"],
    'swarm': {
        url: [{ url: "http://swarm.vbet.com:8083"}],
        websocket: [{ url: "ws://swarm.vbet.com:8083/"}]
    },
    poker: {
        instantPlayLink: 'http://onlinepoker.betconstruct.com:8081/poker-client/poker/freevbet',
        downloadLink: {
            windows: 'http://poker-updates.betconstruct.com/freevbet/Free%20Vbet.exe',
            mac: 'http://poker-updates.betconstruct.com/freevbet/Free%20Vbet.dmg',
            linux: 'http://poker-updates.betconstruct.com/freevbet/Free%20Vbet.tar.gz'
        }
    },
    xDomainSlaves: '{"http://swarm.vbet.com:8083" : "/xdomain-proxy.html", "http://casino.vbet.com" : "/global/partners/xdomain/xDomainProxy.html"}',
    'payments': []

});

CMS.constant('SkinWPConfig', {
    wpUrl: 'http://free.2winbet.gr/json',  // WordpResss instance serving pages, banners
    wpNewsUrl: {
        main: 'http://www.vbet.com/json'
    },  // WordpResss instance serving news
    wpBaseHost: 'free.2winbet.gr',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host
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
    cUrlPrefix: 'http://games.free.2winbet.gr',
    cGamesUrl: '/global/v-play.php',
    cUrl: '/global/casinoGamesLoad.php',
    main : {
        partnerID: '804',
        multiViewEnabled: true,
        funModeEnabled: false,
        downloadEnabled: true
    },
    login: {
        url: '/global/partners/rml.php'
    },
    balance: {
        url: '/global/cashier/cashier.php'
    }
});
