import React, { Component } from 'react';
import { Image, Text, StyleSheet, View, Button, Modal, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { fullName, subOrTransfer } from '../../functions/reusable';
import { box, capText, container, playerImage, subContainer, subImage, subTransferBtn } from './style';
import { TouchableOpacity } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';
import { checkBox, headers, playerNamePoints } from '../../styles/textStyle';


class PlayerGraphic extends Component {
    state = {}

    playerNumber = () => {
        const { num } = this.props;
        if (num) {
            return num;
        } else {
            return '';
        }
    }

    renderPoints = () => {
        if (this.props.type==='points') {
            return <Text style={playerNamePoints}>{this.points()}</Text>
        }
    }

    points = () => {
        let PG = this.props.playerPG;
        if (PG===undefined) {
            return '0';
        } else if (!PG)  {
            return '';
        } else {
            return this.props.playerPG.total_points;
        }
    }


    horizontalMargin = () => {
        switch(this.props.player.position) {
            case '2':
                return 7;
            case '3':
                return 1;
            case '4':
                return 0;
            default: 
            return 0;
        }
    }

    containerWidth = () => {
        if (this.props.sub) {
            return vw(20)
        } else {
            switch(this.props.player.position) {
                case '2':
                    return vw(25);
                case '3':
                    return vw(20);
                case '4':
                    return vw(15);
                default: 
                    return vw(15);
            }
        }
    }

    isCaptain = () => {
        const { player, type, lastGwCaptain, lastGwVCaptain, latestCaptain, latestVCaptain } = this.props;
        if (type==='points') {
            if (player===lastGwCaptain) {
                return 'C';
            } else if (lastGwVCaptain) {
                return 'VC';
            }
        } else {
            if (player===latestCaptain) {
                return 'C';
            } else if (player===latestVCaptain) {
                return 'VC';
            }
        }
    }

    render() {
        const playerImg = require('../../images/profile.jpg');
        const subImg = require('../../images/subIcon.png');
        const { player, openModal, type, clickFcn } = this.props;
      return ( 
            <View style={{...container, marginHorizontal: this.horizontalMargin(), width: this.containerWidth()}}>
                <View style={ type!=="points" ? {...subContainer, paddingLeft: vw(5)} : subContainer}>
                    <TouchableOpacity onPress={()=>openModal(player)}>
                        <Image source={playerImg} imageStyle={{resizeMode: 'cover'}} style={playerImage}/>
                    </TouchableOpacity>
                    {type!=='points' ?
                    <View>
                    <Text style={capText}>{this.isCaptain()}</Text>
                    <TouchableOpacity onPress={()=>clickFcn(player)}>
                        <Image source={subImg} imageStyle={{resizeMode: 'cover'}} style={subImage}/>
                    </TouchableOpacity>
                    </View>
                    : null}
                </View>
                <TouchableOpacity onPress={()=>openModal(player)}>
                    <Text style={playerNamePoints}>{fullName(player)}</Text>
                </TouchableOpacity>
                    {this.renderPoints()}
            </View>
      );
    }
}

const mapStateToProps = state => {
    return {
        records: state.joiners.records,
        latestCaptain: state.players.latest.captain,
        latestVCaptain: state.players.latest.vCaptain,
        lastGwVCaptain: state.players.teamPoints.vCaptain,
        lastGwCaptain: state.players.teamPoints.captain,
    }
}
 
export default connect(mapStateToProps)(PlayerGraphic);