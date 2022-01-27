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
// import { playerProfile } from '../profile/playerProfile';
import { buttons, closeButton, modal, modalContainer, modalJSX, modalSplitContainer, modalTextContainer } from './style';


class StateModal extends Component {


    render() { 
        const { jsx, modalActive, btn, width, height, closeFcn } = this.props;
        // const { player, jsx, width, height, btn } = modal;
        return ( 
            <Modal visible={modalActive} 
            transparent={true}
            >
                <View style={{height: vh(90), marginTop: vh(10), width: vw(100), backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <View style={{...modalContainer, height:height, width:width, left:(vw(100)-(width))/2}}>
                    <View style={modalJSX}>
                        {jsx}
                    </View>
                    <View style={modalJSX}>
                        {btn}
                        <Button clickable modal text='Close' func={closeFcn} width={vw(35)}/>
                    </View>
                </View>
                    </View>
            </Modal>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        // records: state.user.records,
        // captain: state.user.currentTeam.captain,
        // vCaptain: state.user.currentTeam.vCaptain,
        // modal: state.modal,
        // modalActive: state.boolDeciders.modal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StateModal);
