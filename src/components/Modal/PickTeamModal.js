import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCaptain, setVCaptain } from '../../actions';
import { View, Text, Image } from 'react-native';
import { modalTextContainer, pickTeamStats, subImage } from './style';
import { standardText } from '../../styles/textStyle';
import { fullName, getRecord, positionString } from '../../functions/reusable';
import Button from '../Button/button';
import {vw, vh} from 'react-native-expo-viewport-units';
import { row } from '../../styles/flex';


class PickTeamModal extends Component {

    setCaptain = player => {
        if (this.props.vCaptain===player) {
            showMessage({
                message: "Player is already a captain",
                type: 'warning'
            })
        } else {
            this.props.setCaptain(player);
        }
    }

    setVCaptain = player => {
        if (this.props.captain===player) {
            showMessage({
                message: "Player is already a captain",
                type: 'warning'
            })
        } else {
            this.props.setVCaptain(player);
        }
    }

    render() { 
        const { player, sub, captain, vCaptain } = this.props;
        const subImg = require('../../../images/subIcon.png');
        return ( 
            <View style={modalTextContainer}>
                <View style={{...row, width: vw(70)}}>
                    <View style={pickTeamStats}>
                        <Text style={standardText}>{fullName(player)}</Text>
                        <Text style={standardText}>{positionString(player.position)}</Text>
                        <Text style={standardText}>£{player.price}m</Text>
                        <Text style={standardText}>MAYBE SOME STATS AT SOME POINT</Text>
                    </View>
                    <View>
                        <Button clickable={player!==captain} text='Captain' func={()=>this.setCaptain(player)} width={vw(35)}/>
                        <Button clickable={player!==vCaptain} text='Vice Captain' func={()=>this.setVCaptain(player)} width={vw(35)}/>
                    </View>
                </View>
                {(!sub) ?
                <View>
                    <Button clickable text={<Image source={subImg} imageStyle={{resizeMode: 'cover'}} style={subImage}/>} func={()=>this.props.subTransferFcn(player)} width={vw(35)}/>
                </View>
                : null}
            </View>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        captain: state.stateChanges.updatedNotPersistedTeam.captain,
        vCaptain: state.stateChanges.updatedNotPersistedTeam.vCaptain,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCaptain: player => dispatch(setCaptain(player)),
        setVCaptain: player => dispatch(setVCaptain(player))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PickTeamModal);


