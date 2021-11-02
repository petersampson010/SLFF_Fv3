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
import GwScore from '../../components/gwScore/gwScore';
import { tableElement3, tableRow, tableRowHead } from '../../styles/table';
import { headers, sidenote, standardText } from '../../styles/textStyle';
import { vh } from 'react-native-expo-viewport-units';
import { headerText } from '../../components/header/style';
import NoScoreGW from '../../components/noScoreGW/noScoreGW';
import { fetchAllRecordsByUserId, fetchGwStartersByUserId, fetchGwSubsByUserId, fetchUGJoiner } from '../../functions/APIcalls';
import { setOtherTeamPoints } from '../../actions';


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
            {this.props.gwLatest ? <Text style={{...tableElement3, ...standardText}}>{team.gw_points}</Text> : null}
        </TouchableOpacity>);
    }

    goToTeamPoints = async(team) => {
        const { gwLatest } = this.props;
        const { starters, subs, records, ugj, allPGJoiners } = await getTeamPointsInfo(team.user_id, gwLatest.gameweek_id, true);
        this.props.setOtherTeamPoints(starters, subs, records, ugj, allPGJoiners, team);
        console.log('should be after');
        this.props.navigation.navigate('Points');
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
        const gwLatest = this.props.gwLatest ? this.props.gwLatest : false;
        const opacity = this.state.modal.topPlayer || this.state.modal.topUser ? 0.1 : 1;
        return ( 
            <View style={screenContainer}>
                <View style={{opacity}}>
                    {gwLatest && topPlayer && topUser ? 
                    <View style={gwInfo}>
                        <GwScore />
                        <Text style={{...sidenote, textAlign: 'right'}}>{displayDate(gwLatest.date)}</Text>
                        <View style={topPerformers}>
                            <View style={topPlayer}>
                                <PlayerGWProfile player={topPlayer} topPlayerModal={this.state.modal.topPlayer} closeModal={this.closeModal} openModal={this.openModal}/>
                            </View>
                            <View style={topPlayerStyle}>
                                <UserGWProfile user={topUser} topUserModal={this.state.modal.topUser} closeModal={this.closeModal} openModal={this.openModal}/>
                            </View>
                        </View>
                    </View> : <NoScoreGW/>}
                    <View style={tableRowHead}>
                        <Text style={{...tableElement3, ...standardText}}>Team</Text>
                        <Text style={{...tableElement3, ...standardText}}>Total</Text>
                        {gwLatest ? 
                        <Text style={{...tableElement3, ...standardText}}>vs. {gwLatest.opponent}</Text>
                        : null}
                    </View>
                    <ScrollView style={''}>
                        <View style={{paddingBottom: vh(20)}}>
                            {this.renderRows()}
                        </View>
                    </ScrollView>
                    <BottomNav navigation={this.props.navigation}/>

                </View>
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        user: state.endUser.user,
        league: state.homeGraphics.league,
        topPlayer: state.homeGraphics.topPlayer,
        topUser: state.homeGraphics.topUser,
        gwLatest: state.gameweek.gwLatest,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setOtherTeamPoints: (starters, subs, records, ugj, allPGJoiners, team) => dispatch(setOtherTeamPoints(starters, subs, records, ugj, allPGJoiners, team))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
