import React, { Component } from 'react';
import { Modal, TouchableOpacity, View, Text, Image } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units';
import { connect } from 'react-redux';
import { setCaptain } from '../../actions';
import { fullName, getRecord, positionString } from '../../functions/reusable';
import { buttonText, buttonContainerFullWidth } from '../../styles/button';
import { $arylideYellow, $chocolateBlack, $standardWhite, $zaGreen } from '../../styles/global';
import { checkBox, labelText, standardText } from '../../styles/textStyle';
import Button from '../Button/button';
import { playerImage, playerImageLarge, subImage } from '../PlayerGraphic/style';
import PickTeamModal from './PickTeamModal';
import { buttons, closeButton, modal, modalSplitContainer, modalTextContainer } from './style';


class MyModal extends Component {
    state = {  }

    // renderButtons = () => {
    //     return this.props.buttonOptions.map((x,i)=><Button key={i} text={x.text} func={x.fcn} width={vw(35)}/>)
    // }


    modalJSX = () => {
        const playerImg = require('../../../images/profile.jpg');
        if (this.props.jsx) {
            return this.props.jsx
        } else {
            const { modalType, entry, width } = this.props;
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
                    return <PickTeamModal player={player} sub={sub}/>;
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
                <View style={{...modal, width:this.props.width, left:(vw(100)-(this.props.width))/2}}>
                    {this.modalJSX()}
                    <Button clickable text='Close' func={this.props.closeModalFcn} width={vw(35)}/>
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