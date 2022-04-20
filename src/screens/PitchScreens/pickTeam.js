import React, { Component, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { getCaptain, getVCaptain, positionString, fullName, playersObjToArray, getRecordId, playersArrayToObj } from '../../functions/reusable';
import { connect, useDispatch, useSelector } from 'react-redux';
import { addSpinner, closeModal, removeSpinner, setCaptain, setLatestToTransferring, setModal, setTransferringBackToLatest, setVCaptain, subIn, subOut } from '../../actions';
import {vw, vh} from 'react-native-expo-viewport-units';
import { validatePickTeam } from '../../functions/validity';
import _ from 'lodash';
import { patchRecordSUBS, patchRecordCAPTAINS, patchRecordToCAPTAIN, patchRecordRemoveCAPTAIN, getnextGWweekFromAdminUserId } from '../../functions/APIcalls';
import { showMessage } from 'react-native-flash-message';
import Pitch from '../../components/Pitch/pitch';
import BottomNav from '../../components/bottomNav/bottomNav';
import { screenContainer } from '../../styles/global';
import PitchHead from '../../components/PitchHead/pitchHead';
import GWScore from '../../components/gwScore/gwScore';
import { $inputBlue } from '../../styles/global';
import { recentGame } from '../home/style';
import { clubNameTEXT } from '../../styles/textStyle';



const PickTeamScreen = ({navigation}) => {

    const dispatch = useDispatch(),
    user = useSelector(state => state.user.user),
    subs = useSelector(state => state.stateChanges.updatedNotPersistedTeam.subs),
    starters = useSelector(state => state.stateChanges.updatedNotPersistedTeam.starters),
    originalSubs = useSelector(state => state.user.currentTeam.subs),
    originalStarters = useSelector(state => state.user.currentTeam.starters),
    records = useSelector(state => state.user.records),
    captain = useSelector(state => state.stateChanges.updatedNotPersistedTeam.captain),
    vCaptain = useSelector(state => state.stateChanges.updatedNotPersistedTeam.vCaptain),
    originalCaptain = useSelector(state => state.user.currentTeam.captain),
    originalVCaptain = useSelector(state => state.user.currentTeam.vCaptain),
    nextGW = useSelector(state => state.club.nextGW);

    const transfer = player => {
        let subsIds = subs.map(s => s.player_id);
        if (subsIds.includes(player.player_id)) {
            dispatch(subIn(player));
            dispatch(closeModal());
        } else {
            if (player.player_id===captain.player_id || player.player_id===vCaptain.player_id) {
                showMessage({
                    type: 'warning',
                    message: `Cannot sub out a captain`
                })
            } else {
                dispatch(subOut(player));
                dispatch(closeModal());
            }
        }
    }

    const validateTeam = () => {
        if (validatePickTeam(playersArrayToObj(starters))) {
            updateTeam();
        }
    }
        
    const updateTeam = async() => {
        let startToSub = _.difference(originalStarters, starters);
        let subToStart = _.difference(originalSubs, subs);
        try {
            dispatch(addSpinner());
            for (let i=0;i<startToSub.length;i++) {
                await patchRecordSUBS(true, startToSub[i].player_id, user.user_id);
                await patchRecordSUBS(false, subToStart[i].player_id, user.user_id);
            }
            if (originalCaptain.player_id!==captain.player_id) {
                await patchRecordRemoveCAPTAIN('captain', user.user_id);
                await patchRecordToCAPTAIN('captain', user.user_id, captain.player_id);
            } 
            if (originalVCaptain.player_id!==vCaptain.player_id) {
                await patchRecordRemoveCAPTAIN('vice_captain', user.user_id);
                await patchRecordToCAPTAIN('vice_captain', user.user_id, vCaptain.player_id);
            }
            dispatch(setLatestToTransferring());
            dispatch(removeSpinner());
            showMessage({
                type: 'success',
                message: `Team selection successful`
            })
        } catch(e) {
            console.warn(e.response.data);
            dispatch(setTransferringBackToLatest());
            dispatch(removeSpinner());
            showMessage({
                type: 'danger',
                message: "Fail: This update was not successful, please try again later"
            })
        }
    }

    const teamChange = () => {
        return (originalSubs===subs && 
        getCaptain(originalStarters, records)===captain &&
        getVCaptain(originalStarters, records)===vCaptain
        ) ?
        false : true;
    }

    const setModalInput = (player, sub) => {
        dispatch(setModal({modalSet: 'set2', player: {...player.player, sub}, width: vw(80), height: vh(60), btnClick: transfer}))
    }



        return (
            <View style={screenContainer}>
                <PitchHead type='pickTeam' update={validateTeam}/>
                {nextGW ? <Text style={recentGame}>Upcoming Game vs {nextGW.opponent}</Text> : <Text style={recentGame}>Your club currently has no games upcoming</Text>}
                <ScrollView>
                    <Pitch
                    type="pickTeam"
                    playerGraphicClickFcn={setModalInput}
                    team={starters}
                    subs={subs}
                    />
                </ScrollView>
                <BottomNav navigation={navigation}/>
            </View>
         );
}
 
export default PickTeamScreen;