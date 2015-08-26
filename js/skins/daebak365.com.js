/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng" : "daebak365.com",
            "kor" : "daebak365.com"
        },
        site_name: "daebak365.com",
        skin: 'daebak365.com',
        casinoEnabled: true,
        pokerEnabled: true,
        liveDealerEnabled: true,
        financialsEnabled: true,
        redirectOnTablets: 'http://tablet.daebak365.com/',
        videoEnabled: false,
        about_company_text: {
            'eng' : "(c) daebak365.com",
            'rus' : "(c) daebak365.com",
            'arm' : "(c) daebak365.com"
        },
        site_id: "1",
        registration: {
            defaultCurrency: 'KRW',
            restrictedCountries: {}
        },
        availableCurrencies: ['KRW'],
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            // ('@replace' property won't be present in result object)
            'eng' : { 'short': 'EN', 'full': "English"},
            'kor' : { 'short': 'KO', 'full': "한국의"}
        },
        balanceFractionSize: 0 //number of decimal places to round the balance value to(when displaying)
    },
    'env': {
        showFifaCountdown: false
    },
    'swarm': {
        url: [{ url: "https://www.vbet.com:8080/"}]
    },
    xDomainSlaves: '{"http://swarm.vbet.com:8080" : "/xdomain-proxy.html"}' //has to be JSON string

});

CMS.constant('SkinWPConfig', {

});

CASINO.constant('SkinCConfig', {});