import React, { Component } from 'react';
import Header from '../../components/header/header';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { patchUserBUDGET, postRecord } from '../../functions/APIcalls';
import Pitch from '../../components/Pitch/pitch';
import PlayersList from '../../components/playersList/playersList';
import { showMessage } from 'react-native-flash-message';
import { PlayerIds, allSelectedPlayers } from '../../functions/reusable';
import { screenContainer } from '../../styles/global';
import { pitchContainer } from '../PitchScreens/style';
import { nts2Login, addSpinner, removeSpinner, setLatestToTransferring, setTransferringBackToLatest, transferIn, transferOut } from '../../actions';
import { addSubAttributeToPlayersArray, playerIds, fullName, getRecordId, playersArrayToObj, playersObjToArray, positionString } from '../../functions/reusable';
import { popToStack, resetStackAndGoHome, updateStack } from '../../Navigation';
import { StackActions, NavigationAction } from '@react-navigation/routers';
import { CommonActions } from '@react-navigation/native';
import PitchHead from '../../components/PitchHead/pitchHead';
import { validateTransfers } from '../../functions/validity';
import globalConfig from '../../config/globalConfig.json';



class ntsScreen2 extends Component {
    state = {}

    transfer = player => {
        let { position, price } = player;
        const { transferOut, transferIn, user, teamPlayers } = this.props;
        if (this.playerSelected(player)) {
            transferOut(player);
        } else {
            if (teamPlayers.filter(x=>x.position===position).length>2) {
                showMessage({
                    message: "Too many players in this position",
                    type: "warning"
                })
            } else {
                transferIn(player);
            }
        }
    } 

    playerSelected = player => playerIds(this.props.teamPlayers).includes(player.player_id);


    select = player => {
        const { team } = this.state;
        let newBudget = this.state.budget - player.price;
        if (team.length>7) {
            showMessage({
                message: "too many players, please deselect a player before adding anymore",
                type: "danger"
            });
        } else {
            switch(player.position) {
                case '1':
                    if (team[1].length>0) {
                        showMessage({
                            message: "Keeper already selected",
                            description: "If you need a sub-section of error",
                            type: "warning"
                        })
                    } else {
                        this.setState({...this.state, team: {...this.state.team, 1: [...this.state.team[1], player]}, budget: newBudget})
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
                        this.setState({...this.state, team: {...this.state.team, 2: [...this.state.team[2], player]}, budget: newBudget})
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
                        this.setState({...this.state, team: {...this.state.team, 3: [...this.state.team[3], player]}, budget: newBudget})
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
                        this.setState({...this.state, team: {...this.state.team, 4: [...this.state.team[4], player]}, budget: newBudget})
                    };
                    break;
                default: 
                    break; 
            }
        }
    }

    deSelect = player => {
        let { team } = this.state
        this.setState({...this.state, budget: this.state.budget + player.price, team: {...team, [player.position]: team[player.position].filter(x=>x.player_id!==player.player_id)}});
    }

    submitTeam = async() => {
        const { teamPlayers, budget, addSpinner, removeSpinner, user, navigation, nts2Login } = this.props
        const teamPlayersObj = playersArrayToObj(teamPlayers);
        try {
            addSpinner();
            if (validateTransfers(budget, teamPlayersObj)) {
                    if (teamPlayersObj['1'].length===1) {
                        let records = [];
                        for (let i=0;i<globalConfig.numberOfPlayers;i++) {
                            let record = await postRecord(teamPlayers[i], user.user_id, i);
                            records.push(record);
                        }
                        let returnUser = await patchUserBUDGET(
                        budget, user.user_id);
                        nts2Login(returnUser, teamPlayers.slice(0,globalConfig.numberOfStarters), teamPlayers.slice(globalConfig.numberOfStarters-globalConfig.numberOfPlayers), records);
                        updateStack(navigation, 0, 'Home');
                    } else {
                        showMessage({
                            message: "You need 1 Goalkeeper selected",
                            type: "danger"
                        });
                    }
            }
            removeSpinner();
        } catch(e) {
            showMessage({
                message: "Fail: Network Issue, please try again later",
                type: "danger"
              });
            removeSpinner();
            console.warn(e);
        }
    }

    render() { 
        return ( 
            <View style={screenContainer}>
                <PitchHead type='transfers' update={this.submitTeam}/>
                <ScrollView style={pitchContainer}>
                    {/* <Header style={styles.header} title='Team Selection'/> */}
                    <Pitch
                    update={this.submitTeam}
                    clickFcn={this.transfer}
                    type='transfers'
                    modalType="playerProfile"
                    team={this.props.teamPlayers}
                    />
                    <PlayersList
                    clickFcn={this.transfer}
                    modalType="playerProfile"
                    />
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.endUser.user,
        teamPlayers: state.players.transferring.starters.concat(state.players.transferring.subs),
        budget: state.players.transferring.budget
    }
}

const mapDispatchToProps = dispatch => {
    return {
        nts2Login: (user, starters, subs, records) => dispatch(nts2Login(user, starters, subs, records)),
        transferOut: player => dispatch(transferOut(player)),
        transferIn: player => dispatch(transferIn(player)),
        addSpinner: () => dispatch(addSpinner()),
        removeSpinner: () => dispatch(removeSpinner()),
        setTransferringBackToLatest: () => dispatch(setTransferringBackToLatest()),
        setLatestToTransferring: () => dispatch(setLatestToTransferring())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ntsScreen2);