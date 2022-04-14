import React, { Component, useState } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { addSubAttributeToPlayersArray, playerIds, fullName, getRecordId, playersArrayToObj, playersObjToArray, positionString } from '../../functions/reusable';
import Pitch from '../../components/Pitch/pitch.js';
import PlayersList from '../../components/playersList/playersList.js';
import { showMessage } from 'react-native-flash-message';
import BottomNav from '../../components/bottomNav/bottomNav.js';
import FadeInView from '../../components/fadeInView.js';
import { pitchContainer } from './style.js';
import { screenContainer } from '../../styles/global.js';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { validateTransfers } from '../../functions/validity';
import pitch from '../../components/Pitch/pitch.js';
import _, { remove } from 'lodash';
import { deleteRecord, getAllRecordsByUserIdAndPlayerId, getRecord, getRecordsByUserIdAndPlayerId, patchRecordGAMEWEEK, patchUserBUDGET, postRecord, postRecordTRANSFER } from '../../functions/APIcalls';
import { TouchableHighlightBase } from 'react-native';
import { addSpinner, closeModal, removeSpinner, setLatestToTransferring, setModal, setTransferringBackToLatest, transferIn, transferOut } from '../../actions';
import PitchHead from '../../components/PitchHead/pitchHead';
import { subImage } from '../../components/Modal/style';
import { playerImage, playerImageLarge } from '../../components/PlayerGraphic/style';
import { vh, vw } from 'react-native-expo-viewport-units';
import Button from '../../components/Button/button';
import { recentGame } from '../home/style';


const TransfersScreen = ({navigation}) => {

    const dispatch = useDispatch(),
    [positionFilter, updatePositionFilter] = useState('0'),
    teamPlayers = useSelector(state => state.stateChanges.updatedNotPersistedTeam.starters.concat(state.stateChanges.updatedNotPersistedTeam.subs)),
    clubPlayers = useSelector(state => state.club.clubPlayers),
    user = useSelector(state => state.user.user),
    budget = useSelector(state => state.stateChanges.updatedNotPersistedTeam.budget),
    originalPlayers = useSelector(state => state.user.currentTeam.starters.concat(state.user.currentTeam.subs)),
    nextGW = useSelector(state => state.club.nextGW);


    const originalTeam = () => {
        return {
            '1': teamPlayers.filter(x=>x.position==='1'),
            '2': teamPlayers.filter(x=>x.position==='2'),
            '3': teamPlayers.filter(x=>x.position==='3'),
            '4': teamPlayers.filter(x=>x.position==='4')
        }
    }

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

    const confirmUpdates = async() => {
        try {
            if (validateTransfers(budget, playersArrayToObj(teamPlayers))) {
                dispatch(addSpinner());
                let count = 0;
                let captain = false;
                let vice_captain = false;
                // players transferred out
                const playersOut = _.difference(originalPlayers, teamPlayers);
                for (let i=0;i<playersOut.length;i++) {
                  let record = await getRecord(user.user_id, 0, playersOut[i].player_id);
                  if (record.sub) {
                      count++;
                  }
                  if (record.captain) {
                      captain = true;
                  }
                  if (record.vice_captain) {
                      vice_captain = true;
                  }
                  deleteRecord(record.record_id);
                }
                // players transferred in
                const playersIn = _.difference(teamPlayers, originalPlayers);
                for (let j=0;j<playersIn.length;j++) {
                    if (captain) {
                        await postRecordTRANSFER(playersIn[j], user.user_id, 0, 0, captain, false);
                        captain = false;
                    } else if (vice_captain) {
                        await postRecordTRANSFER(playersIn[j], user.user_id, 0, 0, false, vice_captain);
                        vice_captain = false;
                    } else {
                        await postRecordTRANSFER(playersIn[j], user.user_id, 0, count, false, false);
                        vice_captain = false;
                        count--
                    }
                }
                // update budget
                await patchUserBUDGET(user.user_id, budget);
                // persist budget update in root state
                dispatch(setLatestToTransferring());
                dispatch(removeSpinner());
                showMessage({
                    type: 'success',
                    message: `Transfers successful, you have ${user.transfers} left`
                })
            }
        } catch(e) {
            dispatch(setTransferringBackToLatest());
            flashMyMessage(e, 'danger');
            dispatch(removeSpinner());
        }
    }

    const setModalInput = player => {
        dispatch(setModal({modalSet: 'set1', player: player.player, btnClick: transfer, width: vw(80), height: vh(50)}));
    }

        return ( 
            <View style={screenContainer}>
                <PitchHead type="transfers" update={confirmUpdates}/>
                <Text style={recentGame}>Upcoming Game vs {nextGW.opponent}</Text>
                <ScrollView style={pitchContainer}>
                    <Pitch 
                    type="transfers"
                    playerGraphicClickFcn={setModalInput}
                    team={teamPlayers}
                    />
                    <PlayersList
                    clickFcn={setModalInput}
                    />
                </ScrollView>
                <BottomNav navigation={navigation}/>
            </View>
         );
}
 
export default TransfersScreen;