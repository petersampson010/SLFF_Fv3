import React, { Component } from 'react';
import { Image, Text, StyleSheet, View, Button, Modal, TouchableHighlight, TouchableOpacity } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { fullName, subOrTransfer } from '../../functions/reusable';
import { box, capText, container, playerImage, subContainer, subImage, subTransferBtn } from './style';
import { vw } from 'react-native-expo-viewport-units';
import { checkBox, headers, playerNamePoints } from '../../styles/textStyle';


const PlayerGraphic = ({player, type, playerGraphicClickFcn, sub, playerPG, num}) => {

    const records = useSelector(state => state.user.records),
    captain = useSelector(state => state.stateChanges.updatedNotPersistedTeam.captain),
    vCaptain = useSelector(state => state.stateChanges.updatedNotPersistedTeam.vCaptain),
    pointsCaptain = useSelector(state => state.user.focusedGWTeam.captain),
    pointsVCaptain = useSelector(state => state.user.focusedGWTeam.vCaptain),
    otherCaptain = useSelector(state => state.club.focusedGWTeam.captain),
    otherVCaptain = useSelector(state => state.club.focusedGWTeam.vCaptain),
    otherTeamFocus = useSelector(state => state.boolDeciders.otherTeamFocus),
    playerImg = require('../../../images/profile.jpg'),
    subImg = require('../../../images/subIcon.png');
    
    const playerNumber = () => {
        if (num) {
            return num;
        } else {
            return '';
        }
    }


    const containerWidth = () => {
        if (sub) {
            return vw(20)
        } else {
            switch(player.position) {
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

    const getPointsAndCaptain = () =>  {
        if (type==='points') {
            let PG = playerPG(player.player_id)
            if (otherTeamFocus) {
                let captainPlayed = playerPG(otherCaptain.player_id).minutes > 0;
                if (player.player_id===otherCaptain.player_id) {
                    return { captainString: 'C', points: 2*PG.total_points }
                } else if (player.player_id===otherVCaptain.player_id) {
                    if (captainPlayed) {
                        return { captainString: 'vc', points: PG.total_points }
                    } else {
                        return { captainString: 'vc', points: 2*PG.total_points }
                    }
                } else {
                    return { captainString: null, points: PG.total_points }
                }
            } else {
                let captainPlayed = playerPG(pointsCaptain.player_id).minutes > 0;
                if (player.player_id===pointsCaptain.player_id) {
                    return { captainString: 'C', points: 2*PG.total_points }
                } else if (player.player_id===pointsVCaptain.player_id) {
                    if (captainPlayed) {
                        return { captainString: 'vc', points: PG.total_points }
                    } else {
                        return { captainString: 'vc', points: 2*PG.total_points }
                    }
                } else {
                    return { captainString: null, points: PG.total_points }
                }
            }
        } else if (type==='pickTeam') {
            if (player.player_id===captain.player_id) {
                return { captainString: 'C', points: null }
            } else if (player.player_id===vCaptain.player_id) {
                return { captainString: 'vc', points: null }
            } else {
                return { captainString: null, points: null }
            }
        }
        return  { captainString: null, points: null };
    }

    const { captainString, points } = getPointsAndCaptain();
      return ( 
            <TouchableOpacity onPress={() => playerGraphicClickFcn({player, pg: playerPG(player.player_id)}, sub)} style={{...container, width: containerWidth()}}>
                <View style={ subContainer }>
                    <View>
                        <Image source={playerImg} imageStyle={{resizeMode: 'cover'}} style={playerImage}/>
                    </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Text numberOfLines={1} style={playerNamePoints}>{player.last_name} </Text>
                    <Text style={capText}>{captainString}</Text>
                </View>
                    <Text style={playerNamePoints}>{points}</Text>
            </TouchableOpacity>
      );
}
 
export default PlayerGraphic;