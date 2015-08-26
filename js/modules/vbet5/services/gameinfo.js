/**
 * @ngdoc service
 * @name vbet5.service:GameInfo
 * @description
 *
 */
angular.module('vbet5').service('GameInfo', ['$rootScope', '$http', '$filter', '$window', 'Translator', 'X2js', 'Zergling', 'Config', 'Moment', 'Utils', 'Storage', function ($rootScope, $http, $filter, $window, Translator, X2js, Zergling, Config, Moment, Utils, Storage) {
    'use strict';
    var GameInfo = {};

    GameInfo.VIRTUAL_SPORT_IDS = [1124639783, 1124639301, 1124636817, 1369527874];

    /**
     * @ngdoc method
     * @name groupRegionsIfNeeded
     * @methodOf vbet5.service:GameInfo
     * @description checks if there's region mapping specified in config and groups specified regions into one
     * @param {Array} regions array of regions
     * @partam {Number} sport id
     * @returns {Array} new array of regions with some of them merged into one
     */
    GameInfo.groupRegionsIfNeeded = function groupRegionsIfNeeded(regions, sportId) {
        console.log("groupRegionsIfNeeded", regions, sportId);
        var result = regions;
        GameInfo.groupRegions = GameInfo.groupRegions || {};
        if (Config.main.regionMapping && Config.main.regionMapping.enabled && Config.main.regionMapping[sportId]) {
            result = regions.reduce(function (acc, region) {
                var replacement = Config.main.regionMapping[sportId][region.alias];
                if (replacement) {

                    GameInfo.groupRegions[replacement.id] = GameInfo.groupRegions[replacement.id] || replacement;
                    GameInfo.groupRegions[replacement.id].children = GameInfo.groupRegions[replacement.id].children || [];
                    GameInfo.groupRegions[replacement.id].children.push(region.id);

                    var alreadyReplaced = Utils.getArrayObjectElementHavingFieldValue(acc, 'id', replacement.id);
                    if (alreadyReplaced) {
                        alreadyReplaced.game += region.game;
                        return acc;
                    }
                    region.id = replacement.id;
                    region.alias = replacement.alias;
                    region.name = Translator.get(replacement.name);
                    console.log(acc, replacement.id, alreadyReplaced);
                }
                acc.push(region);
                return acc;
            }, []);

        }
        console.log('groupRegionsIfNeeded result:', result);
        return result;
    };

    /**
     * @ngdoc method
     * @name replaceRegionFieldsIfNeeded
     * @methodOf vbet5.service:GameInfo
     * @description replaces region alias and name with values from Config.main.regionMapping config object if needed
     * @param {Object} region region object
     */
    GameInfo.replaceRegionFieldsIfNeeded = function replaceRegionFieldsIfNeeded(region) {
        if (Config.main.regionMapping && Config.main.regionMapping.enabled) {
            angular.forEach(Config.main.regionMapping, function (regions) {
                angular.forEach(regions, function (replacement, regionAlias) {
                    if (region.alias == regionAlias) {
                        region.alias = replacement.alias;
                        region.name = replacement.name;
                    }
                });
            });
        }
    };

    /**
     * @ngdoc method
     * @name getRegionChildren
     * @methodOf vbet5.service:GameInfo
     * @description returns ids of regions merged into region specified by id
     * @param {Number} id id of "parent' region
     * @returns {Array} array of children(regions merged into specified region) ids
     */
    GameInfo.getRegionChildren = function getRegionChildren(id) {
        return GameInfo.groupRegions[id] && GameInfo.groupRegions[id].children ? GameInfo.groupRegions[id].children : null;
    };


    /**
     * @ngdoc method
     * @name hasVideo
     * @methodOf vbet5.service:GameInfo
     * @description checks if games has video or not
     * @param {Object} game game object
     * @returns {Boolean} if game has video or not
     */
    GameInfo.hasVideo = function hasVideo(game) {
        if ([1, 3, 5, 15].indexOf(game.tv_type) !== -1 && game.video_id && Config.main.availableVideoProviderIds.indexOf(game.tv_type) !== -1) {
            return true;
        }
        if (game.video_id < 0 && Config.main.availableVideoProviderIds.indexOf(3) !== -1) {
            game.tv_type = 3;
            return true;
        }
        if (game.video_id2 && Config.main.availableVideoProviderIds.indexOf(6) !== -1) {
            game.video_id = game.video_id2;
            game.tv_type = 6;
            return true;
        }
        if ([7, 8, 11, 12, 16].indexOf(game.tv_type) !== -1 && Config.main.availableVideoProviderIds.indexOf(game.tv_type) !== -1) {
            return true;
        }
        if (game.video_id === 999999 && Config.main.availableVideoProviderIds.indexOf(999999) !== -1) { // the horse racing case
            game.tv_type = 999999;
            return true;
        }
        if (game.video_id3 && Config.main.availableVideoProviderIds.indexOf(17) !== -1) {
            game.video_id = game.video_id3;
            game.tv_type = 17;
            return true;
        }
        game.video_id = undefined;
        return false;
    };

    /**
     * @ngdoc method
     * @name processProvidersByCountryIfNeeded
     * @methodOf vbet5.service:GameInfo
     * @description returns same array if no country filter applied
     *
     * @returns {Array} condition object for swarm request
     */
    GameInfo.processProvidersByCountryIfNeeded = function processProvidersByCountryIfNeeded(inputIds) {
        var outputIds = [];
        var r;

        var countryFilters = Config.main.availableVideoProviderCountryFilters;

        if (!Config.main.availableVideoProviderCountryFiltersActive || !countryFilters || !$rootScope.geoCountryInfo || $rootScope.geoCountryInfo === false) {
            console.log("video providers not filtered by country");
            return inputIds;
        }
        console.log("filtering video providers by country", $rootScope.geoCountryInfo.countryCode);
        for (r = 0; r < inputIds.length; r++) {
            if (countryFilters[inputIds[r]]) {
                if (countryFilters[inputIds[r]].indexOf($rootScope.geoCountryInfo.countryCode) > -1) {
                    outputIds.push(inputIds[r]);
                }
            } else {
                outputIds.push(inputIds[r]);
            }

        }

        return outputIds;
    };

    /**
     * @ngdoc method
     * @name getVideoFilter
     * @methodOf vbet5.service:GameInfo
     * @description returns "have video" condition object for swarm request
     *
     * @returns {Array} condition object for swarm request
     */
    GameInfo.getVideoFilter = function getVideoFilter() {
        var filterList = [], availableProviders = Config.main.availableVideoProviderIds;

        console.log('AP: ---------------------------------');

        console.log(availableProviders);
        availableProviders = GameInfo.processProvidersByCountryIfNeeded(availableProviders);
        console.log(availableProviders);

        for (var i = 0, length = availableProviders.length; i < length; i += 1) {
            switch (availableProviders[i]) {
                case 1:         // PerformGroup
                    filterList.push({tv_type: 1, video_id: {'@gt': 0}});
                    break;
                case 3:         // Unas TV
                    filterList.push({video_id: {'@lt': 0}});
                    break;
                case 5:         // IMG
                    filterList.push({tv_type: 5, video_id: {'@gt': 0}});
                    break;
                case 6:         // Private TV
                    filterList.push({video_id2: {'@gt': 0}});
                    break;
                case 7:         // Futsal1
                case 8:         // Futsal2
                case 11:        // Hockey
                case 12:        // futsal3
                case 16:        // ua_tv
                    filterList.push({tv_type: availableProviders[i]});
                    break;
                case 17:        // urakulas_tv
                    filterList.push({video_id3: {'@gt': 0}});
                    break;
                case 15:         // VIRTAUL_SPORTS
                    filterList.push({tv_type: 15, video_id: {'@gt': 0}});
                    break;
                case 999999:    // horce racing
                    filterList.push({video_id: 999999});
                    break;
                default:
                    break;
            }
        }
        return filterList;
    };

    /**
     * @ngdoc method
     * @name getVideoData
     * @methodOf vbet5.service:GameInfo
     * @description fills game object with video_data (gets it from swarm)
     * @param {Object} game game object
     * @param {Boolean} evenIfNotLoggedIn get video data even if user is not logged in
     */
    GameInfo.getVideoData = function getVideoData(game, evenIfNotLoggedIn) {
        if (!game || (!evenIfNotLoggedIn && !$rootScope.env.authorized) || game.tv_type === undefined || game.video_id === undefined) {
            return;
        }
        return Zergling
            .get({ video_id: game.video_id, provider: game.tv_type }, 'video_url')
            .then(function (data) {
                console.log('video_url rsponse', data);
                game.video_data = data;
            });
    };
    /**
     * @ngdoc method
     * @name checkIfTimeFilterIsNeeded
     * @methodOf vbet5.service:GameInfo
     * @description checks if global time filter is needed when requesting games information
     */
    GameInfo.checkIfTimeFilterIsNeeded = function checkIfTimeFilterIsNeeded() {
        if (Config.main.enableSameDayGamesInTimezone) {
            var nextDayStart = Moment.get().zone(Config.main.enableSameDayGamesInTimezone).endOf("day").unix();
            Config.env.gameTimeFilter = {'@lt': nextDayStart};
            $window.setTimeout(function () {$window.location.reload(); }, (nextDayStart - Moment.get().unix()) * 1000); //reload at end of the day
        }
    };


    /**
     * @ngdoc method
     * @name getHorseRaceInfo
     * @methodOf vbet5.service:GameInfo
     * @description access to xml which contains race extra data and add this data to $scope.info.race
     * @param {Object} game info object
     */
    GameInfo.getHorseRaceInfo = function getHorseRaceInfo(gameInfo, market, marketName) {
        if (!gameInfo) {
            return;
        }
        gameInfo.race = gameInfo.race || {};
        gameInfo.race.horseStats = gameInfo.race.horseStats || [];
        gameInfo.race.nonRunners = gameInfo.race.nonRunners || [];
        gameInfo.race.favourite = gameInfo.race.favourite || [];
        gameInfo.race.second_favourite = gameInfo.race.second_favourite || [];

        var xmls = gameInfo.horse_xml.split(',');
        var raceXml, raceId;
        for (var i = 0; i < xmls.length; i++) {           
            if (xmls[i].indexOf('.xml') > -1) {
                xmls[i] = xmls[i].indexOf('/') === -1 ? xmls[i].replace(' ', '') : xmls[i].split('/')[1];
                if (xmls[i].indexOf('c') === 0) {
                    raceXml = xmls[i];
                }
            }
            else if(xmls[i].length){
                raceId = xmls[i];
            }
        }
        var path = Config.main.horceRacingXmlUrl + raceXml;
        var raceData = {};
        //Does not work for localhost
        $http.get(path).success(function (data) {
            raceData = X2js.xml_str2json(data);   
            if (raceData) {
                var raceDate = 's' + raceData.HorseRacingCard.Meeting._date.substring(6, 8) + raceData.HorseRacingCard.Meeting._date.substring(4, 6) + raceData.HorseRacingCard.Meeting._date.substring(2, 4);
                var currentRace = getCurrentRace(raceData.HorseRacingCard.Meeting.Race, raceId);
                if (currentRace) {
                    gameInfo.race = getRaceInfo(currentRace);

                    gameInfo.race.courceIcon = 'http://horseracing.vivaro.am/stadium/' + raceData.HorseRacingCard.Meeting._course.toLowerCase().split(' ').join('') + '.png';
                    gameInfo.race.courceName = raceData.HorseRacingCard.Meeting._course;

                 //   gameInfo.race.currentRace = currentRace;

                    if(!currentRace.Horse.length){
                       loadHorseDataFromMarket(market, gameInfo.race);
                    }else{
                        var horseList = getHorseList(currentRace, market, marketName, raceDate); //this contains horseList.Horses, horseList.NonRunners
                        gameInfo.race.horseStats = horseList.horses;
                        gameInfo.race.nonRunners = horseList.nonRunners;
                        gameInfo.race.rule4 = horseList.rule4;
                        if (market) {
                            gameInfo.race.favourite = getHorseMarket(market, marketName, 'Favourite');
                            gameInfo.race.second_favourite = getHorseMarket(market, marketName, '2nd Favourite');
                        }
                    }
                }
            }
            else{ loadHorseDataFromMarket(market, gameInfo.race);}
        })
            .error(function(data){
                loadHorseDataFromMarket(market, gameInfo.race);
            });
    };

    /**
     * @ngdoc method
     * @name loadHorseDataFromMarket
     * @methodOf vbet5.service:GameInfo
     * @description we load horse data from market when there are no horse details available
     * @param {Object} market with data
     * @param {Object} raceData where to add horse data
    **/
    var loadHorseDataFromMarket = function loadHorseDataFromMarket(market, raceData){
        raceData.horseStats = [];
        raceData.nonRunners = [];
        for(var key in market) {
            if (market.hasOwnProperty(key)) {
                var raceEvents = market[key].event;
                for (var raceEvent in raceEvents) {
                    if (raceEvents.hasOwnProperty(raceEvent)) {
                        var raceStats = {};
                        raceStats.id = raceEvents[raceEvent].id;
                        raceStats.name = raceEvents[raceEvent].type;
                        raceStats.event = raceEvents[raceEvent];
                        if (raceEvents[raceEvent].nonrunner) {
                            raceData.nonRunners.push(raceStats);
                            if(!raceData.rule4 && raceEvents[raceEvent].nonrunner === 2){

                                raceData.rule4 = true;
                            }
                        }
                        else if (raceEvents[raceEvent].type === 'Favourite') {
                            raceData.favourite = raceEvents[raceEvent];
                        }
                        else if (raceEvents[raceEvent].type === '2nd Favourite') {
                            raceData.second_favourite = raceEvents[raceEvent];
                        }
                        else {
                            raceData.horseStats.push(raceStats);
                        }
                    }
                }
                return;
            }
        }
    };
    /**
     * @ngdoc method
     * @name getHorseMarket
     * @methodOf vbet5.service:GameInfo
     * @description
     * helper function, returns 
     * @param {Object} existing markets, the name of market to select, the horse name which market needed
     * @returns {Object} market event related to the horse
     */
    var getHorseMarket = function getHorseMarket(markets, marketName, horseName, horseId) {
        var raceMarket = {};
        var keepGoing = true;
        angular.forEach(markets, function (market) {
            if (market.type === marketName && keepGoing) {
                angular.forEach(market.event, function (event) {
                    if ((event.type === horseName || event.type === horseId) && keepGoing) {
                        raceMarket = event;

                        keepGoing = false;
                    }
                });
            }
        });
        return raceMarket;
    };


    /**    
    * @description helper function
    * @param {Object} allRaces  all race data
    * @param {Number} raceId current race id
    * @returns {Object} current race data
    */
    var getCurrentRace = function getCurrentRace(allRaces, raceId) {
        if (allRaces.length > 1) {
            for (var i = 0; i < allRaces.length; i++) {
                if (allRaces[i]._id === raceId) {
                    return allRaces[i];
                }
            }
        }
        else {
            return allRaces;
        }
    };

    /**    
    * @description helper function
    * @param {Object} currentRace current race full data
    * @returns {Object} race related info
    */
    var getRaceInfo = function getRaceInfo(currentRace) {
        var race = {};        

        race.prize = 0;
        race.track_type = currentRace._trackType;
        if (currentRace.Prizes && currentRace.Prizes.Prize){
            for (var j = 0; j < currentRace.Prizes.Prize.length; j++) {
                if (currentRace.Prizes.Prize[j]._position === '1') {
                    race.prize = currentRace.Prizes.Prize[j]._amount;
                    break;
                }
            }
        }
        race.currency = currentRace.Prizes? currentRace.Prizes._currency:'';
        var distance = currentRace.Distance? currentRace.Distance._value: '';
        if (currentRace.Distance && currentRace.Distance._units === 'yards') {
            var miles = Math.floor(distance / 1760);
            var furlongs = Math.floor((distance - 1760 * miles) / 220);
            var yards = (distance - 1760 * miles) - 220 * furlongs;
            race.distance = (miles > 0 ? miles + 'm ' : '') + (furlongs > 0 ? furlongs + 'f ' : '') + (yards > 0 ? yards + 'y ' : '');
        } else {
            race.distance = distance + ' ' + (currentRace.Distance?currentRace.Distance._units:'');
        }
        race.race_type = currentRace._raceType;
        race.title = currentRace.Title;
        return race;
    };

    /**    
    * @description helper function
    * @param {Object} raceData current race full data
    * @param {Object} market race market
    * @param {String} marketName market name
    * @param {String} raceDate race date
    * @returns {Object} merges horse info with market event and returns horses list
    */
    var getHorseList = function getHorseList(raceData, market, marketName, raceDate) {
        
        var statisticsArray = [];
        var nonRunnersArray = [];
        var rule4 = false;
        if (raceData.Horse){
            for (var k = 0; k < raceData.Horse.length; k++) {
                var horseStatistics = {};
                horseStatistics.id = raceData.Horse[k] ? raceData.Horse[k]._id : '';
                horseStatistics.name = raceData.Horse[k] ? raceData.Horse[k]._name : '';
                horseStatistics.age = raceData.Horse[k].Age ? raceData.Horse[k].Age._years : '';
                if( raceData.Horse[k].Jockey){
                    horseStatistics.jockey =  raceData.Horse[k].Jockey._name;
                    horseStatistics.jockey_allowance = raceData.Horse[k].Jockey.Allowance ? '(' + raceData.Horse[k].Jockey.Allowance._value + ')' : '';
                }else{
                    horseStatistics.jockey = '';
                    horseStatistics.jockey_allowance = '';
                }

                if (raceData.Horse[k].LastRunDays) {
                    if (raceData.Horse[k].LastRunDays.length) {
                        for (var m = 0; m < raceData.Horse[k].LastRunDays.length; m++) {
                            if (raceData.Horse[k].LastRunDays[m]._type === raceData._raceType) {
                                horseStatistics.last_run_days = raceData.Horse[k].LastRunDays[m]._days;
                            }
                        }
                    } else {
                        horseStatistics.last_run_days = raceData.Horse[k].LastRunDays._days;
                    }
                }
                if (raceData.Horse[k].RaceHistoryStat) {
                    horseStatistics.historyStats = getCdWon(raceData.Horse[k].RaceHistoryStat);
               
                }
                horseStatistics.jockey_colors = Config.main.horceRacingXmlUrl + raceDate + '/' + raceData.Horse[k].JockeyColours._filename;
                horseStatistics.trainer = raceData.Horse[k].Trainer ? raceData.Horse[k].Trainer._name : '';
                var stones = raceData.Horse[k].Weight._value ? Math.floor(raceData.Horse[k].Weight._value / 14) : '';
                var pounds = (raceData.Horse[k].Weight._value - stones * 14) > 0 ? ('-' + (raceData.Horse[k].Weight._value - stones * 14)) : '';
                horseStatistics.weight = {
                    units: raceData.Horse[k].Weight ? raceData.Horse[k].Weight._units : '',
                    value: stones + pounds
                };
                horseStatistics.cloth = raceData.Horse[k].Cloth ? raceData.Horse[k].Cloth._number : '';
                horseStatistics.drawn = raceData.Horse[k].Drawn && raceData.Horse[k].Drawn._stall ? raceData.Horse[k].Drawn._stall : '-';
                horseStatistics.form_figures = raceData.Horse[k].FormFigures ? raceData.Horse[k].FormFigures._figures : '';
                if (market) {
                    //get market price for this particular horse, will remove from this code
                    horseStatistics.event = getHorseMarket(market, marketName, horseStatistics.name, horseStatistics.id);
                }
                else {// maybe no need of this block, need to check when no markets available
                    horseStatistics.event = {};
                }
                //This is non runner check
                //if (horseStatistics.jockey === 'Non Runner') {
                if(horseStatistics.event.nonrunner ){
                    nonRunnersArray.push(horseStatistics);
                    if(horseStatistics.event.nonrunner === 2){
                        rule4 = true;
                    }
                } else {
                    statisticsArray.push(horseStatistics);
                }
            }
        }
        
        return {'horses': statisticsArray, 'nonRunners': nonRunnersArray, 'rule4': rule4};
    };



    /**    
    * @description helper function
    * @param {Object} historyStat horse statistics history
    * @returns {Object} formatted statistics history
    */
    var getCdWon = function getCdWon(historyStat){
        var horseHistoryStat = {};
        if (historyStat.length) {
            for (var i = 0; i < historyStat.length; i++) {
                switch (historyStat[i]._type) {
                    case 'Distance':
                        horseHistoryStat.d = 'D';
                        break;
                    case 'Course':
                        horseHistoryStat.c = 'C';
                        break;
                    case 'CourseDistance':
                        horseHistoryStat.cd = 'CD';
                        break;
                    case 'BeatenFavourite':
                        horseHistoryStat.bf = 'BF';
                        break;
                }
            }            
        }
        else {
            switch (historyStat._type) {
                case 'Distance':
                    horseHistoryStat.d = 'D';
                    break;
                case 'Course':
                    horseHistoryStat.c = 'C';
                    break;
                case 'CourseDistance':
                    horseHistoryStat.cd = 'CD';
                    break;
                case 'BeatenFavourite':
                    horseHistoryStat.bf = 'BF';
                    break;
            }  
        }
                
       
        return horseHistoryStat;
    }

    /**
     * @ngdoc method
     * @name eachWayPlace
     * @methodOf vbet5.service:GameInfo
     * @description gets the place number and returns set of numbers from 1-st to the value of param
     * @param {Number} placeCount  the place number
     * @returns {String} set of numbers
     */
    GameInfo.eachWayPlace = function eachWayPlace(placeCount) {
        var places = '';
        for (var i = 1; i <= placeCount; i++) {
            if (i !== placeCount) {
                places += i + ', ';
            }
            else {
                places += i;
            }
        }
        return places;
    };
    
    /**
     * @ngdoc method
     * @name getTimelinePosition
     * @methodOf vbet5.service:GameInfo
     * @description
     * returns event position on the timeline
     * @param {Object} timelineEvent object that contains timeline event info like minute event took place and the team
     * @returns {Object} style object
     */
    GameInfo.getTimelinePosition = function getTimelinePosition(timelineEvent) {
        var theMinute = parseInt(timelineEvent.minute, 10);
        var multiplier = 9;
        if (timelineEvent.matchLength === "80") { // not shure that match length doesn't change when extra time added, need to check
            multiplier = 8;
        }
        if (!timelineEvent.extraTime) {
            if (theMinute > (multiplier-5) && theMinute < multiplier*10) {
                return { position: 'absolute', right: (102 - theMinute * 10 / multiplier) + '%' };
            }
            if (theMinute >= multiplier*10) {
                return { position: 'absolute', right: '0%' };
            }
            return { position: 'absolute', left: theMinute * 10 / multiplier + '%' };
        }
    };

    /**
     * @ngdoc method
     * @name isExtraTime
     * @methodOf vbet5.service:GameInfo
     * @description
     * detects whether the game extra time has begun
     * @param {Object} gameInfo game.info object which contains information about game state
     */
    GameInfo.isExtraTime = function isExtraTime(gameInfo) {
        return (
        gameInfo && (
        gameInfo.current_game_state === 'additional_time1' ||
        gameInfo.current_game_state === 'additional_time2' ||
        (gameInfo.current_game_state === 'timeout' && gameInfo.currMinute > 100)
        )
        );
    };


    /**
     * @ngdoc method
     * @name framesCount
     * @methodOf vbet5.service:GameInfo
     * @description
     * returns array of numbers which represent number of played frames
     *
     * @param {Object} stats object that contains all played frames statistics
     * @returns {Array} array of numbers of frames
     */
    GameInfo.framesCount = function framesCount(stats) {
        var frames_array = [];
        var i = 0;
        for (var key in stats) {
            if (key.indexOf('set') === 0) {
                i++;
                frames_array.push(i);
            }
        }
        return frames_array;
    };

    // list of games  sets which should be replaced with specific text
    var liveGameSetsAliases = {
        'Basketball5': 'OT' //basketball 5th quarter is called overtime 'OT'
    };

    /**
     *  @ngdoc method
     * @name showFrameAlias
     * @methodOf vbet5.service:GameInfo
     * @description replaces set number with specefic symbol if found in liveGameSetsAliases
     * @param currentFrame {Number} the number of set
     * @param sportAlias {String} sport alias
     * @returns {*}
     */
    GameInfo.showFrameAlias = function showFrameAlias (currentFrame, sportAlias) {
        return  liveGameSetsAliases[sportAlias + currentFrame] || currentFrame;
    };

    /**
     * @ngdoc method
     * @name generateTimeLineEvents
     * @methodOf vbet5.service:GameInfo
     * @param {object} game object contains timeline and game events
     * @description
     * generates timeline events for soccer animation control
     */
    GameInfo.generateTimeLineEvents = function generateTimeLineEvents(game, scope) {
        game.tlEvents = [];

        if (game.info.current_game_time) {
            //  game.info.currMinute = (game.info.current_game_time).substring(0, 2).replace(/[^\d.\-]/g, '');
            game.info.currMinute = parseInt(game.info.current_game_time, 10);
            //returns timeline current minute position.
            scope.getTlCurrentMinute = function (game) {
                if (game.info) {
                    //if extra time
                    var curMin;
                    if (GameInfo.isExtraTime(game.info)) {
                        curMin = (game.info.currMinute - 90) <= 30 ? ((game.info.currMinute - 90) * 10 / 3) + '%' : '100%';
                        return { width: curMin };
                    } else if (game.last_event && game.last_event.match_length === '80') {
                        curMin = game.info.currMinute <= 80 ? (game.info.currMinute * 10 / 8) + '%' : '100%';
                        return { width: curMin };
                    } else {
                        curMin = game.info.currMinute <= 90 ? (game.info.currMinute * 10 / 9) + '%' : '100%';
                        return { width: curMin };
                    }
                }
            };
            scope.getTlCurrentPosition = function (game) {
                if (!game) {
                    return;
                }
                var curMin;
                //if extra time
                if (GameInfo.isExtraTime(game.info)) {
                    if (game.info.currMinute - 90 > 0) {
                        curMin = (game.info.currMinute - 90) <= 30 ? ((game.info.currMinute - 90) * 10 / 3) + '%' : '100%';
                    } else {
                        curMin = 0;
                    }
                    return { left: curMin };
                } else if (game.last_event && game.last_event.match_length === '80') {
                    if (game.info.currMinute > 0) {
                        curMin = game.info.currMinute <= 80 ? (game.info.currMinute * 10 / 8) + '%' : '100%';
                    } else {
                        curMin = 0;
                    }
                    return { left: curMin };
                } else {
                    if (game.info && game.info.currMinute > 0) {
                        curMin = game.info.currMinute <= 90 ? (game.info.currMinute * 10 / 9) + '%' : '100%';
                    } else {
                        curMin = 0;
                    }
                    return { left: curMin };
                }
            };
            angular.forEach(game.live_events, function (tlEvent) {
                var currEvent = {};
                // currEvent.minute = (tlEvent.add_info).substring(0, 2).replace(/[^\d.\-]/g, '');
                currEvent.minute = parseInt(tlEvent.add_info, 10);
                currEvent.type = "tl-" + tlEvent.event_type;
                currEvent.shirtColor = tlEvent.team === "team1" ? game.info.shirt1_color : game.info.shirt2_color;
                currEvent.team = tlEvent.team;
                var eventName = tlEvent.event_type.split('_');
                currEvent.details = "";
                var i;
                for (i = 0; i < eventName.length; i++) {
                    currEvent.details += currEvent.details.length > 0 ? ' ' + Translator.get($filter('capitalise')(eventName[i])) : Translator.get($filter('capitalise')(eventName[i]));
                }
                currEvent.details = Translator.get(currEvent.details);
                currEvent.details += " " + tlEvent.add_info + " " + game[tlEvent.team + '_name'];
                currEvent.matchLength = game.last_event ? game.last_event.match_length : "90";
                currEvent.extraTime = false;
                if (GameInfo.isExtraTime(game.info)) {
                    currEvent.extraTime = true;
                    //if extra time push only tl events after 90th minute
                    if (currEvent.minute > 90) {
                        game.tlEvents.push(currEvent);
                    }
                } else {
                    game.tlEvents.push(currEvent);
                }
            });
        }
    };

    /**
     * @ngdoc method
     * @name updateSoccerStatistics
     * @methodOf vbet5.service:GameInfo
     * @param {object} game with statistic data
     * @description
     * updates game statistics for soccer animation control
     */
    GameInfo.updateSoccerStatistics = function updateSoccerStatistics(game) {
        // we need to count and add team width persentage to statistics object
        game.stats.corner.team1_width = (parseInt(game.stats.corner.team1_value, 10) + parseInt(game.stats.corner.team2_value, 10)) === 0 ? 50 : (parseInt(game.stats.corner.team1_value, 10) * 100) / (parseInt(game.stats.corner.team1_value, 10) + parseInt(game.stats.corner.team2_value, 10));
        game.stats.red_card.team1_width = (parseInt(game.stats.red_card.team1_value, 10) + parseInt(game.stats.red_card.team2_value, 10)) === 0 ? 50 : (parseInt(game.stats.red_card.team1_value, 10) * 100) / (parseInt(game.stats.red_card.team1_value, 10) + parseInt(game.stats.red_card.team2_value, 10));
        game.stats.yellow_card.team1_width = (parseInt(game.stats.yellow_card.team1_value, 10) + parseInt(game.stats.yellow_card.team2_value, 10)) === 0 ? 50 : (parseInt(game.stats.yellow_card.team1_value, 10) * 100) / (parseInt(game.stats.yellow_card.team1_value, 10) + parseInt(game.stats.yellow_card.team2_value, 10));

        // we add 3 more objects to stats data: dangerous attack, shot on target and shoot off target
        game.stats.dangerous_attack = {};
        game.stats.shot_on_target = {};
        game.stats.shot_off_target = {};
        // and set default values ...
        game.stats.dangerous_attack.team1_value = game.stats.dangerous_attack.team2_value = 0;
        game.stats.dangerous_attack.team1_width = 50;

        game.stats.shot_on_target.team1_value = game.stats.shot_on_target.team2_value = 0;
        game.stats.shot_on_target.team1_width = 50;

        game.stats.shot_off_target.team1_value = game.stats.shot_off_target.team2_value = 0;
        game.stats.shot_off_target.team1_width = 50;

        if (game.last_event) {
            //add dangerous_attack statistic object to stats
            var dAttack_team1 = parseInt((game.last_event.dangerous_attack_score).substr(0, (game.last_event.dangerous_attack_score).indexOf(':')), 10);
            var dAttack_team2 = parseInt((game.last_event.dangerous_attack_score).substr((game.last_event.dangerous_attack_score).indexOf(':') + 1), 10);
            var dAttack_width = (dAttack_team1 + dAttack_team2) === 0 ? 50 : (dAttack_team1 * 100) / (dAttack_team1 + dAttack_team2);

            game.stats.dangerous_attack.team1_value = dAttack_team1;
            game.stats.dangerous_attack.team2_value = dAttack_team2;
            game.stats.dangerous_attack.team1_width = dAttack_width;

            //add shot_on_target statistic object to stats
            var shotOnTarget_team1 = parseInt((game.last_event.shot_on_target_score).substr(0, (game.last_event.shot_on_target_score).indexOf(':')), 10);
            var shotOnTarget_team2 = parseInt((game.last_event.shot_on_target_score).substr((game.last_event.shot_on_target_score).indexOf(':') + 1), 10);
            var shotOnTarget_width = (shotOnTarget_team1 + shotOnTarget_team2) === 0 ? 50 : (shotOnTarget_team1 * 100) / (shotOnTarget_team1 + shotOnTarget_team2);

            game.stats.shot_on_target.team1_value = shotOnTarget_team1;
            game.stats.shot_on_target.team2_value = shotOnTarget_team2;
            game.stats.shot_on_target.team1_width = shotOnTarget_width;

            //add shot_off_target statistic object to stats
            var shotOffTarget_team1 = parseInt((game.last_event.shot_off_target_score).substr(0, (game.last_event.shot_off_target_score).indexOf(':')), 10);
            var shotOffTarget_team2 = parseInt((game.last_event.shot_off_target_score).substr((game.last_event.shot_off_target_score).indexOf(':') + 1), 10);
            var shotOffTarget_width = (shotOffTarget_team1 + shotOffTarget_team2) === 0 ? 50 : (shotOffTarget_team1 * 100) / (shotOffTarget_team1 + shotOffTarget_team2);

            game.stats.shot_off_target.team1_value = shotOffTarget_team1;
            game.stats.shot_off_target.team2_value = shotOffTarget_team2;
            game.stats.shot_off_target.team1_width = shotOffTarget_width;
        }
    };



    /**
     * @ngdoc method
     * @name setTennisCourtSide
     * @methodOf vbet5.service:GameInfo
     * @description
     * sets ball serve side based on the game score
     *
     * @param {Object} gameEvent event object where court_side will be added
     * @param {Object} scopeGame game object
     */
    GameInfo.setTennisCourtSide = function setTennisCourtSide(gameEvent, scopeGame) {
        var score1 = parseInt(gameEvent.game_score_team1, 10);
        var score2 = parseInt(gameEvent.game_score_team2, 10);
        var scoreSum = score1 + score2;
        if (gameEvent.set_score === "6:6" && scoreSum !== 0) {
            scopeGame.last_event.court_side = (scoreSum % 2) === 0 ? "left" : "right";
        } else {
            if (score1 === score2 || scoreSum === 30 || scoreSum === 55) {
                scopeGame.last_event.court_side = "right";
            } else {
                scopeGame.last_event.court_side = "left";
            }
        }
    };

    /**
     * @ngdoc method
     * @name addGameScorePerTeam
     * @methodOf vbet5.service:GameInfo
     * @description  separetes game score value, so we can get score per team values separetely
     *
     * @param {object} gameEvent event object that contains game_score
     * @param {Object} scopeGame game object
     *
     */
    GameInfo.addGameScorePerTeam = function addGameScorePerTeam(gameEvent, scopeGame) {
        if (gameEvent) {
            scopeGame.last_event.game_score_team1 = (gameEvent.game_score).substr(0, (gameEvent.game_score).indexOf(':'));
            scopeGame.last_event.game_score_team2 = (gameEvent.game_score).substr((gameEvent.game_score).indexOf(':') + 1);
        }
    };


    /**
     * @ngdoc method
     * @name getCurrentTime
     * @methodOf vbet5.service:GameInfo
     * @description parses param and returns only the time
     * @param {String} timeObj contains current time object
     * @returns {string} current time
     */
    GameInfo.getCurrentTime = function getTheTime(timeObj) {
        if (timeObj) {
            if (timeObj.indexOf('set') >= 0) {
                if (timeObj.indexOf(':') > 0) {
                    return timeObj.substr((timeObj.indexOf(':') - 2), 5);
                } else {
                    return '';
                }
            } else {
                return timeObj;
            }
        }
        //return timeObj && (timeObj.indexOf(':') > 0) ? timeObj.substr((timeObj.indexOf(':') - 2), 5) + "'" : timeObj;
    };



    /**
     * @ngdoc function
     * @name displayBase
     * @methodOf vbet5.service:GameInfo
     * @description returns base to display
     *
     * @param {Object} event event object
     * @param {Object} market market object
     *
     * @returns {String} base to display
     */
    GameInfo.displayBase = function displayBase(event, market) {
        if ((event.base === null  || event.base === undefined) && (event.base1 === null  || event.base1 === undefined)) {
            return '';
        }
        var prefix = market.type && market.type.substr(-8) === 'Handicap' && event.base > 0 ? '+' : '';
        var base =  event.base1 !== undefined && event.base2 !== undefined ? event.base1 + '-' + event.base2 : event.base;
        return '(' + prefix + base + ')';
    };



    /**
     * @ngdoc method
     * @name getStatWidth
     * @methodOf vbet5.service:GameInfo
     * @description
     * counts the with of statistics chart based on scores
     *
     * @param {object} teamsScores object that contains teams statistics score
     *
     */
    GameInfo.getStatWidth = function getStatWidth(teamsScores) {
        if (teamsScores) {
            var team1_score = parseInt(teamsScores.split(':')[0], 10);
            var team2_score = parseInt(teamsScores.split(':')[1], 10);
            return (team1_score + team2_score) === 0 ? 50 : (team1_score * 100) / (team1_score + team2_score);
        }
    };

    /**
     * @ngdoc method
     * @name isEventInBetSlip
     * @methodOf vbet5.service:GameInfo
     * @param {object} event event object
     * @param {String} oddType odd type
     * @description  checks if provided event is in betslip
     * @returns {boolean} true if current event is in betslip, false otherwise
     */
    GameInfo.isEventInBetSlip = function isEventInBetSlip(event, oddType) {
        oddType = oddType || 'odd';
        if (oddType === 'sp') {
            return (event && event.id && $rootScope.betEvents && ($rootScope.betEvents[event.id] !== undefined) && $rootScope.betEvents[event.id].selected && $rootScope.betEvents[event.id].oddType === 'sp');
        }
        return (event && event.id && $rootScope.betEvents && ($rootScope.betEvents[event.id] !== undefined) && $rootScope.betEvents[event.id].selected && $rootScope.betEvents[event.id].oddType !== 'sp');
    };

    // map of all animation sounds paths
    GameInfo.animationSoundsMap = {
        'Goal': 'audio/soccer/Goal',
        'RedCard': 'audio/soccer/RedCard',
        'YellowCard': 'audio/soccer/YellowCard',
        'BallInPlay': 'audio/tennis/BallInPlay',
        'Ace': 'audio/tennis/Ace',
        'ServiceFault': 'audio/tennis/ServiceFault'
    };
    /**
     * @ngdoc method
     * @name setSound
     * @methodOf vbet5.service:GameInfo
     * @description  sets the animations sound effect on/off
     *
     * @param {String} format sound state (on, off)
     */
    GameInfo.setSound = function setSound(format) {
        Config.env.sound = format;
        Storage.set('sound', format);
    };

    /**
     * @ngdoc method
     * @name changeVolume
     * @methodOf vbet5.service:GameInfo
     * @description  sets sound volume based on config sound value
     *
     */
    GameInfo.changeVolume = function changeVolume() {
        var i;
        var audioList = document.getElementsByTagName("audio");
        for (i = 0; i < audioList.length; i++) {
            audioList[i].volume = Config.env.sound;
            audioList[i].autoplay = true;
        }
    };


    $rootScope.$watch('env.sound', function (value) {
        Storage.set('sound', value);
    });

    $rootScope.$on("slideEnded", function (event) {
        GameInfo.changeVolume();
    });

    return GameInfo;
}]);

