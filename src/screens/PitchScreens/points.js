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
import { vh, vw } from 'react-native-expo-viewport-units';
import { setModal } from '../../actions';



class PointsScreen extends Component {

    state = {  }

    componentDidMount() {

    }

    openModal = player => {
        this.props.setModal({modalSet: 'set3', player, width: vw(80), height: vh(30), btnClick: null})
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
                    playerGraphicClickFcn={this.openModal}
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

const mapDispatchToProps = dispatch => {
    return {
        setModal: modalObj => dispatch(setModal(modalObj))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(PointsScreen);