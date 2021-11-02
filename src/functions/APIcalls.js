// USER

import { showMessage } from "react-native-flash-message";

export const fetchAllUsers = () => {
    return fetch('http://localhost:3000/users')
    .then(res=>res.json());
}
export const fetchUserById = id => {
    return fetch(`http://localhost:3000/users/${id}`)
    .then(res=>res.json())
}
export const fetchAllUsersByAdminUserId = id => {
    return fetchAllUsers()
    .then(x=>x.filter(x=>x.admin_user_id===id))
}
export const fetchUserByEmail = userObj => {
    return fetchAllUsers()
    .then(users=>users.find(x=>x.email===userObj.email))
}
export const postUser = (userObj) => {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            email: userObj.email,
            teamname: userObj.teamName,
            password: userObj.password,
            transfers: 0,
            budget: userObj.budget,
            admin_user_id: userObj.clubId
        })
    };
    return fetch('http://localhost:3000/users', configObj)
    .then(res=>res.json())
}
export const patchUserBUDGET = (budget, userId) => {
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            budget
        })
    };
    return fetch(`http://localhost:3000/users/${userId}`, configObj)
    .then(res=>res.json())
}

export const getUserTotalPoints = (userId) => {
    return fetch(`http://localhost:3000/users/${userId}/total_points`)
    .then(res => res.json())
}

// ADMIN_USER

export const fetchAllAdminUsers = () => {
    return fetch('http://localhost:3000/admin_users')
    .then(res=>res.json());
}

export const fetchAdminUserById = id => {
    return fetch(`http://localhost:3000/admin_users/${id}`)
    .then(res=>res.json());
}
export const fetchAdminUserByEmail = aUser => {
    return fetchAllAdminUsers()
    .then(aUsers=>aUsers.find(x=>x.email===aUser.email))
}
export const postAdminUser = aUser => {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            email: aUser.email,
            password: aUser.password,
            club_name: aUser.email
        })
    };
    return fetch('http://localhost:3000/admin_users', configObj)
    .then(res=>res.json())
}
export const fetchLeague = id => {
    return fetch(`http://localhost:3000/admin_users/${id}/league`) 
    .then(res=>res.json())

}

//PLAYER

export const fetchAllPlayers = () => {
    return fetch('http://localhost:3000/players')
    .then(res => res.json())
}
export const fetchPlayerById = id => {
    return fetch(`http://localhost:3000/players/${id}`)
    .then(res => res.json())
}
export const fetchAllPlayersByAdminUserId = id => {
    return fetch(`http://localhost:3000/admin_users/${id}/players`)
    .then(res => res.json())
}
export const fetchLatestStartersByUserId = id => {
    return fetch(`http://localhost:3000/users/${id}/latest_starters`)
    .then(res => res.json())
}
export const fetchGwStartersByUserId = (id, gameweekId) => {
    return fetch(`http://localhost:3000/users/${id}/${gameweekId}/gw_starters`)
    .then(res => res.json())
}
export const fetchLatestSubsByUserId = id => {
    return fetch(`http://localhost:3000/users/${id}/latest_subs`)
    .then(res => res.json())
}
export const fetchGwSubsByUserId = (id, gameweekId) => {
    return fetch(`http://localhost:3000/users/${id}/${gameweekId}/gw_subs`)
    .then(res => res.json())
}
export const postPlayer = (player, aUserId) => {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            first_name: player.name.split(' ')[0],
            last_name: player.name.split(' ')[1],
            position: player.position,
            price: (player.price),
            availability: 'a',
            admin_user_id: aUserId
        })
    };
    return fetch('http://localhost:3000/players', configObj)
    .then(res=>res.json())
}
export const patchPlayer = player => {
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            first_name: player.first_name,
            last_name: player.last_name,
            position: player.position,
            price: (player.price),
            availability: player.availability
        })
    }
    fetch(`http://localhost:3000/players/${player.admin_user_id}`, configObj) 
    .then(res=>res.json())
}

//RECORDS
export const fetchAllRecords = () => {
    return fetch('http://localhost:3000/records')
    .then(res=>res.json());
}
export const fetchRecordByRecordId = recordId => {
    return fetch(`http://localhost:3000/records/${recordId}`)
    .then(res => res.json());
}
export const fetchAllRecordsByUserId = id => {
    return fetch(`http://localhost:3000/records/user_id/${id}`)
    .then(res=>res.json())
}
export const fetchRecordsByUserIdAndPlayerId = (userId, playerId) => {
    return fetchAllRecordsByUserId(userId)
    .then(data=>data.filter(x=>x.player_id===playerId));
}
export const fetchRecordsByGwIdAndUserId = (userId, gwId) => {
    return fetchAllRecordsByUserId(userId)
    .then(data=>data.filter(x=>x.gameweek_id===gwId));
}
export const fetchRecord = (userId, gwId, playerId) => {
    return fetchAllRecordsByGwIdAndUserId(userId, gwId)
    .then(data => data.filter(r => r.player_id === playerId))
    .then(data => data[0]);
}
export const fetchCurrentRecordByUserIdAndPlayerId = (userId, playerId) => {
    return fetchRecordsByUserIdAndPlayerId(userId, playerId)
    .then(data => data.filter(r => !r.gameweek_id))
    .then(data => data[0]);
}
export const fetchCurrentRecords = () => {
    return fetchAllRecords()
    .then(data => data.filter(r => !r.gameweek_id));
}
export const postRecord = (player, userId, count) => {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            sub: count>5 ? true : false,
            captain: count===2 ? true : false,
            vice_captain: count===5 ? true : false,
            user_id: userId,
            player_id: player.player_id,
            gameweek_id: 0
        })
    };
    return fetch('http://localhost:3000/records', configObj)
    .then(res=>res.json())
}
export const postRecordDUPLICATE = (record) => {
    delete record["record_id"];
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(record)
    };
    return fetch('http://localhost:3000/records', configObj)
    .then(res=>res.json())
}
export const patchRecordGAMEWEEK = (recordId, gwId) => {
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            gameweek_id: gwId
        })
    };
    return fetch(`http://localhost:3000/records/${recordId}`, configObj)
    .then(res=>res.json())
}
export const postRecordTRANSFER = (player, userId, gwId, count, captain, vice_captain) => {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            sub: count>0 ? true : false,
            captain,
            vice_captain,
            record_id: player.record_id,
            user_id: userId,
            gameweek_id: gwId
        })
    };
    return fetch('http://localhost:3000/records', configObj)
    .then(res=>res.json())
}

export const patchRecordSUBS = (sub, record_id) => {
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            sub,
        })
    };
    return fetch(`http://localhost:3000/records/${record_id}`, configObj)
    .then(res=>res.json())
}

export const patchRecordCAPTAINS = (captain, vice_captain, record_id) => {
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            captain,
            vice_captain
        })
    };
    return fetch(`http://localhost:3000/records/${record_id}`, configObj)
    .then(res=>res.json())
}

export const deleteRecord = async(record_id) => {
    let configObj = {
        method: "DELETE"
    };
    let record = fetchRecordByRecordId(record_id);
    if (!record.gameweek_id) {
        fetch(`http://localhost:3000/records/${record_id}`, configObj)
    } else {
        showMessage({
            message: "Invalid Record Deletion: Operation stopped",
            type: 'warning'
        });
    }
}


// GAMEWEEKS / EVENTS

export const fetchAllGames = () => {
    return fetch('http://localhost:3000/gameweeks')
    .then(res=>res.jsoin())
}
export const fetchAllGamesByAdminUserId = id => {
    return fetch(`http://localhost:3000/gameweeks/admin_user/${id}`)
    .then(res=>res.json())
}
export const postGame = (game, aUserID) => {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            date: game.date,
            opponent: game.opponent,
            complete: false,
            admin_user_id: aUserID
        })
    };
    return fetch(`http://localhost:3000/gameweeks`, configObj)
    .then(res=>res.json())
}
export const patchGame = (game) => {
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            date: game.date,
            opponent: game.opponent
        })
    };
    return fetch(`http://localhost:3000/gameweeks/${game.gameweek_id}`, configObj)
    .then(res=>res.json())
}
export const completeGame = (id, score) => {
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            score: `${score.team} - ${score.oppo}`,
            complete: true
        })
    };
    return fetch(`http://localhost:3000/gameweeks/${id}`, configObj)
    .then(res=>res.json())
}

export const fetchLatestGameweekFromAdminUserId = auId => {
    return fetchAllGamesByAdminUserId(auId)
    .then(games => games.filter(g=>g.complete===true))
    .then(games => games.sort((a,b)=>Date.parse(b.date)-Date.parse(a.date)))
    .then(games => games[0])
}


// PLAYER-GAMEWEEK-JOINERS

export const postPGJ = async(joiner) => {
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
        let player = await fetchPlayerById(joiner.player_id);
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
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
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
                gameweek_id: joiner.gameweek_id
            })
        };
        return fetch(`http://localhost:3000/player_gameweek_joiners`, configObj)
        .then(res=>res.json());
    } catch(e) {
        showMessage({
            message: "Fail: Network Issue, please try again later",
            type: "danger"
          });
        console.warn(e);
    }
}
export const fetchAllPGJoiners = () => {
    return fetch('http://localhost:3000/player_gameweek_joiners')
    .then(res => res.json())
}
export const fetchAllPGJFromUserId = userId => {
    return fetch(`http://localhost:3000/player_gameweek_joiners/by_user/${userId}`)
    .then(res => res.json())
}
// export const fetchPGJoinerFromPlayerIdAndGwId = async(playerId, gwId) => {
//     return fetchAllPGJoiners()
//     .then(data => data.filter(pg => pg.player_id===playerId && pg.gameweek_id===gwId))
//     .then(data => data[0]);
// }

export const fetchPGJoinersFromUserIdAndGameweekId = (userId, gameweekId) => {
    return fetch(`http://localhost:3000/users/${userId}/${gameweekId}/pg_joiners`)
    .then(res=>res.json())
}

export const fetchAllPGJoinersFromGameweekId = (gameweekId) => {
    return fetch(`http://localhost:3000/player_gameweek_joiners/by_gw/${gameweekId}`)
    .then(res=>res.json())
}

export const fetchPGJoinerFromPlayerIdAndGwId = (playerId, gwId) => {
    return fetch(`http://localhost:3000/player_gameweek_joiners/find/${gwId}/${playerId}`)
    .then(res => res.json())
    .then(data => data[0]);
}


// USER-GAMEWEEK JOINERS

export const postUGJoiner = async(userId, gameweekId, score) => {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            total_points: score,
            user_id: userId,
            gameweek_id: gameweekId
        })
    };
    await fetch(`http://localhost:3000/user_gameweek_joiners`, configObj)
    .then(res=>res.json())
}

export const fetchUGJoiner = (userId, gameweekId) => {
    return fetch(`http://localhost:3000/user_gameweek_joiners/${userId}/${gameweekId}`)
    .then(res=>res.json())
}

export const fetchUGJoiners = (auId, gameweekId) => {
    return fetch(`http://localhost:3000/admin_users/ug_joiners/${auId}/${gameweekId}`)
    .then(res=>res.json())
}


// MESSAGES

export const postMessage = (name, email, msg) => {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            msg
        })
    };
    return fetch('http://localhost:3000/messages', configObj)
    .then(res=>res.json())
}



