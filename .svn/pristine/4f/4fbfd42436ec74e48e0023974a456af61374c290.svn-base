/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "betdirect77.com",
            "rus": "betdirect77.com"
        },
        site_name: "betdirect77.com",
        site_id: "91",
        skin: 'betdirect77.com',
        casinoEnabled: false,
        pokerEnabled: false,
        liveDealerEnabled: false,
        financialsEnabled: false,
        skillgamesEnabled: false,
        showMyGamesInBetslip: true,
        redirectOnTablets: false,
        videoEnabled: false,
        disableHeader: false,
        disableHeaderNavigation: false,
        disableRegistrationAndLogin: true,
        disableFooter: true,
        enableNews: false,
        about_company_text: {
            'eng' : "(c) betdirect77.com",
            'rus' : "(c) betdirect77.com"
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
            'rus' : { 'short': 'RU', 'full': "Русский"}
        },
        registration: {
            defaultCurrency: 'NGN',
            restrictedCountries: {}
        },
        liveChat: {
            siteId: 32814,
            codePlan: 357
        },
        availableCurrencies: ['NGN'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableBannerUnderBetslip: false, // enable banner under the betslip,
        disableFooterNav: false, // disable wordpress content in footer,
        disableHomepageNews: false
    },
    partner: {
        documentDomain: 'betdirect77.com',  // both parent and iframe have to set  window.document.domain = documentDomain for cross-subdomain JS to work
        profileNotAvailable: true,
        balanceRefreshPeriod: 30000 //milliseconds, if 0 or null will be disabled
    },
    'env': {
        showFifaCountdown: false
    },
    'swarm': {
        url: [{ url: "http://swarm.betdirect77.com:8085/"}],
        websocket: [{ url: "ws://swarm.betdirect77.com:8085/"}]
    },
    xDomainSlaves: '{"http://swarm.betdirect77.com:8085" : "/xdomain-proxy.html"}', //has to be JSON string

    'payments': []

});

CMS.constant('SkinWPConfig', {
    wpUrl: 'http://www.betdirect77.com/json',  // WordpResss instance serving pages, banners
    wpBaseHost: 'www.betdirect77.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
    wpNewsUrl: {
        main: 'http://www.betdirect77.com/newsjson'
    },  // WordpResss instance serving news
    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {});