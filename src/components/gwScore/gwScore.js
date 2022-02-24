import React, { Component } from 'react';
import { connect, useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import { headers, labelText, scoreTeamsTEXT, scoreTEXT, standardText } from '../../styles/textStyle';
import { headerText } from '../header/style';
import { team_nameContainer } from '../PitchHead/style';
import { vw } from 'react-native-expo-viewport-units';
import { gwScoreContainer } from './style';
import { inputFieldContainerInLine, scoreInput } from '../../styles/input';

const GWScore = ({ width, backgroundColor }) => {

    const adminUser = useSelector(state => state.club.adminUser);
    const lastGW = useSelector(state => state.club.lastGW);
    const otherTeamFocus = useSelector(state => state.boolDeciders.otherTeamFocus);
    const UGJFocus = useSelector(state => state.club.focusedGWTeam.UGJ);
    const userFocusGW = useSelector(state => state.user.userFocusGW);
    const clubFocusGW = useSelector(state => state.club.clubFocusGW);

        let GW = otherTeamFocus ? 
        (clubFocusGW ? clubFocusGW : lastGW) :
        (userFocusGW ? userFocusGW : lastGW);
        return otherTeamFocus ?
        <View style={{...gwScoreContainer, width, backgroundColor}}> 
            <Text style={{...scoreTeamsTEXT, width: vw(36), textAlign: 'right'}}>{adminUser.club_name}</Text>
            <Text style={{...scoreTEXT, width: vw(20), textAlign: 'center'}}>{GW.score}</Text>
            <Text style={{...scoreTeamsTEXT, width: vw(36), textAlign: 'left'}}>{GW.opponent}</Text>
        </View>
        :
        <View style={{...gwScoreContainer, width, backgroundColor}}> 
            <Text style={{...scoreTeamsTEXT, width: vw(36), textAlign: 'right'}}>{adminUser.club_name}</Text>
            <Text style={{...scoreTEXT, width: vw(20), textAlign: 'center'}}>{GW.score}</Text>
            <Text style={{...scoreTeamsTEXT, width: vw(36), textAlign: 'left'}}>{GW.opponent}</Text>
        </View>
}
 
export default GWScore;