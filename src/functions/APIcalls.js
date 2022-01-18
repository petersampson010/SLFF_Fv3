import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/'
}) 

const axiosGet = (url, singleObjReturn=false) => instance.get(url).then(res => {
    if (singleObjReturn) {
        return res.data[0]
    } else {
        return res.data
    }
})

const axiosPost = (url, payload) => instance.post(url, payload).then(res => res.data);

const axiosPatch = (url, payload) => instance.patch(url, payload).then(res => res.data);

const axiosDelete = url => instance.delete(url);

// USER

import { showMessage } from "react-native-flash-message";

export const getAllUsers = () => axiosGet('users');

export const getUserById = id => axiosGet(`users?user_id=${id}`, true);

export const getAllUsersByAdminUserId = id => axiosGet(`users?admin_user_id=${id}`);

export const getUserByEmail = userObj => axiosGet(`users?email=${userObj.email}`, true);

export const postUser = (userObj) => axiosPost('users', {
    email: userObj.email,
    team_name: userObj.team_name,
    password: userObj.password,
    transfers: 0,
    budget: userObj.budget,
    gw_start: userObj.gw_start,
    admin_user_id: userObj.admin_user_id
});

export const patchUserBUDGET = (userId, budget) => axiosPatch(`users/${userId}`, {budget});

export const getUserTotalPoints = (userId) => axiosGet(`users/${userId}/total_points`);




// ADMIN_USER

export const getAllAdminUsers = () => axiosGet('admin_users');

export const getAdminUserById = id => axiosGet(`admin_users?admin_user_id=${id}`, true);

export const getAdminUserByEmail = adminUser => axiosGet(`admin_users?email=${adminUser.email}`, true);

export const postAdminUser = adminUser => axiosPost('admin_users', { 
    email: adminUser.email,
    password: adminUser.password,
    club_name: adminUser.club_name
});

export const getLeague = id => axiosGet(`admin_users/${id}/league`);





//PLAYER

export const getAllPlayers = () => axiosGet('players');

export const getPlayerById = id => axiosGet(`players?player_id=${id}`, true);

export const getAllPlayersByAdminUserId = id => axiosGet(`players?admin_user_id=${id}`);

export const getLatestStartersByUserId = id => axiosGet(`users/${id}/latest_starters`);

export const getPlayersByUserIdGWIdSub = async(userId, gwId, sub) => {
    let latestRecords = await getRecordsByUserIdGWIdSub(userId, gwId, sub);
    if (latestRecords) {
        let playerIds = latestRecords.map(r => r.player_id);
        let allPlayers = await getAllPlayers();
        return allPlayers.filter(p => playerIds.includes(p.player_id));
    } else {
        return null;
    }
}

export const getGWSubsByUserId = (id, gameweekId) => axiosGet(`users/${id}/${gameweekId}/gw_subs`)

export const postPlayer = (player, adminUserId) => axiosPost('players', {
    first_name: player.name.split(' ')[0],
    last_name: player.name.split(' ')[1],
    position: player.position,
    price: (player.price),
    availability: 'a',
    admin_user_id: adminUserId
});

export const patchPlayer = player => axiosPatch(`players/${player.player_id}`, {
    first_name: player.first_name,
    last_name: player.last_name,
    position: player.position,
    price: player.price,
    availability: player.availability
});




//RECORDS

export const getAllRecords = () => axiosGet('records');

export const getRecordByRecordId = recordId => axiosGet(`records?record_id=${recordId}`, true);

export const getAllRecordsByUserId = id => axiosGet(`records?user_id=${id}`);

export const getAllRecordsByGWId = gwId => axiosGet(`records?gameweek_id=${gwId}`);

export const getRecordsByUserIdAndPlayerId = (userId, playerId) => axiosGet(`records?user_id=${userId}&player_id=${playerId}`);

export const getRecordsByGWIdAndUserId = (userId, gwId) => axiosGet(`records?user_id=${userId}&gameweek_id=${gwId}`);

export const getRecord = (userId, gwId, playerId) => axiosGet(`records?user_id=${userId}&gameweek_id=${gwId}&player_id=${playerId}`, true);

export const getRecordsByUserIdGWIdSub = (userId, gwId, sub) => axiosGet(`records?user_id=${userId}&gameweek_id=${gwId}&sub=${sub}`);

export const postRecord = (player, userId, count) => {
    return axiosPost('records', {
    sub: count>5 ? true : false,
    captain: count===2 ? true : false,
    vice_captain: count===5 ? true : false,
    user_id: userId,
    player_id: player.player_id,
    gameweek_id: 0,
    admin_user_id: player.admin_user_id
})};

export const postRecordDUPLICATE = (record) => axiosPost('records', {
    sub: record.sub,
    captain: record.captain,
    vice_captain: record.vice_captain,
    user_id: record.user_id,
    player_id: record.player_id,
    gameweek_id: 0,
    admin_user_id: record.admin_user_id
});

export const patchRecordGAMEWEEK = (recordId, gwId) => axiosPatch(`records/${recordId}`, {gameweek_id: gwId});

export const postRecordTRANSFER = (player, userId, gwId, count, captain, vice_captain) => axiosPost('records', {
    sub: count>0 ? true : false,
    captain,
    vice_captain,
    player_id: player.player_id,
    user_id: userId,
    gameweek_id: gwId,
    admin_user_id: player.admin_user_id
});

export const patchRecordSUBS = (sub, playerId, userId) => axiosPatch(`records?player_id=${playerId}&gameweek_id=0&user_id=${userId}`, {sub});

export const patchRecordToCAPTAIN = (captain, userId, playerId) => axiosPatch(`records?gameweek_id=0&user_id=${userId}&player_id=${playerId}`, {
    [captain]: true
});

export const patchRecordRemoveCAPTAIN = (captain, userId) => axiosPatch(`records?gameweek_id=0&user_id=${userId}&${captain}=true`, {
    [captain]: false
});

export const deleteRecord = async(record_id) => axiosDelete(`records/${record_id}`);





// GAMEWEEKS / EVENTS

export const getAllGames = () => axiosGet('gameweeks');

export const getAllGamesByAdminUserId = id => axiosGet(`gameweeks?admin_user_id=${id}`);

export const postGame = (game, adminUserID) => axiosPost('gameweeks', {
    date: game.date,
    opponent: game.opponent,
    complete: false,
    gameweek: 0,
    admin_user_id: adminUserID
});

export const patchGame = (game) => axiosPatch(`gameweeks/${game.gameweek_id}`, {
    date: game.date,
    opponent: game.opponent
});

export const completeGame = (id, score, gameweek) => axiosPatch(`gameweeks/${id}`, {
    score: `${score.team} - ${score.oppo}`,
    complete: true,
    gameweek
});

export const getAllGWsFromAdminUserId = auId => axiosGet(`gameweeks?admin_user_id=${auId}`);

export const getGameweekFromAdminUserIdAndGameweek = (adminUserId, gameweek) => axiosGet(`gameweeks?admin_user_id=${adminUserId}&gameweek=${gameweek}`, true);


// PLAYER-GAMEWEEK-JOINERS

export const postPGJ = async(joiner, admin_user_id) => {
    try{
        let newObj = {}
        for (const [key, value] of Object.entries(joiner)) {
            if (value==="" || !value) {
                newObj[key] = 0
            } else {
                newObj[key] = parseInt(joiner[key])
            }
        }
        let mins = newObj['minutes'];
        let a = newObj['assists'];
        let g = newObj['goals'];
        let og = newObj['own_goals'];
        let yc = newObj['y_cards'];
        let rc = newObj['r_cards'];
        let b = newObj['bonus'];
        let pm = newObj['penalty_miss'];
        let gc = newObj['goals_conceded'];
        let player = await getPlayerById(joiner.player_id);
        let score;
        if (mins>0) {
            switch(player.position) {
                case '4': 
                // console.log((Math.floor(minutes/30)) + (assists*3) + (goals*4) + (own_goals*-3) + (y_cards*-1) + (r_cards*-3) + (bonus) + (penalty_miss*-3));
                    score = ((Math.floor(mins/30)) + (a*3) + (g*4) + (og*-3) + (yc*-1) + (rc*-3) + (b) + (pm*-3));
                    break;
                case '3':
                    // console.log((Math.floor(minutes/30)) + (assists*3) + (goals*5) + (own_goals*-3) + (y_cards*-1) + (r_cards*-3) + (bonus) + (penalty_miss*-3));
                    score = ((Math.floor(mins/30)) + (a*3) + (g*5) + (og*-3) + (yc*-1) + (rc*-3) + (b) + (pm*-3));
                    break;
                default:
                    if (gc===0 || gc===null) {
                        // console.log((Math.floor(minutes/30)) + (assists*3) + (goals*5) + (own_goals*-3) + (y_cards*-1) + (r_cards*-3) + (bonus) + (penalty_miss*-3 + 5));
                        score = ((Math.floor(mins/30)) + (a*3) + (g*5) + (og*-3) + (yc*-1) + (rc*-3) + (b) + (pm*-3));
                        if (mins > 34) {
                            score += 5;
                        }
                        break;
                    } else {
                        // console.log((Math.floor(minutes/30)) + (assists*3) + (goals*5) + (own_goals*-3) + (y_cards*-1) + (r_cards*-3) + (bonus) + (penalty_miss*-3) + (Math.floor(goals_conceded*-0.5)));
                        score = ((Math.floor(mins/30)) + (a*3) + (g*5) + (og*-3) + (yc*-1) + (rc*-3) + (b) + (pm*-3) + (Math.floor(gc*-0.5)));
                        break;
                    }
            }
        } else {
            score = 0;
        }
        return axiosPost('player_gameweek_joiners', {
            minutes: mins,
            assists: a,
            goals: g,
            own_goals: og,
            y_cards: yc,
            r_cards: rc,
            bonus: b,
            penalty_miss: pm,
            goals_conceded: gc,
            total_points: score,
            player_id: joiner.player_id,
            gameweek_id: joiner.gameweek_id,
            admin_user_id
        });
    } catch(e) {
        showMessage({
            message: "Fail: Network Issue, please try again later",
            type: "danger"
          });
        console.warn(e);
    }
}

export const getAllPGJoiners = () => axiosGet('player_gameweek_joiners');

export const getAllPGJFromUserId = userId => axiosGet(`http://localhost:3000/player_gameweek_joiners?user_id=${userId}`)

export const getPGJsFromUserIdAndGameweekId = (userId, gameweekId) => axiosGet(`player_gameweek_joiners?user_id=${userId}&gameweek_id=${gameweekId}`);

export const getAllPGJsFromGameweekId = (gameweekId) => axiosGet(`player_gameweek_joiners?gameweek_id=${gameweekId}`)

export const getPGJoinerFromPlayerIdAndGWId = (playerId, gwId) => axiosGet(`player_gameweek_joiners?gameweek_id=${gwId}&player_id=${playerId}`, true);



// USER-GAMEWEEK JOINERS

export const postUGJ = async(user, gameweekId, score) => axiosPost('user_gameweek_joiners', {
    total_points: score,
    user_id: user.user_id,
    gameweek_id: gameweekId,
    admin_user_id: user.admin_user_id
});

export const getUGJ = (userId, gameweekId) => axiosGet(`user_gameweek_joiners?user_id=${userId}&gameweek_id=${gameweekId}`, true);

export const getUGJs = (auId, gameweekId) => axiosGet(`user_gameweek_joiners?admin_user_id=${auId}&gameweek_id=${gameweekId}`);




// MESSAGES

export const postMessage = (name, email, msg) => axiosPost('messages', {
    name,
    email,
    msg
});