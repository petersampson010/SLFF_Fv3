import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
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
import SpinnerOverlay from '../../components/spinner/spinner';
import PitchHead from '../../components/PitchHead/pitchHead';
import { subImage } from '../../components/Modal/style';
import { playerImage, playerImageLarge } from '../../components/PlayerGraphic/style';
import { vh, vw } from 'react-native-expo-viewport-units';
import Button from '../../components/Button/button';


class TransfersScreen extends Component {


    state = {
        positionFilter: '0'
    }

    originalTeam = () => {
        return {
            '1': this.props.teamPlayers.filter(x=>x.position==='1'),
            '2': this.props.teamPlayers.filter(x=>x.position==='2'),
            '3': this.props.teamPlayers.filter(x=>x.position==='3'),
            '4': this.props.teamPlayers.filter(x=>x.position==='4')
        }
    }

    transfer = player => {
        let { position, price } = player;
        const { transferOut, transferIn, user, teamPlayers } = this.props;
        if (this.playerSelected(player)) {
            transferOut(player);
            this.props.closeModal();
        } else {
            if (teamPlayers.filter(x=>x.position===position).length>2) {
                showMessage({
                    message: "Too many players in this position",
                    type: "warning"
                })
            } else {
                transferIn(player);
                this.props.closeModal();

            }
        }
    } 

    playerSelected = player => playerIds(this.props.teamPlayers).includes(player.player_id);

    confirmUpdates = async() => {
        const { teamPlayers, addSpinner, removeSpinner, originalPlayers, user, setLatestToTransferring, setTransferringBackToLatest, budget } = this.props;
        try {
            if (validateTransfers(budget, playersArrayToObj(teamPlayers))) {
                addSpinner()
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
                setLatestToTransferring();
                removeSpinner();
                showMessage({
                    type: 'success',
                    message: `Transfers successful, you have ${user.transfers} left`
                })
            }
        } catch(e) {
            console.warn(e.response.data);
            setTransferringBackToLatest();
            removeSpinner();
            showMessage({
                type: 'danger',
                message: "Fail: This update was not successful, please try again later"
            })
        }
    }

    setModal = player => {
        this.props.setModal({modalSet: 'set1', player, btnClick: this.transfer, width: vw(80), height: vh(50)});
    }

    render() { 
        return ( 
            <View style={screenContainer}>
                {this.props.spinner ? <SpinnerOverlay/> : null}
                <PitchHead type="transfers" update={this.confirmUpdates}/>
                <ScrollView style={pitchContainer}>
                    <Pitch 
                    type="transfers"
                    playerGraphicClickFcn={this.setModal}
                    team={this.props.teamPlayers}
                    />
                    <PlayersList
                    clickFcn={this.setModal}
                    />
                </ScrollView>
                <BottomNav navigation={this.props.navigation}/>
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        teamPlayers: state.stateChanges.updatedNotPersistedTeam.starters.concat(state.stateChanges.updatedNotPersistedTeam.subs),
        clubPlayers: state.club.clubPlayers,
        user: state.user.user,
        budget: state.stateChanges.updatedNotPersistedTeam.budget,
        originalPlayers: state.user.currentTeam.starters.concat(state.user.currentTeam.subs),
        spinner: state.boolDeciders.spinner
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        transferOut: player => dispatch(transferOut(player)),
        transferIn: player => dispatch(transferIn(player)),
        addSpinner: () => dispatch(addSpinner()),
        removeSpinner: () => dispatch(removeSpinner()),
        setTransferringBackToLatest: () => dispatch(setTransferringBackToLatest()),
        setLatestToTransferring: () => dispatch(setLatestToTransferring()),
        setModal: modalObj => dispatch(setModal(modalObj)),
        closeModal: () => dispatch(closeModal())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(TransfersScreen);