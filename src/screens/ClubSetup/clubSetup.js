import { connect, useDispatch, useSelector } from 'react-redux';
import React, { Component, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Table, Row, Rows } from 'react-native-table-component';
import { postPlayer } from '../../functions/APIcalls';
import  { validatePlayer } from '../../functions/validity';
import { capitalize } from '../../functions/reusable';
import { tableElement3, tableElement4, tableRow, tableRowHead } from '../../styles/table';
import { labelText, sidenote, standardText } from '../../styles/textStyle';
import { headerTextBox, picker, pickerItemStyle, textBox, textInput, topBar } from './style';
import { $arylideYellow, screenContainer } from '../../styles/global';
import { vh, vw } from 'react-native-expo-viewport-units';
import { inputFieldLarge, inputFieldSmall } from '../../styles/input';
import { updateStack } from '../../Navigation';
import { addSpinner, removeSpinner } from '../../actions';
import { TouchableHighlightBase } from 'react-native';
import { TouchableNativeFeedbackBase } from 'react-native';
import SpinnerOverlay from '../../components/spinner/spinner';
import { showMessage } from 'react-native-flash-message';
import { Picker } from '@react-native-picker/picker';
import Button from '../../components/Button/button';


const ClubSetupScreen = ({navigation}) => {

    const dispatch = useDispatch(), 
    [players, updatePlayers] = useState({
            0: {name: '', position:'1', price: ''},
            1: {name: '', position:'1', price: ''},
            2: {name: '', position:'1', price: ''},
            3: {name: '', position:'1', price: ''},
            4: {name: '', position:'1', price: ''},
            5: {name: '', position:'1', price: ''},
            6: {name: '', position:'1', price: ''},
            7: {name: '', position:'1', price: ''},
            8: {name: '', position:'1', price: ''},
            9: {name: '', position:'1', price: ''},
            10: {name: '', position:'1', price: ''},
            11: {name: '', position:'1', price: ''},
            12: {name: '', position:'1', price: ''},
            12: {name: '', position:'1', price: ''},
            13: {name: '', position:'1', price: ''},
            14: {name: '', position:'1', price: ''},
            15: {name: '', position:'1', price: ''},
            16: {name: '', position:'1', price: ''},
            17: {name: '', position:'1', price: ''},
            18: {name: '', position:'1', price: ''},
            19: {name: '', position:'1', price: ''},
            21: {name: '', position:'1', price: ''},
            20: {name: '', position:'1', price: ''},
            22: {name: '', position:'1', price: ''},
            23: {name: '', position:'1', price: ''}
    }),
    adminUserId = useSelector(state => state.club.adminUser.admin_user_id);

    const updatePosition = (i, selectedValue) => {
        updatePlayers({...players, [i]: {...players[i], position: selectedValue}})
    }

    const updatePrice = (text, i) => {
        if (text.match('(^[0-9]{1,2}$|^$)')) {
            updatePlayers({
                    ...players, 
                    [i]: {
                        ...players[i],
                        price: text
                    }
                })
        }
    }

    const averagePrice = () => {
        let totalPrice = 0;
        let noOfPlayers = 0;
        for (let j=0; j<24; j++) {
            if (players[j].price.length>0) {
                totalPrice += parseInt(players[j].price);
                noOfPlayers++;
            }
        }

        let averagePrice = Math.round(totalPrice/noOfPlayers);
        return averagePrice ? averagePrice : 0;
    }

    const updateName = (name, i) => {
        updatePlayers({...players, [i]: {...players[i], name}})
    }


    const renderRows = () => Object.keys(players).map((i) => 
        <View key={i} style={tableRow}>
            <TextInput 
                value={players[i].name} 
                onChange={el=>updateName(el.nativeEvent.text, i)}
                autoCapitalize = 'words'
                style={{...textBox, width: vw(50)}}
            />
            <Picker dropdownIconColor={$arylideYellow} dropdownIconRippleColor={$arylideYellow} mode={'dropdown'} style={picker} itemStyle={pickerItemStyle} key={i} selectedValue={players[i].position} onValueChange={value=>updatePosition(i, value)}>
                <Picker.Item label="GK" value='1'/>
                <Picker.Item label="DEF" value='2'/>
                <Picker.Item label="MID" value='3'/>
                <Picker.Item label="FWD" value='4'/>
            </Picker>
                <TextInput
                    keyboardType='numeric'
                    value={players[i].price} 
                    onChange={el=>updatePrice(el.nativeEvent.text, i)}
                    style={{...textBox, textAlign: 'center', width: vw(15)}}
                />
        </View>
        )


    const submitPlayers = () => {
        if (countPlayers()>1) {
            postPlayers();
        } else {
            showMessage({
                type: 'warning',
                message: 'Not enough players'
            });
            console.warn('not enough players ya get me');
        }
    }

    const postPlayers = async() => {
        dispatch(addSpinner());
        try {
            for (let i=0;i<24;i++) {
                let entry = players[i];
                if (validatePlayer(entry)) {
                    await postPlayer(entry, adminUserId);
                } else {
                    console.warn('invalid entry: ' + i);
                }
            }
            dispatch(removeSpinner());
            updateStack(navigation, 0, 'AdminHome');
        } catch(e)  {
            flashMyMessage(e, 'danger');
            dispatch(removeSpinner());
        }
    }

    const countPlayers = () => {
        let noOfPlayers = 0;
        for (let i=0;i<24;i++) {
            if (players[i].name!==''&&players[i].price!==0) {
                noOfPlayers++;
            }
        }
        return noOfPlayers;
    }

        return (
            <View style={screenContainer}>
                <View>
                    <View style={topBar}>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={labelText}>Average Player Price: £{averagePrice()}m</Text>
                            <Text style={labelText}>Reccommended: £74m</Text>
                        </View>
                        <Button width={vw(35)} clickable text="Submit Club Players" func={submitPlayers}/>
                    </View>
                    <View>
                        <View style={{...tableRowHead, alignItems: 'center'}}>
                            <Text style={{...headerTextBox, width: vw(50)}}>Name</Text>
                            <Text style={{...headerTextBox, width: vw(30)}}>Position</Text>
                            <Text style={{...headerTextBox, width: vw(15)}}>Price <Text style={sidenote}>£0-99m</Text></Text>
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={{paddingBottom: vh(75)}}>
                            {renderRows()}
                    </ScrollView>
                </View>
            </View>
        );
}



export default ClubSetupScreen;