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

    renderPoints = () => {
        if (this.props.type==='points') {
            return <Text style={playerNamePoints}>{this.points()}</Text>
        }
    }

    points = () => {
        let PG = this.props.playerPG;
        if (PG===undefined) {
            return '0';
        } else if (!PG)  {
            return '';
        } else {
            return this.props.playerPG.total_points;
        }
    }


    horizontalMargin = () => {
        switch(this.props.player.position) {
            // case '2':
            //     return 7;
            // case '3':
            //     return 1;
            // case '4':
            //     return 0;
            default: 
            return 0;
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

    isCaptain = () => {
        const { player, captain, vCaptain, pointsCaptain, pointsVCaptain, otherCaptain, otherVCaptain, type, otherTeamFocus } = this.props;
        if (type==='points') {
            if (otherTeamFocus) {
                if (player.player_id===otherCaptain.player_id) {
                    return 'C';
                } else if (player.player_id===otherVCaptain.player_id) {                
                    return 'VC';
                }
            } else {
                if (player.player_id===pointsCaptain.player_id) {
                    return 'C';
                } else if (player.player_id===pointsVCaptain.player_id) {                
                    return 'VC';
                }
            }
        } else {
            if (player.player_id===captain.player_id) {
                return 'C';
            } else if (player.player_id===vCaptain.player_id) {                
                return 'VC';
            }
        }
        return;
    }

    render() {
        const playerImg = require('../../../images/profile.jpg');
        const subImg = require('../../../images/subIcon.png');
        const { player, type, playerGraphicClickFcn, sub } = this.props;
        console.log('rendering a player graphic');
      return ( 
            <TouchableOpacity onPress={() => playerGraphicClickFcn(player, sub)} style={{...container, marginHorizontal: this.horizontalMargin(), width: this.containerWidth()}}>
                <View style={ subContainer }>
                    <View>
                        <Image source={playerImg} imageStyle={{resizeMode: 'cover'}} style={playerImage}/>
                    </View>
                </View>
                <View>
                    <Text style={playerNamePoints}>{player.last_name} {type!=='transfers' ? <Text style={capText}>{this.isCaptain()}</Text> : null}</Text>
                </View>
                    {this.renderPoints()}
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