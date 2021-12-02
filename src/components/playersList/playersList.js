import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { connect } from 'react-redux';
import { fullName, positionString, playerIds } from '../../functions/reusable';
import {vw, vh} from 'react-native-expo-viewport-units';
import { filter, itemPositionPicker, pickerItem, playersListContainer, positionPicker, slidable, tableHead, tableText, tick } from './style';
import { labelText, standardText } from '../../styles/textStyle';
import { tableElement3, tableElement4, tableRow } from '../../styles/table';
import MyModal from '../Modal/MyModal';
import { playerImageLarge } from '../PlayerGraphic/style';
import { playersListModal } from '../Modal/PlayersListModal';
import Button from '../Button/button';
import { setModal } from '../../actions';
import { subImage } from '../Modal/style';



class PlayersList extends Component {
    state = { 
        positionFilter: '0',
        // modal: {
        //     active: false,
        //     player: {
        //         player_id: 1,
        //         first_name: "Steve",
        //         last_name: "Dunno",
        //         position: "1",
        //         price: 80,
        //         availability: "a",
        //         admin_user_id: 1
        //     }
        // }
    }

    // openModal = player => {
    //     this.setState({
    //         ...this.state,
    //         modal: {
    //             active: true,
    //             player
    //         }
    //     })
    // }

    table = () => {
        switch(this.state.positionFilter) {
            case '0': 
                return this.props.clubPlayers.map((player, index) => this.tableRow(player, index))
            case '1': 
                return this.props.clubPlayers.filter(x=>x.position==='1').map((player, index) => this.tableRow(player, index))
            case '2': 
                return this.props.clubPlayers.filter(x=>x.position==='2').map((player, index) => this.tableRow(player, index))
            case '3': 
                return this.props.clubPlayers.filter(x=>x.position==='3').map((player, index) => this.tableRow(player, index))
            case '4': 
                return this.props.clubPlayers.filter(x=>x.position==='4').map((player, index) => this.tableRow(player, index));
            default: 
                break;
        }
    }

    playerSelected = player => playerIds(this.props.teamPlayers).includes(player.player_id);

    tableRow = (player, key) => {
        const playerImg = require('../../../images/profile.jpg');
        const subImg = require('../../../images/subIcon.png');
        return <TouchableOpacity key={key}
        style={tableRow}
        onPress={()=>this.props.setModal(player, <Image source={playerImg} imageStyle={{resizeMode: 'cover'}} style={playerImageLarge}/>, vw(80), vh(50), <Button width={vw(35)} clickable comp={<Image source={subImg} imageStyle={{resizeMode: 'cover'}} style={subImage}/>} func={() => this.props.clickFcn(player)}/>)}>
            <Text style={{...tableElement3, ...standardText}}>{fullName(player)}</Text>
            <Text style={{...tableElement3, ...standardText}}>{positionString(player.position)}</Text>
            <Text style={{...tableElement3, ...standardText}}>£{player.price}m</Text>
        </TouchableOpacity>;
    }

    render() { 
        const subImg = require('../../../images/subIcon.png');
        const { clickFcn } = this.props.clickFcn
        return ( 
            <View style={playersListContainer}>
                <View style={filter}>
                    <Picker
                    itemStyle={itemPositionPicker}
                    selectedValue={this.state.positionFilter} 
                    onValueChange={value=>this.setState({...this.state, positionFilter: value})}>
                        <Picker.Item color="white" label="ANY" value='0'/>
                        <Picker.Item color="white" label="GK" value='1'/>
                        <Picker.Item color="white" label="DEF" value='2'/>
                        <Picker.Item color="white" label="MID" value='3'/>
                        <Picker.Item color="white" label="FWD" value='4'/>
                    </Picker>
                </View>
                {/* <MyModal
                        visible={this.state.modal.active}
                        height={vh(33)}
                        width={vw(80)}
                        closeModalFcn={()=>this.setState({...this.state, modal: {...this.state.modal, active: false}})}
                        playerProfile
                        player={this.state.modal.player}
                        jsx={<Image source={subImg} imageStyle={{resizeMode: 'cover'}} style={subImage}/>}
                        bottomButton={<Button func={()=>clickFcn(this.state.modal.player)} text={<Image source={subImg} imageStyle={{resizeMode: 'cover'}} style={subImage}/>}/>}
                        /> */}
                <View >
                    <View>
                        <View style={tableRow}>
                            <Text style={{...tableElement3, ...labelText}}>Name</Text>
                            <Text style={{...tableElement3, ...labelText}}>Position</Text>
                            <Text style={{...tableElement3, ...labelText}}>Price</Text>
                        </View>
                        {this.table()}
                    </View>
                </View>
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        clubPlayers: state.club.clubPlayers,
        teamPlayers: state.stateChanges.updatedNotPersistedTeam.starters.concat(state.stateChanges.updatedNotPersistedTeam.subs)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setModal: (player, jsx, width, height, bottomBtn, closeFcn) => dispatch(setModal(player, jsx, width, height, bottomBtn, closeFcn))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayersList);