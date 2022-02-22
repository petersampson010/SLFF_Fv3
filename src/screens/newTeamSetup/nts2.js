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

    const dispatch = useDispatch(),  
    user = useSelector(state => state.user.user),
    teamPlayers = useSelector(state => state.stateChanges.updatedNotPersistedTeam.starters.concat(state.stateChanges.updatedNotPersistedTeam.subs)),
    originalBudget = useSelector(state => state.stateChanges.updatedNotPersistedTeam.budget),
    [budget, updateOriginalBudget] = useState(originalBudget),
    lastGW = useSelector(state => state.club.lastGW);

    const transfer = player => {
        let { position, price } = player;
        if (playerSelected(player)) {
            dispatch(transferOut(player));
            dispatch(closeModal());
        } else {
            if (teamPlayers.filter(x=>x.position===position).length>2) {
                showMessage({
                    message: "Too many players in this position",
                    type: "warning"
                })
            } else {
                dispatch(transferIn(player));
                dispatch(closeModal());
            }
        }
    } 

    const playerSelected = player => playerIds(teamPlayers).includes(player.player_id);

    const submitTeam = async() => {
        const teamPlayersObj = playersArrayToObj(teamPlayers);
        try {
            dispatch(addSpinner());
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
                                dispatch(nts2Login(returnUser, teamPlayers.slice(0,globalConfig.numberOfStarters), teamPlayers.slice(globalConfig.numberOfStarters-globalConfig.numberOfPlayers), records, league, [], [], [], null, null));
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
                                dispatch(nts2Login(returnUser, teamPlayers.slice(0,globalConfig.numberOfStarters), teamPlayers.slice(globalConfig.numberOfStarters-globalConfig.numberOfPlayers), records, league,  allPGJs, lastPGJs, allLastUGJs, topPlayer, topUser));
                            }
                        } else {
                            dispatch(nts2Login(returnUser, teamPlayers.slice(0,globalConfig.numberOfStarters), teamPlayers.slice(globalConfig.numberOfStarters-globalConfig.numberOfPlayers), records, null, [], [], [], null, null));
                        }
                        updateStack(navigation, 0, 'Home');
                    } else {
                        showMessage({
                            message: "You need 1 Goalkeeper selected",
                            type: "danger"
                        });
                    }
            }
            dispatch(removeSpinner());
        } catch(e) {
            showMessage({
                message: "Fail: Network Issue, please try again later",
                type: "danger"
              });
            dispatch(removeSpinner());
            console.warn(e.response.data);
        }
    }

    const setModalINPUT = player => {
        dispatch(setModal({modalSet: 'set1', player, btnClick: transfer, width: vw(80), height: vh(30)}));
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