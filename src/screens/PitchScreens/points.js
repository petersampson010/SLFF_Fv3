import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import Header from '../../components/header/header';
import Pitch from '../../components/Pitch/pitch';
import { getCaptain, getVCaptain, playersArrayToObj, getNameOfNavPage } from '../../functions/reusable';
import BottomNav from '../../components/bottomNav/bottomNav';
import { pitchContainer } from '../../components/Pitch/style';
import { screenContainer } from '../../styles/global';
import PitchHead from '../../components/PitchHead/pitchHead';
import { vh, vw } from 'react-native-expo-viewport-units';
import { setModal } from '../../actions';



const PointsScreen = ({navigation}) => {

    const dispatch = useDispatch(), 
    lastGW = useSelector(state => state.club.lastGW),
    subs = useSelector(state => state.user.focusedGWTeam.subs),
    starters = useSelector(state => state.user.focusedGWTeam.starters),
    records = useSelector(state => state.user.records),
    league = useSelector(state => state.club.league),
    otherStarters = useSelector(state => state.club.focusedGWTeam.starters),
    otherSubs = useSelector(state => state.club.focusedGWTeam.subs),
    otherRecords = useSelector(state => state.club.focusedGWTeam.records),
    allPGJs = useSelector(state => state.user.PGJs.all),
    otherAllPGJs = useSelector(state => state.club.focusedGWTeam.allPGJs),
    otherTeamFocus = useSelector(state => state.boolDeciders.otherTeamFocus),
    selectStarters = otherTeamFocus ? otherStarters : starters,
    selectSubs = otherTeamFocus ? otherSubs : subs,
    selectRecords = otherTeamFocus ? otherRecords : records,
    selectAllPGJoiners = otherTeamFocus ? otherAllPGJs : allPGJs;

    const openModal = player => {
        dispatch(setModal({modalSet: 'set3', player: player.player, pg: player.pg, width: vw(80), height: vh(30), btnClick: null}))
    }

        return ( 
            <View style={screenContainer}>
                <PitchHead type="points"/>
                <ScrollView style={pitchContainer}>
                    {lastGW ? 
                    <Pitch
                    type="points"
                    playerGraphicClickFcn={openModal}
                    captain={getCaptain(selectStarters, selectRecords)}
                    vCaptain={getVCaptain(selectStarters, selectRecords)}
                    team={selectStarters}
                    subs={selectSubs}
                    allPGJs={selectAllPGJoiners}
                    /> : <Text>No Games played yet, come back soon!</Text>}
                </ScrollView>
                <BottomNav navigation={navigation}/>
            </View>
         );

}
 
export default PointsScreen;