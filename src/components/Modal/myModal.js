import React, { Component } from 'react';
import { Modal, TouchableOpacity, View, Text, Image } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, setCaptain, setVCaptain } from '../../actions';
import Button from '../Button/button';
import Checkbox from '../Checkbox/checkbox';
import { playerImage, playerImageLarge } from '../PlayerGraphic/style';
import { buttons, captainCheckbox, captainCheckboxContainer, closeButton, modal, modalContainer, modalJSX, modalSplitContainer, modalTextContainer, subImage } from './style';
import { modalLabelText } from '../../styles/textStyle';
import { userProfile } from '../profile/userProfile';
import { playerProfile } from '../profile/playerProile';
import playerGWProfile from '../profile/playerGWProfile';
import userGWProfile from '../profile/userGWProfile';



const MyModal = () => {
    
    const dispatch = useDispatch(), 
    records = useSelector(state => state.user.records),
    modal = useSelector(state => state.modal),
    modalActive = useSelector(state => state.boolDeciders.modal),
    captain = useSelector(state => state.stateChanges.updatedNotPersistedTeam.captain),
    vCaptain = useSelector(state => state.stateChanges.updatedNotPersistedTeam.vCaptain),
    { width, modalSet, ug, user, player, pg } = modal,
    playerImg = require('../../../images/profile.jpg'),
    subImg = require('../../../images/subIcon.png');

    const setC = player => {
        if (vCaptain.player_id===player.player_id) {
            showMessage({
                message: "Player is already a captain",
                type: 'warning'
            })
        } else {
            dispatch(setCaptain(player));
        }
    }

    const setVC = player => {
        if (captain.player_id===player.player_id) {
            showMessage({
                message: "Player is already a captain",
                type: 'warning'
            })
        } else {
            dispatch(setVCaptain(player));
        }
    }

    const topRightJSX = () => {
        const { modalSet } = modal;
        switch(modalSet) {
            case 'set1': case 'set2':
                return <View 
                style={{width: vw(35), flexDirection: 'row', justifyContent: 'center'}}
                >
                    <Image source={playerImg} imageStyle={{resizeMode: 'cover'}} style={playerImageLarge}/>
                </View>
            case 'set3':
                return <View>
                    <View 
                    style={{width: vw(35), flexDirection: 'row', justifyContent: 'center'}}
                    >
                        <Image source={playerImg} imageStyle={{resizeMode: 'cover'}} style={playerImageLarge}/>
                    </View>
                </View>;
            case 'set4': 
                return <Text style={modalLabelText}>Would you like to edit the game or submit the stats and complete it?</Text>;
            case 'set5':
                return <Text style={modalLabelText}>Please ensure stats are correct, once confirmeed they cannot be corrected.</Text>;
            case 'set6':
                return <Text style={modalLabelText}>Thanks for signing up! An email has been sent to you. Please check it and confirm. Once you have done so please select 'Complete'.</Text>;
            default: 
                return;
        }
    }

    const bottomBtn = () => {
        const { modalSet, btnClick, player } = modal;
        switch(modalSet) {
            case 'set1': case 'set2':
                return <Button width={vw(35)} clickable modal comp={<Image source={subImg} imageStyle={{resizeMode: 'cover'}} style={subImage}/>} func={()=>btnClick(player)}/>
            case 'set4':
                return <Button width={vw(35)} clickable modal text="Edit Game" func={btnClick}/>;
            case 'set5':
                return <Button width={vw(35)} clickable modal text="Submit Stats" func={btnClick}/>;
            case 'set6':
                return <Button width={vw(35)} clickable modal text="Complete" func={btnClick}/>;
            default: 
                return;
        }
    }

        return (
            <Modal
            visible={modalActive}
            transparent={true}>
                <View style={{marginTop: vh(10), height: vh(90), width: vw(100), backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <View style={{...modalContainer, top: vh(15), width:width, left:(vw(100)-(width))/2}}>
                    <View style={modalJSX}>
                        <View>
                            {player ? playerProfile(player) : null}
                            {user ? userProfile(user) : null}
                        </View>
                        {topRightJSX()}
                    </View>
                            {modalSet === 'set2' && !player.sub ? 
                            <View style={captainCheckboxContainer}>
                                <Checkbox clickable active={player.player_id===captain.player_id} text="Captain" func={()=>setC(player)} style={captainCheckbox}/>
                                <Checkbox clickable active={player.player_id===vCaptain.player_id} text="Vice Captain" func={()=>setVC(player)} style={captainCheckbox}/> 
                            </View>
                             : null}
                    {pg ? playerGWProfile(pg) : null}
                    {ug ? userGWProfile(ug) : null}
                    <View style={modalJSX}>
                        {bottomBtn()}
                        <Button clickable modal text='Close' func={()=>dispatch(closeModal())} width={vw(35)}/>
                    </View>
                </View>
                </View>  
            </Modal>
         );
}


export default MyModal;