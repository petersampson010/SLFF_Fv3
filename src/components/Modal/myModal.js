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
    state = {  }

    // renderButtons = () => {
    //     return this.props.buttonOptions.map((x,i)=><Button key={i} text={x.text} func={x.fcn} width={vw(35)}/>)
    // }


    // modalJSX = () => {
    //     const playerImg = require('../../../images/profile.jpg');
    //     console.log(this.props.jsx);
    //     if (this.props.jsx) {
    //         console.log('hit');
    //         return this.props.jsx
    //     } else {
    //         const { modalType, entry, width } = this.props;
    //         let player;
    //         switch(modalType) {
    //             case 'userProfile':
    //                 const { user, ug } = entry;
    //                 return <View style={modalTextContainer}>
    //                     <Text style={standardText}>{user.team_name}</Text>
    //                     <Text style={standardText}>GW Points: {ug.total_points}</Text>
    //                     <Text style={standardText}>maybe total score</Text>
    //                 </View>
    //             case 'pickTeam':
    //                 player = entry.pg ? entry.player : entry;
    //                 const rec = getRecord(player, this.props.records);
    //                 const sub = rec ? rec.sub : true;
    //                 return <PickTeamModal player={player} sub={sub}/>;
    //             case 'gwStatsSubmit': 
    //                 return <View style={modalTextContainer}>
    //                     <Text style={standardText}>Please review your stats before submission! Once submitted, stats cannot be changed. Clicking confirm will submit these stats and set this 'Game' to complete.</Text>
    //                 </View>;
    //             default: 
    //             return;
    //         }
    //     }
    // }

    render() { 
        const { modalActive, modal, closeModal } = this.props;
        const { player, jsx, width, height, bottomBtn, closeFcn } = modal;
        console.log(height);
        console.log(width);
        return ( 
            <Modal visible={modalActive} 
            transparent={true}>
                <View style={{...modalContainer, height:height, width:width, left:(vw(100)-(width))/2}}>
                    <View style={modalJSX}>
                        {player ? playerProfile(player) : null}
                        {jsx}
                    </View>
                    <View style={modalJSX}>
                        {bottomBtn}
                        <Button clickable text='Close' func={closeModal} width={vw(35)}/>
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