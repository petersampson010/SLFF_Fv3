import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { getCaptain, getVCaptain, positionString, fullName, playersObjToArray, getRecordId, playersArrayToObj } from '../../functions/reusable';
import { connect } from 'react-redux';
import { addSpinner, closeModal, removeSpinner, setCaptain, setLatestToTransferring, setModal, setTransferringBackToLatest, setVCaptain, subIn, subOut } from '../../actions';
import {vw, vh} from 'react-native-expo-viewport-units';
import { validatePickTeam } from '../../functions/validity';
import _ from 'lodash';
import { patchRecordSUBS, patchRecordCAPTAINS } from '../../functions/APIcalls';
import { showMessage } from 'react-native-flash-message';
import Pitch from '../../components/Pitch/pitch';
import BottomNav from '../../components/bottomNav/bottomNav';
import { screenContainer } from '../../styles/global';
import PitchHead from '../../components/PitchHead/pitchHead';
import Button from '../../components/Button/button';
import { set2 } from '../../components/Modal/modalSetting';



class PickTeamScreen extends Component {


    transfer = player => {
        const { subs, subIn, subOut, closeModal, captain, vCaptain } = this.props;
        if (subs.includes(player)) {
            subIn(player);
            closeModal();
        } else {
            if (player.player_id===captain.player_id || player.player_id===vCaptain.player_id) {
                showMessage({
                    type: 'warning',
                    message: `Cannot sub out a captain`
                })
            } else {
                subOut(player);
                closeModal();
            }
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
        let subToStart = _.difference(originalSubs, subs);
        try {
            addSpinner();
            for (let i=0;i<startToSub.length;i++) {
                await patchRecordSUBS(true, startToSub[i].player_id);
                await patchRecordSUBS(false, subToStart[i].player_id);
            }
            if (originalCaptain!==captain) {
                await patchRecordCAPTAINS(true, false, getRecordId(captain, records));
                await patchRecordCAPTAINS(false, false, getRecordId(originalCaptain, records));
            } 
            if (originalVCaptain!==vCaptain) {
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

    setCaptain = player => {
        const { vCaptain, setCaptain } = this.props;
        if (vCaptain===player) {
            showMessage({
                message: "Player is already a captain",
                type: 'warning'
            })
        } else {
            setCaptain(player, <View>
                <Button text='Captain' func={()=>setCaptain(player)} width={vw(35)}/>
                <Button clickable={player.player_id!==vCaptain.player_id} text='Vice Captain' func={()=>setVCaptain(player)} width={vw(35)}/>
            </View>);
        }
    }

    setVCaptain = player => {
        const { captain, setVCaptain } = this.props;
        if (captain===player) {
            showMessage({
                message: "Player is already a captain",
                type: 'warning'
            })
        } else {
            setVCaptain(player, <View>
                <Button clickable={player.player_id!==captain.player_id} text='Captain' func={()=>setCaptain(player)} width={vw(35)}/>
                <Button text='Vice Captain' func={()=>setVCaptain(player)} width={vw(35)}/>
            </View>);
            // this.props.setModal(set2(player, this.transfer, captain, player, this.setCaptain, this.setVCaptain))
        }
    }

    setModal = (player, sub) => {
        const { captain, vCaptain, setModal } = this.props;
        setModal(set2(player, sub, this.transfer, captain, vCaptain, this.setCaptain, this.setVCaptain))
    }

    render() { 
        console.log(this.props.starters);
        return (
            <View style={screenContainer}>
                <PitchHead type='pickTeam' update={this.validateTeam}/>
                <ScrollView>
                    <Pitch
                    type="pickTeam"
                    playerGraphicClickFcn={this.setModal}
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
        originalVCaptain: state.user.currentTeam.vCaptain
    }
}

const mapDispatchToProps = dispatch => {
    return {
        subIn: player => dispatch(subIn(player)),
        subOut: player => dispatch(subOut(player)),
        setTransferringBackToLatest: () => dispatch(setTransferringBackToLatest()),
        setLatestToTransferring: () => dispatch(setLatestToTransferring()),
        addSpinner: () => dispatch(addSpinner()),
        removeSpinner: () => dispatch(removeSpinner()),
        setModal: (modalObj) => dispatch(setModal(modalObj)),
        closeModal: () => dispatch(closeModal()),
        setCaptain: (player, jsx) => dispatch(setCaptain(player, jsx)),
        setVCaptain: (player, jsx) => dispatch(setVCaptain(player, jsx))

    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(PickTeamScreen);