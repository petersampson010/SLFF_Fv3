import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { connect, useDispatch, useSelector } from 'react-redux';
import { leavingClubPointsPage, setTeamPoints, setTransferringBackToLatest } from '../../actions';
import { getNameOfNavPage, getTeamPointsInfoGWChange } from '../../functions/reusable';
import { $electricBlue } from '../../styles/global';
import { navSectionBackground, navSectionContainer, navText } from './style';
import { getGameweekFromAdminUserIdAndGameweek } from '../../functions/APIcalls';
import { updateStack } from '../../Navigation';


const NavSection = ({ page, navigation }) => {

    const dispatch = useDispatch(), 
    lastGW = useSelector(state => state.club.lastGW),
    lastStarters = useSelector(state => state.user.focusedGWTeam.starters),
    user = useSelector(state => state.user.user),
    otherTeamFocus = useSelector(state => state.boolDeciders.otherTeamFocus);

    const currentPage = () => {
        return getNameOfNavPage(navigation.getState());
    }

    const navigate = async() => {
        if (page==='Points' && lastStarters.length<1) {
            showMessage({
                message: "There are no points available as no games have been played",
                type: 'warning'
            }) 
        } else if (currentPage()===page) {
        } else {
            if (currentPage()==='Points') {
                if (otherTeamFocus) {
                    dispatch(leavingClubPointsPage());
                } else {
                    const newUserFocusGW = await getGameweekFromAdminUserIdAndGameweek(user.admin_user_id, lastGW.gameweek);
                    const { starters, subs, UGJ } = await getTeamPointsInfoGWChange(user.user_id, newUserFocusGW.gameweek_id, false);
                    dispatch(setTeamPoints(starters, subs, UGJ, newUserFocusGW));
                }
            } else {
                dispatch(setTransferringBackToLatest());
            }
            updateStack(navigation, 0, page);
        } 
    }

        return (
            <TouchableOpacity onPress={()=>navigate()}>
                <View style={navSectionBackground}>
                    <View style={{...navSectionContainer, backgroundColor: currentPage()===page ? $electricBlue : null, borderWidth: currentPage(page) ? 1 : 0, opacity: (page==='Points' && !lastStarters) ? 0.4 : 1}}>
                        <Text style={navText}>{page}</Text>
                    </View>
                </View>
            </TouchableOpacity>
         );
}
 
export default NavSection;