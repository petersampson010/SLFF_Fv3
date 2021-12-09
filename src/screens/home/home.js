import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../components/header/header';
import { displayDate, getTeamPointsInfo, topPlayer, topUser } from '../../functions/reusable';
import BottomNav from '../../components/bottomNav/bottomNav';
import { $arylideYellow, screenContainer } from '../../styles/global';
import { gwInfo, leagueTable, topPerformers, topPlayerStyle } from './style';
import PlayerGWProfile from '../../components/profile/playerGWProfile';
import UserGWProfile from '../../components/profile/userGWProfile';
import GWScore from '../../components/gwScore/gwScore';
import { tableElement3, tableRow, tableRowHead } from '../../styles/table';
import { headers, sidenote, standardText } from '../../styles/textStyle';
import { vh } from 'react-native-expo-viewport-units';
import { headerText } from '../../components/header/style';
import NoScoreGW from '../../components/noScoreGW/noScoreGW';
import { getAllRecordsByUserId, getGWStartersByUserId, getGWSubsByUserId, getUGJ, getUserById } from '../../functions/APIcalls';
import { setOtherTeamPoints } from '../../actions';
import { showMessage } from 'react-native-flash-message';


class HomeScreen extends Component {
    state = { 
        modal: {
            topPlayer: false,
            topUser: false
        }
     }

    renderRows = () => {
        return this.props.league.sort((a,b)=>b.total_points-a.total_points).map((team, i)=>
        <TouchableOpacity key={i}
            style={tableRow}
            onPress={() => this.goToTeamPoints(team)}>
            <Text style={{...tableElement3, ...standardText}}>{team.team_name}</Text>
            <Text style={{...tableElement3, ...standardText}}>{team.total_points}</Text>
            {this.props.lastGW ? <Text style={{...tableElement3, ...standardText}}>{team.gw_points}</Text> : null}
        </TouchableOpacity>);
    }

    goToTeamPoints = async(team) => {
        const { lastGW } = this.props;
        if (lastGW) {
            const { starters, subs, records, otherUGJ, allPGJs } = await getTeamPointsInfo(team.user_id, lastGW.gameweek_id, true);
            const otherUser = await getUserById(team.user_id);
            if (otherUGJ) {
                this.props.setOtherTeamPoints(starters, subs, records, otherUGJ, allPGJs, otherUser);
                this.props.navigation.navigate('Points');
            } else {
                showMessage({
                    message: "Team has not yet completed a GW",
                    type: 'warning'
                });
            }
        } else {
            showMessage({
                message: "Club has not yet completed a GW",
                type: 'warning'
            });
        }
    }

    closeModal = type => {
        this.setState({
            modal: {
                ...this.state.modal,
                [type]: false
            }
        })
    }

    openModal = type => {
        this.setState({
            modal: {
                ...this.state.modal,
                [type]: true
            }
        })
    }

    render() { 
        const { user, topPlayer, topUser } = this.props;
        const lastGW = this.props.lastGW ? this.props.lastGW : false;
        const opacity = this.state.modal.topPlayer || this.state.modal.topUser ? 0.1 : 1;
        return ( 
            <View style={screenContainer}>
                <View style={{opacity}}>
                    {lastGW && topPlayer && topUser ? 
                    <View style={gwInfo}>
                        <GWScore />
                        <Text style={{...sidenote, textAlign: 'right'}}>{displayDate(lastGW.date)}</Text>
                        <View style={topPerformers}>
                            <View style={topPlayer}>
                                <PlayerGWProfile player={topPlayer} topPlayerModal={this.state.modal.topPlayer} closeModal={this.closeModal} openModal={this.openModal}/>
                            </View>
                            <View style={topPlayerStyle}>
                                <UserGWProfile user={topUser} topUserModal={this.state.modal.topUser} closeModal={this.closeModal} openModal={this.openModal}/>
                            </View>
                        </View>
                    </View> : <NoScoreGW/>}
                    {lastGW ? 
                    <View>
                        <View style={tableRowHead}>
                            <Text style={{...tableElement3, ...standardText}}>Team</Text>
                            <Text style={{...tableElement3, ...standardText}}>Total</Text>
                            {lastGW ? 
                            <Text style={{...tableElement3, ...standardText}}>vs. {lastGW.opponent}</Text>
                            : null}
                        </View>
                        <ScrollView style={''}>
                            <View style={{paddingBottom: vh(20)}}>
                                {this.renderRows()}
                            </View>
                        </ScrollView>
                    </View>
                    : null}

                    <BottomNav navigation={this.props.navigation}/>

                </View>
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        league: state.club.league,
        topPlayer: state.club.topPlayer,
        topUser: state.club.topUser,
        lastGW: state.club.lastGW,
        lastUGJ: state.user.focusedGWTeam.UGJ
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setOtherTeamPoints: (starters, subs, records, UGJ, allPGJs, otherUser) => dispatch(setOtherTeamPoints(starters, subs, records, UGJ, allPGJs, otherUser))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
