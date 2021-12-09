import React, { Component } from 'react';
import { Image, Text, StyleSheet, View, Button, Modal, TouchableHighlight, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fullName, subOrTransfer } from '../../functions/reusable';
import { box, capText, container, playerImage, subContainer, subImage, subTransferBtn } from './style';
import { vw } from 'react-native-expo-viewport-units';
import { checkBox, headers, playerNamePoints } from '../../styles/textStyle';


class PlayerGraphic extends Component {
    state = {}

    playerNumber = () => {
        const { num } = this.props;
        if (num) {
            return num;
        } else {
            return '';
        }
    }


    containerWidth = () => {
        if (this.props.sub) {
            return vw(20)
        } else {
            switch(this.props.player.position) {
                case '2':
                    return vw(25);
                case '3':
                    return vw(20);
                case '4':
                    return vw(15);
                default: 
                    return vw(15);
            }
        }
    }

    getPointsAndCaptain = () =>  {
        const { player, captain, vCaptain, pointsCaptain, pointsVCaptain, otherCaptain, otherVCaptain, type, otherTeamFocus, playerPG } = this.props;
        if (type==='points') {
            let PG = playerPG(player.player_id)
            if (otherTeamFocus) {
                let captainPlayed = playerPG(otherCaptain.player_id).minutes > 0;
                if (player.player_id===otherCaptain.player_id) {
                    return { captain: 'C', points: 2*PG.total_points }
                } else if (player.player_id===otherVCaptain.player_id) {
                    if (captainPlayed) {
                        return { captain: 'vc', points: PG.total_points }
                    } else {
                        return { captain: 'vc', points: 2*PG.total_points }
                    }
                } else {
                    return { captain: null, points: PG.total_points }
                }
            } else {
                let captainPlayed = playerPG(pointsCaptain.player_id).minutes > 0;
                if (player.player_id===pointsCaptain.player_id) {
                    return { captain: 'C', points: 2*PG.total_points }
                } else if (player.player_id===pointsVCaptain.player_id) {
                    if (captainPlayed) {
                        return { captain: 'vc', points: PG.total_points }
                    } else {
                        return { captain: 'vc', points: 2*PG.total_points }
                    }
                } else {
                    return { captain: null, points: PG.total_points }
                }
            }
        }
        return;
    }

    render() {
        const playerImg = require('../../../images/profile.jpg');
        const subImg = require('../../../images/subIcon.png');
        const { player, type, playerGraphicClickFcn, sub } = this.props;
        const { captain, points } = this.getPointsAndCaptain();
      return ( 
            <TouchableOpacity onPress={() => playerGraphicClickFcn(player, sub)} style={{...container, width: this.containerWidth()}}>
                <View style={ subContainer }>
                    <View>
                        <Image source={playerImg} imageStyle={{resizeMode: 'cover'}} style={playerImage}/>
                    </View>
                </View>
                <View>
                    <Text style={playerNamePoints}>{player.last_name} {type!=='transfers' ? <Text style={capText}>{captain}</Text> : null}</Text>
                </View>
                    <Text style={playerNamePoints}>{points}</Text>
            </TouchableOpacity>
      );
    }
}

const mapStateToProps = state => {
    return {
        records: state.user.records,
        captain: state.stateChanges.updatedNotPersistedTeam.captain,
        vCaptain: state.stateChanges.updatedNotPersistedTeam.vCaptain,
        pointsCaptain: state.user.focusedGWTeam.captain,
        pointsVCaptain: state.user.focusedGWTeam.vCaptain,
        otherCaptain: state.club.focusedGWTeam.captain,
        otherVCaptain: state.club.focusedGWTeam.vCaptain,
        otherTeamFocus: state.boolDeciders.otherTeamFocus
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(PlayerGraphic);