import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { connect } from 'react-redux';
import { fullName, positionString, playerIds } from '../../functions/reusable';
import {vw, vh} from 'react-native-expo-viewport-units';
import { filter, itemPositionPicker, pickerItem, playersListContainer, positionPicker, slidable, tableHead, tableText, tick } from './style';
import { TouchableOpacity } from 'react-native';
import { labelText, standardText } from '../../styles/textStyle';
import { tableElement3, tableElement4, tableRow } from '../../styles/table';
import MyModal from '../Modal/myModal';
import { subImage } from '../PlayerGraphic/style';



class PlayersList extends Component {
    state = { 
        positionFilter: '0',
        modal: {
            active: false,
            player: {
                player_id: 1,
                first_name: "Steve",
                last_name: "Dunno",
                position: "1",
                price: 80,
                availability: "a",
                admin_user_id: 1
            }
        }
    }

    openModal = player => {
        this.setState({
            ...this.state,
            modal: {
                active: true,
                player
            }
        })
    }

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
        const subImg = require('../../images/subIcon.png');
        const icon = this.playerSelected(player) ? null : <Image source={subImg} imageStyle={{resizeMode: 'cover'}} style={subImage}/>
        const { clickFcn } = this.props;
        return <TouchableOpacity key={key}
        style={tableRow}
        onPress={()=>this.openModal(player)}
        onLongPress={()=>this.setState({...this.state, modal: {active: true, player}})}>
            <Text style={{...tableElement3, ...standardText}}>{fullName(player)}</Text>
            <Text style={{...tableElement3, ...standardText}}>{positionString(player.position)}</Text>
            <Text style={{...tableElement3, ...standardText}}>£{player.price}m</Text>
            <TouchableOpacity style={tableElement4} onPress={()=>clickFcn(player)}>
                {icon}
            </TouchableOpacity>
        </TouchableOpacity>;
    }

    render() { 
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
                <MyModal
                        visible={this.state.modal.active}
                        height={vh(33)}
                        width={vw(80)}
                        closeModalFcn={()=>this.setState({...this.state, modal: {...this.state.modal, active: false}})}
                        modalType={this.props.modalType}
                        entry={this.state.modal.player}
                        buttonOptions={[]}
                        />
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
        clubPlayers: state.players.clubPlayers,
        teamPlayers: state.players.transferring.starters.concat(state.players.transferring.subs)
    }
}
 
export default connect(mapStateToProps)(PlayersList);