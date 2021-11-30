import React, { Component } from 'react';
import { Modal, TouchableOpacity, View, Text, Image } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units';
import { connect } from 'react-redux';
import { setCaptain } from '../../actions';
import { fullName, getRecord, positionString } from '../../functions/reusable';
import { buttonText, buttonContainerFullWidth } from '../../styles/button';
import { $arylideYellow, $chocolateBlack, $standardWhite, $zaGreen } from '../../styles/global';
import { checkBox, labelText, standardText } from '../../styles/textStyle';
import Button from '../button';
import { playerImage, playerImageLarge, subImage } from '../PlayerGraphic/style';
import { button, buttons, captainBox, closeButton, closeModalContainer, modal, modalSplitContainer, modalTextContainer } from './style';


class MyModal extends Component {
    state = {  }

    renderButtons = () => {
        return this.props.buttonOptions.map((x,i)=><Button key={i} text={x.text} func={x.fcn} width={vw(35)}/>)
    }

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

    modalJSX = () => {
        const playerImg = require('../../../images/profile.jpg');
        const subImg = require('../../../images/subIcon.png');
        if (this.props.jsx) {
            return this.props.jsx
        } else {
            const { modalType, entry } = this.props;
            let player;
            switch(modalType) {
                case 'userProfile':
                    const { user, ug } = entry;
                    return <View style={modalTextContainer}>
                        <Text style={standardText}>{user.team_name}</Text>
                        <Text style={standardText}>GW Points: {ug.total_points}</Text>
                        <Text style={standardText}>maybe total score</Text>
                    </View>
                case 'playerProfile':
                    player = entry.pg ? entry.player : entry;
                    return <View style={{...modalSplitContainer, width:this.props.width}}>
                        <View style={{padding: vh(1)}}>
                            <Text style={standardText}>{fullName(player)}</Text>
                            <Text style={standardText}>{positionString(player.position)}</Text>
                            <Text style={standardText}>£{player.price}</Text>
                            <Text style={standardText}></Text>

                            {/* <Text style={standardText}>MAYBE SOME STATS AT SOME POINT</Text> */}
                        </View>
                        <View style={{padding: vh(1)}}>
                            <Image source={playerImg} imageStyle={{resizeMode: 'cover'}} style={playerImageLarge}/>
                        </View>
                    </View>
                case 'pickTeam':
                    player = entry.pg ? entry.player : entry;
                    const rec = getRecord(player, this.props.records);
                    const sub = rec ? rec.sub : true;
                    return <View style={modalTextContainer}>
                        <Text style={standardText}>{fullName(player)}</Text>
                        <Text style={standardText}>{positionString(player.position)}</Text>
                        <Text style={standardText}>£{player.price}m</Text>
                        <Text style={standardText}>MAYBE SOME STATS AT SOME POINT</Text>
                        {(!sub) ?
                        <View>
                            <Button text='Captain' func={()=>this.setCaptain(player)} width={vw(35)}/>
                            <Button text='Vice Captain' func={()=>this.setVCaptain(player)} width={vw(35)}/>
                            <Button text={<Image source={subImg} imageStyle={{resizeMode: 'cover'}} style={subImage}/>} func={()=>this.props.subTransferFcn(player)} width={vw(35)}/>

                            {/* <TouchableOpacity style={this.props.captain===player ? {...captainBox, backgroundColor: $zaGreen} : {...captainBox, backgroundColor: $standardWhite}} onPress={()=>this.setCaptain(player)}>
                                <Text style={this.props.captain===player ? {...checkBox, color: $arylideYellow} : {...checkBox, color: $chocolateBlack}}>Captain</Text>
                            </TouchableOpacity> */}
                            {/* <TouchableOpacity style={this.props.vCaptain===player ? {...captainBox, backgroundColor: $zaGreen} : {...captainBox, backgroundColor: $standardWhite}} onPress={()=>this.setVCaptain(player)}>
                                <Text style={this.props.vCaptain===player ? {...checkBox, color: $arylideYellow} : {...checkBox, color: $chocolateBlack}}>Vice Captain</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{...captainBox, backgroundColor: $standardWhite}} onPress={()=>this.props.subTransferFcn(player)}>
                            <Image source={subImg} imageStyle={{resizeMode: 'cover'}} style={subImage}/>
                                {/* <Text style={{...checkBox, color: $chocolateBlack}}>Vice Captain</Text> */}
                            {/* </TouchableOpacity> */}
                        </View>
                        : null}
                    </View>
                case 'gwStatsSubmit': 
                    return <View style={modalTextContainer}>
                        <Text style={standardText}>Please review your stats before submission! Once submitted, stats cannot be changed. Clicking confirm will submit these stats and set this 'Game' to complete.</Text>
                    </View>;
                default: 
                return;
            }
        }
    }

    render() { 
        return ( 
            <Modal visible={this.props.visible} 
            transparent={true}>
                <View style={{...modal, height:this.props.height, width:this.props.width, left:(vw(100)-(this.props.width))/2}}>
                    {this.modalJSX()}
                    <View style={closeButton}>
                        <View style={buttons}>
                            {this.renderButtons()}
                        </View>
                        <Button text='Close' func={this.props.closeModalFcn} width={vw(35)}/>
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
        vCaptain: state.user.currentTeam.vCaptain
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCaptain: player => dispatch(setCaptain(player)),
        setVCaptain: player => dispatch(setVCaptain(player))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyModal);



// props we need: 
// visible
// closeModalFcn
// jsx: *OPTIONAL*
// array of button options at bottom, each element needs text and an onPress fcn