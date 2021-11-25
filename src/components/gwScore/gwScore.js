import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { headers, labelText, scoreTeamsTEXT, scoreTEXT } from '../../styles/textStyle';
import { headerText } from '../header/style';
import { team_nameContainer } from '../PitchHead/style';
import { vw } from 'react-native-expo-viewport-units';
import { gwScoreContainer } from './style';

class GWScore extends Component {
    state = {  }

    render() { 
        const { adminUser, lastGW, otherTeamFocus, UGJFocus } = this.props;
        console.log('other UGJ');
        console.log(UGJFocus);
        return otherTeamFocus ?
        <View style={gwScoreContainer}> 
            <Text style={{...scoreTeamsTEXT, width: vw(39), textAlign: 'right'}}>{adminUser.club_name}</Text>
            <Text style={{...scoreTEXT, width: vw(14), textAlign: 'center'}}>{lastGW.score}</Text>
            <Text style={{...scoreTeamsTEXT, width: vw(39), textAlign: 'left'}}>{lastGW.opponent}</Text>
        </View>
        :
        <View style={gwScoreContainer}> 
            <Text style={{...scoreTeamsTEXT, width: vw(39), textAlign: 'right'}}>{adminUser.club_name}</Text>
            <Text style={{...scoreTEXT, width: vw(14), textAlign: 'center'}}>{lastGW.score}</Text>
            <Text style={{...scoreTeamsTEXT, width: vw(39), textAlign: 'left'}}>{lastGW.opponent}</Text>
        </View>
    }
}

const mapStateToProps = state => {
    return {
        adminUser: state.club.adminUser,
        lastGW: state.club.lastGW,
        UGJFocus: state.club.focusedGWTeam.UGJ,
        otherTeamFocus: state.boolDeciders.otherTeamFocus
    }
}
 
export default connect(mapStateToProps)(GWScore);