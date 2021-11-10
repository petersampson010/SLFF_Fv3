import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';
import { connect } from 'react-redux';
import { setOtherTeamPoints, setTeamPoints } from '../../actions';
import { getTeamPointsInfo } from '../../functions/reusable';
import { headers, labelText, standardText } from '../../styles/textStyle';
import Button from '../button';
import { pitchHead, pitchHeadComp, pitchHeadLeft, pitchHeadRight, teamNameContainer } from './style';


class PitchHead extends Component {
    state = {  }

    comp2 = () => {
        switch(this.props.type) {
            case 'points': 
                return <Text style={labelText}>{this.props.otherTeam ? this.props.otherUser.team_name : this.props.user.team_name}</Text>;
            case 'transfers':
                    return <View>
                        <Text style={labelText}>Transfers Available: {this.props.user.transfers}</Text>
                        <View style={{flexDirection: "row"}}><Text style={labelText}>Budget: </Text><Text style={{...labelText, color: (this.props.budget>=0 ? 'green' : 'red')}}>{Math.floor(this.props.budget*100)/100}m</Text></View>
                    </View>;
            case 'pickTeam':
                return <Text></Text>;
            default: 
                return;
        }
    }

    comp3 = () => {
        const { type, otherTeam, otherUg, ug, update } = this.props;
        switch(type) {
            case 'points': 
                return <Text style={labelText}>{otherTeam ? otherUg.total_points : ug.total_points}</Text>;
            case 'transfers':
                return <Button text='Confirm' func={update} width={vw(30)}/>
            case 'pickTeam':
                return <Button text='Confirm' func={update} width={vw(30)}/>
            default: 
                return;
        }
    }

    comp1 = () => {
        const { otherTeam, otherUser, otherUg, ug, setOtherTeamPoints, user, gwLatest } = this.props;
        switch(this.props.type) {
            case 'points':
                return <Text style={pitchHeadLeft} onPress={() => this.changeGWPoints('L')}>
                    {otherTeam ? (otherUg.gameweek_id>1 ? `GW ${otherUg.gameweek_id-1}` : '') 
                    :
                    (ug.gameweek_id>1 ? `GW ${ug.gameweek_id+1}` : '')}
                </Text>
            default:
                return;
        }
    }

    comp4 = () => {
        const { otherTeam, otherUser, otherUg, ug, setOtherTeamPoints, user, gwLatest } = this.props;
        switch(this.props.type) {
            case 'points':
                return <Text style={pitchHeadRight} onPress={() => this.changeGWPoints('R')}>
                    {otherTeam ? (otherUg.gameweek_id<gwLatest.gameweek_id ? `GW ${otherUg.gameweek_id+1}` : '') 
                    :
                    (ug.gameweek_id<gwLatest.gameweek_id ? `GW ${ug.gameweek_id+1}` : '')}
                </Text>
            default:
                return;
        }
    }

    changeGWPoints = async(direction) => {
        const { otherTeam, otherUser, otherUg, ug, setOtherTeamPoints, setTeamPoints,user } = this.props;
        if (otherTeam) {
            const { starters, subs, records, ugj, allPGJoiners } = await getTeamPointsInfo(otherUser.user_id, direction === 'L' ? otherUg.gameweek_id-1 : otherUg.gameweek_id+1, otherUser);
            setOtherTeamPoints(starters, subs, records, ugj, allPGJoiners, otherUser);
        } else {
            const { starters, subs, ugj } = await getTeamPointsInfo(user.user_id, direction === 'L' ? ug.gameweek_id-1 : ug.gameweek_id+1, otherUser);
            setTeamPoints(starters, subs, ugj);
        }
    }

    render() {
        return (
            <View>
                <View style={teamNameContainer}><Text style={headers}>{this.props.otherTeam ? this.props.otherUser.team_name : this.props.user.team_name}</Text></View>
                <View style={pitchHead}>
                    {this.comp1()}
                    {this.comp2()}
                    {this.comp3()}
                    {this.comp4()}
                </View>
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        ug: state.players.teamPoints.ug,
        user: state.endUser.user,
        budget: state.players.transferring.budget,
        otherUg: state.players.otherTeamPoints.ug,
        otherUser: state.players.otherTeamPoints.user,
        gwLatest: state.gameweek.gwLatest
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setOtherTeamPoints: (starters, subs, records, UGJ, allPGJoiners, team) => dispatch(setOtherTeamPoints(starters, subs, records, UGJ, allPGJoiners, team)),
        setTeamPoints: (starters, subs, UGJ) => dispatch(setTeamPoints(starters, subs, UGJ))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(PitchHead);