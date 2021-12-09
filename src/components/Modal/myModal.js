import React, { Component } from 'react';
import { Modal, TouchableOpacity, View, Text, Image } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import { closeModal, setCaptain } from '../../actions';
import { fullName, getRecord, positionString } from '../../functions/reusable';
import { buttonText, buttonContainerFullWidth } from '../../styles/button';
import { $arylideYellow, $chocolateBlack, $standardWhite, $zaGreen } from '../../styles/global';
import { checkBox, labelText, standardText } from '../../styles/textStyle';
import Button from '../Button/button';
import { playerImage, playerImageLarge, subImage } from '../PlayerGraphic/style';
import { playerProfile } from '../profile/playerProile';
import PickTeamModal from './PickTeamModal';
import { buttons, closeButton, modal, modalContainer, modalJSX, modalSplitContainer, modalTextContainer } from './style';


class MyModal extends Component {


    render() { 
        const { modalActive, modal, closeModal } = this.props;
        const { player, jsx, width, height, btn } = modal;
        const playerImg = require('../../../images/profile.jpg');
        const subImg = require('../../../images/subIcon.png');
        return ( 
            <Modal visible={modalActive} 
            transparent={true}>
                <View style={{height: vh(100), width: vw(100), backgroundColor: 'rgba(0,0,0,0.5)'}}>

                <View style={{...modalContainer, height:height, width:width, left:(vw(100)-(width))/2}}>
                    <View style={modalJSX}>
                        {player ? playerProfile(player) : null}
                        {jsx}
                    </View>
                    <View style={modalJSX}>
                        {modalSet === set3 ? null : 
                        <Button width={vw(35)} clickable modal comp={<Image source={subImg} imageStyle={{resizeMode: 'cover'}} style={subImage}/>} func={()=>btnClick(player)}/>
                        }
                        <Button clickable modal text='Close' func={closeModal} width={vw(35)}/>
                    </View>
                </View>
                </View>
            </Modal>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        records: state.user.records,
        captain: state.user.currentTeam.captain,
        vCaptain: state.user.currentTeam.vCaptain,
        modal: state.modal,
        modalActive: state.boolDeciders.modal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyModal);



// props we need: 
// visible
// closeModalFcn
// jsx: *OPTIONAL*
// array of button options at bottom, each element needs text and an onPress fcn