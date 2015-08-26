/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "2winbet.com",
            "gre": "2winbet.com",
            "cze": "2winbet.com",
            "ita": "2winbet.com",
            "ger": "2winbet.com",
            "rus": "2winbet.com",
            "por": "2winbet.com",
            "spa": "2winbet.com",
            "pol": "2winbet.com"
        },
        site_name: "2winbet.com",
        site_id: "150",
        skin: '2winbet.com',
        casinoEnabled: true,
        pokerEnabled: true,
        liveDealerEnabled: true,
        financialsEnabled: true,
		fantasyEnabled: true,
        skillgamesEnabled: true,
        poolBettingEnabled: true,
        redirectOnTablets: false,
        ageRestrictionInFooter: 21,
        videoEnabled: true,
        availableVideoProviderIds: [6, 16],
        about_company_text: {
            'eng' : '<img src="skins/bt848.com/images/logos/logo-eeep.png" class="license-logo"><img src="skins/bt848.com/images/logos/logo-kethea.png" class="license-logo"> We are licensed and regulated by the Goverment of Greece. Full License under the Company Eldorado Sportwetten GmbH 12458/13.12.2011 of the Minister of Finance related to Online Bet’s services and Games of chance.<br> Our company provides legal services in Greece (ar.50 N.4002/2011 § 12)',
            'gre' : '<img src="skins/bt848.com/images/logos/logo-eeep.png" class="license-logo"><img src="skins/bt848.com/images/logos/logo-kethea.png" class="license-logo">Έχουμε λάβει άδεια η οποία ελέγχεται από την Ελληνική κυβέρνηση. Πλήρης Άδεια της εταιρείας με τον διακριτικό τίτλο Eldorado Sportwetten GmbH Αρ. Αδείας: 12458/13.12.2011 του Υπουργού Οικονομικών σχετικά με τις υπηρεσίες διαδικτυακού στοιχήματος και τυχερών παιγνίων. Η εταιρία μας παρέχει νόμιμα τις υπηρεσίες της στην Ελλάδα (σύμφωνα με 50§12 Ν.4002/2011) Eldorado Sportwetten GmbH<br>Reichsstraße 15, 8430 Leibnitz, Österreich'
        },
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
        registration: {
            autoSetCurrency: {
                enabled: true,
                disableChangeAfterSelect: true,
                availableList: {
                    "NG" : "NGN"
                }
            },
            defaultCurrency: 'EUR',
            defaultPromoCode: "5335",
            deaultPromocodePerDomain: {
                "www.lingtbet.com":  {
                    code: "9664",
                    suffix: "-af"
                }
            },
            restrictedCountries: {},
            requireSmsValidation: true,
            RegTimeSmsValidation: false,
            minimumAllowedAge: 21,
            minimumAllowedPokerAge: 21,
            loginRightAfterRegistration: false,
            sliderPageAfterRegistration: 'signInForm' // will open this page after completing registration and clicking "ok"
        },
        liveChat: {
            siteId: 196738,
            codePlan: 239
        },
        availableCurrencies: ['EUR', 'NGN'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: true, // enable news on sport page
        enableBannerUnderBetslip: false, // enable banner under the betslip,
        disableFooterNav: false, // disable wordpress content in footer,
        disableHomepageNews: false,
        facebookUrl: "https://www.facebook.com/2winbet.com",
        linkedInUrl: "http://gr.linkedin.com/pub/2win-bet/90/b79/215",
        youtubeUrl: "https://www.youtube.com/channel/UCD7hJtQQDVeHPSQy6EiXtGA/feed",
        twitterAccount: '2winbetgr',
        twitterHashTag: '2winbet',
        copyrightSince: 2014
    },
    'env': {
        showFifaCountdown: false,
        lang: 'gre'
    },
    'betting': {
        maxWinLimit: 15000
    },
    'swarm': {
        url: [{ url: "http://swarm.2winbet.com:8084/"}],
        websocket: [{ url: "ws://swarm.2winbet.com:8084/"}]
    },
    xDomainSlaves: '{"http://swarm.2winbet.com:8084" : "/xdomain-proxy.html"}', //has to be JSON string
    poker: {
        downloadLink: {
            windows: 'http://poker-updates.betconstruct.com/2winbet/2winbet%20Poker.exe',
            mac: 'http://poker-updates.betconstruct.com/2winbet/2winbet%20Poker.dmg',
            linux: 'http://poker-updates.betconstruct.com/2winbet/2winbet%20Poker.tar.gz'
        },
        instantPlayLink: "http://onlinepoker.betconstruct.com:8081/poker-client/poker/2winbet"
    },
    'payments': [
        {
            name: 'wirecard',
            canDeposit: true,
            canWithdraw: false,
            order: 1,
            depositInfoText: {
                eng: '',
                gre: ''
            }

        },
        {
            name: 'moneysafe',
            canDeposit: true,
            canWithdraw: true,
            order: 2,
            depositInfoText: {
                eng: 'Voucher payment limits on merchant site via eMoneySafe wallet.<br><ul><li>Max of €150 per transaction.</li><li>Up-to 10 payments per day.</li><li>Max payment amount €1500 per day.</li><li>Consumer receives full voucher value at merchant’s web site.</li></ul><br>Transactions are subject to terms and condition of UCS and can be downloaded at: www.emoneysafecard.com<br><br> *All users must be a registered as a MoneySafe cardholder with a registered verified mobile number with MoneySafe to complete payout transaction from this web site. All transactions are subject to verification on demand by the web operator or UCS. For any discrepancies or complaints please contact us at: payout@ucsfinancial.com',
                gre: 'Voucher όρια πληρωμών στην ιστοσελίδα εμπόρου μέσω eMoneySafe πορτοφόλι.<br><ul><li>Μέγιστη 150 € ανά συναλλαγή.</li><li>έως και 10 πληρωμές ανά ημέρα.</li><li>Μέγιστο ποσό πληρωμής € 1500 ανά ημέρα.</li><li>O Καταναλωτής  λαμβάνει την πλήρη αξία του voucher στην ιστοσελίδα του παρόχου.</li><li><br><br>Συναλλαγές υπόκεινται στους όρους και τις συνθήκες της UCS και μπορείτε να το κατεβάσετε στο: www.emoneysafecard.com<br><br>* Όλοι οι χρήστες θα πρέπει να είναι εγγεγραμμένοι ως κάτοχοι της κάρτας MoneySafe με ένα εγγεγραμμένο αριθμό κινητού με MoneySafe για να ολοκληρώσετε τη συναλλαγή πληρωμής από αυτό το web site. Όλες οι συναλλαγές υπόκεινται σε έλεγχο για τη ζήτηση από το χειριστή web ή UCS. Για οποιεσδήποτε διαφορές ή παράπονα, παρακαλούμε επικοινωνήστε μαζί μας στο: payout@ucsfinancial.com'
            }, // translate##deposit_info_moneysafe##
            withdrawInfoText: {
                eng: 'Voucher payment limits on merchant site via eMoneySafe wallet.<br><ul><li>Max of €150 per transaction.</li><li>Up-to 10 payments per day.</li><li>Max payment amount €1500 per day.</li><li>Consumer receives full voucher value at merchant’s web site.</li></ul><br>Transactions are subject to terms and condition of UCS and can be downloaded at: www.emoneysafecard.com<br><br> *All users must be a registered as a MoneySafe cardholder with a registered verified mobile number with MoneySafe to complete payout transaction from this web site. All transactions are subject to verification on demand by the web operator or UCS. For any discrepancies or complaints please contact us at: payout@ucsfinancial.com',
                gre: 'Pay-out όρια για eMoneySafe wallet.<br /> <br /> · € 500 Μέγιστο ανά συναλλαγή<br /> · Μέχρι 10 Συναλλαγές ανά ημέρα<br /> · Μέγιστη πληρωμή ποσού € 2.500<br /> · Όλες οι συναλλαγές υπόκεινται σε 2,5% προμήθεια επί του ποσού που ζητήθηκε<br /> <br /> Συναλλαγές υπόκεινται στους όρους και τις συνθήκες της UCS και μπορείτε να το κατεβάσετε σε: www.moneysafecard.com<br /> * Όλοι οι χρήστες θα πρέπει να είναι εγγεγραμμένος ως κάτοχος της κάρτας MoneySafe με επαληθεύση αριθμό κινητού με MoneySafe για να ολοκληρώσετε τη συναλλαγή πληρωμής από αυτό το web site. Όλες οι συναλλαγές υπόκεινται σε έλεγχο για τη ζήτηση από το χειριστή web ή UCS. Για οποιεσδήποτε διαφορές ή παράπονα, παρακαλούμε επικοινωνήστε μαζί μας στο: payout@ucsfinancial.com'
            },
            twoStepWithdraw: true, //means that withdraw will be done in 2 steps. status will be requested from swarm and one of 2 forms will be shown depending on it
            withdrawFormFields: [
                {name: 'phone', type: 'text', label: 'Phone', required: true}  // translate##Phone##
            ],
            withdraw2FormFields: [
                {name: 'code', type: 'text', label: 'Code', required: true}  // translate##Code##
            ]
        },
        {
            name: 'icepay',
            canDeposit: true,
            canWithdraw: false,
            order: 3,
            depositInfoText: {
                eng: '',
                gre: ''
            }

        },
    ]

});

CMS.constant('SkinWPConfig', {
    wpUrl: 'http://test.2winbet.com/json',  // WordpResss instance serving pages, banners
    wpBaseHost: 'test.2winbet.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
    wpNewsUrl: {
        main: 'http://test.2winbet.com/newsjson',
        gre:  'http://test.2winbet.com/json'
    },  // WordpResss instance serving news
    wpPokerPromoUrl: 'http://test.2winbet.com/json',
    news: {
        langRootCategories: { // IDs of root categories for each language in WordPress
            gre: '99'
        }
    },
    wpNewsBaseHost: 'www.vbet.com',  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
    help: {
        pageSlugs: {
            'eng': 'help-root-eng',
            'gre': 'help-root-gre',
            'cze': 'help-root-eng',
            'ita': 'help-root-eng',
            'ger': 'help-root-eng',
            'rus': 'help-root-eng',
            'por': 'help-root-eng',
            'spa': 'help-root-eng',
            'pol': 'help-root-eng'
        }
    }
});

CASINO.constant('SkinCConfig', {
    cUrlPrefix: 'http://games.2winbet.com',
    cGamesUrl: '/global/v-play.php',
    cUrl: '/global/casinoGamesLoad.php',
    main : {
        partnerID: '150',
        multiViewEnabled: true
    },
    login: {
        url: '/global/partners/rml.php'
    },
    balance: {
        url: '/global/cashier/cashier.php'
    }
});
