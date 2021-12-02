import { ActionSheetIOS } from "react-native";
import { playersObjToArray } from "./functions/reusable";
import { syncGWs } from "./functions/sync/syncGWs";

const initialState = {
    boolDeciders: {
        spinner: false, 
        otherTeamFocus: false, 
        adminActive: false, 
        loginComplete: false,
        modal: false
    },
    user: {
        user: {},
        currentTeam: {
            starters: [],
            subs: [],
            captain: null,
            vCaptain: null
        },
        focusedGWTeam: {
            starters: [],
            subs: [],
            UGJ: null,
            captain: null,
            vCaptain: null
        },
        userFocusGW: null,
        records: [],
        PGJs: {
            last: [],
            all: []
        }
    },
    club: {
        adminUser: {},
        allUsers: [],
        clubPlayers: [],
        focusedGWTeam: {
            starters: [],
            subs: [],
            otherClubFocusRecords: [],
            UGJ: null,
            user: null, 
            allPGJs: [],
            captain: null,
            vCaptain: null
        },
        allLastUGJs: [],
        lastGW: null,
        clubFocusGW: null,
        allGames: [],
        league: [],
        topPlayer: null,
        topUser: null
    },
    stateChanges: {
        updatedNotPersistedTeam: {
            starters: [],
            subs: [],
            captain: null,
            vCaptain: null,
            budget: null
        }
    },
    modal: {
        player: null,
        jsx: null, 
        width: null,
        height: null, 
        bottomBtn: null,
        closeFcn: null
    }
}

const rootReducer = (state = initialState, action) => {
    console.log('changing redux state with action: ' + action.type);
    switch (action.type) {
        case 'LOGINUSER':
            return {
                ...state,
                boolDeciders: {
                    ...state.boolDeciders,
                    loginComplete: true
                },
                user: {
                    user: action.user, 
                    currentTeam: {
                        ...state.user.currentTeam,
                        starters: action.currentStarters, 
                        subs: action.currentSubs,
                        captain: action.captain,
                        vCaptain: action.vCaptain
                    },
                    focusedGWTeam: {
                        ...state.user.focusedGWTeam,
                        starters: action.lastGWStarters,
                        captain: action.captain, 
                        vCaptain: action.vCaptain,
                        subs: action.lastGWSubs, 
                        UGJ: action.lastUGJ
                    },
                    userFocusGW: action.lastGW,
                    records: action.records,
                    PGJs: {
                        last: action.lastPGJs,
                        all: action.allPGJs
                    }
                },
                club: {
                    ...state.club,
                    adminUser: action.adminUser,
                    clubPlayers: action.clubPlayers,
                    allLastUGJs: action.allLastUGJs,
                    lastGW: action.lastGW,
                    league: action.league,
                    topPlayer: action.topPlayer,
                    topUser: action.topUser
                },
                stateChanges: {
                    updatedNotPersistedTeam: {
                        ...state.stateChanges.updatedNotPersistedTeam,
                        starters: action.currentStarters,
                        subs: action.currentSubs, 
                        budget: action.user.budget,
                        captain: action.captain,
                        vCaptain: action.vCaptain
                    }
                }
            }
        case 'LOGINADMINUSER':
            return {
                ...state, 
                boolDeciders: {
                    ...state.boolDeciders,
                    loginComplete: true, 
                    adminActive: true
                },
                club: {
                    ...state.club,
                    adminUser: action.adminUser,
                    allUsers: action.allUsers,
                    clubPlayers: action.clubPlayers,
                    allGames: action.gameweeks,
                    lastGW: action.lastGW
                }
            }
        case 'NTS2LOGIN':
            return {
                ...state,
                user: {
                    ...state.user, 
                    user: action.user,
                    currentTeam: {
                        ...state.user.currentTeam,
                        starters: action.starters,
                        subs: action.subs
                    },
                    PGJs: {
                        last: action.lastPGJs,
                        all: action.allPGJs
                    },
                    records: action.records
                },
                club: {
                    ...state.club, 
                    allLastUGJs: action.allLastUGJs,
                    league: action.league, 
                    topPlayer: action.topPlayer,
                    topUser: action.topUser
                },
                stateChanges: {
                    updatedNotPersistedTeam: {
                        ...state.stateChanges.updatedNotPersistedTeam,
                        starters: action.starters,
                        subs: action.subs,
                        budget: action.user.budget
                    }
                }
            };
        case 'SETADMINUSER':
            return {
                ...state, 
                club: {
                    ...state.club,
                    adminUser: action.adminUser
                }
            };
        case 'SETCLUBPLAYERSANDLASTGW':
            return {
                ...state, 
                club: {
                    ...state.club,
                    clubPlayers: action.players,
                    lastGW: action.lastGW
                }
            };
        case 'SETUSER':
            return {
                ...state, 
                user: {
                    ...state.user, 
                    user: action.user
                },
                stateChanges: {
                    updatedNotPersistedTeam: {
                        ...state.stateChanges.updatedNotPersistedTeam,
                        budget: action.user.budget
                    }
                }
            };
        case 'RESETTEAMPLAYERS':
            return {
                ...state,
                user: {
                    ...state.user, 
                    currentTeam: {
                        ...state.user.currentTeam,
                        starters: [],
                        subs: []
                    }, 
                    focusedGWTeam: {
                        ...state.user.focusedGWTeam,
                        starters: [],
                        subs: [],
                        UGJ: null
                    }
                }
            };
        case 'SETCLUBFOCUSGW':
            return {
                ...state, 
                club: {
                    ...state.club, 
                    clubFocusGW: action.game
                }
            };
        case 'COMPLETEGAME':
            return {
                ...state, 
                club: {
                    ...state.club,
                    allGames: action.newAllGames,
                    lastGW: action.newLastGW
                }
            };
        case 'ADDGAME':
            return {
                ...state, 
                club: {
                    ...state.club,
                    allGames: [...state.club.allGames, action.game]
                }
            };
        case 'SETTRANSFERS':
            let starters = action.team.filter(player=>player.sub===false);
            let subs = action.team.filter(player=>player.sub===true);
            return {
                ...state, 
                user: {
                    ...state.user, 
                    currentTeam: {
                        ...state.user.currentTeam,
                        starters,
                        subs
                    }
                }
            };
        case 'ADDSPINNER':
            return {
                ...state, 
                boolDeciders: {
                    ...state.boolDeciders,
                    spinner: true
                }
            }
        case "REMOVESPINNER":
            return {
                ...state, 
                boolDeciders: {
                    ...state.boolDeciders,
                    spinner: false
                }
            }
        case "SUBIN":
            return {
                ...state,
                stateChanges: {
                    updatedNotPersistedTeam: {
                        ...state.stateChanges.updatedNotPersistedTeam,
                        starters: [...state.stateChanges.updatedNotPersistedTeam.starters, action.player],
                        subs: state.stateChanges.updatedNotPersistedTeam.subs.filter(x=>x!==action.player)
                    }
                }
            }
        case "SUBOUT":
            return {
                ...state,
                stateChanges: {
                    updatedNotPersistedTeam: {
                        ...state.stateChanges.updatedNotPersistedTeam,
                        starters: state.stateChanges.updatedNotPersistedTeam.starters.filter(x=>x!==action.player),
                        subs: [...state.stateChanges.updatedNotPersistedTeam.subs, action.player]
                    }
                }
            }
        case "TRANSFERIN":
            return {
                ...state,
                stateChanges: {
                    updatedNotPersistedTeam: {
                        ...state.stateChanges.updatedNotPersistedTeam,
                        starters: [...state.stateChanges.updatedNotPersistedTeam.starters, action.player],
                        budget: state.stateChanges.updatedNotPersistedTeam.budget-action.player.price
                    }
                }
            }
        case "TRANSFEROUT":
            return {
                ...state,
                stateChanges: {
                    updatedNotPersistedTeam: {
                        ...state.stateChanges.updatedNotPersistedTeam,
                        starters: state.stateChanges.updatedNotPersistedTeam.starters.filter(x=>x!==action.player),
                        subs: state.stateChanges.updatedNotPersistedTeam.subs.filter(x=>x!==action.player),
                        budget: state.stateChanges.updatedNotPersistedTeam.budget+action.player.price
                    }
                }
            }
        case "SETCAPTAIN":
            return {
                ...state,
                stateChanges: {
                    ...state.stateChanges,
                    updatedNotPersistedTeam: {
                        ...state.stateChanges.updatedNotPersistedTeam,
                        captain: action.player
                    }
                }
            }
        case "SETVCAPTAIN":
            return {
                ...state,
                stateChanges: {
                    ...state.stateChanges,
                    updatedNotPersistedTeam: {
                        ...state.stateChanges.updatedNotPersistedTeam,
                        vCaptain: action.player
                    }
                }
            }
        case "SETTRANSFERRINGBACKTOLATEST":
            return {
                ...state,
                boolDeciders: {
                    ...state.boolDeciders,
                    otherTeamFocus: false
                },
                stateChanges: {
                    updatedNotPersistedTeam: {
                        ...state.user.currentTeam,
                        budget: state.user.user.budget
                    }
                }
            };
        case "SETLATESTTOTRANSFERRING":
            return {
                ...state, 
                user: {
                    ...state.user,
                    currentTeam: {
                        ...state.stateChanges.updatedNotPersistedTeam
                    },
                    budget: state.stateChanges.updatedNotPersistedTeam.budget
                }
            };
        case "SETOTHERTEAMPOINTS": 
            return {
                ...state, 
                boolDeciders: {
                    ...state.boolDeciders,
                    otherTeamFocus: true
                },
                club: {
                    ...state.club, 
                    focusedGWTeam: {
                        ...state.club.focusedGWTeam,
                        starters: action.starters, 
                        subs: action.subs,
                        records: action.records,
                        UGJ: action.UGJ,
                        allPGJs: action.allPGJs,
                        user: action.otherUser
                    }
                }
            }
        case "CHANGEGWOTHER": 
            return {
                ...state, 
                club: {
                    ...state.club, 
                    focusedGWTeam: {
                        ...state.club.focusedGWTeam,
                        starters: action.starters,
                        subs: action.subs,
                        UGJ: action.UGJ
                    },
                    clubFocusGW: action.clubFocusGW
                }
            }
        case "SETTEAMPOINTS":
            return {
                ...state, 
                boolDeciders: {
                    ...state.boolDeciders,
                    otherTeamFocus: false
                },
                user: {
                    ...state.user, 
                    focusedGWTeam: {
                        ...state.user.focusedGWTeam,
                        starters: action.starters, 
                        subs: action.subs,
                        UGJ: action.UGJ
                    },
                    userFocusGW: action.newUserFocusGW
                }
            }
        case "LEAVINGCLUBPOINTSPAGE": 
            return {
                ...state, 
                boolDeciders: {
                    ...state.boolDeciders,
                    otherTeamFocus: false
                },
                club: {
                    ...state.club,
                    focusedGWTeam: {
                        starters: [],
                        subs: [],
                        otherClubFocusRecords: [],
                        UGJ: null,
                        user: null, 
                        allPGJs: [],
                        captain: null,
                        vCaptain: null
                    },
                    clubFocusGW: null
                }
            };
        case "SETMODAL":
            return {
                ...state,
                boolDeciders: {
                    ...state.boolDeciders,
                    modal: true
                },
                modal: {
                    player: action.player,
                    jsx: action.jsx,
                    width: action.width, 
                    height: action.height,
                    bottomBtn: action.bottomBtn,
                    closeFcn: action.closeFcn
                }
            }
        case "CLOSEMODAL": 
            return {
                ...state,
                boolDeciders: {
                    ...state.boolDeciders,
                    modal: false
                },
                modal: {
                    player: null,
                    jsx: null, 
                    width: null,
                    height: null, 
                    bottomBtn: null,
                    closeFcn: null
                }
            }
        default:
            return state;
    }
}

export default rootReducer;