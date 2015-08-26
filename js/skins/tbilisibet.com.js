/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "tbilisibet.com",
            "rus": "tbilisibet.com"
        },
        site_name: "tbilisibet.com",
        site_id: "2",
        skin: 'tbilisibet.com',
        casinoEnabled: true,
        pokerEnabled: true,
        liveDealerEnabled: true,
        financialsEnabled: true,
        skillgamesEnabled: true,
        redirectOnTablets: 'http://tablet.tbilisibet.com/',
        videoEnabled: true,
        availableVideoProviderIds: [3, 999999],
        about_company_text: {
            'eng' : "(c) tbilisibet.com",
            'geo' : "(c) tbilisibet.com",
            'rus' : "(c) tbilisibet.com"
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
            'geo' : { 'short': 'KA', 'full': "ქართული"},
            'rus' : { 'short': 'RU', 'full': "Русский"}
        },
        registration: {
            defaultCurrency: 'GEL',
            restrictedCountries: {}
        },
        liveChat: {
			isSfChat:true,	
            siteId: 32814,
            codePlan: 357
        },
        availableCurrencies: ['GEL', 'USD'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: true, // enable news on sport page
        enableBannerUnderBetslip: false, // enable banner under the betslip,
        disableFooterNav: false, // disable wordpress content in footer,
        disableHomepageNews: false,
        copyrightSince: 2014
    },
    'env': {
        showFifaCountdown: false
    },
    'betting': {
        autoSuperBetLimit: {'GEL': 400} //if not false then set limit for each currency if stake is greater then Limit superbet is enabling automaticaly
    },
    'swarm': {
        url: [{ url: "http://swarm.betconstruct.com:8084/"}],
        websocket: [{ url: "ws://swarm.betconstruct.com:8084/"}]
    },
    xDomainSlaves: '{"http://swarm.betconstruct.com:8084" : "/xdomain-proxy.html"}', //has to be JSON string

    'payments': [
     ]

});

CMS.constant('SkinWPConfig', {
//   wpUrl: 'http://www.tbilisibet.com/json',  // WordpResss instance serving pages, banners
//  wpBaseHost: 'www.tbilisibet.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
//  wpNewsUrl: 'http://www.tbilisibet.com/newsjson',  // WordpResss instance serving news
    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {
    cUrlPrefix: 'http://games.tbilisibet.com',
    cGamesUrl: '/global/v-play.php',
    cUrl: '/global/casinoGamesLoad.php',
    main: {
        partnerID: '2'
    },
    login: {
        url: '/global/partners/rml.php'
    },
    balance: {
        url: '/global/cashier/cashier.php'
    }
});