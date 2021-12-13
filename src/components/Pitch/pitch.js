import React, { Component } from 'react';
import PlayerGraphic from '../PlayerGraphic/playerGraphic';
import { View, ImageBackground } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units';
import { connect } from 'react-redux';
import PitchHead from '../PitchHead/pitchHead';
import { pitch, pitchContainer, starters, subs, positionRow, pitchImage, pitchClassContainer } from './style';
import { fullName, getRecord, playersArrayToObj, positionString } from '../../functions/reusable';




class Pitch extends Component {


    playerPG = (playerId) => {
        const { otherTeamFocus, UGJ, otherUGJ, allPGJs, type } = this.props;
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

    team = () => playersArrayToObj(this.props.team);

    renderPlayers = (position) => {
        return this.team()[position].map((player, i) => {
            return <PlayerGraphic 
            sub={false}
            player={player} 
            key={i}
            type={this.props.type}
            playerGraphicClickFcn={this.props.playerGraphicClickFcn}
            playerPG={this.playerPG}
            />})
        
    }

    renderSubs = () => this.props.subs.map((player, i) => 
            <PlayerGraphic 
            sub={true}
            player={player} 
            key={i}
            type={this.props.type}
            playerGraphicClickFcn={this.props.playerGraphicClickFcn}
            playerPG={this.playerPG}
            />)

    render() { 
        const pitchImg = require('../../../images/kisspng-ball-game-football-pitch-corner-kick-football-stadium-5ac96cf3827065.1735532915231500675343.png');
        const team = this.team();
        return (
            <View>
                <View>
                        <ImageBackground source={pitchImg} imageStyle={{resizeMode: 'stretch'}} style={pitchImage}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={pitch}>
                                    <View style={starters}>
                                        <View style={{...positionRow, width: vw(66)}}>
                                            {team[4].length>0 ? this.renderPlayers('4') : null}
                                        </View>
                                        <View style={{...positionRow, width: vw(78)}}>
                                            {team[3].length>0 ? this.renderPlayers('3') : null}
                                        </View>
                                        <View style={{...positionRow, width: vw(90)}}>
                                            {team[2].length>0 ? this.renderPlayers('2') : null}
                                        </View>
                                        <View style={positionRow}>
                                            {team[1].length>0 ? this.renderPlayers('1') : null}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                </View>
                {this.props.type!=='transfers' ? <View style={subs}>
                        {this.renderSubs()}
                </View> : null}
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        UGJ: state.user.focusedGWTeam.UGJ,
        records: state.user.records,
        otherTeamFocus: state.boolDeciders.otherTeamFocus,
        otherUGJ: state.club.focusedGWTeam.UGJ
    }
}
 
export default connect(mapStateToProps)(Pitch);