import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';
import { TouchableOpacity } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { changeGWOther, setTeamPoints } from '../../actions';
import { getGameweekFromAdminUserIdAndGameweek } from '../../functions/APIcalls';
import { getTeamPointsInfo, getTeamPointsInfoGWChange } from '../../functions/reusable';
import { gwTEXT, headers, labelText, pointsBannerTEXT, pointsTEXT, standardText } from '../../styles/textStyle';
import Button from '../Button/button';
import GWScore from '../gwScore/gwScore';
import pitch from '../Pitch/pitch';
import { gameweekBanner, gwArrow, gwText, pickTeamX, pitchHead, pitchHeadComp, pitchHeadLeft, pitchHeadRight, pointsBanner, pointsBannerComp, pointsY, pointsYComp, team_nameContainer, team_nameText, transfersX } from './style';


const PitchHead = ({ type, update }) => {

    const UGJ = useSelector(state => state.user.focusedGWTeam.UGJ),
    user = useSelector(state => state.user.user),
    budget = useSelector(state => state.stateChanges.updatedNotPersistedTeam.budget),
    otherUGJ = useSelector(state => state.club.focusedGWTeam.UGJ),
    otherUser = useSelector(state => state.club.focusedGWTeam.user),
    lastGW = useSelector(state => state.club.lastGW),
    otherTeamFocus = useSelector(state => state.boolDeciders.otherTeamFocus),
    userFocusGW = useSelector(state => state.user.userFocusGW),
    clubFocusGW = useSelector(state => state.club.clubFocusGW),
    changeGWOtherFUNC = useDispatch((starters, subs, UGJ, clubFocusGW) => changeGWOther(starters, subs, UGJ, clubFocusGW)),
    setTeamPointsFUNC = useDispatch((starters, subs, UGJ, newUserFocusGW) => setTeamPoints(starters, subs, UGJ, newUserFocusGW))

    const changeGWPoints = async(direction) => {
        let GW = otherTeamFocus ? 
        (clubFocusGW ? clubFocusGW : lastGW) :
        (userFocusGW ? userFocusGW : lastGW);
        if (otherTeamFocus) {
            const newClubFocusGW = await getGameweekFromAdminUserIdAndGameweek(user.admin_user_id, direction === 'L' ? GW.gameweek-1 : GW.gameweek+1)
            const { starters, subs, records, otherUGJ } = await getTeamPointsInfoGWChange(otherUser.user_id, newClubFocusGW.gameweek_id, otherTeamFocus);
            changeGWOtherFUNC(starters, subs, otherUGJ, newClubFocusGW);
        } else {
            const newUserFocusGW = await getGameweekFromAdminUserIdAndGameweek(user.admin_user_id, direction === 'L' ? GW.gameweek-1 : GW.gameweek+1);
            const { starters, subs, UGJ } = await getTeamPointsInfoGWChange(user.user_id, newUserFocusGW.gameweek_id, otherTeamFocus);
            setTeamPointsFUNC(starters, subs, UGJ, newUserFocusGW);
        }
    }

    const compX = () => {
        switch(type) {
            case 'points': 
                return <GWScore/>;
            case 'pickTeam':
                return <View style={pickTeamX}><Button clickable text='Confirm' func={update} width={vw(30)}/></View>;
            case 'transfers':
                return <View style={transfersX}>
                        <View >
                            <Text style={labelText}>Transfers Available: {user.transfers}</Text>
                            <View style={{flexDirection: "row"}}>
                                <Text style={labelText}>Budget: </Text>
                                <Text style={{...labelText, color: (budget>=0 ? 'green' : 'red')}}>{Math.floor((budget*100)/100)}m</Text>
                            </View>
                        </View>
                        <Button clickable text='Confirm' func={update} width={vw(30)}/>
                    </View>
            default: 
                return;
        }
    }

    const compY = () => {
        switch(type) {
            case 'points':
                let GW = otherTeamFocus ? 
                (clubFocusGW ? clubFocusGW : lastGW) :
                (userFocusGW ? userFocusGW : lastGW);
                let arrowLeft = otherTeamFocus ? GW.gameweek>otherUser.gw_start : GW.gameweek>user.gw_start;
                let arrowRight = GW.gameweek<lastGW.gameweek;
                return <View style={gameweekBanner}>
                    <TouchableOpacity style={{...gwArrow, borderBottomLeftRadius: 7, borderTopLeftRadius: 7}} onPress={arrowLeft ? () => changeGWPoints('L') : null}>
                        <Text style={{...gwTEXT, textAlign: 'left'}}>{arrowLeft ? '<--' : ''}</Text>
                    </TouchableOpacity>
                    <View style={gwText}><Text style={gwTEXT}>Gameweek {GW.gameweek}</Text></View>
                    <TouchableOpacity style={{...gwArrow, borderBottomRightRadius: 7, borderTopRightRadius: 7}} onPress={arrowRight ? () => changeGWPoints('R') : null}>
                        <Text style={{...gwTEXT, textAlign: 'right'}}>{arrowRight ? '-->' : ''}</Text>
                    </TouchableOpacity>
                </View>
            default: 
            return;
        }
    }

    const compZ = () => {
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

        return (
            <View>
                <View style={team_nameContainer}><Text style={team_nameText}>{otherTeamFocus ? otherUser.team_name : user.team_name}</Text></View>
                {compY()}
                {compX()}
                {compZ()}
            </View>
         );
}
 
export default PitchHead;