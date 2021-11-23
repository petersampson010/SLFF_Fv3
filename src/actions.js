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

export const loginAdminUser = (adminUser, clubPlayers, allUsers, games) => {
    return {
        type: 'LOGINADMINUSER',
        adminUser, 
        clubPlayers,
        allUsers,
        games
    }
}

export const setAdminUser = adminUser => {
    return {
        type: 'SETADMINUSER',
        adminUser
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

export const setGWSelect = game =>{
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

export const setOtherTeamPoints = (starters, subs, records, UGJ, allPGJs, team) => {
    return {
        type: 'SETOTHERTEAMPOINTS',
        starters, 
        subs,
        records,
        UGJ, 
        allPGJs,
        team
    }
}

export const setTeamPoints = (starters, subs, UGJ) => {
    return {
        type: 'SETTEAMPOINTS',
        starters,
        subs,
        UGJ
    }
}