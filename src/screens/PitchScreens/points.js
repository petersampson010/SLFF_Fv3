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

    openModal = player => {
        // const { captain, vCaptain };
        this.props.setModal(player, 
        <View>
            <Text>GW Points</Text>
        </View>,
        vw(70), vh(50), null
        )
    }

    render() {
        const { starters, subs, records, otherStarters, otherSubs, otherRecords, otherTeamFocus, otherAllPGJs, allPGJs } = this.props;
        const selectStarters = otherTeamFocus ? otherStarters : starters;
        const selectSubs = otherTeamFocus ? otherSubs : subs;
        const selectRecords = otherTeamFocus ? otherRecords : records;
        const selectAllPGJoiners = otherTeamFocus ? otherAllPGJs : allPGJs;
        return ( 
            <View style={screenContainer}>
                <PitchHead type="points"/>
                <ScrollView style={pitchContainer}>
                    {this.props.lastGW ? 
                    <Pitch
                    type="points"
                    playerGraphicClickFcn={()=>this.openModal(player)}
                    captain={getCaptain(selectStarters, selectRecords)}
                    vCaptain={getVCaptain(selectStarters, selectRecords)}
                    team={selectStarters}
                    subs={selectSubs}
                    allPGJs={selectAllPGJoiners}
                    /> : <Text>No Games played yet, come back soon!</Text>}
                </ScrollView>
                <BottomNav navigation={this.props.navigation}/>
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        lastGW: state.club.lastGW,
        subs: state.user.focusedGWTeam.subs,
        starters: state.user.focusedGWTeam.starters,
        records: state.user.records,
        league: state.club.league,
        otherStarters: state.club.focusedGWTeam.starters,
        otherSubs: state.club.focusedGWTeam.subs,
        otherRecords: state.club.focusedGWTeam.records,
        allPGJs: state.user.PGJs.all,
        otherAllPGJs: state.club.focusedGWTeam.allPGJs,
        otherTeamFocus: state.boolDeciders.otherTeamFocus
    }
}
 
export default connect(mapStateToProps)(PointsScreen);