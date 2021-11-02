import { PointPropType } from "react-native";
import { isCaptain, isVCaptain } from "./functions/reusable"

export const loginUser = (user, aUser, clubPlayers, latestStarters, latestSubs, lastGwStarters, lastGwSubs, records, league, gameweek, pgJoiners, ugJoiners, latestUG, topPlayer, topUser, allPGJoiners) => {
    let captain, vCaptain;
    for (let i=0;i<latestStarters.length;i++) {
        if (isCaptain(latestStarters[i], records)) {
            captain = latestStarters[i];
        } else if (isVCaptain(latestStarters[i], records)) {
            vCaptain = latestStarters[i];
        }
    }
    console.log(allPGJoiners);
    return {
        type: 'LOGINUSER',
        user,
        aUser,
        clubPlayers, 
        latestStarters, 
        latestSubs, 
        lastGwStarters, 
        lastGwSubs, 
        records,
        captain,
        vCaptain,
        league,
        gameweek, 
        pgJoiners,
        ugJoiners,
        latestUG,
        topPlayer, 
        topUser,
        allPGJoiners
    }
}

export const loginAdminUser = (aUser, clubPlayers, allUsers, games) => {
    return {
        type: 'LOGINADMINUSER',
        aUser, 
        clubPlayers,
        allUsers,
        games
    }
}

export const setAdminUser = aUser => {
    return {
        type: 'SETADMINUSER',
        aUser
    }
}

export const setClubPlayers = players => {
    return {
        type: 'SETCLUBPLAYERS',
        players
    }
}

export const setUser = user => {
    return {
        type: 'SETUSER',
        user
    }
}

export const addSub = player => {
    return {
        type: 'ADDSUB',
        player
    }
}

export const addStarter = player => {
    return {
        type: 'ADDSTARTER',
        player
    }
}

export const pickTeamUpdate = (team, subs) => {
    return {
        type: 'PICKTEAMUPDATE',
        team,
        subs
    }
}

export const resetTeamPlayers = () => {
    return {
        type: 'RESETTEAMPLAYERS'
    }
}

export const nts2Login = (user, starters, subs, records) => {
    return {
        type: 'NTS2LOGIN',
        user,
        starters, 
        subs,
        records
    }
}

export const setGwSelect = game =>{
    return {
        type: 'SETGWSELECT',
        game
    }
}

export const completeGameState = id => {
    return {
        type: 'COMPLETEGAME',
        id
    }
}

export const addGameState = game => {
    return {
        type: 'ADDGAME',
        game
    }
}

export const setTransfers = team => {
    return {
        type: 'SETTRANSFERS',
        team
    }
}

export  const addSpinner = () => {
    return {
        type: 'ADDSPINNER'
    }
}

export const removeSpinner = () => {
    return {
        type: 'REMOVESPINNER'
    }
}

export const setCaptain = player => {
    return {
        type: 'SETCAPTAIN',
        player
    }
}

export const setVCaptain = player => {
    return {
        type: 'SETVCAPTAIN',
        player
    }
}

export const subIn = player => {
    return {
        type: 'SUBIN',
        player
    }
}

export const subOut = player => {
    return {
        type: 'SUBOUT',
        player
    }
}

export const transferIn = player => {
    return {
        type: 'TRANSFERIN',
        player
    }
}

export const transferOut = player => {
    return {
        type: 'TRANSFEROUT',
        player
    }
}

export const setTransferringBackToLatest = () => {
    return {
        type: 'SETTRANSFERRINGBACKTOLATEST'
    }
}

export const setLatestToTransferring = () => {
    return {
        type: 'SETLATESTTOTRANSFERRING'
    }
}

export const setOtherTeamPoints = (starters, subs, records, ugj, allPGJoiners, team) => {
    return {
        type: 'SETOTHERTEAMPOINTS',
        starters, 
        subs,
        records,
        ugj, 
        allPGJoiners,
        team
    }
}

export const setTeamPoints = (starters, subs, ug) => {
    return {
        type: 'SETTEAMPOINTS',
        starters,
        subs,
        ug
    }
}