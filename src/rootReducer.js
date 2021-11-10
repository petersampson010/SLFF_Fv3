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
            records: [],
            UGJ: null,
            user: null, 
            allPGJoiners: [],
            captain: null,
            vCaptain: null
        },
        lastUGJ: null,
        lastGW: null,
        focusGW: null,
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

// const initialState = {
//     spinner: false,
//     otherTeam: false,
//     endUser: {
//         adminUser: {
//             active: false,
//             adminUser: {},  
//             allUsers: [],
//         },
//         user: {},
//     },
//     players: {
//         clubPlayers: [],
//         // latest info, changes that havent been 'confirmed' will not be displayed here
//         latest: {
//             starters: [],
//             subs: [],
//             captain: null,
//             vCaptain: null
//         }, 
//         // if any subs or transfers are being made, this is where it will be reflected
//         transferring: {
//             starters: [],
//             subs: [],
//             captain: null,
//             vCaptain: null,
//             budget: null
//         },
//         // last (/the gw you are focusing on) gw's players
//         teamPoints: {
//             starters: [],
//             subs: [],
//             ug: null,
//             captain: null,
//             vCaptain: null
//         },
//         // data for other teams the user is looking at
//         otherTeamPoints: {
//             starters: [],
//             subs: [],
//             records: [],
//             ug: null,
//             user: null, 
//             allPGJoiners: [],
//             captain: null,
//             vCaptain: null
//         }
//     },
//     joiners: {
//         records: [],
//         pgJoiners: [],
//         allPGJoiners: []
//     },
//     gameweek: {
//         games: [],
//         gwSelect: null,
//         gwLatest: null,
//     },
//     homeGraphics: {
//         league: [],
//         topPlayer: null,
//         topUser: null
//     },
//     loginComplete: false,
// }


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
                        subs: currentSubs,
                        captain: action.captain,
                        vCaptain: action.vCaptain
                    },
                    focusedGWTeam: {
                        ...state.user.focusedGWTeam,
                        starters: action.lastGWStarters,
                        subs: action.lastGWSubs, 
                        UGJ: action.lastUGJ
                    },
                    records: actions.records,
                    PGJs: {
                        last: actions.lastPGJs,
                        all: actions.allPGJs
                    }
                },
                club: {
                    ...state.club,
                    adminUser: action.adminUser,
                    clubPlayers: action.clubPlayers,
                    lastUGJ: action.lastUGJ,
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
                    ...boolDeciders,
                    loginComplete: true, 
                    adminActive: true
                },
                club: {
                    ...state.club,
                    admin_user: action.admin_user,
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
                        starters: action.starters,
                        subs: action.subs
                    },
                    records: action.records
                },
                stateChanges: {
                    updatedNotPersistedTeam: {
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
                        budget: action.budget
                    }
                }
            };
        case 'RESETTEAMPLAYERS':
            return {
                ...state,
                user: {
                    ...state.user, 
                    currentTeam: {
                        starters: [],
                        subs: []
                    }, 
                    focusedGWTeam: {
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
                    focusGW: action.game
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
                players: {
                    ...state.players,
                    transferring: {
                        ...state.players.transferring,
                        starters: [...state.players.transferring.starters, action.player],
                        subs: state.players.transferring.subs.filter(x=>x!==action.player)
                    }
                }
            }
        case "SUBOUT":
            return {
                ...state,
                players: {
                    ...state.players,
                    transferring: {
                        ...state.players.transferring,
                        starters: state.players.transferring.starters.filter(x=>x!==action.player),
                        subs: [...state.players.transferring.subs, action.player]
                    }
                }
            }
        case "TRANSFERIN":
            return {
                ...state,
                players: {
                    ...state.players,
                    transferring: {
                        ...state.players.transferring,
                        starters: [...state.players.transferring.starters, action.player],
                        budget: state.players.transferring.budget-action.player.price
                    }
                }
            }
        case "TRANSFEROUT":
            return {
                ...state,
                players: {
                    ...state.players,
                    transferring: {
                        ...state.players.transferring,
                        starters: state.players.transferring.starters.filter(x=>x!==action.player),
                        subs: state.players.transferring.subs.filter(x=>x!==action.player),
                        budget: state.players.transferring.budget+action.player.price
                    }
                }
            }
        case "SETCAPTAIN":
            return {
                ...state,
                players: {
                    ...state.players,
                    latest: {
                        ...state.players.latest,
                        captain: action.player
                    }
                }
            }
        case "SETVCAPTAIN":
            return {
                ...state,
                players: {
                    ...state.players,
                    latest: {
                        ...state.players.latest,
                        captain: action.player
                    }
                }
            }
        case "SETTRANSFERRINGBACKTOLATEST":
            return {
                ...state,
                otherTeam: false,
                players: {
                    ...state.players,
                    transferring: {
                        ...state.players.latest,
                        budget: state.endUser.user.budget
                    }
                }
            };
        case "SETLATESTTOTRANSFERRING":
            return {
                ...state, 
                endUser: {
                    ...state.endUser,
                    user: {
                        ...state.user,
                        budget: state.players.transferring.budget
                    }
                },
                players: {
                    ...state.players,
                    latest: state.players.transferring
                }
            };
        case "SETOTHERTEAMPOINTS": 
            return {
                ...state, 
                otherTeam: true,
                players: {
                    ...state.players,
                    otherTeamPoints: {
                        starters: action.starters, 
                        subs: action.subs,
                        records: action.records,
                        ug: action.ugj,
                        allPGJoiners: action.allPGJoiners,
                        user: action.team
                    }
                }

            }
        case "SETTEAMPOINTS":
            return {
                ...state, 
                otherTeam: false,
                players: {
                    ...state.players,
                    teamPoints: {
                        starters: action.starters, 
                        subs: action.subs,
                        ug: action.ug
                    }
                }

            }
        default:
            return state;
    }
}

export default rootReducer;