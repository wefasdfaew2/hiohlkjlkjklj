/*
 *   All config values specified here will be merged with main config and will override its values
 *
 */
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "2winbet.gr",
            "gre": "2winbet.gr",
            "cze": "2winbet.gr",
            "ita": "2winbet.gr",
            "ger": "2winbet.gr",
            "rus": "2winbet.gr",
            "por": "2winbet.gr",
            "spa": "2winbet.gr",
            "pol": "2winbet.gr",
            "tur": "2winbet.gr"
        },
        site_name: "2winbet.gr",
        site_id: "85",
        skin: 'bt848.com',
        enableSportsbookLayoutSwitcher: true,
        casinoEnabled: true,
        pokerEnabled: true,
        allowCustomHtml: true,
        liveDealerEnabled: true,
        enableSubHeader: true,
        oldHomepage: false,
        sportsClassicLayout: true, //is modern by default
        liveOverviewEnabled: true,
        availableSportsbookViews: {modern: true, classic: true, asian: true, external: false},
        enableLandingPage: true,
        enableBetBooking: true,
        showFavoriteCompetitions: true, // show "popular competitions" in classic view
        financialsEnabled: true,
        fantasyEnabled: true,
        enablePromotions: true,
        enableLayoutSwitcherInSportsbook: true,
        freeBetEnabled: true,
        liveCalendarEnabled: true,
        calendarPrematchSelection: true,
        enableCasinoBetHistory: true, //enable casino balance history in top menu
        enableCasinoBalanceHistory: true, //enable casino balance history in top menu
        menuOrder: ['live', 'sport', 'virtual-sports', 'casino', 'poolbetting', 'poker', 'livedealer', 'games', 'fantasy', 'financials'],
        theVeryTopMenu: [{href: "#/promos/", label: "Promotions"},{href: "#/freebet/", label: "Free Quiz"}],
        //statsHostname: 'http://statistics.betconstruct.com/#/en/external/page/h2h',  // hostname for statistics. when clicking on game statistics icon, popup on this hostname is open,
        //headerStatisticsLink: "http://statistics.betconstruct.com/2winbet#/en/statistics/competition/566/5358/entity/454",
        haveFaq: true,
        openHelpAsPopup: true,
        showVirtualsInSportList: 5,
        skillgamesEnabled: true,
        poolBettingEnabled: true,
        redirectOnTablets: false,
        virtualSportEnabledInTopMenu: true,
        ageRestrictionInFooter: 21,
        videoEnabled: true,
        enableBetPrint: true,
        availableVideoProviderIds: [6, 15, 16],
        additionalLink: {
            eng: {link: 'http://mc.2winbet.gr/', text: 'Match Center'},
            gre: {link: 'http://mc.2winbet.gr/', text: 'Match Center'},
            spa: {link: 'http://mc.2winbet.gr/', text: 'Match Center'},
            ger: {link: 'http://mc.2winbet.gr/', text: 'Match Center'},
            tur: {link: 'http://mc.2winbet.gr/', text: 'Match Center'},
            fas: {link: 'http://mc.2winbet.gr/', text: 'مرکز بازیها'}
        },
        additionalMenuItems: [
         {
         eng: {title: "Roulette", link: "#/game/MTG501/provider/MTG", cssclass: ''}
         }
         ],
        about_company_text: {
            'eng' : '<img src="skins/bt848.com/images/logos/logo-eeep.png" class="license-logo"><img src="skins/bt848.com/images/logos/logo-kethea.png" class="license-logo">For the countries territories of Greece this site is licenced and regulated by the government of Greece.Full sub licence under the company Eldorado Sportwetten GmbH 12458/13.12.2011 of the Finance related to Online Bet’s services.<br> Our company provides legal services in Greece (ar.50 N.4002/2011 § 12)<br/><br/><img src="skins/bt848.com/images/logos/logo-montenegro.png" class="license-logo">www.2winbet.gr is operated by DELTA INFORMATIONS LIMITED (152 City Road, London EC1V 2NX, London) and is licensed and regulated by the government of Montenegro.  E Gambling Montenegro d.o.o. (Podgorica, Moskovska br. 65., reg. no. 5-0615951) hereby certifies that under the concession (serial no. AA 0546, numeric no. 117-01/12) and approval (no. 02/01-376/3), organize and operate games on chance in Montenegro on website www.2winbet.gr, in accordance with the Agreement on management and financial cooperation, concluded between E Gambling Montenegro d.o.o. and DELTA IT d.o.o. (Podgorica, Cetinjski put bb, reg. no. 5-0693462, TIN: 02987201) on 12 May, 2014.  <br/>More details about the license, E-Gambling Montenegro and handling of complaints: www.e-gambling.me',
            'gre' : '<img src="skins/bt848.com/images/logos/logo-eeep.png" class="license-logo"><img src="skins/bt848.com/images/logos/logo-kethea.png" class="license-logo">For the countries territories of Greece this site is licenced and regulated by the government of Greece.Full sub licence under the company Eldorado Sportwetten GmbH 12458/13.12.2011 of the Finance related to Online Bet’s services.<br> Our company provides legal services in Greece (ar.50 N.4002/2011 § 12)<br/><br/><img src="skins/bt848.com/images/logos/logo-montenegro.png" class="license-logo">www.2winbet.gr is operated by DELTA INFORMATIONS LIMITED (152 City Road, London EC1V 2NX, London) and is licensed and regulated by the government of Montenegro.  E Gambling Montenegro d.o.o. (Podgorica, Moskovska br. 65., reg. no. 5-0615951) hereby certifies that under the concession (serial no. AA 0546, numeric no. 117-01/12) and approval (no. 02/01-376/3), organize and operate games on chance in Montenegro on website www.2winbet.gr, in accordance with the Agreement on management and financial cooperation, concluded between E Gambling Montenegro d.o.o. and DELTA IT d.o.o. (Podgorica, Cetinjski put bb, reg. no. 5-0693462, TIN: 02987201) on 12 May, 2014.  <br/>More details about the license, E-Gambling Montenegro and handling of complaints: www.e-gambling.me',
            'pol' : '<img src="skins/bt848.com/images/logos/logo-eeep.png" class="license-logo"><img src="skins/bt848.com/images/logos/logo-kethea.png" class="license-logo">For the countries territories of Greece this site is licenced and regulated by the government of Greece.Full sub licence under the company Eldorado Sportwetten GmbH 12458/13.12.2011 of the Finance related to Online Bet’s services.<br> Our company provides legal services in Greece (ar.50 N.4002/2011 § 12)<br/><br/><img src="skins/bt848.com/images/logos/logo-montenegro.png" class="license-logo">www.2winbet.gr is operated by DELTA INFORMATIONS LIMITED (152 City Road, London EC1V 2NX, London) and is licensed and regulated by the government of Montenegro.  E Gambling Montenegro d.o.o. (Podgorica, Moskovska br. 65., reg. no. 5-0615951) hereby certifies that under the concession (serial no. AA 0546, numeric no. 117-01/12) and approval (no. 02/01-376/3), organize and operate games on chance in Montenegro on website www.2winbet.gr, in accordance with the Agreement on management and financial cooperation, concluded between E Gambling Montenegro d.o.o. and DELTA IT d.o.o. (Podgorica, Cetinjski put bb, reg. no. 5-0693462, TIN: 02987201) on 12 May, 2014.  <br/>More details about the license, E-Gambling Montenegro and handling of complaints: www.e-gambling.me',
            'cze' : '<img src="skins/bt848.com/images/logos/logo-eeep.png" class="license-logo"><img src="skins/bt848.com/images/logos/logo-kethea.png" class="license-logo">For the countries territories of Greece this site is licenced and regulated by the government of Greece.Full sub licence under the company Eldorado Sportwetten GmbH 12458/13.12.2011 of the Finance related to Online Bet’s services.<br> Our company provides legal services in Greece (ar.50 N.4002/2011 § 12)<br/><br/><img src="skins/bt848.com/images/logos/logo-montenegro.png" class="license-logo">www.2winbet.gr is operated by DELTA INFORMATIONS LIMITED (152 City Road, London EC1V 2NX, London) and is licensed and regulated by the government of Montenegro.  E Gambling Montenegro d.o.o. (Podgorica, Moskovska br. 65., reg. no. 5-0615951) hereby certifies that under the concession (serial no. AA 0546, numeric no. 117-01/12) and approval (no. 02/01-376/3), organize and operate games on chance in Montenegro on website www.2winbet.gr, in accordance with the Agreement on management and financial cooperation, concluded between E Gambling Montenegro d.o.o. and DELTA IT d.o.o. (Podgorica, Cetinjski put bb, reg. no. 5-0693462, TIN: 02987201) on 12 May, 2014.  <br/>More details about the license, E-Gambling Montenegro and handling of complaints: www.e-gambling.me',
            'ger' : '<img src="skins/bt848.com/images/logos/logo-eeep.png" class="license-logo"><img src="skins/bt848.com/images/logos/logo-kethea.png" class="license-logo">For the countries territories of Greece this site is licenced and regulated by the government of Greece.Full sub licence under the company Eldorado Sportwetten GmbH 12458/13.12.2011 of the Finance related to Online Bet’s services.<br> Our company provides legal services in Greece (ar.50 N.4002/2011 § 12)<br/><br/><img src="skins/bt848.com/images/logos/logo-montenegro.png" class="license-logo">www.2winbet.gr is operated by DELTA INFORMATIONS LIMITED (152 City Road, London EC1V 2NX, London) and is licensed and regulated by the government of Montenegro.  E Gambling Montenegro d.o.o. (Podgorica, Moskovska br. 65., reg. no. 5-0615951) hereby certifies that under the concession (serial no. AA 0546, numeric no. 117-01/12) and approval (no. 02/01-376/3), organize and operate games on chance in Montenegro on website www.2winbet.gr, in accordance with the Agreement on management and financial cooperation, concluded between E Gambling Montenegro d.o.o. and DELTA IT d.o.o. (Podgorica, Cetinjski put bb, reg. no. 5-0693462, TIN: 02987201) on 12 May, 2014.  <br/>More details about the license, E-Gambling Montenegro and handling of complaints: www.e-gambling.me',
            'ita' : '<img src="skins/bt848.com/images/logos/logo-eeep.png" class="license-logo"><img src="skins/bt848.com/images/logos/logo-kethea.png" class="license-logo">For the countries territories of Greece this site is licenced and regulated by the government of Greece.Full sub licence under the company Eldorado Sportwetten GmbH 12458/13.12.2011 of the Finance related to Online Bet’s services.<br> Our company provides legal services in Greece (ar.50 N.4002/2011 § 12)<br/><br/><img src="skins/bt848.com/images/logos/logo-montenegro.png" class="license-logo">www.2winbet.gr is operated by DELTA INFORMATIONS LIMITED (152 City Road, London EC1V 2NX, London) and is licensed and regulated by the government of Montenegro.  E Gambling Montenegro d.o.o. (Podgorica, Moskovska br. 65., reg. no. 5-0615951) hereby certifies that under the concession (serial no. AA 0546, numeric no. 117-01/12) and approval (no. 02/01-376/3), organize and operate games on chance in Montenegro on website www.2winbet.gr, in accordance with the Agreement on management and financial cooperation, concluded between E Gambling Montenegro d.o.o. and DELTA IT d.o.o. (Podgorica, Cetinjski put bb, reg. no. 5-0693462, TIN: 02987201) on 12 May, 2014.  <br/>More details about the license, E-Gambling Montenegro and handling of complaints: www.e-gambling.me',
            'por' : '<img src="skins/bt848.com/images/logos/logo-eeep.png" class="license-logo"><img src="skins/bt848.com/images/logos/logo-kethea.png" class="license-logo">For the countries territories of Greece this site is licenced and regulated by the government of Greece.Full sub licence under the company Eldorado Sportwetten GmbH 12458/13.12.2011 of the Finance related to Online Bet’s services.<br> Our company provides legal services in Greece (ar.50 N.4002/2011 § 12)<br/><br/><img src="skins/bt848.com/images/logos/logo-montenegro.png" class="license-logo">www.2winbet.gr is operated by DELTA INFORMATIONS LIMITED (152 City Road, London EC1V 2NX, London) and is licensed and regulated by the government of Montenegro.  E Gambling Montenegro d.o.o. (Podgorica, Moskovska br. 65., reg. no. 5-0615951) hereby certifies that under the concession (serial no. AA 0546, numeric no. 117-01/12) and approval (no. 02/01-376/3), organize and operate games on chance in Montenegro on website www.2winbet.gr, in accordance with the Agreement on management and financial cooperation, concluded between E Gambling Montenegro d.o.o. and DELTA IT d.o.o. (Podgorica, Cetinjski put bb, reg. no. 5-0693462, TIN: 02987201) on 12 May, 2014.  <br/>More details about the license, E-Gambling Montenegro and handling of complaints: www.e-gambling.me',
            'spa' : '<img src="skins/bt848.com/images/logos/logo-eeep.png" class="license-logo"><img src="skins/bt848.com/images/logos/logo-kethea.png" class="license-logo">For the countries territories of Greece this site is licenced and regulated by the government of Greece.Full sub licence under the company Eldorado Sportwetten GmbH 12458/13.12.2011 of the Finance related to Online Bet’s services.<br> Our company provides legal services in Greece (ar.50 N.4002/2011 § 12)<br/><br/><img src="skins/bt848.com/images/logos/logo-montenegro.png" class="license-logo">www.2winbet.gr is operated by DELTA INFORMATIONS LIMITED (152 City Road, London EC1V 2NX, London) and is licensed and regulated by the government of Montenegro.  E Gambling Montenegro d.o.o. (Podgorica, Moskovska br. 65., reg. no. 5-0615951) hereby certifies that under the concession (serial no. AA 0546, numeric no. 117-01/12) and approval (no. 02/01-376/3), organize and operate games on chance in Montenegro on website www.2winbet.gr, in accordance with the Agreement on management and financial cooperation, concluded between E Gambling Montenegro d.o.o. and DELTA IT d.o.o. (Podgorica, Cetinjski put bb, reg. no. 5-0693462, TIN: 02987201) on 12 May, 2014.  <br/>More details about the license, E-Gambling Montenegro and handling of complaints: www.e-gambling.me',
            'rus' : '<img src="skins/bt848.com/images/logos/logo-eeep.png" class="license-logo"><img src="skins/bt848.com/images/logos/logo-kethea.png" class="license-logo">For the countries territories of Greece this site is licenced and regulated by the government of Greece.Full sub licence under the company Eldorado Sportwetten GmbH 12458/13.12.2011 of the Finance related to Online Bet’s services.<br> Our company provides legal services in Greece (ar.50 N.4002/2011 § 12)<br/><br/><img src="skins/bt848.com/images/logos/logo-montenegro.png" class="license-logo">www.2winbet.gr is operated by DELTA INFORMATIONS LIMITED (152 City Road, London EC1V 2NX, London) and is licensed and regulated by the government of Montenegro.  E Gambling Montenegro d.o.o. (Podgorica, Moskovska br. 65., reg. no. 5-0615951) hereby certifies that under the concession (serial no. AA 0546, numeric no. 117-01/12) and approval (no. 02/01-376/3), organize and operate games on chance in Montenegro on website www.2winbet.gr, in accordance with the Agreement on management and financial cooperation, concluded between E Gambling Montenegro d.o.o. and DELTA IT d.o.o. (Podgorica, Cetinjski put bb, reg. no. 5-0693462, TIN: 02987201) on 12 May, 2014.  <br/>More details about the license, E-Gambling Montenegro and handling of complaints: www.e-gambling.me',
            'bgr' : '<img src="skins/bt848.com/images/logos/logo-eeep.png" class="license-logo"><img src="skins/bt848.com/images/logos/logo-kethea.png" class="license-logo">For the countries territories of Greece this site is licenced and regulated by the government of Greece.Full sub licence under the company Eldorado Sportwetten GmbH 12458/13.12.2011 of the Finance related to Online Bet’s services.<br> Our company provides legal services in Greece (ar.50 N.4002/2011 § 12)<br/><br/><img src="skins/bt848.com/images/logos/logo-montenegro.png" class="license-logo">www.2winbet.gr is operated by DELTA INFORMATIONS LIMITED (152 City Road, London EC1V 2NX, London) and is licensed and regulated by the government of Montenegro.  E Gambling Montenegro d.o.o. (Podgorica, Moskovska br. 65., reg. no. 5-0615951) hereby certifies that under the concession (serial no. AA 0546, numeric no. 117-01/12) and approval (no. 02/01-376/3), organize and operate games on chance in Montenegro on website www.2winbet.gr, in accordance with the Agreement on management and financial cooperation, concluded between E Gambling Montenegro d.o.o. and DELTA IT d.o.o. (Podgorica, Cetinjski put bb, reg. no. 5-0693462, TIN: 02987201) on 12 May, 2014.  <br/>More details about the license, E-Gambling Montenegro and handling of complaints: www.e-gambling.me'
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English", order: 2},
            'gre' : { 'short': 'GR', 'full': "Ελληνική", order: 1},
            'bgr' : { 'short': 'BG', 'full': "Bulgarian", order: 11},
            'pol' : { 'short': 'PL', 'full': "Polski", order: 5},
            'cze' : { 'short': 'CZ', 'full': "Český", order: 6},
            'ger' : { 'short': 'DE', 'full': "Deutsch", order: 4},
            'ita' : { 'short': 'IT', 'full': "Italiano", order: 3},
            'por' : { 'short': 'PT', 'full': "Português", order: 8},
            'spa' : { 'short': 'ES', 'full': "Español", order: 7},
            'rus' : { 'short': 'RU', 'full': "Русский", order: 9},
            'tur' : { 'short': 'TR', 'full': "Türkçe", order: 10}
        },

        additionalMenuItems: [
            /* {
             eng: {title: "Daily Coupon", link: "#/livecalendar", cssclass: ''},
             gre: {title: "Daily Coupon", link: "#/livecalendar", cssclass: ''},
             bgr: {title: "Daily Coupon", link: "#/livecalendar", cssclass: ''},
             pol: {title: "Daily Coupon", link: "#/livecalendar", cssclass: ''},
             cze: {title: "Daily Coupon", link: "#/livecalendar", cssclass: ''},
             ger: {title: "Daily Coupon", link: "#/livecalendar", cssclass: ''},
             ita: {title: "Daily Coupon", link: "#/livecalendar", cssclass: ''},
             por: {title: "Daily Coupon", link: "#/livecalendar", cssclass: ''},
             spa: {title: "Daily Coupon", link: "#/livecalendar", cssclass: ''},
             rus: {title: "Daily Coupon", link: "#/livecalendar", cssclass: ''},
             tur: {title: "Daily Coupon", link: "#/livecalendar", cssclass: ''}
             },*/
            {
                eng: {title: "Roulette", link: "#/game/MTG501/provider/MTG/exid/125001", cssclass: ''},
                gre: {title: "Roulette", link: "#/game/MTG501/provider/MTG/exid/125001", cssclass: ''}
            }



        ],


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
            isSfChat: false,
            siteId: 196738,
            codePlan: 513
        },
        loadPopularGamesForSportsBook: {
            enabled: true,
            level: 'competition',  // game or competition
            type: 'promoted' // promoted or favorite
            //testSiteId: 23 // for debug purpose set to false by default
        },
        availableCurrencies: ['EUR', 'NGN'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: true, // enable news on sport page
        enableBannerUnderBetslip: true, // enable banner under the betslip,
        disableFooterNav: false, // disable wordpress content in footer,
        disableHomepageNews: false,
        enableFeedbackButton: true,
        facebookUrl: "https://www.facebook.com/2winbet.gr",
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
        maxWinLimit: 7650000,
        enableExpressBonus: true,
        enableSuperBet: true,
        allowManualSuperBet: true
    },
    'swarm': {
        url: [{ url: "https://swarm.2winbet.gr:8089/"}],
        websocket: [{ url: "wss://swarm.2winbet.gr:8089/"}]
    },
    xDomainSlaves: '{"https://swarm.2winbet.gr:8089" : "/xdomain-proxy.html"}', //has to be JSON string
    customTemplates: ["homepage/center.html", "homepage/main.html"],

    poker: {
        downloadLink: {
            windows: 'http://2winbet.rhinobit.eu/downloadFile.php?do=xp'
            // mac: 'http://poker-updates.betconstruct.com/2winbet/2winbet%20Poker.dmg',
            // linux: 'http://poker-updates.betconstruct.com/2winbet/2winbet%20Poker.tar.gz'
        },
        instantPlayLink: "http://2winbet.rhinobit.eu/flashclient"
    },
    'payments': [
        {
            name: 'wirecard',
            canDeposit: true,
            canWithdraw: false,
            order: 1,
            depositInfoText: {
                eng: 'You can make secure online payments via Visa and MasterCard also using Visa Debit, Maestro, MasterCard Debit and Electron cards. Simply click Deposit on the website 2winbet.gr.Oi deposits are instant and 2winbet not impose any charges for using this method. The name of the card holder must be the same one that is registered in 2winbet your account. In all other cases the account will be temporarily inhibited. All bets before the temporary suspension of your account will remain unchanged, earned or lost. If you have questions or problems with the deposit, please get in Contact with us.',
                gre: 'Μπορείτε να πραγματοποιείτε ασφαλείς online πληρωμές μέσω Visa και MasterCard επίσης χρησιμοποιώντας Visa Debit, Maestro, MasterCard Debit και Electron κάρτες. Απλά κάντε κλικ στην Κατάθεση στην ιστοσελίδα της winbet.gr. <br/>Oι καταθέσεις πραγματοποιούνται άμεσα και η 2winbet δεν επιβάλει καμία χρέωση για την χρήση αυτής της μεθόδου. <br/>Το όνομα του κάτοχου της κάρτας πρέπει να είναι το ίδιο με εκείνο που είναι καταχωρημένο στον 2winbet  λογαριασμό σας. Σε κάθε άλλη περίπτωση ο λογαριασμός θα αναστέλεται προσωρινά. Όλα τα στοιχήματα πριν την προσωρινή αναστολή του λογαριασμού σας θα παραμείνουν ως έχουν, κερδισμένα ή χαμένα.Σε περίπτωση που έχετε ερωτήσεις ή προβλήματα κατά την κατάθεση, παρακαλούμε όπως έλθετε σε Eπικοινωνία μαζί μας.'
            },
            withdrawInfoText: {
                eng: '<b>EVERY PLAYER IS ALLOWED ONE WITHDRAW PER DAY UP TO 500 EUROS</b>If you deposit by debit card, all withdrawals you will be redirected to the same credit card when this allows the card issuer. Simply click Withdraw on the website 2winbet. The 2winbet will not charge you for using this method. The money is credited to your account within 1-2 working days if the card has been issued in the United Kingdom. For cards not issued in the United Kingdom to undertake takes 3-5 working days. If you withdraw by debit card without betting the full amount of your deposit, the 2winbet reserves the right to charge your account to cover any costs associated with the deposit and withdrawal. If necessary the value of the withdrawal may be reduced accordingly expenses afta.Otan card issuer does not support withdrawals, the money will be sent to you by check or bank transfer to the name registered on your account 2winbet. When a withdrawal by bank transfer is necessary, you will need to fill in your bank account by clicking the Ascension on the website 2winbet. Please refer to Bank Wire for more information.',
                gre: '<b>KAΘΕ ΠΑΙΧΤΗΣ ΔΙΚΑΙΟΥΤΑΙ ΜΙΑ ΑΝΑΛΗΨΗ ΤΗΝ ΗΜΕΡΑ ΕΩΣ 500 ΕΥΡΩ</b>Ελάχιστο ποσό ανάληψης 50€, Μέγιστο ποσό ανάληψης ανά ημέρα 1.000€. Εάν έχετε καταθέσει με χρεωστική κάρτα, όλες οι αναλήψεις σας θα προωθούνται στην ίδια πιστωτική κάρτα όταν αυτό το επιτρέπει ο εκδότης της κάρτας. Απλά κάντε κλικ στην Ανάληψη στην ιστοσελίδα της 2winbet. <br/> Η 2winbet δεν θα σας χρεώσει για την χρησιμοποίηση αυτής της μεθόδου. Τα χρήματα πιστώνονται στον λογαριασμό σας σε 1-2 εργάσιμες ημέρες εαν ή κάρτα έχει εκδοθεί στο Ηνωμένο Βασίλειο. Για κάρτες που δεν έχουν εκδοθεί στο Ηνωμένο Βασίλειο η ανάληψη διαρκεί 3-5 εργάσιμες ημέρες. <br/>Εάν κάνετε ανάληψη με χρεωστική κάρτα χωρίς να στοιχηματίσετε ολόκληρο το ποσό της κατάθεσης σας, η 2winbet διατηρεί το δικαίωμα να χρεώσει τον λογαριασμό σας ώστε να καλύψει τα όποια έξοδα που σχετίζονται με την κατάθεση και την ανάληψη. Εάν είναι απαραίτητο η αξία της ανάληψης θα μειωθεί σύμφωνα με τα έξοδα αυτά.Όταν ο εκδότης της κάρτας δεν υποστηρίζει αναλήψεις, τα χρήματα θα αποσταλούν προς εσάς με επιταγή ή τραπεζικό έμβασμα στο όνομα που έχει καταχωρηθεί στον λογαριασμό σας στην 2winbet.<br/>Όταν η μια ανάληψη με τραπεζικό έμβασμα είναι αναγκαία, θα χρειαστεί να συμπληρώσετε τα στοιχεία του τραπεζικού σας λογαριασμού κάνοντας κλικ στην Ανάληψη στην ιστοσελίδα της 2winbet. Παρακαλούμε ανατρέξτε στην ενότητα Τραπεζικό Έμβασμα για περισσότερες πληροφορίες.'
            },
            withdrawFormFields: [
                {name: 'CreditCardNumber', type: 'text', label: 'CreditCardNumber', required: true},  // translate##Phone##
                {name: 'ExpirationYear', type: 'text', label: 'ExpirationYear', required: true},  // translate##Phone##
                {name: 'ExpirationMonth', type: 'text', label: 'ExpirationMonth', required: true},  // translate##Phone##
                {name: 'CardHolderName', type: 'text', label: 'CardHolderName', required: true}  // translate##Phone##
            ]

        },
        {
            name: 'wirecardnew',
            canDeposit: false,
            canWithdraw: true,
            order: 1,
            withdrawInfoText: {
                eng: 'Minimum withdraw 50€ maximum payout per day 1000€ visa. <br/>If you deposit by debit card, all withdrawals you will be redirected to the same credit card when this allows the card issuer. Simply click Withdraw on the website 2winbet. The 2winbet will not charge you for using this method. The money is credited to your account within 1-2 working days if the card has been issued in the United Kingdom. For cards not issued in the United Kingdom to undertake takes 3-5 working days. If you withdraw by debit card without betting the full amount of your deposit, the 2winbet reserves the right to charge your account to cover any costs associated with the deposit and withdrawal. If necessary the value of the withdrawal may be reduced accordingly expenses afta.Otan card issuer does not support withdrawals, the money will be sent to you by check or bank transfer to the name registered on your account 2winbet. When a withdrawal by bank transfer is necessary, you will need to fill in your bank account by clicking the Ascension on the website 2winbet. Please refer to Bank Wire for more information.',
                gre: 'Ελάχιστο ποσό ανάληψης 50€ μέγιστο ποσό ανάληψης ανα ημέρα 1000€ visa. <br/> Εάν έχετε καταθέσει με χρεωστική κάρτα, όλες οι αναλήψεις σας θα προωθούνται στην ίδια πιστωτική κάρτα όταν αυτό το επιτρέπει ο εκδότης της κάρτας. Απλά κάντε κλικ στην Ανάληψη στην ιστοσελίδα της 2winbet. <br/> Η 2winbet δεν θα σας χρεώσει για την χρησιμοποίηση αυτής της μεθόδου. Τα χρήματα πιστώνονται στον λογαριασμό σας σε 1-2 εργάσιμες ημέρες εαν ή κάρτα έχει εκδοθεί στο Ηνωμένο Βασίλειο. Για κάρτες που δεν έχουν εκδοθεί στο Ηνωμένο Βασίλειο η ανάληψη διαρκεί 3-5 εργάσιμες ημέρες. <br/>Εάν κάνετε ανάληψη με χρεωστική κάρτα χωρίς να στοιχηματίσετε ολόκληρο το ποσό της κατάθεσης σας, η 2winbet διατηρεί το δικαίωμα να χρεώσει τον λογαριασμό σας ώστε να καλύψει τα όποια έξοδα που σχετίζονται με την κατάθεση και την ανάληψη. Εάν είναι απαραίτητο η αξία της ανάληψης θα μειωθεί σύμφωνα με τα έξοδα αυτά.Όταν ο εκδότης της κάρτας δεν υποστηρίζει αναλήψεις, τα χρήματα θα αποσταλούν προς εσάς με επιταγή ή τραπεζικό έμβασμα στο όνομα που έχει καταχωρηθεί στον λογαριασμό σας στην 2winbet.<br/>Όταν η μια ανάληψη με τραπεζικό έμβασμα είναι αναγκαία, θα χρειαστεί να συμπληρώσετε τα στοιχεία του τραπεζικού σας λογαριασμού κάνοντας κλικ στην Ανάληψη στην ιστοσελίδα της 2winbet. Παρακαλούμε ανατρέξτε στην ενότητα Τραπεζικό Έμβασμα για περισσότερες πληροφορίες.'
            },
            withdrawFormFields: [
                {name: 'CreditCardNumber', type: 'text', label: 'CreditCardNumber', required: true},  // translate##Phone##
                {name: 'ExpirationYear', type: 'text', label: 'ExpirationYear', required: true},  // translate##Phone##
                {name: 'ExpirationMonth', type: 'text', label: 'ExpirationMonth', required: true},  // translate##Phone##
                {name: 'CardHolderName', type: 'text', label: 'CardHolderName', required: true}  // translate##Phone##
            ]

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
                //eng: 'Voucher payment limits on merchant site via eMoneySafe wallet.<br><ul><li>Max of €150 per transaction.</li><li>Up-to 5 payments per day.</li><li>Max payment amount €1500 per day.</li><li>Consumer receives full voucher value at merchant’s web site.</li></ul><br>Transactions are subject to terms and condition of UCS and can be downloaded at: www.emoneysafecard.com<br><br> *All users must be a registered as a MoneySafe cardholder with a registered verified mobile number with MoneySafe to complete payout transaction from this web site. All transactions are subject to verification on demand by the web operator or UCS. For any discrepancies or complaints please contact us at: payout@ucsfinancial.com',
                eng: 'Pay-out limits for eMoneySafe wallet. <br/>€ 500 Maximum per transaction up to 5 transactions per day Maximum payment amount € 2.500 <br/>All transactions are subject to a 2.5% commission on the amount requested Transactions subject to the terms and conditions of the UCS and can be downloaded at: www.moneysafecard.com <br/>* All users should be registered as the holder of MoneySafe card verification phone number with MoneySafe to complete the payment transaction from this web site. <br/>All transactions are subject to inspection on demand by the user or web UCS. For any disputes or complaints, please contact us at: payout@ucsfinancial.com <br/>Please add your country code before your phone number, to finish taking your +30 For phones Greece +357 For Cyprus phones',
                gre: 'Pay-out όρια για eMoneySafe wallet.<br /> <br /> · € 500 Μέγιστο ανά συναλλαγή<br /> · Μέχρι 5 Συναλλαγές ανά ημέρα<br /> · Μέγιστη πληρωμή ποσού € 2.500<br /> · Όλες οι συναλλαγές υπόκεινται σε 2,5% προμήθεια επί του ποσού που ζητήθηκε<br /> <br /> Συναλλαγές υπόκεινται στους όρους και τις συνθήκες της UCS και μπορείτε να το κατεβάσετε σε: www.moneysafecard.com<br /> * Όλοι οι χρήστες θα πρέπει να είναι εγγεγραμμένος ως κάτοχος της κάρτας MoneySafe με επαληθεύση αριθμό κινητού με MoneySafe για να ολοκληρώσετε τη συναλλαγή πληρωμής από αυτό το web site. Όλες οι συναλλαγές υπόκεινται σε έλεγχο για τη ζήτηση από το χειριστή web ή UCS. Για οποιεσδήποτε διαφορές ή παράπονα, παρακαλούμε επικοινωνήστε μαζί μας στο: payout@ucsfinancial.com<br/>Παρακαλούμε πολύ προσθέστε τον κωδικό της χώρας σας πριν τον αριθμό τηλεφώνου σας, για να ολοκληρωθεί η ανάληψη σας <br/> +30 Για τηλέφωνα Ελλάδας <br/>+357 Για τηλέφωνα Κύπρου'
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
                eng: 'Paysafecard is one of the largest providers of online payments using prepaid systems. At many stores you can exchange cash against an equivalent Paysafecard code. <br/> You can find information about outlets here : www.paysafecard.com <http://www.paysafecard.com/> Deposit with Paysafecard voucher code: Sign in to the 2winbet website and go to the menu 2winbet.Select Deposit Money, choose Paysafecard as payment method and follow the instructions.',
                gre: 'H Paysafecard είναι ένας από τους κορυφαίους πάροχους στις online πληρωμές χρησιμποιώντας προπληρωμένα συστήματα. Σε πολλά καταστήματα, μπορείτε να ανταλλάξετε μετρητά με έναν ισοδύναμο Paysafecard κωδικό. Μπορείτε να βρείτε πληροφορίες σχετικά με τα καταστήματα εδώ: www.paysafecard.com <http://www.paysafecard.com>  Κατάθεση με τον Paysafecard κωδικό κουπονιού: Εγγραφείτε στην ιστοσελίδα της 2winbet και πηγαίνετε στο εικονίδιο χρημάτων και επιλέξτε κατάθεση. Επιλέξτε Κατάθεση Χρημάτων, επιλέξτε Paysafecard για μέθοδο πληρωμής και ακολουθήστε τις οδηγίες!'
            }

        },
        {
            name: 'trustpay',
            canDeposit: true,
            canWithdraw: true,
            order: 4,
            depositInfoText: {
                eng: 'Bank transfer Min 30 Euro 3-5 working days needed to complete! Deposit Max 5000 euro',
                gre: 'Τραπεζικό έμβασμα Min 30 ευρώ 2-3 εργάσιμες μέρες χρειάζονται για να ολοκληρωθεί! <br/>Κατάθεση Max 5000 ευρώ'
            },
            withdrawInfoText: {
                //eng: 'Voucher payment limits on merchant site via eMoneySafe wallet.<br><ul><li>Max of €150 per transaction.</li><li>Up-to 5 payments per day.</li><li>Max payment amount €1500 per day.</li><li>Consumer receives full voucher value at merchant’s web site.</li></ul><br>Transactions are subject to terms and condition of UCS and can be downloaded at: www.emoneysafecard.com<br><br> *All users must be a registered as a MoneySafe cardholder with a registered verified mobile number with MoneySafe to complete payout transaction from this web site. All transactions are subject to verification on demand by the web operator or UCS. For any discrepancies or complaints please contact us at: payout@ucsfinancial.com',
                eng: 'Withdrawal by bank transfer put the necessary elements of an amount and click withdraw. The term of completion is 3-5 working days. The smallest withdrawal amount is 50 euros to 10,000 euros.',
                gre: 'Ανάληψη με τραπεζικό έμβασμα βάλτε τα απαραίτητα στοιχεία που χρειάζονται το ποσό και πατήστε ανάληψη.Η διάρκεια της ολοκλήρωσης είναι απο 3-5 εργάσιμες μέρες.Το μικρότερο ποσό ανάληψης είναι 50 ευρώ εώς 10000 ευρώ.'
            },
            withdrawFormFields:[
                {name: 'field1', type: 'text', label: 'Name of account holder'},
                {name: 'field2', type: 'text', label: 'Account Number'},
                {name: 'field3', type: 'text', label: 'IBAN'},
                {name: 'field4', type: 'text', label: 'SWIFT / BIC Code'},
                {name: 'field5', type: 'text', label: 'Bank Name'}
            ]

        },
        {
            name: 'netellernew',
            canDeposit: true,
            canWithdraw: true,
            order: 5,
            depositInfoText: {
                eng: 'Neteller is a fast and secure method to fund your account 2winbet through an eWallet, using your debit or credit cards, bank transfer and many other deposit options.<br/> This payment method is available in the following currencies: AUD, BGN, CAD, CHF, DKK, EUR, GBP, HUF, INR, JPY, MYR, MXN, NOK, PLN, RON, SEK, TWD and USD.<br/> Deposits are immediate and 2winbet not impose any charges for using this method. To transfer funds, click Transfer Neteller and select from the list of available payment methods. On your first deposit, you will be prompted to enter your 6 DIGITS SECURITY CODE Neteller account with the amount of the deposit. After clicking the Make Deposit, the amount will be directly credited to your account 2winbet.<br/> The name and email address you have registered with 2winbet, must be the same as the name and email address that is registered to your account 2winbet. <br/> To open a Neteller account or for more information, please visit www.neteller.com',
                gre: 'Η Neteller είναι μια ασφαλής και γρήγορη μέθοδος χρηματοδότησης του 2winbet λογαριασμού σας μέσω ενός eWallet, χρησιμοποιώντας την Χρεωστική ή Πιστωτική κάρτα σας, τραπεζικη μεταφορά και πολλές άλλες επιλογές κατάθεσης.<br/>Αυτή η μέθοδος πληρωμής είναι διαθέσιμη στα παρακάτω νομίσματα: AUD, BGN, CAD, CHF, DKK, EUR, GBP, HUF, INR, JPY, MYR, MXN, NOK, PLN, RON, SEK, TWD και USD.Οι καταθέσεις είναι άμεσες και η 2winbet δεν επιβάλλει καμία χρέωση για την χρήση αυτής της μεθόδου. Για να μεταφέρετε χρήματα, κάντε κλικ στην Κατάθεση και επιλέξτε Neteller από τη λίστα με τις διαθέσιμες μεθόδους πληρωμής. Στην πρώτη σας κατάθεση, θα σας ζητηθεί να εισάγετε τον 6 ΨΗΦΙΟ ΚΩΔΙΚΟ ΑΣΦΑΛΕΙΑΣ σας Neteller λογαριασμού μαζί με το ποσό της κατάθεσης. Αφού κάνετε κλικ στο Κάντε Κατάθεση, το ποσό θα πιστωθεί άμεσα στον 2winbet λογαριασμό σας.<br/> Τα όνομα και η διεύθυνση email που έχετε εγγεγραμμένα με την 2winbet, πρέπει να είναι τα ίδια με το όνομα και την διεύθυνση email που έχετε καταχωρήσει στον 2winbet λογαριασμό σας. <br/> Για να ανοίξετε έναν Neteller λογαριασμό ή για περισσότερες πληροφορίες, παρακαλούμε επισκεφθείτε το www.neteller.com'
            },
            depositFormFields:[
                {name: 'email', type: 'text', label: 'Email/Account Id '}, // translate##Account Id##
                {name: 'secure_id', type: 'text', label: 'Secure Id/Authentication code'}   // translate##Secure Id##
            ],
            withdrawInfoText: {
                eng: '1.500€ Withdraw Limit per Day.Minimum withdraw 50€<br/>If you deposit money via Neteller, all withdrawals will be made the same account Neteller.<br/>The 2winbet will not charge for withdrawals via Neteller. The money will be credited out to you within 48 hours of your withdrawal request. <br/>Once the money taken in your Neteller account may be disbursed via Bank Transfer, Cheque or payable to a Neteller Prepaid Mastercard. The Neteller Prepaid Mastercard allows you to spend your money in many shops or to get cash through an ATM. Please visit www.neteller.com for more information.',
                gre: '1.500€ Όριο Ανάληψη ανά ημέρα . Ελάχιστο ποσό ανάληψης 50€<br/>Αν έχετε καταθέσει χρήματα μέσω Neteller, όλες οι αναλήψεις θα γίνονται τον ίδιο Neteller λογαριασμό.<br/>Η 2winbet δεν θα επιβάλλει χρεώσεις για αναλήψεις μέσω της Neteller. Τα χρήματα θα πιστώνονται σ’εσάς εντός 48 ωρών από την αίτηση ανάληψης.<br/>Μόλις τα χρήματα έχουν αναληφθεί στον Neteller λογαριασμό σας, μπορούν να εκταμιευθούν μέσω Τραπεζικού Εμβάσματος, Επιταγής ή να πληρωθούν σε μία Neteller Prepaid Mastercard. Η Neteller Prepaid Mastercard σας επιτρέπει να ξοδεύετε τα χρήματά σας σε πολλά καταστήματα ή να παίρνετε μετρητά μέσω ενός ΑΤΜ. Παρακαλούμε επισκεφθείτε το www.neteller.com για περισσότερες πληροφορίες.'
            },
            withdrawFormFields:[
                {name: 'email', type: 'text', label: 'Email'}
            ]

        },
        {
            name: 'skrill',
            displayName: 'Skrill',
            canDeposit: true,
            canWithdraw: true,
            order: 6,
            depositInfoText: {
                eng : "Skrill is a fast and secure method to fund your account 2winbet through an eWallet, using your debit or credit cards, bank transfer and many other deposit options.<br/>Deposits are immediate and 2winbet not impose any charges for using this method. To transfer funds, click Transfer Skrill and select from the list of available payment methods. After clicking the Make Deposit, the amount will be directly credited to your account 2winbet.<br/>The name and email address you have registered with 2winbet, must be the same as the name and email address that is registered to your account 2winbet.<br/>To open a Skrill account or for more information, please visit www.skrill.com",
                gre : "Η Skrill είναι μια ασφαλής και γρήγορη μέθοδος χρηματοδότησης του 2winbet λογαριασμού σας μέσω ενός eWallet, χρησιμοποιώντας την Χρεωστική ή Πιστωτική κάρτα σας, τραπεζικη μεταφορά και πολλές άλλες επιλογές κατάθεσης.<br/>Οι καταθέσεις είναι άμεσες και η 2winbet δεν επιβάλλει καμία χρέωση για την χρήση αυτής της μεθόδου. Για να μεταφέρετε χρήματα, κάντε κλικ στην Κατάθεση και επιλέξτε Skrill από τη λίστα με τις διαθέσιμες μεθόδους πληρωμής.<br/>Tα όνομα και η διεύθυνση email που έχετε εγγεγραμμένα με την 2winbet, πρέπει να είναι τα ίδια με το όνομα και την διεύθυνση email που έχετε καταχωρήσει στον 2winbet λογαριασμό σας.<br/>Για να ανοίξετε έναν Skrill λογαριασμό ή για περισσότερες πληροφορίες, παρακαλούμε επισκεφθείτε το www.skrill.com"
            },
            withdrawInfoText : {
                eng : "1.500€ Withdraw Limit per Day.Minimum withdraw 50€<br/>If you deposit money via Skrill, all withdrawals will be made the same account Skrill.<br/>The 2winbet will not charge for withdrawals via Skrill. The money will be credited out to you within 48 hours of your withdrawal request.<br/>Once the money taken in your Skrill account may be disbursed via Bank Transfer, Cheque or payable to a Skrill Prepaid Mastercard. The Skrill Prepaid Mastercard allows you to spend your money in many shops or to get cash through an ATM. <br/>Please visit www.Skrill.com for more information.",
                gre : "1.500€ Όριο Ανάληψη ανά ημέρα . Ελάχιστο ποσό ανάληψης 50€<br/>Αν έχετε καταθέσει χρήματα μέσω Skrill, όλες οι αναλήψεις θα γίνονται τον ίδιο Skrill λογαριασμό.<br/>Η 2winbet δεν θα επιβάλλει χρεώσεις για αναλήψεις μέσω της Skrill. Τα χρήματα θα πιστώνονται σ’εσάς εντός 48 ωρών από την αίτηση ανάληψης.<br/>Μόλις τα χρήματα έχουν αναληφθεί στον Skrill λογαριασμό σας, μπορούν να εκταμιευθούν μέσω Τραπεζικού Εμβάσματος, Επιταγής ή να πληρωθούν σε μία Skrill Prepaid Mastercard. Η Skrill Prepaid Mastercard σας επιτρέπει να ξοδεύετε τα χρήματά σας σε πολλά καταστήματα ή να παίρνετε μετρητά μέσω ενός ΑΤΜ. <br/>Παρακαλούμε επισκεφθείτε το www.Skrill.com για περισσότερες πληροφορίες."
            },
            depositFormFields: [
                {name: 'email', type: 'email', label: 'Email'}  // translate##Email##
            ],
            withdrawFormFields: [
                {name: 'email', type: 'email', label: 'Email', required: true},
                {name: 'name', type: 'text', label: 'Name'}
            ]
        },
        {
            name: 'skrillpsc',
            displayName: 'PaySafeCard',
            canDeposit: false,
            canWithdraw: false,
            order: 7,
            depositInfoText: {
                eng : "",
                gre : ""
            }
        },
        {
            name: 'beecash',
            displayName: 'BeeCash',
            canDeposit: true,
            canWithdraw: false,
            order: 8,
            depositPrefilledAmount: 1,
            depositFormFields: [
                {name: 'VoucherPIN', type: 'text', label: 'Voucher'}
            ],
            depositInfoText: {
                eng : "",
                gre : ""
            }
        }
    ]

});

CMS.constant('SkinWPConfig', {
    hiddenNewsCategoryIds: [113, 119],
    wpUrl: 'https://www.2winbet.gr/json',  // WordpResss instance serving pages, banners
    wpBaseHost: 'www.2winbet.gr',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,

    wpNewsUrl: {
        main: 'https://www.2winbet.gr/newsjson',
        gre:  'https://www.2winbet.gr/json'
    },  // WordpResss instance serving news
    wpPromoUrl: 'https://www.2winbet.gr/json',
    wpPokerPromoUrl: 'https://www.2winbet.gr/json',
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
            'bgr': 'help-root-eng',
            'cze': 'help-root-eng',
            'ita': 'help-root-eng',
            'ger': 'help-root-eng',
            'rus': 'help-root-eng',
            'por': 'help-root-eng',
            'spa': 'help-root-eng',
            'pol': 'help-root-eng',
            'tur': 'help-root-eng'
        }
    }
});

CASINO.constant('SkinCConfig', {
    cUrlPrefix: 'https://games.2winbet.gr',
    cGamesUrl: '/global/play.php',
    cUrl: '/global/casinoGamesLoad.php',
    main : {
        partnerID: '85',
        multiViewEnabled: true
    },
    liveCasino: {
        view3DEnabled:true
    },
    login: {
        url: '/global/partners/rml.php'
    },
    balance: {
        url: '/global/cashier/cashier.php'
    }
});
