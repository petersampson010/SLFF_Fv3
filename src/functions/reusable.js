import { getAllPGJFromUserId, getAllRecordsByUserId, getGwStartersByUserId, getPlayersByUserIdGwIdSub, getGwSubsByUserId, getPGJoinerFromPlayerIdAndGwId, getPlayerById, getUGJoiner, getUserById } from "./APIcalls";
import 'intl';
import "intl/locale-data/jsonp/en";

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
    return new Intl.DateTimeFormat('en-GB', options).format(Date.parse(date));
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
    return navState.routes[navState.index].name;
}

export const calculateScore = async(records, gwId) => {
    let score = 0;
    for (let i=0; i<records.length; i++) {
        let pgJoiner = await getPGJoinerFromPlayerIdAndGwId(records[i]['player_id'], gwId);
        if (pgJoiner) {
            if (!records[i].sub) {
                score += pgJoiner["total_points"];
            }
        }
    }
    return score;
}

export const getTeamPointsInfo = async(userId, gwId, otherUser) => {
    if (otherUser) {
        let ugj = await getUGJoiner(userId, gwId);
        let starters = await getPlayersByUserIdGwIdSub(userId, gwId, false);
        let subs = await getPlayersByUserIdGwIdSub(userId, gwId, true);
        let records = await getAllRecordsByUserId(userId);
        let allPGJoiners = await getAllPGJFromUserId(userId);
        return { starters, subs, records, ugj, allPGJoiners };
    } else {
        let ugj = await getUGJoiner(userId, gwId);
        let starters = await getPlayersByUserIdGwIdSub(userId, gwId, false);
        let subs = await getPlayersByUserIdGwIdSub(userId, gwId, true);
        return { starters, subs, ugj };
    }
}

// export const getPlayerStats = asnyc(player) => {
//     let 
// }