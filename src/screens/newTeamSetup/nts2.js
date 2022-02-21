import React, { Component, useState } from 'react';
import Header from '../../components/header/header';
import { ScrollView, View } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getAllPGJFromUserId, getAllPGJsFromGameweekId, getLeague, getPlayerById, getUGJs, getUserById, patchUser, patchUserBUDGET, postRecord, postUser } from '../../functions/APIcalls';
import Pitch from '../../components/Pitch/pitch';
import PlayersList from '../../components/playersList/playersList';
import { showMessage } from 'react-native-flash-message';
import { PlayerIds, allSelectedPlayers } from '../../functions/reusable';
import { screenContainer } from '../../styles/global';
import { pitchContainer } from '../PitchScreens/style';
import { nts2Login, addSpinner, removeSpinner, setLatestToTransferring, setTransferringBackToLatest, transferIn, transferOut, closeModal, setModal } from '../../actions';
import { addSubAttributeToPlayersArray, playerIds, fullName, getRecordId, playersArrayToObj, playersObjToArray, positionString } from '../../functions/reusable';
import PitchHead from '../../components/PitchHead/pitchHead';
import { validateTransfers } from '../../functions/validity';
import globalConfig from '../../config/globalConfig.json';
import { vh, vw } from 'react-native-expo-viewport-units';
import { updateStack } from '../../Navigation';

const ntsScreen2 = ({navigation}) => {

    const [team, updateTeam] = useState({}),
    user = useSelector(state => state.user.user),
    teamPlayers = useSelector(state => state.stateChanges.updatedNotPersistedTeam.starters.concat(state.stateChanges.updatedNotPersistedTeam.subs)),
    originalBudget = useSelector(state => state.stateChanges.updatedNotPersistedTeam.budget),
    [budget, updateOriginalBudget] = useState(originalBudget),
    lastGW = useSelector(state => state.club.lastGW),
    nts2LoginFUNC = useDispatch((user, starters, subs, records, league, allPGJs, lastPGJs, allLastUGJs, topPlayer, topUser) => nts2Login(user, starters, subs, records, league, allPGJs, lastPGJs, allLastUGJs, topPlayer, topUser)),
    transferOutFUNC = useDispatch(player => transferOut(player)),
    transferInFUNC = useDispatch(player => transferIn(player)),
    addSpinnerFUNC = useDispatch(() => addSpinner()),
    removeSpinnerFUNC = useDispatch(() => removeSpinner()),
    setTransferringBackToLatestFUNC = useDispatch(() => setTransferringBackToLatest()),
    setLatestToTransferringFUNC = useDispatch(() => setLatestToTransferring()),
    setModalFUNC = useDispatch(modalObj => setModal(modalObj)),
    closeModalFUNC = useDispatch(() => closeModal());

    const transfer = player => {
        let { position, price } = player;
        if (playerSelected(player)) {
            transferOutFUNC(player);
            closeModalFUNC();
        } else {
            if (teamPlayers.filter(x=>x.position===position).length>2) {
                showMessage({
                    message: "Too many players in this position",
                    type: "warning"
                })
            } else {
                transferInFUNC(player);
                closeModalFUNC();
            }
        }
    } 

    const playerSelected = player => playerIds(teamPlayers).includes(player.player_id);


    const select = player => {
        let newBudget = budget - player.price;
        if (team.length>7) {
            showMessage({
                message: "too many players, please deselect a player before adding anymore",
                type: "danger"
            });
        } else {
            console.log(globalConfig.numberOfPosition[player.position]);
            switch(player.position) {
                case '1':
                    if (team[1].length>0) {
                        showMessage({
                            message: "Keeper already selected",
                            description: "If you need a sub-section of error",
                            type: "warning"
                        })
                    } else {
                        updateTeam({...team, 1: [...team[1], player]});
                        updateBudget(newBudget);
                    };
                    break;
                case '2':
                    if (team[2].length>3) {
                        showMessage({
                            message: "Too many defenders already selected",
                            description: "If you need a sub-section of error",
                            type: "warning"
                        })
                    } else {
                        updateTeam({...team, 2: [...team[2], player]});
                        updateBudget(newBudget);
                    };
                    break;
                case '3':
                    if (team[3].length>3) {
                        showMessage({
                            message: "Too many midfielders already selected",
                            description: "If you need a sub-section of error",
                            type: "warning"
                        })
                    } else {
                        updateTeam({...team, 3: [...team[3], player]});
                        updateBudget(newBudget);
                    };
                    break;
                case '4':
                    if (team[4].length>2) {
                        showMessage({
                            message: "Too many forwards already selected",
                            description: "If you need a sub-section of error",
                            type: "warning"
                        })
                    } else {
                        updateTeam({...team, 4: [...team[4], player]});
                        updateBudget(newBudget);
                    };
                    break;
                default: 
                    break; 
            }
        }
    }

    const deSelect = player => {
        updateBudget(budget + player.price);
        updateTeam({...team, [player.position]: team[player.position].filter(x=>x.player_id!==player.player_id)});
    }

    const submitTeam = async() => {
        const teamPlayersObj = playersArrayToObj(teamPlayers);
        try {
            addSpinnerFUNC();
            if (validateTransfers(budget, teamPlayersObj)) {
                    if (teamPlayersObj['1'].length===1) {
                        let records = [];
                        let returnUser = await patchUser(user.user_id, {gw_start: lastGW ? lastGW.gameweek+1 : 1, budget}); 
                        for (let i=0;i<globalConfig.numberOfPlayers;i++) {
                            let record = await postRecord(teamPlayers[i], returnUser.user_id, i);
                            records.push(record);
                        }
                        if (lastGW) {
                            let lastPGJs = await getAllPGJsFromGameweekId(lastGW.gameweek_id);
                            let league = await getLeague(returnUser.admin_user_id);
                            if (lastPGJs<1) {
                                nts2LoginFUNC(returnUser, teamPlayers.slice(0,globalConfig.numberOfStarters), teamPlayers.slice(globalConfig.numberOfStarters-globalConfig.numberOfPlayers), records, league, [], [], [], null, null);
                            } else {
                                let allPGJs = await getAllPGJFromUserId(returnUser.user_id);
                                let allLastUGJs = await getUGJs(returnUser.admin_user_id, lastGW.gameweek_id);
                                let pg = lastPGJs.sort((a,b)=>b.total_points-a.total_points);
                                pg = pg[0];
                                let topPlayer = pg ? {
                                    pg,
                                    player: await getPlayerById(pg.player_id)
                                } : null;
                                let ug = allLastUGJs.sort((a,b)=>b.total_points-a.total_points)[0];
                                let topUser = ug ? {
                                    ug,
                                    user: await getUserById(ug.user_id)
                                } : null;
                                nts2LoginFUNC(returnUser, teamPlayers.slice(0,globalConfig.numberOfStarters), teamPlayers.slice(globalConfig.numberOfStarters-globalConfig.numberOfPlayers), records, league,  allPGJs, lastPGJs, allLastUGJs, topPlayer, topUser);
                            }
                        } else {
                            nts2LoginFUNC(returnUser, teamPlayers.slice(0,globalConfig.numberOfStarters), teamPlayers.slice(globalConfig.numberOfStarters-globalConfig.numberOfPlayers), records, null, [], [], [], null, null);
                        }
                        updateStack(navigation, 0, 'Home');
                    } else {
                        showMessage({
                            message: "You need 1 Goalkeeper selected",
                            type: "danger"
                        });
                    }
            }
            removeSpinnerFUNC();
        } catch(e) {
            showMessage({
                message: "Fail: Network Issue, please try again later",
                type: "danger"
              });
            removeSpinnerFUNC();
            console.warn(e.response.data);
        }
    }

    const setModalINPUT = player => {
        setModalFUNC({modalSet: 'set1', player, btnClick: transfer, width: vw(80), height: vh(30)});
    }

        return ( 
            <View style={screenContainer}>
                <PitchHead type='transfers' update={submitTeam}/>
                <ScrollView style={pitchContainer}>
                    {/* <Header style={styles.header} title='Team Selection'/> */}
                    <Pitch
                    update={submitTeam}
                    clickFcn={transfer}
                    playerGraphicClickFcn={setModalINPUT}
                    type='transfers'
                    team={teamPlayers}
                    />
                    <PlayersList
                    clickFcn={setModalINPUT}
                    />
                </ScrollView>
            </View>
        );
}
 
export default ntsScreen2;