import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, Button, Picker, Modal, TouchableHighlight } from 'react-native';
import { getCaptain, getVCaptain, positionString, fullName, playersObjToArray, getRecordId, playersArrayToObj } from '../../functions/reusable';
import { connect } from 'react-redux';
import { addSpinner, removeSpinner, setLatestToTransferring, setTransferringBackToLatest, subIn, subOut } from '../../actions';
import {vw, vh} from 'react-native-expo-viewport-units';
import { validatePickTeam } from '../../functions/validity';
import _ from 'lodash';
import { patchRecordSUBS, patchRecordCAPTAINS } from '../../functions/APIcalls';
import { showMessage } from 'react-native-flash-message';
import Pitch from '../../components/Pitch/pitch';
import BottomNav from '../../components/bottomNav/bottomNav';
import { screenContainer } from '../../styles/global';
import PitchHead from '../../components/PitchHead/pitchHead';



class PickTeamScreen extends Component {


    transfer = player => {
        const { subs, subIn, subOut } = this.props;
        if (subs.includes(player)) {
            subIn(player)
        } else {
            subOut(player);
        }
    }

    validateTeam = () => {
        if (validatePickTeam(playersArrayToObj(this.props.starters))) {
            this.updateTeam();
        }
    }
        
    updateTeam = async() => {
        const { starters, subs, originalStarters, originalSubs, records, captain, vCaptain, originalCaptain, originalVCaptain, addSpinner, removeSpinner, setLatestToTransferring, setTransferringBackToLatest } = this.props;
        let startToSub = _.difference(originalStarters, starters);
        console.log(startToSub);
        let subToStart = _.difference(originalSubs, subs);
        console.log(subToStart);
        try {
            addSpinner();
            for (let i=0;i<startToSub.length;i++) {
                await patchRecordSUBS(true, startToSub[i].player_id);
                await patchRecordSUBS(false, subToStart[i].player_id);
            }
            if (originalCaptain!==captain) {
                console.log('changing captain');
                await patchRecordCAPTAINS(true, false, getRecordId(captain, records));
                await patchRecordCAPTAINS(false, false, getRecordId(originalCaptain, records));
            } 
            if (originalVCaptain!==vCaptain) {
                console.log('changing vice captain');
                await patchRecordCAPTAINS(false, true, getRecordId(vCaptain, records));
                await patchRecordCAPTAINS(false, false, getRecordId(originalVCaptain, records));
            }
            setLatestToTransferring();
            removeSpinner();
            showMessage({
                type: 'success',
                message: `Team selection successful`
            })
        } catch(e) {
            console.warn(e);
            setTransferringBackToLatest();
            removeSpinner();
            showMessage({
                type: 'danger',
                message: "Fail: This update was not successful, please try again later"
            })
        }
    }

    teamChange = () => {
        const { subs, originalStarters, originalSubs, records, captain, vCaptain } = this.props;
        return (originalSubs===subs && 
        getCaptain(originalStarters, records)===captain &&
        getVCaptain(originalStarters, records)===vCaptain
        ) ?
        false : true;
    }

        
    render() { 
        return (
            <View style={screenContainer}>
                <PitchHead type='pickTeam' update={this.validateTeam}/>
                <ScrollView>
                    <Pitch
                    type="pickTeam"
                    modalType="pickTeam"
                    update={this.validateTeam}
                    clickFcn={this.transfer}
                    team={this.props.starters}
                    subs={this.props.subs}
                    />
                </ScrollView>
                <BottomNav navigation={this.props.navigation}/>
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        subs: state.stateChanges.updatedNotPersistedTeam.subs,
        starters: state.stateChanges.updatedNotPersistedTeam.starters,
        originalSubs: state.user.currentTeam.subs,
        originalStarters: state.user.currentTeam.starters,
        records: state.user.records,
        captain: state.stateChanges.updatedNotPersistedTeam.captain,
        vCaptain: state.stateChanges.updatedNotPersistedTeam.vCaptain,
        originalCaptain: state.user.currentTeam.captain,
        originalVCaptain: state.user.currentTeam.vCaptain,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        subIn: player => dispatch(subIn(player)),
        subOut: player => dispatch(subOut(player)),
        setTransferringBackToLatest: () => dispatch(setTransferringBackToLatest()),
        setLatestToTransferring: () => dispatch(setLatestToTransferring()),
        addSpinner: () => dispatch(addSpinner()),
        removeSpinner: () => dispatch(removeSpinner())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(PickTeamScreen);