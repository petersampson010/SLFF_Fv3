import { fetchAllPGJFromUserId, fetchAllRecordsByUserId, fetchGwStartersByUserId, fetchGwSubsByUserId, fetchPGJoinerFromPlayerIdAndGwId, fetchPlayerById, fetchUGJoiner, fetchUserById } from "./APIcalls";

export const positionString = (num) => {
    switch(num) {
        case '1':
            return "Goalkeeper";
        case '2': 
            return "Defender";
        case '3': 
            return "Midfielder";
        case '4':
            return "Forward";
        default:
            return;
    }
}

export const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const fullName = player => {
    if (player) {
        return capitalize(player.first_name) + ' ' + capitalize(player.last_name)
    } else {
        return player
    }
}

export const availability = avail => {
    switch(avail) {
        // available
        case 'a':
            return true;
        // unavailable
        case 'u':
            return false;
        default: 
            return true;
    }
}

export const playersArrayToObj = arr => {
    let obj = {
        '1': [],
        '2': [],
        '3': [],
        '4': []
    };
    for (let i=0;i<arr.length;i++) {
        obj[arr[i].position].push(arr[i]);
    }
    return obj;
}

export const playersObjToArray = obj => {
    return Object.values(obj).flat(Infinity);
}

export const getCaptain = (players, records) => {
    let playerId = records.find(x=>x.captain===true).player_id;
    let player = players.find(x=>x.player_id===playerId);
    return player;
}

export const getVCaptain = (players, records) => {
    let playerId = records.find(x=>x.vice_captain===true).player_id;
    let player = players.find(x=>x.player_id===playerId);
    return player;
}

export const isCaptain = (player, records) => {
    let record = records.find(x=>x.player_id===player.player_id);
    return record.captain;
}

export const isVCaptain = (player, records) => {
    let record = records.find(x=>x.player_id===player.player_id);
    return record.vice_captain;
}

export const getRecord = (player, records) => {

    let record = records.find(x=>x.player_id===player.player_id);
    return record;
}

export const getRecordId = (player, records) => {
    let record = records.find(x=>x.player_id===player.player_id);
    return record.record_id;
}

export const addSubAttributeToPlayersArray = (team, allRecords, count) => {
    return team.map(player => { 
        let sub;
        let record = getRecord(player, allRecords);
        if (record) {
            sub = record.sub
        } else {
            sub = count>0 ? false : true;
            count--;
        }
        return {...player, sub}})
}

export const playerIds = players => players.map(x=>x.player_id);

export const displayDate = date => {
    let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    return new Intl.DateTimeFormat('en-us', options).format(Date.parse(date));
}

export const subOrTransfer = type => {
    switch(type) {
        case 'transfers':
            return 'TRANSFER';
        case 'points':
            return '';
        case 'pickTeam':
            return 'SUB';
        default: 
            return '';
    }
}

export const getNameOfNavPage = navState => {
    console.log(navState);
    return navState.routes[navState.index].name;
}

export const calculateScore = async(records, gwId) => {
    let score = 0;
    for (let i=0; i<records.length; i++) {
        let pgJoiner = await fetchPGJoinerFromPlayerIdAndGwId(records[i]['player_id'], gwId);
        if (pgJoiner) {
            if (!records[i].sub) {
                score += pgJoiner["total_points"];
            }
        }
    }
    return score;
}

export const getTeamPointsInfo = async(userId, gwId, otherUser) => {
    console.log(userId);
    console.log(gwId);
    console.log('above');
    if (otherUser) {
        let ugj = await fetchUGJoiner(userId, gwId);
        let starters = await fetchGwStartersByUserId(userId, gwId);
        let subs = await fetchGwSubsByUserId(userId, gwId);
        let records = await fetchAllRecordsByUserId(userId);
        let allPGJoiners = await fetchAllPGJFromUserId(userId);
        return { starters, subs, records, ugj, allPGJoiners };
    } else {
        let ugj = await fetchUGJoiner(userId, gwId);
        let starters = await fetchGwStartersByUserId(userId, gwId);
        let subs = await fetchGwSubsByUserId(userId, gwId);
        return { starters, subs, ugj };
    }
}

// export const getPlayerStats = asnyc(player) => {
//     let 
// }