import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { headers, labelText, scoreTeamsTEXT, scoreTEXT, standardText } from '../../styles/textStyle';
import { headerText } from '../header/style';
import { team_nameContainer } from '../PitchHead/style';
import { vw } from 'react-native-expo-viewport-units';
import { gwScoreContainer } from './style';
import { inputFieldContainerInLine, scoreInput } from '../../styles/input';

class GWScore extends Component {
    state = {  }

    render() { 
        const { adminUser, lastGW, clubFocusGW, userFocusGW, otherTeamFocus, width, backgroundColor } = this.props;
        let GW = otherTeamFocus ? 
        (clubFocusGW ? clubFocusGW : lastGW) :
        (userFocusGW ? userFocusGW : lastGW);
        return otherTeamFocus ?
        <View style={{...gwScoreContainer, width, backgroundColor}}> 
            <Text style={{...scoreTeamsTEXT, width: vw(39), textAlign: 'right'}}>{adminUser.club_name}</Text>
            <Text style={{...scoreTEXT, width: vw(14), textAlign: 'center'}}>{GW.score}</Text>
            <Text style={{...scoreTeamsTEXT, width: vw(39), textAlign: 'left'}}>{GW.opponent}</Text>
        </View>
        :
        <View style={{...gwScoreContainer, width, backgroundColor}}> 
            <Text style={{...scoreTeamsTEXT, width: vw(39), textAlign: 'right'}}>{adminUser.club_name}</Text>
            <Text style={{...scoreTEXT, width: vw(14), textAlign: 'center'}}>{GW.score}</Text>
            <Text style={{...scoreTeamsTEXT, width: vw(39), textAlign: 'left'}}>{GW.opponent}</Text>
        </View>
    }
}

const mapStateToProps = state => {
    return {
        adminUser: state.club.adminUser,
        lastGW: state.club.lastGW,
        UGJFocus: state.club.focusedGWTeam.UGJ,
        otherTeamFocus: state.boolDeciders.otherTeamFocus,
        userFocusGW: state.user.userFocusGW,
        clubFocusGW: state.club.clubFocusGW
    }
}
 
export default connect(mapStateToProps)(GWScore);