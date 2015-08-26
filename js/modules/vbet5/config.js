angular.module('vbet5').constant('Config', {

    'main': {
        siteTitle: {
            'arm': '',
            'rus': '',
            'eng': ''
        },
        asianLoadDays: 1, //   asianview# loads first loadDays for default, for the first time , when localstorage is not set yet
        main_template: 'templates/main.html',
        skin: 'vbet.com',
        logoUrl: null,
        defaultTransLang: 'eng',  //default translation language
        translateToDefaultIfNotAvailable: true,  // translator will translate strings to default language if translation is not available for selected language
        site_id: '13', //13 is test id
        source: "1",
        oldHomepage: true,
        calendarPrematchSelection: false,
        geoIPLangSwitch: false,
        ssdf: false,
        collapseMenuInLive: false,
        allowSiteIdOverride: false,
        googleAnalyticsId: false,
        googleAnalyticsEnableDisplayFeatures: false, // enable GA display features plugin
        yandexMetricaId: false,
        wideScreenModeWidth: 1833, //starting with this width of window application will switch to wide screen mode
        middleScreenModeWidth: 1340,
        redirectOnTablets: false, //  if URL is provided will redirect to that URL on tablet devices
        sportEnabled: true, //enable sports
        virtualSportsEnabled: true, //enable virtual sports
        fantasyEnabled: false, //enable fantasySports
        ogwilEnabled: false, // enable ogwil game
        casinoEnabled: true, //enable Casino
        pokerEnabled: true, // enable Poker
        enableNewPoker: false,
        enableBonusSectionInWallet: true,
        enablePointsSectionInWallet: true,
        beloteEnabled: true, // enable belote
        backgammonEnabled: true, // enable backgammon
        skillgamesEnabled: true, //enable skill Games,
        jackpotEnabled: false, // enable jachpot
        virtualBettingEnabledInTopMenu: false, // show/hide virtual betting in top menu
        backGammonEnabledInTopMenu: false, // show/hide backgammon in top menu
        beloteEnabledInTopMenu: false, // show/hide belote in top menu
        sportSavedGamesEnabled: true, //enable sports saved games slider tab
        casinoSavedGamesEnabled: true, //enable casino saved games slider tab
        enableBonusCancellation: false, // enable canceling bonus
        poolBettingEnabled: false, //enable pool betting
        freeBetEnabled: false, //enable pool betting
        betRulesLink: '',
        showMyGamesInBetslip: false,
        showOddFormatSwitcherInBetslip: false,
        betHistoryEnabled: true,  //enable bet history in top menu
        enableCasinoBalanceHistory: false, //enable casino balance history in top menu
        enableCasinoBetHistory: false, //enable casino balance history in top menu
        enableCommaSeparateNumber: false, // enable comma in input field
        videoEnabled: true, //enable game videos
        bonusesEnabled: false, //enable bonuses (will show bonus amounts in bet/balance histories)
        enableLoginPopup: false, // when user log in, it will show poup message
        profileMenuHeaderDisplayField: 'first_name', // default First Name.
        poolBettingPointsAmount: 10,
        disableDepositPage: false,
        disableWithdrawPage: false,
        disableHeaderMessages: false,
        forceNumpadAttr: false,
        showWithdrawRequestsTab: false,
        sportsAlwaysOnTop: false,
        competitionsOrderByTimeInAsianView: false, //for order competitions by time in Asian view, default value false
        homepagePageType: 'sport',  // the type of home page (sport, casino, poker)
        headerMessageIcon: {
            enabled: true,
            alwaysShow: false
        },
        disableEditingPersonalInfo: false,
        sportListColumnNumber: 6,    //number of columns in Sports  "more" dropdown block
        regionsListColumnNumber: 5,  //number of columns in Regions  "more" dropdown block
        sportListMaxVisibleItems: 8,  //maximum number of sports visible in explorer (the rest will go in "more" block)
        regionsListMaxVisibleItems: 6,  //maximum number of regions visible in explorer (the rest will go in "more" block)
        sportListMaxVisibleItemsWide: 14,  //maximum number of sports visible in explorer in wide screen mode (the rest will go in "more" block)
        regionsListMaxVisibleItemsWide: 11,  //maximum number of regions visible in explorer in wide screen mode (the rest will go in "more" block)
        authSessionLifetime: 600000, // in milliseconds,
        showFavoriteGamesInSportList: false,
        separateFavoritesInClassic: false,  // if true, when adding game to favorite in classic view, it will *move* to favorites list. if false, it will be duplicated there(this is better for not reloading lists)
        showFinancialsInSportList: false,   // false to hide,  any number to show (number is used as 'order' field to define it's position among sports)
        showVirtualsInSportList: false,   // false to hide,  any number to show (number is used as 'order' field to define it's position among sports)
        showTodayBets: false,   // false to hide,  any number to show (number is used as 'order' field to define it's position among sports)
        showMapSection: false,   // false to hide,  any true to show Map Section in About Page
        showFavoriteCompetitions: false,
        expandFavoriteCompetitions: false,
        expandFavoriteCompetitionsFirst: false,
        showPrematchLimit: 10, // 0 if disabled
        selectFavoritesByDefault: false, // will select favorites instead of 1st sport if there are favorite games
        selectRegionsByDefault: false, // will filter by region
        hideP1XP2FromOpenGame: false,
        enableSportsbookLayoutSwitcher: false, //enable layout switcher
        enableLayoutSwitcherInSportsbook: false, //enable layout switcher inside sportsbook
        enableClassicScrollToggle: false,
        enableLiveSectionPin: true,
        availableSportsbookViews: {modern: true, classic: true, asian: false, external: false},
        sportsbookLayoutSwitcherTooltipTimeout: 3000, // number of milliseconds to show the hint
        loadNotificationsFromWP: false,
        enableNewHorseRacingTemplate: true,
        showEachWay: false,
        enableBetPrint: false,
        downloadPDFButtons: false,
        sportsLayout: "modern",
        customSportAliases: {},
        sportsTodaysBetSameView: false,
        enablePrematchMultiView: false,
        autoExpandSingleRegionCompetitions: false,
        ageRestrictionInFooter: false, // false to disable, number, to display that number with plus sign in footer.  e.g. 18
        haveFaq: false,
        openHelpAsPopup: false, //open help pages in popup, not in slider (they have to be in separate section in wordpress)
        noAnimations: false,  // disable animations
        enableCorrectScoreAlternateView: true,
        localStorageKeyNamePrefix: false,  // set a string to store all values in local storage with key prefixed with that string
        allowSavingOddFormat: true,
        enableBetBooking: false,  //enable booking bets (get booking id instead of placing bet)
        enableBetBookingPopup: false,  //enable booking popup showing booking id
        bookingBetPrintViewType: 1, // 1: for id only print view, 2: for full betslip print view
        enableAccountVerification: false,
        enableDepositLimits: false,
        roundDecimalCoefficients: 3,  // rounding of coefficient, number of significant digits
        newMenuItems: {},
        displayEventsMaxBet: false, //  display event max bet on hover
        liveModule: {
            enabled: false  //external (Gaspar's) sportsbook
        },
        menuOrder: ['live', 'sport', 'virtual-sports', 'belote', 'backgammon', 'virtual-betting', 'casino', 'poolbetting', 'poker',  'livedealer',  'games', 'ogwil', 'freebet', 'fantasy', 'jackpot', 'financials'],
        'rfid': {
            loginWIthRFID: false,
            promptRFIDPassword: false,
            allowAccessWithoutRfid: false
        },
        enableSubHeader: false,  // show 2nd level menu
        showResultsTabInSportsbook: false, //show results tab in sportsbook top tab
        allowHidingUsernameAndBalance: true,
        allowTimeFormatChange: false,
        balanceDefaultPage: 'deposit', // balanceHistory, deposit, withdraw, cashier
        casinoBalanceDefaultPage: 'cashier',
        settingsDefaultPage: 'details', // details, changepassword
        passwordNewResetMode: false,
        passwordValidationPattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\[\\]\\\\`~!@#$%^&*()_+={};:<>|./?,\"'-]+$", //for change password in settings
        passwordValidationPatternError: 'Password must contain uppercase letters, lowercase letters and numbers.', //for change password in settings
        passwordValidationLength: 8, //for change password in settings
        enableFreeRenew: false,  //  'renew' for getting free money (available in free.vbet.com)
        statsHostname: 'http://statistics.betconstruct.com/#/en/external/page/h2h',  // hostname for statistics. when clicking on game statistics icon, popup on this hostname is open,
        headerStatisticsLink: false,
        enableH2HStat: false,
        enableVisibleInPrematchGames: false,
        poolBettingResultsUrlPrefix: 'http://www.vbet.com/results/',
        horceRacingXmlUrl: 'https://data.vbet.com/horseracing-tmp/',
        virtualBettingUrl: '#/casino/?category=35',
        beloteUrl: '#/games/?game=547',
        backgammonUrl: '#/games/?game=599',
        monthNames: [{name: 'Jan', val: '01'}, {name: 'Feb', val: '02'}, {name: 'Mar', val: '03'}, {name: 'Apr', val: '04'}, {name: 'May', val: '05'}, {name: 'Jun', val: '06'}, {name: 'Jul', val: '07'}, {name: 'Aug', val: '08'}, {name: 'Sep', val: '09'}, {name: 'Oct', val: '10'}, {name: 'Nov', val: '11'}, {name: 'Dec', val: '12'}],
        showGameIds: false,  //show game ids
        trackingScripts: [],
        search: {   //limits of search results
            limitGames: 10,
            limitCompetitions: 10,
            enableSearchByGameNumber: true
        },
        liveChat: null,
        availableLanguages: {
            'eng': { 'short': 'EN', 'full': "English"},
            'arm': { 'short': 'HY', 'full': "Հայերեն"},
            'rus': { 'short': 'RU', 'full': "Русский"}
        },
        timeZonePerLanguage: {
//            'rus' : '+04:00',
//            'tur' : '+03:00'
        },
        allowCustomHtml: false, // allow custom html scripts and html tags
        balanceTypesToHideInHistory: [], // see available values in  js/modules/vbet5/controllers/balance.js
        poolBettingCurrencyName: 'EUR', //currency in which jackpot will be displayed in top menu
        availableCurrencies: ["AMD", "USD", "EUR", "GEL", "RUB", "UAH", "IRR", "GBP", "KGS", "KZT", "MDL", "LTL", "XAF", "TRY", "AZN", "BYR", "NGN", "VND", "KRW", "TJS", "RSD", "UGX", "LVL", "CHF", "MYR", "SGD", "HRK", "GHS", "RON", "CNY", "CPI", "BRL"],
        balanceFractionSize: 2, //number of decimal places to round the balance value to(when displaying)
        showPointsBalance: false, // show points balance in user dropdown menu
        registration: {
            enable: true,
            promoCodeLifetime: 2592000000, //(in milliseconds)  30 days
            defaultPromoCode: null,
            deaultPromocodePerDomain: null,  // see bt848.com skin for options
            defaultCurrency: 'USD',
            minimumAllowedAge: 18,
            minimumAllowedPokerAge: 21,
            suggestPokerRegistration: false,
            requireSmsValidation: false,
            phoneNumberPattern: '/^[0-9 ]+$/',
            phoneNumberLength: '20',
            replacePhoneNumberAreaCode: false,
            RegTimeSmsValidation: false,
            restrictedCountries: {'FR': null},
            loginRightAfterRegistration: true,
            enablePassportValidation: true,
            termsLink: false,
//            defaultCountryCode: 'US',
            loadExternalScriptAfterRegistration: null, //  script that will be loaded after registration is complete
            sliderPageAfterRegistration: 'deposit', // will open this page after completing registration and clicking "ok"
            //autoSetCurrency: {   //automatically sets currency in registration form based on selected country (only for selected country-currency pairs)
            //    enabled: true,
            //    disableChangeAfterSelect: true,   //will not let user change another currency for selected country
            //    availableList: {
            //        "AM" : "AMD",
            //        "US" : "EUR",
            //        "RU" : "RUB"
            //    }
            //}
            securityQuestion: {
                enabled: false,
                questions: ['What was the name of your first pet?', 'What age were you when you went to school?', 'What was the name of the city you were born in?', 'What was the number of your school?', 'What was the name of your first love?', 'What was the make and model of your first car?']
            },
            enableNotifySms: false,
            enableNotifyEmail: false
        },
        personalDetails: {
            readOnlyFields: ['user_id', 'first_name', 'sur_name', 'birth_date', 'gender'],
            editableFields: ['country_code', 'city', 'address', 'email', 'phone_number'],
            requiredEditableFields: ['country_code', 'city', 'address', 'email'],
            disabledFields: []
        },
        remindToRenewBalance: {
            enabled: false,
            page: 'renew', // renew or deposit or any other slider page
            threshold: 10,
            interval: 14400000 //4 hours
        },
        // custom sports book builder enable/disable parts
        customSportsBook: {
            enabled: false,
            classic: {
                showPrematch: true,
                showLive: true,
                showMarkets: true,
                showBetSlip: true
            }
        },
        betTypes: [
            {name: 'single', value: 1},
            {name: 'express', value: 2},
            {name: 'system', 'value': 3},
            {'name': 'chain', 'value': 4}
            //{'name': 'Trixie', 'value': 10},
            //{'name': 'Patent', 'value': 11},
            //{'name': 'Yankee', 'value': 12},
            //{'name': 'Lucky 15', 'value': 13},
            //{'name': 'Canadian', 'value': 14},
            //{'name': 'Lucky 31', 'value': 15},
            //{'name': 'Heinz', 'value': 16},
            //{'name': 'Lucky 63', 'value': 17},
            //{'name': 'Super Heinz', 'value': 18},
            //{'name': 'Goliath', 'value': 19}
        ],
        upcomingGamesPeriods: [1, 2, 3, 6, 12, 24, 48, 72],  //periods available for user to select for upcoming games (hours)
        enableTimeZoneSelect: false, // show time zone switcher or not
        disableBetSlip: false,
        disableRegistrationAndLogin: false,
        disableHeader: false, // hide header
        disableFooter: false,
        disableFooterNav: false, // disable wordpress content in footer
        disableFooterCopyrightBlock: false,
        disableHeaderNavigation: false, // hide header navbar,
        disableHomepageNews: false, //disable news block on homepage
        enableNews: true, // enable news on sport page
        transferEnabled: true, //enable "transfer" tab
        enableBannerUnderBetslip: true, // enable banner under the betslip
        enableBannerCustomAliasUnderBetslip: false, // enable banner under the betslip for custom sports
        showNewsInClassicView: false,  //show news block under betslip in classic view
        sportNewsLink: '',
        allNewsLink: '',
        hidePokerLeaderboardAllButton: false, // in home page
        getPokerLeaderboardDataFromSwarm: false, // in home page
        enableMiniGameUnderBetslip: false, // enable mini casino game under the betslip
        hideBetslipBannerWhenBetslipIsNotEmpty: true,
        enableHpBannerInsteadLiveGame: false, //enable banners on homepage at right, instead live game
        enableBannersInsideSportsbookGames: true, // enable banners under sportsbook game(classic view)
        showPromotedGames: {}, //  retrieve(from swarm) and show promoted games in specified location(s).   see bonanzawin config for example
        showPopularGames: false, //show "popular" games selector (as region)
        showNewBelotePage: false,
        showNewBackgammonPage: false,
        availableVideoProviderIds: [1, 3, 5, 7, 8, 11, 12, 15, 16, 999999], //list of available providers
        availableVideoProviderCountryFilters: { 1: ['AM'], 3: ['AM'], 5: ['AM'], 7: ['AM'], 8: ['AM'], 11: ['AM'], 12: ['AM'], 15: ['AM'], 16: ['AM']},
        availableVideoProviderCountryFiltersActive: false,
        featuredGamesRotationPeriod: 4000,  // each featured game on homepage will be shown for this amount of time (in milliseconds)
        beloteSlidesRotationPeriod: 6000,  // each belote banner will be shown for this amount of time (in milliseconds)
        backgammonSlidesRotationPeriod: 4000,  // each backgammon banner will be shown for this amount of time (in milliseconds)
        underBetslipBannersRotationPeriod: 5000,   // period in milliseconds or null to disable rotation and show all at once
        enableHeaderAnnouncement: false,
        headerAnnouncementTarget: '_blank',
        showSearchInsideSportsbook: false, // will show search box inside sportsbook, under regions (needed for skins without menu)
        showSurveyPopup: false,
        showPromotedGamesOnHomepage: {
            enabled: false,
            level: 'game',  // game or competition
            type: 'promoted' // promoted or favorite
        },
        loadPopularGamesForSportsBook: {
            enabled: false
        },

        facebookIntegration: {
            enable: false
        },
        odnoklassnikiIntegration: {
            enable: false,
            settings: {
                clientId: '1107409152',
                scopeType: 'VALUABLE_ACCESS',
                responseType: 'token',
                redirectUri: 'http://localhost:63342/vbet5/app/trunk/odnoklassniki.html'
            }
        },
        enablePromotions: false,
        enableInvites: false,  //enable invite functionality
        headerAnnouncementLink: "#/sport/?type=0&sport=844&region=65537&competition=866568152",
        copyrightSince: 2003,
        poweredByInFooter: true,  // false - don't show,  true -show with link,  -1 - show without link
        showPaymentSystemsInFooter: true,
        logoutTimeout: 1500,  // timeout to wait for logout command to complete after which logout actions(cleanup, etc) will be performed anyway
        logoutTime: false, // seconds , set to 0 or false to disable
        enableFeedbackButton: false,
        buyVc: {     // enable buying virtual credit from renew tab (key) => VC amount
            enabled: false,
            points: {
                1000: '$9.99',
                5000: '$24.99',
                10000: '$24.99'
            }
        },
        customLanguageCss: ['arm', 'geo'],
        liveCalendarEnabled: false,
        liveOverviewEnabled: false,
        liveMultiViewEnabled: false,
        liveCalendarInLeftMenu: true,
        enableLiveCalendarPrinting: false,
        numberOfExpandedMarkets: 'all'
        // numberOfExpandedMarkets: 8
    },

    partner: {
        // section for partner config
        allowStringUserId: false, //don't convert userId to number
        notifyOnResize: false, //if enabled, will call partner's provided callback function on every resize, passing it the frame size
        enableSigninRegisterCallbacks: false, // log in and register buttons will be shown and when clicked callback function with corresponding parameters will be called
        inactivityCallbackTime: 0 // Time in seconds to send callback command once user is inactive
    },
    customTemplates: false, // skin specific templates , e.g. ["footer.html", "sport/main.html"]
    'env': {
        lang: 'eng',
        authorized: false,
        showSlider: false,
        live: false,
        selectedTimeZone: null, //
        oddFormat: 'decimal', // possible values:  decimal, fractional, american
        sound: 0.75,//'on',
        timeFormat: '24h',
        longTimeFormats: {
            HALF: '12h',
            FULL: '24h'
        },
        preMatchMultiSelection: false,
        liveStatsFlipMode: 0,
        hideLiveStats: false,
        showSportsbookToolTip: false
    },

    'betting': {
        bet_source: '1',
        storedBetslipLifetime: 3600000, // in milliseconds
        maxWinLimit: false,
        disableMaxBet: false,
        disableNumpad: true,
        enableExpressBonus: false,
        expressBonusType: 1, //1: regular bonus 2,3,4,5..% ; 2: 2-5,10,15,20,25,30,30..30 %; 3: (k > 2.5) ? 7% : 0;
        enableSuperBet: false,
        showSuperBetNotificationsViaPopup: false,
        enableHorseRacingBetSlip: false, // SP, new bet types, etc.
        enableEachWayBetting: false,
        enableShowBetSettings: false,
        allowManualSuperBet: false,
        superBetCheckingIntervalTime: 5000,
        autoSuperBetLimit: {}, // {'GEL': 400, 'AMD': 50000, 'USD': 1000} //if not false then set limit for each currency if stake is greater then Limit superbet is enabling automaticaly
        resetAmountAfterBet: false,
        totalOddsMax : 1000,
        allowSuperBetOnLive: false
    },
    poker: {
        hideDownloadLinkSectionInPokerPage: false,
        instantPlayAvailable: true,
        instantPlayLink: 'http://onlinepoker.betconstruct.com:8081/poker-client/poker/vbet',
        instantPlayTarget: '_blank',
        balanceTimeout: 30000, // the period of requesting poker balance (in milliseconds),
        downloadLink: {
            windows: 'http://poker-updates.betconstruct.com/vbet/Vbet%20Poker.exe',
            mac: 'http://poker-updates.betconstruct.com/vbet/Vbet%20Poker.dmg',
            android: 'http://poker-updates.betconstruct.com/vbet/Vbet%20Poker.tar.gz'
        },
        'chinese-downloadLink': {
            windows: 'http://poker-updates.betconstruct.com/vbet/Vbet%20ChinesePoker.exe',
            mac: 'http://poker-updates.betconstruct.com/vbet/Vbet%20ChinesePoker.dmg',
            linux: 'http://poker-updates.betconstruct.com/vbet/Vbet%20ChinesePoker.tar.gz'
        }
    },
    backgammon: {
        instantPlayLink: 'http://nardi.vbet.com',
        instantPlayTarget: '_blank',
        downloadLink: {
            windows: 'http://casino.vbet.com/nardi/VGammon-1.1.14-Setup.exe'
        }
    },
    belote: {
        instantPlayLink: 'http://belote.vbet.com',
        instantPlayTarget: '_blank',
        downloadLink: null
    },
    'swarm': {
        debugging: false, //enable websocket debugging
        languageMap: { 'pol' : 'eng', 'por': 'por_2', 'pt-br' : 'por', fre: 'fra'},
        sendSourceInRequestSession: false,
        sendTerminalIdlInRequestSession: false,
        webSocketTimeout: 5000,
        url: [{ url: "ws://10.32.5.83:8282/", weight: 10}],
        websocket: [{ url: "ws://10.32.5.83:8282/", weight: 10}],
//        url: "https://10.32.5.83:8080/", // bob
//        url: "https://www.vbet.com:8080/", //production
//        websocket: "ws://10.32.5.83:8080/", //bob
//        websocket: "ws://192.168.253.223:8080/", //stable

        useWebSocket: true,
        maxWebsocketRetries: 5,  // maximum number of websocket reconnect attempts after which it will give up
        webSocketRetryInterval: 2000 // retry interval, in milliseconds (will be increased after each unsuccessful retry by itself)
    },
    serverToServerTracking: false,
    xDomainSlaves: '{"https://www.vbet.com:8080" : "/xdomain-proxy.html"}', //has to be JSON string
    enableDepositDefaultPayment: true // enable first payment type in deposit

});
