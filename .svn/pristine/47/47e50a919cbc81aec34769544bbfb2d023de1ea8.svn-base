CASINO.constant('CConfig', {
    //
    cUrl: '/global/casinoGamesLoad.php',
    iconsUrl: '/global/img/games/gameIcons/gameIcons2/',
    backGroundUrl: '/global/img/games/gameIcons/background/',
    cGamesUrl: '/global/v-play.php',
    cUrlPrefix: 'http://casino.vbet.com',
    bonusPopUpUrl: '', //for example: 'http://www.youtube.com/embed/ft6pQz_9S6M?rel=0&autoplay=1&controls=1'

    main: {
        maxVisibleCategories: 6, //maximum number of categories visible in explorer (the rest will go in "more" block)
        maxVisibleCategoriesWide: 11,//maximum number of categories visible in explorer in wide screen mode (the rest will go in "more" block)
        moreColumnNumber: 6, //number of columns in categories  "more" dropdown block
        numberOfRecentGames: 20, //initial number of recent games to show
        numberOfRecentGamesWide: 28, //initial number of recent games to show in wide screen mode
        increaseBy: 8, // load this number of additional games when clicking "load more"
        increaseByWide: 14, // load this number of additional games when clicking "load more"
        partnerID: '13', // partner ID
        popularGamesID: 'PopularGames', // popular games ID
        topSlotsID: 'TopSlots', // top slots ID
        showAllGamesOnHomepage: false,
        multiViewEnabled: false,
        filterByProviderEnabled: true,
        funModeEnabled: true,// enable/disable fun mode
        providersThatHaveNotFunMode: ['MTG'],
        categoriesThatHaveNotFunMode: ['Progressive'],
        downloadEnabled: true,// enable/disable client download option
        storedbonusPopUpLifetime: 86400000, // 1 day: timestamp in milisecond
        categories: [
            51, //videoslot
            39, //FilmSlot
            46, //InstantWin
            28, //LiveDealer
            35, //VirtualBetting
            4,  //PopularGames
            36, //SkillGames
            17, //TableGames
            1,  //TopSlots
            40, //VideoPoker
            44  //OtherGames
        ],
        filterByCategory: [],
        filterByProvider: []
    },
    login: {
        enable: true,
        url: '/global/partners/rml.php',
        timeout: 60000, // in milliseconds,
        retries: 10, //number of retries in case of fail
        retryTimeout: 1000 // in milliseconds, will be increased by itself on each retry
    },
    balance: {
        url: '/global/cashier/cashier.php',
        timeout: 10000 // in milliseconds
    },
    jackpot: {
        url_prefix: 'http://casino.vivarobet.am',
        url: '/jackpot/getJackpotData.php',
        partner_id: '1'
    },
    liveCasino: {
        categoryId: "28",
        categoryName: "LiveDealer",
        //viewStyle: '3DView', // 3DView / ClassicView / SliderView
        view3DEnabled: false,  // the old config for liva casino view (if view3DEnabled = true then page has 3D view if view3DEnabled = false then page has viewStyle view)
        view3DBannersRotationPeriod: 5000,
        games: {
            roulette: {id: "558", externalID: "102"},
            blackjack: {id: "504", externalID: "101"},
            baccarat: {id: "678", externalID: "103"},
            betOnPoker: {id: "598", externalID: "104"},
            betOnBaccarat: {id: "1637", externalID: "105"},
            draw: {id: "1291", externalID: "8004"},
            keno: {id: "1541", externalID: "8006"}
        },
        jackpot: {
            showPopUp: true,
            url: 43622, //TEMPORARY
            storedPopUpLifetime: 432000 // = 2h
        }
    },
    virtualBetting: {
        categoryId: "35",
        categoryName: "VirtualBetting"
    },
    skillGames: {
        categoryId: "36",
        categoryName: "SkillGames"
    },
    fantasySports: {
        gameID: "VGSFantasySport",
        externalID: '55',
        provider: "VGS"
    },
    ogwil: {
        gameID: "ASG1000",
        externalID: '116',
        provider: "ASG"
    },
    financials: {
        gameID: "VGSFinancials",
        externalID: '15',
        provider: "VGS"
    },
    belote: {
        id: "547",
        gameID: "VGSBELOTE",
        externalID: '10',
        provider: 'VGS',
        initialSize: {
            width: '960',
            height: '640'
        }
    },
    backgammon: {
        id: "599",
        gameID: "VGSnardi",
        externalID: '11',
        provider: 'VGS',
        initialSize: {
            width: '1600',
            height: '900'
        }
    },
    miniGames: {
        rotationPeriod: 15000,
        games: [
            {id: "ASG22", provider: "ASG", externalID: '3035'}
        ]
    }
});
