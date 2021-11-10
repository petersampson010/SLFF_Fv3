import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../components/header/header';
import Pitch from '../../components/Pitch/pitch';
import { getCaptain, getVCaptain, playersArrayToObj, getNameOfNavPage } from '../../functions/reusable';
import BottomNav from '../../components/bottomNav/bottomNav';
import { pitchContainer } from '../../components/Pitch/style';
import { screenContainer } from '../../styles/global';
import PitchHead from '../../components/PitchHead/pitchHead';



class PointsScreen extends Component {

    state = {  }

    componentDidMount() {

    }

    render() {
        const { starters, subs, records, otherStarters, otherSubs, otherRecords, otherTeam, otherAllPGJoiners, allPGJoiners } = this.props;
        const selectStarters = otherTeam ? otherStarters : starters;
        const selectSubs = otherTeam ? otherSubs : subs;
        const selectRecords = otherTeam ? otherRecords : records;
        const selectAllPGJoiners = otherTeam ? otherAllPGJoiners : allPGJoiners;
        console.log('other team: ' + otherTeam);
        return ( 
            <View style={screenContainer}>
                <PitchHead type="points" otherTeam={otherTeam}/>
                <ScrollView style={pitchContainer}>
                    {this.props.gwLatest ? 
                    <Pitch
                    type="points"
                    modalType="playerProfile"
                    update={()=>console.log('do nothing')}
                    clickFcn={()=>console.log('do nothing')}
                    captain={getCaptain(selectStarters, selectRecords)}
                    vCaptain={getVCaptain(selectStarters, selectRecords)}
                    team={selectStarters}
                    subs={selectSubs}
                    allPGJoiners={selectAllPGJoiners}
                    /> : <Text>No Games played yet, come back soon!</Text>}
                </ScrollView>
                <BottomNav navigation={this.props.navigation}/>
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        gwLatest: state.gameweek.gwLatest,
        subs: state.players.teamPoints.subs,
        starters: state.players.teamPoints.starters,
        records: state.joiners.records,
        league: state.homeGraphics.league,
        otherStarters: state.players.otherTeamPoints.starters,
        otherSubs: state.players.otherTeamPoints.subs,
        otherRecords: state.players.otherTeamPoints.records,
        allPGJoiners: state.joiners.allPGJoiners,
        otherAllPGJoiners: state.players.otherTeamPoints.allPGJoiners,
        otherTeam: state.otherTeam
    }
}
 
export default connect(mapStateToProps)(PointsScreen);