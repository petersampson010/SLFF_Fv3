import React, { Component } from 'react';
import { Modal, TouchableOpacity, View, Text, Image } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units';
import { showMessage } from 'react-native-flash-message';
import { connect } from 'react-redux';
import { closeModal, setCaptain, setVCaptain } from '../../actions';
import Button from '../Button/button';
import Checkbox from '../Checkbox/checkbox';
import { playerImage, playerImageLarge } from '../PlayerGraphic/style';
import { buttons, captainCheckbox, captainCheckboxContainer, closeButton, modal, modalContainer, modalJSX, modalSplitContainer, modalTextContainer, subImage } from './style';
import { modalLabelText } from '../../styles/textStyle';
import { userProfile } from '../profile/userProfile';
import { playerProfile } from '../profile/playerProile';



class MyModal extends Component {

    setCaptain = player => {
        const { vCaptain, setCaptain } = this.props;
        if (vCaptain.player_id===player.player_id) {
            showMessage({
                message: "Player is already a captain",
                type: 'warning'
            })
        } else {
            setCaptain(player);
        }
    }

    setVCaptain = player => {
        const { captain, setVCaptain } = this.props;
        if (captain.player_id===player.player_id) {
            showMessage({
                message: "Player is already a captain",
                type: 'warning'
            })
        } else {
            setVCaptain(player);
        }
    }

    topRightJSX = () => {
        const { modalSet } = this.props.modal;
        const playerImg = require('../../../images/profile.jpg');
        switch(modalSet) {
            case 'set1': case 'set2':
                return <Image source={playerImg} imageStyle={{resizeMode: 'cover'}} style={playerImageLarge}/>
            case 'set3':
                return <View>
                    <View style={{width: vw(25), flexDirection: 'row', justifyContent: 'center'}}>
                        <Image source={playerImg} imageStyle={{resizeMode: 'cover'}} style={playerImage}/>
                    </View>
                    <Text style={modalLabelText}>{this.props.pg}</Text>
                </View>;
            case 'set4': 
                return <Text style={modalLabelText}>Would you like to edit the game or submit the stats and complete it?</Text>;
            case 'set5':
                return <Text style={modalLabelText}>Please ensure stats are correct, once confirmeed they cannot be corrected.</Text>;
            default: 
                return;
        }
    }

    bottomBtn = () => {
        const { modalSet, btnClick, player } = this.props.modal;
        const subImg = require('../../../images/subIcon.png');
        switch(modalSet) {
            case 'set1': case 'set2':
                return <Button width={vw(35)} clickable modal comp={<Image source={subImg} imageStyle={{resizeMode: 'cover'}} style={subImage}/>} func={()=>btnClick(player)}/>
            case 'set4':
                return <Button width={vw(35)} clickable modal text="Edit Game" func={btnClick}/>;
            case 'set5':
                return <Button width={vw(35)} clickable modal text="Submit Stats" func={btnClick}/>;
            default: 
                return;
        }
    }

    render() { 
        const { modal, modalActive, closeModal, captain, vCaptain } = this.props;
        const { player, width, modalSet, pg, ug, user } = modal;
        const playerImg = require('../../../images/profile.jpg');
        const subImg = require('../../../images/subIcon.png');
        console.log(player);
        return (
            <Modal
            transparent={true}>
                {/* <View style={{marginTop: vh(10), height: vh(90), width: vw(100), backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <View style={{...modalContainer, width:width, left:(vw(100)-(width))/2}}>
                    <View style={modalJSX}>
                        <View>
                            {player ? playerProfile(player) : userProfile(user)}
                            {modalSet === 'set2' && !player.sub ? 
                            <View style={captainCheckboxContainer}>
                                <Checkbox clickable active={player.player_id===captain.player_id} text="C" func={()=>this.setCaptain(player)} style={captainCheckbox}/>
                                <Checkbox clickable active={player.player_id===vCaptain.player_id} text="VC" func={()=>this.setVCaptain(player)} style={captainCheckbox}/> 
                            </View>
                             : null}
                        </View>
                        {this.topRightJSX()}
                    </View>
                    <Text>Around here </Text>
                    <View style={modalJSX}>
                        {this.bottomBtn()}
                        <Button clickable modal text='Close' func={closeModal} width={vw(35)}/>
                    </View>
                </View>
                </View>  */}
            </Modal>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        records: state.user.records,
        modal: state.modal,
        modalActive: state.boolDeciders.modal,
        captain: state.stateChanges.updatedNotPersistedTeam.captain,
        vCaptain: state.stateChanges.updatedNotPersistedTeam.vCaptain,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        setCaptain: (player) => dispatch(setCaptain(player)),
        setVCaptain: (player) => dispatch(setVCaptain(player))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyModal);