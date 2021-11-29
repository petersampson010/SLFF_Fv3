import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { changeGWOther, setTeamPoints } from '../../actions';
import { getGameweekFromAdminUserIdAndGameweek } from '../../functions/APIcalls';
import { getTeamPointsInfo, getTeamPointsInfoGWChange } from '../../functions/reusable';
import { gwTEXT, headers, labelText, pointsBannerTEXT, pointsTEXT, standardText } from '../../styles/textStyle';
import Button from '../button';
import GWScore from '../gwScore/gwScore';
import pitch from '../Pitch/pitch';
import { gameweekBanner, gwArrow, gwText, pickTeamX, pitchHead, pitchHeadComp, pitchHeadLeft, pitchHeadRight, pointsBanner, pointsBannerComp, pointsY, pointsYComp, team_nameContainer, team_nameText, transfersX } from './style';


class PitchHead extends Component {
    state = { 

    }

    changeGWPoints = async(direction) => {
        const { otherTeamFocus, otherUser, changeGWOther, setTeamPoints, user, userFocusGW, clubFocusGW, lastGW } = this.props;
        let GW = otherTeamFocus ? 
        (clubFocusGW ? clubFocusGW : lastGW) :
        (userFocusGW ? userFocusGW : lastGW);
        if (otherTeamFocus) {
            const newClubFocusGW = await getGameweekFromAdminUserIdAndGameweek(user.admin_user_id, direction === 'L' ? GW.gameweek-1 : GW.gameweek+1)
            const { starters, subs, records, otherUGJ } = await getTeamPointsInfoGWChange(otherUser.user_id, newClubFocusGW.gameweek_id, otherTeamFocus);
            console.log('above undefined');
            changeGWOther(starters, subs, otherUGJ, newClubFocusGW);
        } else {
            const newUserFocusGW = await getGameweekFromAdminUserIdAndGameweek(user.admin_user_id, direction === 'L' ? GW.gameweek-1 : GW.gameweek+1);
            const { starters, subs, UGJ } = await getTeamPointsInfoGWChange(user.user_id, newUserFocusGW.gameweek_id, otherTeamFocus);
            setTeamPoints(starters, subs, UGJ, newUserFocusGW);
        }
    }

    compX = () => {
        const { type, update } = this.props;
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
                let GW = otherTeamFocus ? 
                (clubFocusGW ? clubFocusGW : lastGW) :
                (userFocusGW ? userFocusGW : lastGW);
                let arrowLeft = otherTeamFocus ? GW.gameweek>otherUser.gw_start : GW.gameweek>user.gw_start;
                let arrowRight = GW.gameweek<lastGW.gameweek;
                console.log('arrow left: ' + arrowLeft);
                console.log('arrow right: ' + arrowRight);
                return <View style={gameweekBanner}>
                    <TouchableOpacity style={{...gwArrow, borderBottomLeftRadius: 7, borderTopLeftRadius: 7}} onPress={arrowLeft ? () => this.changeGWPoints('L') : null}>
                        <Text style={{...gwTEXT, textAlign: 'left'}}>{arrowLeft ? '<--' : ''}</Text>
                    </TouchableOpacity>
                    <View style={gwText}><Text style={gwTEXT}>Gameweek {GW.gameweek}</Text></View>
                    <TouchableOpacity style={{...gwArrow, borderBottomRightRadius: 7, borderTopRightRadius: 7}} onPress={arrowRight ? () => this.changeGWPoints('R') : null}>
                        <Text style={{...gwTEXT, textAlign: 'right'}}>{arrowRight ? '-->' : ''}</Text>
                    </TouchableOpacity>
                </View>
            default: 
            return;
        }
    }

    // style={{width: vw(20), height: vh(10), paddingVertical: vh(1) backgroundColor: 'white'}}

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
                {this.compY()}
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
        changeGWOther: (starters, subs, UGJ, clubFocusGW) => dispatch(changeGWOther(starters, subs, UGJ, clubFocusGW)),
        setTeamPoints: (starters, subs, UGJ, newUserFocusGW) => dispatch(setTeamPoints(starters, subs, UGJ, newUserFocusGW))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(PitchHead);