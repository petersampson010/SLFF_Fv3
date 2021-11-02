import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, SectionList, ScrollView, Picker } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Table, Row, Rows } from 'react-native-table-component';
import { postPlayer } from '../../functions/APIcalls';
import  { validatePlayer } from '../../functions/validity';
import { capitalize } from '../../functions/reusable';
import { tableElement3, tableElement4, tableRow } from '../../styles/table';
import { labelText, standardText } from '../../styles/textStyle';
import { headerTextBox, picker, pickerItemStyle, textBox, textInput, topBar } from './style';
import { screenContainer } from '../../styles/global';
import { vh, vw } from 'react-native-expo-viewport-units';
import { inputFieldLarge, inputFieldSmall } from '../../styles/input';
import { updateStack } from '../../Navigation';
import { addSpinner, removeSpinner } from '../../actions';
import { TouchableHighlightBase } from 'react-native';
import { TouchableNativeFeedbackBase } from 'react-native';
import SpinnerOverlay from '../../components/spinner/spinner';
import { showMessage } from 'react-native-flash-message';


class ClubSetupScreen extends Component {

    state = {
        players: {
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
        }
    }

    updatePosition = (i, selectedValue) => {
        this.setState({...this.state, players: {...this.state.players, [i]: {...this.state.players[i], position: selectedValue}}})
    }

    updatePrice = (text, i) => {
        if (text.match('(^[0-9]{1,2}$|^$)')) {
            this.setState({
                ...this.state,
                players: {
                    ...this.state.players, 
                    [i]: {
                        ...this.state.players[i],
                        price: text
                    }
                }
            })
        }
    }

    averagePrice = () => {
        let totalPrice = 0;
        let noOfPlayers = 0;
        for (let j=0; j<24; j++) {
            if (this.state.players[j].price.length>0) {
                totalPrice += parseInt(this.state.players[j].price);
                noOfPlayers++;
            }
        }

        let averagePrice = Math.round(totalPrice/noOfPlayers);
        return averagePrice ? averagePrice : 0;
    }

    updateName = (name, i) => {
        this.setState({...this.state, players: {...this.state.players, [i]: {...this.state.players[i], name}}})
    }


    renderRows = () => Object.keys(this.state.players).map((i) => 
        <View key={i} style={tableRow}>
            <TextInput 
                value={this.state.players[i].name} 
                onChange={el=>this.updateName(el.nativeEvent.text, i)}
                autoCapitalize = 'words'
                style={{...textBox, width: vw(50)}}
            />
            <Picker style={picker} itemStyle={pickerItemStyle} key={i} selectedValue={this.state.players[i].position} onValueChange={value=>this.updatePosition(i, value)}>
                <Picker.Item label="GK" value='1'/>
                <Picker.Item label="DEF" value='2'/>
                <Picker.Item label="MID" value='3'/>
                <Picker.Item label="FWD" value='4'/>
            </Picker>
                <TextInput
                    value={this.state.players[i].price} 
                    onChange={el=>this.updatePrice(el.nativeEvent.text, i)}
                    style={{...textBox, textAlign: 'center', width: vw(20)}}
                />
        </View>
        )


    submitPlayers = () => {
        if (this.countPlayers()>1) {
            this.postPlayers();
        } else {
            console.warn('not enough players ya get me')
        }
    }

    postPlayers = async() => {
        this.props.addSpinner();
        try {
            for (let i=0;i<24;i++) {
                let entry = this.state.players[i];
                if (validatePlayer(entry)) {
                    await postPlayer(entry, this.props.aUserId);
                } else {
                    console.warn('invalid entry: ' + i);
                }
            }
            this.props.removeSpinner();
            updateStack(this.props.navigation, 0, 'AdminHome');
        } catch(e)  {
            showMessage({
                message: "Fail: Network Issue, please try again later",
                type: "danger"
              });
            this.props.removeSpinner();
            console.warn(e);
        }
    }

    countPlayers = () => {
        let { players } = this.state;
        let noOfPlayers = 0;
        for (let i=0;i<24;i++) {
            if (players[i].name!==''&&players[i].price!==0) {
                noOfPlayers++;
            }
        }
        return noOfPlayers;
    }

    render() {
        return (
            <View style={screenContainer}>
                {this.props.spinner ? <SpinnerOverlay/> :
                <View>
                    <View style={topBar}>
                        <View>
                        <Text style={labelText}>Average Player Price: £{this.averagePrice()}m</Text>
                        <Text style={labelText}>Reccommended: £74m</Text>
                        </View>
                        <Button title="Submit Club Players" onPress={this.submitPlayers}/>
                    </View>
                    <View>
                        <View style={tableRow}>
                            <Text style={{...headerTextBox, width: vw(50)}}>Name</Text>
                            <Text style={{...headerTextBox, width: vw(25)}}>Position</Text>
                            <Text style={{...headerTextBox, width: vw(20)}}>Price (£0-99m)</Text>
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={{paddingBottom: vh(20)}}>
                            {this.renderRows()}
                    </ScrollView>
                </View>
                }
            </View>
        );
    }
  }

const mapStateToProps = state => {
    return {
        aUserId: state.endUser.adminUser.aUser.admin_user_id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addSpinner: () => dispatch(addSpinner()),
        removeSpinner: () => dispatch(removeSpinner())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClubSetupScreen)