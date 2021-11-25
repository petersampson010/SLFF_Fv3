import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { setOtherTeamPoints, setTeamPoints } from '../../actions';
import { getGameweekFromAdminUserIdAndGameweek } from '../../functions/APIcalls';
import { getTeamPointsInfo } from '../../functions/reusable';
import { gwTEXT, headers, labelText, pointsBannerTEXT, pointsTEXT, standardText } from '../../styles/textStyle';
import Button from '../button';
import GWScore from '../gwScore/gwScore';
import pitch from '../Pitch/pitch';
import { gameweekBanner, pickTeamX, pitchHead, pitchHeadComp, pitchHeadLeft, pitchHeadRight, pointsBanner, pointsBannerComp, pointsY, pointsYComp, team_nameContainer, team_nameText, transfersX } from './style';


class PitchHead extends Component {
    state = {  }

    changeGWPoints = async(direction) => {
        const { otherTeam, otherUser, setOtherTeamPoints, setTeamPoints,user } = this.props;
        if (otherTeam) {
            const clubFocusGW = await getGameweekFromAdminUserIdAndGameweek(user.admin_user_id, direction === 'L' ? clubFocusGW.gameweek-1 : clubFocusGW.gameweek+1)
            const { starters, subs, records, otherUGJ, allPGJs } = await getTeamPointsInfo(otherUser.user_id, clubFocusGW.gameweek_id, otherUser);
            setOtherTeamPoints(starters, subs, records, otherUGJ, allPGJs, otherUser, clubFocusGW);
        } else {
            const userFocusGW = await getGameweekFromAdminUserIdAndGameweek(user.admin_user_id, direction === 'L' ? userFocusGW.gameweek-1 : userFocusGW.gameweek+1)
            const { starters, subs, UGJ } = await getTeamPointsInfo(user.user_id, userFocusGW.gameweek_id, otherUser);
            setTeamPoints(starters, subs, UGJ, userFocusGW);
        }
    }

    compX = () => {
        const { type, otherTeam, otherUGJ, UGJ, update } = this.props;
        switch(type) {
            case 'points': 
                return <GWScore/>;
            case 'pickTeam':
                return <View style={pickTeamX}><Button text='Confirm' func={update} width={vw(30)}/></View>;
            case 'transfers':
                return <View style={transfersX}>
                        <View >
                            <Text style={labelText}>Transfers Available: {this.props.user.transfers}</Text>
                            <View style={{flexDirection: "row"}}>
                                <Text style={labelText}>Budget: </Text>
                                <Text style={{...labelText, color: (this.props.budget>=0 ? 'green' : 'red')}}>{Math.floor((this.props.budget*100)/100)}m</Text>
                            </View>
                        </View>
                        <Button text='Confirm' func={update} width={vw(30)}/>
                    </View>
            default: 
                return;
        }
    }

    compY = () => {
        const { type, UGJ, otherUser, otherUGJ, otherTeamFocus, lastGW, userFocusGW, clubFocusGW, user } = this.props;
        switch(type) {
            case 'points':
                console.log(userFocusGW);
                console.log(clubFocusGW);
                console.log(UGJ);
                return <View style={pointsY}>
                    <TouchableOpacity onPress={() => this.changeGWPoints('L')}>
                        <Text style={{...gwTEXT, width: vw(20), textAlign: 'left'}}>{otherTeamFocus ? 
                        (clubFocusGW.gameweek>otherUser.gw_start ? '<--' : '') 
                        :
                        (userFocusGW.gameweek>user.gw_start ? '<--' : '')}</Text>
                    </TouchableOpacity>
                    <Text style={gameweekBanner}>Gameweek {otherTeamFocus ? clubFocusGW.gameweek : userFocusGW.gameweek}</Text>
                    <TouchableOpacity onPress={() => this.changeGWPoints('R')}>
                        <Text style={{...gwTEXT, width: vw(20), textAlign: 'right'}}>{otherTeamFocus ? 
                        (clubFocusGW.gameweek<lastGW.gameweek ? '-->' : '') 
                        :
                        (userFocusGW.gameweek<lastGW.gameweek ? '-->' : '')}</Text>
                    </TouchableOpacity>
                </View>
            default: 
            return;
        }
    }

    compZ = () => {
        const { type, otherTeamFocus, otherUGJ, UGJ } = this.props;
        switch(type) {
            case 'points': 
                return <View style={pointsBanner}>
                    <View style={pointsBannerComp}>
                        <Text style={pointsBannerTEXT}>Points</Text>
                        <Text style={pointsTEXT}>{otherTeamFocus ? otherUGJ.total_points : UGJ.total_points}</Text>
                    </View>
                    <View style={pointsBannerComp}>
                        <Text style={pointsBannerTEXT}>Average</Text>
                        <Text style={pointsTEXT}>XX</Text>
                    </View>
                </View>
        }
    }

    render() {
        return (
            <View>
                <View style={team_nameContainer}><Text style={team_nameText}>{this.props.otherTeamFocus ? this.props.otherUser.team_name : this.props.user.team_name}</Text></View>
            <View style={pitchHead}>
                {this.compY()}
            </View>
                {this.compX()}
                {this.compZ()}
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        UGJ: state.user.focusedGWTeam.UGJ,
        user: state.user.user,
        budget: state.stateChanges.updatedNotPersistedTeam.budget,
        otherUGJ: state.club.focusedGWTeam.UGJ,
        otherUser: state.club.focusedGWTeam.user,
        lastGW: state.club.lastGW,
        otherTeamFocus: state.boolDeciders.otherTeamFocus,
        userFocusGW: state.user.userFocusGW,
        clubFocusGW: state.club.clubFocusGW
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setOtherTeamPoints: (starters, subs, records, UGJ, allPGJs, team) => dispatch(setOtherTeamPoints(starters, subs, records, UGJ, allPGJs, team)),
        setTeamPoints: (starters, subs, UGJ) => dispatch(setTeamPoints(starters, subs, UGJ))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(PitchHead);