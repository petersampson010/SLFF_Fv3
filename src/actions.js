import { isCaptain, isVCaptain } from "./functions/reusable"

export const loginUser = (user, adminUser, clubPlayers, currentStarters, currentSubs, lastGWStarters, lastGWSubs, records, league, lastGW, lastUGJ, lastPGJs, allLastUGJs, topPlayer, topUser, allPGJs) => {
    let captain, vCaptain;
    for (let i=0;i<currentStarters.length;i++) {
        if (isCaptain(currentStarters[i], records)) {
            captain = currentStarters[i];
        } else if (isVCaptain(currentStarters[i], records)) {
            vCaptain = currentStarters[i];
        }
    }
    return {
        type: 'LOGINUSER',
        user,
        adminUser,
        clubPlayers, 
        currentStarters, 
        currentSubs, 
        lastGWStarters, 
        lastGWSubs, 
        records,
        captain,
        vCaptain,
        league,
        lastGW,
        lastUGJ, 
        lastPGJs,
        allLastUGJs,
        topPlayer, 
        topUser,
        allPGJs
    }
}

export const loginAdminUser = (adminUser, clubPlayers, allUsers, gameweeks, lastGW) => {
    return {
        type: 'LOGINADMINUSER',
        adminUser, 
        clubPlayers,
        allUsers,
        gameweeks,
        lastGW
    }
}

export const setAdminUser = adminUser => {
    return {
        type: 'SETADMINUSER',
        adminUser
    }
}

export const setClubPlayersAndLastGW = (players, lastGW) => {
    return {
        type: 'SETCLUBPLAYERSANDLASTGW',
        players,
        lastGW
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

export const setClubFocusGW = game =>{
    return {
        type: 'SETCLUBFOCUSGW',
        game
    }
}

export const completeGameState = (newAllGames, newLastGW) => {
    return {
        type: 'COMPLETEGAME',
        newAllGames, 
        newLastGW
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

export const setOtherTeamPoints = (starters, subs, records, UGJ, allPGJs, otherUser, clubFocusGW) => {
    return {
        type: 'SETOTHERTEAMPOINTS',
        starters, 
        subs,
        records,
        UGJ, 
        allPGJs,
        otherUser,
        clubFocusGW
    }
}

export const changeGWOther = (starters, subs, UGJ, clubFocusGW) => {
    return {
        type: 'CHANGEGWOTHER',
        starters, 
        subs,
        UGJ, 
        clubFocusGW
    }
}

export const setTeamPoints = (starters, subs, UGJ, newUserFocusGW) => {
    return {
        type: 'SETTEAMPOINTS',
        starters,
        subs,
        UGJ,
        newUserFocusGW
    }
}