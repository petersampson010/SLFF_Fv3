import React, { Component } from 'react';
import PlayerGraphic from '../PlayerGraphic/playerGraphic';
import { View, ImageBackground } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units';
import { connect, useSelector } from 'react-redux';
import PitchHead from '../PitchHead/pitchHead';
import { pitch, pitchContainer, starters, subsStyle, positionRow, pitchImage, pitchClassContainer } from './style';
import { fullName, getRecord, playersArrayToObj, positionString } from '../../functions/reusable';




const Pitch = ({ type, team, playerGraphicClickFcn, clickFcn, update, subs, allPGJs }) => {

    const UGJ = useSelector(state => state.user.focusedGWTeam.UGJ);
    const records = useSelector(state => state.user.records);
    const otherTeamFocus = useSelector(state => state.boolDeciders.otherTeamFocus);
    const otherUGJ = useSelector(state => state.club.focusedGWTeam.UGJ);
    const formattedTeam = () => playersArrayToObj(team);
    console.log(formattedTeam()['4']);
    const pitchImg = require('../../../images/kisspng-ball-game-football-pitch-corner-kick-football-stadium-5ac96cf3827065.1735532915231500675343.png');


    const playerPG = (playerId) => {
        if (otherTeamFocus) {
            return type==="points" ? allPGJs.filter(pg=>{
                return pg.player_id===playerId && pg.gameweek_id===otherUGJ.gameweek_id
            })[0] : false;
        } else {
            return type==="points" ? allPGJs.filter(pg=>{
                return pg.player_id===playerId && pg.gameweek_id===UGJ.gameweek_id
            })[0] : false;
        }
    }

    const renderPlayers = (position) => {
        return formattedTeam()[position].map((player, i) => {
            return <PlayerGraphic 
            sub={false}
            player={player} 
            key={i}
            type={type}
            playerGraphicClickFcn={playerGraphicClickFcn}
            playerPG={playerPG}
            />})
        
    }

    const renderSubs = () => subs.map((player, i) => 
            <PlayerGraphic 
            sub={true}
            player={player} 
            key={i}
            type={type}
            playerGraphicClickFcn={playerGraphicClickFcn}
            playerPG={playerPG}
            />)

        return (
            <View>
                <View>
                        <ImageBackground source={pitchImg} imageStyle={{resizeMode: 'stretch'}} style={pitchImage}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={pitch}>
                                    <View style={starters}>
                                        <View style={{...positionRow, width: vw(66)}}>
                                            {formattedTeam()['4'].length>0 ? renderPlayers('4') : null}
                                        </View>
                                        <View style={{...positionRow, width: vw(78)}}>
                                            {formattedTeam()['3'].length>0 ? renderPlayers('3') : null}
                                        </View>
                                        <View style={{...positionRow, width: vw(90)}}>
                                            {formattedTeam()['2'].length>0 ? renderPlayers('2') : null}
                                        </View>
                                        <View style={positionRow}>
                                            {formattedTeam()['1'].length>0 ? renderPlayers('1') : null}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                </View>
                {type!=='transfers' ? <View style={subsStyle}>
                        {renderSubs()}
                </View> : null}
            </View>
         );
}
 
export default Pitch;