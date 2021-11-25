import { playersObjToArray } from "./functions/reusable";

const initialState = {
    boolDeciders: {
        spinner: false, 
        otherTeamFocus: false, 
        adminActive: false, 
        loginComplete: false
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
    }
}

const rootReducer = (state = initialState, action) => {
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
                        budget: action.user.budget
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
                    allGames: action.games
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
                    records: action.records
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
        case 'SETCLUBPLAYERS':
            return {
                ...state, 
                club: {
                    ...state.club,
                    clubPlayers: action.players
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
        case 'SETGWSELECT':
            return {
                ...state, 
                club: {
                    ...state.club, 
                    clubFocusGW: action.game
                }
            };
        case 'COMPLETEGAME':
            let newGames = state.club.allGames.map(game=>{
                if (game.gameweek_id===action.id) {
                    return {...game, complete: true};
                } else {
                    return game;
                }
            });
            return {
                ...state, 
                club: {
                    ...state.club,
                    allGames: newGames
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
                user: {
                    ...state.user, 
                    currentTeam: {
                        ...state.user.currentTeam,
                        captain: action.player
                    }
                }
            }
        case "SETVCAPTAIN":
            return {
                ...state,
                user: {
                    ...state.user, 
                    currentTeam: {
                        ...state.user.currentTeam,
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
        console.log('setting other team points');
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
                        user: action.team
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
                    userFocusGW: action.userFocusGW
                }
            }
        default:
            return state;
    }
}

export default rootReducer;