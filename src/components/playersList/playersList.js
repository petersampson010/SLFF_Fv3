import React, { Component, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fullName, positionString, playerIds } from '../../functions/reusable';
import {vw, vh} from 'react-native-expo-viewport-units';
import { filter, itemPositionPicker, pickerItem, playersListContainer, positionPicker, slidable, tableHead, tableText, tick } from './style';
import { labelText, standardText } from '../../styles/textStyle';
import { tableElement3, tableElement4, tableRow, tableElement1 } from '../../styles/table';
import { setModal } from '../../actions';
import { ScrollView } from 'react-native-gesture-handler';



const PlayersList = ({clickFcn}) => {
    
    const [positionFilter, updatePositionFilter] = useState('0'),
    subImg = require('../../../images/subIcon.png'),
    clubPlayers = useSelector(state => state.club.clubPlayers),
    teamPlayers = useSelector(state => state.stateChanges.updatedNotPersistedTeam.starters.concat(state.stateChanges.updatedNotPersistedTeam.subs));

    useEffect(() => {

    }, [teamPlayers])

    const table = () => {
        switch(positionFilter) {
            case '0': 
                return clubPlayers.map((player, index) => tableRowRender(player, index))
            case '1': 
                return clubPlayers.filter(x=>x.position==='1').map((player, index) => tableRowRender(player, index))
            case '2': 
                return clubPlayers.filter(x=>x.position==='2').map((player, index) => tableRowRender(player, index))
            case '3': 
                return clubPlayers.filter(x=>x.position==='3').map((player, index) => tableRowRender(player, index))
            case '4': 
                return clubPlayers.filter(x=>x.position==='4').map((player, index) => tableRowRender(player, index));
            default: 
                break;
        }
    }

    const playerSelected = player => {
        return playerIds(teamPlayers).includes(player.player_id);
    }

    const tableRowRender = (player, i) => {
        return playerSelected(player) ? 
        <View key={i} style={tableRow}
        onPress={()=>clickFcn({player: player})}>
            <Text style={{...tableElement1, ...standardText, opacity: 0.4}}>{fullName(player)}</Text>
            <Text style={{...tableElement1, ...standardText, opacity: 0.4}}>{positionString(player.position)}</Text>
            <Text style={{...tableElement4, ...standardText, opacity: 0.4}}>£{player.price}m</Text>
        </View>
        :
        <TouchableOpacity key={i}
        style={tableRow}
        onPress={()=>clickFcn({player: player})}>
            <Text style={{...tableElement1, ...standardText}}>{fullName(player)}</Text>
            <Text style={{...tableElement1, ...standardText}}>{positionString(player.position)}</Text>
            <Text style={{...tableElement4, ...standardText}}>£{player.price}m</Text>
        </TouchableOpacity>;
    }

        return ( 
            <View style={playersListContainer}>
                <View style={filter}>
                    <Picker
                    itemStyle={itemPositionPicker}
                    selectedValue={positionFilter} 
                    onValueChange={value=>updatePositionFilter(value)}>
                        <Picker.Item color="white" label="ANY" value='0'/>
                        <Picker.Item color="white" label="GK" value='1'/>
                        <Picker.Item color="white" label="DEF" value='2'/>
                        <Picker.Item color="white" label="MID" value='3'/>
                        <Picker.Item color="white" label="FWD" value='4'/>
                    </Picker>
                </View>
                <View>
                    <View>
                        <View style={tableRow}>
                            <Text style={{...tableElement1, ...labelText}}>Name</Text>
                            <Text style={{...tableElement1, ...labelText}}>Position</Text>
                            <Text style={{...tableElement4, ...labelText}}>Price</Text>
                        </View>
                        <ScrollView style={{marginBottom: vh(40)}}>
                            {table()}
                        </ScrollView>
                    </View>
                </View>
            </View>
         );
}


export default PlayersList;