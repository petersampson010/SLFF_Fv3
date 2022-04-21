import { getCaptain, getVCaptain, isCaptain, isVCaptain } from "./functions/reusable"

export const loginUser = (user, adminUser, clubPlayers, currentStarters, currentSubs, lastGWStarters, lastGWSubs, records, league, lastGW, lastUGJ, lastPGJs, allLastUGJs, topPlayer, topUser, allPGJs, nextGW) => {
    let captain = getCaptain(currentStarters, records);
    let vCaptain = getVCaptain(currentStarters, records);
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
        allPGJs, 
        nextGW
    }
}

export const loginAdminUser = (adminUser, clubPlayers, allUsers, GWs, lastGW) => {
    return {
        type: 'LOGINADMINUSER',
        adminUser, 
        clubPlayers,
        allUsers,
        GWs,
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

export const nts2Login = (user, starters, subs, records, league, allPGJs, lastPGJs, allLastUGJs, topPlayer, topUser) => {
    let captain = getCaptain(starters, records);
    let vCaptain = getVCaptain(starters, records);
    return {
        type: 'NTS2LOGIN',
        user,
        starters, 
        subs,
        records,
        league,
        allPGJs,  
        lastPGJs, 
        allLastUGJs, 
        topPlayer, 
        topUser,
        captain, 
        vCaptain
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

export const updateGameState = game => {
    return {
        type: 'UPDATEGAME',
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

export const setCaptain = (player,) => {
    return {
        type: 'SETCAPTAIN',
        player
    }
}

export const setVCaptain = (player) => {
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
    let captain = getCaptain(starters, records);
    let vCaptain = getVCaptain(starters, records);
    return {
        type: 'SETOTHERTEAMPOINTS',
        starters, 
        subs,
        records,
        UGJ, 
        allPGJs,
        otherUser,
        clubFocusGW,
        captain, 
        vCaptain
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

export const leavingClubPointsPage = () => {
    return {
        type: 'LEAVINGCLUBPOINTSPAGE'
    }
}

export const setModal = (modalObj) => {
    return {
        type: "SETMODAL",
        modalObj
    }
}

export const closeModal = () => {
    return {
        type: "CLOSEMODAL"
    }
}

export const updateStateClubPlayers = updatedPlayer => {
    return {
        type: "UPDATECLUBPLAYERS",
        updatedPlayer
    }
}

export const resetStore = () => {
    return {
        type: "RESETSTORE"
    }
}

export const setAvailableTransfers = transfers => {
    return {
        type: "SETAVAILABLETRANSFERS",
        transfers
    }
}