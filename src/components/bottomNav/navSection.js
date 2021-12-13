import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { connect } from 'react-redux';
import { leavingClubPointsPage, setTeamPoints, setTransferringBackToLatest } from '../../actions';
import { getNameOfNavPage, getTeamPointsInfoGWChange } from '../../functions/reusable';
import { $electricBlue } from '../../styles/global';
import { navSectionBackground, navSectionContainer, navText } from './style';
import { getGameweekFromAdminUserIdAndGameweek } from '../../functions/APIcalls';
import { updateStack } from '../../Navigation';


class NavSection extends Component {
    state = {  }

    currentPage = () => {
        return getNameOfNavPage(this.props.navigation.getState());
    }

    navigate = async() => {
        const { page, setTransferringBackToLatest, navigation, lastStarters, leavingClubPointsPage, otherTeamFocus, lastGW, user, setTeamPoints } = this.props;
        if (page==='Points' && lastStarters.length<1) {
            showMessage({
                message: "There are no points available as no games have been played",
                type: 'warning'
            }) 
        } else if (this.currentPage()===page) {
        } else {
            if (this.currentPage()==='Points') {
                if (otherTeamFocus) {
                    leavingClubPointsPage();
                } else {
                    const newUserFocusGW = await getGameweekFromAdminUserIdAndGameweek(user.admin_user_id, lastGW.gameweek);
                    const { starters, subs, UGJ } = await getTeamPointsInfoGWChange(user.user_id, newUserFocusGW.gameweek_id, false);
                    setTeamPoints(starters, subs, UGJ, newUserFocusGW);
                }
            } else {
                setTransferringBackToLatest();
            }
            updateStack(navigation, 0, page);
        } 
    }

    render() {
        return (
            <TouchableOpacity onPress={()=>this.navigate()}>
                <View style={navSectionBackground}>
                    <View style={{...navSectionContainer, backgroundColor: this.currentPage()===this.props.page ? $electricBlue : null, borderWidth: this.currentPage(this.props.page) ? 1 : 0, opacity: (this.props.page==='Points' && !this.props.lastStarters) ? 0.4 : 1}}>
                        <Text style={navText}>{this.props.page}</Text>
                    </View>
                </View>
            </TouchableOpacity>
         );
    }
}

const mapStateToProps = state => {
    return {
        lastGW: state.club.lastGW,
        lastStarters: state.user.focusedGWTeam.starters,
        user: state.user.user,
        otherTeamFocus: state.boolDeciders.otherTeamFocus
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTransferringBackToLatest: () => dispatch(setTransferringBackToLatest()),
        setTeamPoints: (starters, subs, UGJ, newUserFocusGW) => dispatch(setTeamPoints(starters, subs, UGJ, newUserFocusGW)),
        leavingClubPointsPage: () => dispatch(leavingClubPointsPage())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(NavSection);