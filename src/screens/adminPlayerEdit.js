import React, { Component } from 'react';
import { ScrollView, View, Switch, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Input } from 'react-native-elements';
import MyModal from '../components/Modal/MyModal';
import PlayersList from '../components/playersList/playersList';
import {vw, vh} from 'react-native-expo-viewport-units';
import { availability, fullName, positionString } from '../functions/reusable';
import { patchPlayer } from '../functions/APIcalls';
import { showMessage } from 'react-native-flash-message';
import Button from '../components/Button/button';
import { screenContainer } from '../styles/global';
import StateModal from '../components/Modal/StateModal';
import { input, inputFieldLarge, inputFieldMedium, inputFieldSmall } from '../styles/input';
import { textLabel } from './login/style';
import { modalLabelText } from '../styles/textStyle';
import { updateStateClubPlayers } from '../actions';
import { connect } from 'react-redux';

class AdminPlayerEditScreen extends Component {
    state = { 
        modal: {
            active: false,
            player: {
                "player_id": 1,
                "first_name": "G",
                "last_name": "H",
                "position": "1",
                "price": 1,
                "availability": "a",
                "admin_user_id": 1,
                "created_at": "2020-11-23T13:03:11.328Z",
                "updated_at": "2020-11-23T13:03:11.328Z"
                }
        }
    }

    formChange = (id, entry) => {
        this.setState({
            ...this.state, 
            modal: {...this.state.modal,
                player: {
                    ...this.state.modal.player,
                    [id]: entry
                }
            }
        })
    }

    updatePrice = entry => {
        if (entry.match('(^[0-9]{1,2}$|^$)')) {
            this.setState({
                ...this.state, 
                modal: {...this.state.modal,
                    player: {
                        ...this.state.modal.player,
                        "price": entry
                    }
                }
            })
        }
    }

    editPlayer = player => {
        this.setState({...this.state, 
            modal: {active: true, player}
        })
    }

    removePlayer = player => {

    }

    updatePlayer = async() => {
        try {
            let updatedPlayer = await patchPlayer(this.state.modal.player);
            this.props.updateStateClubPlayers(updatedPlayer);
            this.setState({...this.state, modal: {active: false, player: {
                "player_id": 1,
                "first_name": "G",
                "last_name": "H",
                "position": "1",
                "price": 1,
                "availability": "a",
                "admin_user_id": 1,
                "created_at": "2020-11-23T13:03:11.328Z",
                "updated_at": "2020-11-23T13:03:11.328Z"
                }}})
        } catch(e) {
            showMessage({
                message: e.response.data,
                type: "danger"
              });
            console.warn(e.response.data);
        }
    }

    render() { 
        return ( 
            <View style={screenContainer}>
                <PlayersList
                clickFcn={this.editPlayer}
                // jsx={
                // <View>
                //     <Input value={this.state.modal.player.first_name}
                //     onChangeText={value=>this.formChange('first_name', value)}
                //     label="First Name"
                //     autoCapitalize="words"
                //     />
                //     <Input value={this.state.modal.player.last_name}
                //     onChangeText={value=>this.formChange('last_name', value)}
                //     label="Last Name"
                //     autoCapitalize="words"
                //     />
                //     <Input value={this.state.modal.player.price.toString()}
                //     onChangeText={value=>this.updatePrice(value)}
                //     label="Price"
                //     />
                //     <Picker 
                //     selectedValue={this.state.modal.player.position} 
                //     onValueChange={value=>this.formChange('position', value)}>
                //         <Picker.Item label="GK" value='1'/>
                //         <Picker.Item label="DEF" value='2'/>
                //         <Picker.Item label="MID" value='3'/>
                //         <Picker.Item label="FWD" value='4'/>
                //     </Picker>
                //     <Switch value={availability(this.state.modal.player.availability)} 
                //     onValueChange={value=>this.formChange('availability', value ? 'a' : 'u')} />
                //     </View>
                //     }
                //     bottomButton={
                //         <View>
                //             <Button width={vw(35)} clickable text="Update Player" func={(player)=>this.updatePlayer(player)}/>
                //         </View>
                //     }
            //     buttonOptions={[{text: 'Update Player', fcn: this.updatePlayer}, 
            // {text: 'Remove Player', fcn: this.removePlayer}]}
            //     height={vh(60)}
            //     width={vw(70)}

                />
                <StateModal
                modalActive={this.state.modal.active}
                height={vh(50)}
                width={vw(80)}
                jsx={<View>
                    <View style={{flexDirection: 'row', width: vw(75)}}>
                        <View>
                            <View>
                                <Text style={modalLabelText}>First Name</Text>
                                <View style={inputFieldMedium}>
                                    <TextInput value={this.state.modal.player.first_name}
                                    onChangeText={value=>this.formChange('first_name', value)}
                                    autoCapitalize="words"
                                    style={input}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={modalLabelText}>Last Name</Text>
                                <View style={inputFieldMedium}>
                                    <TextInput value={this.state.modal.player.last_name}
                                    onChangeText={value=>this.formChange('last_name', value)}
                                    autoCapitalize="words"
                                    style={input}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{width: vw(20)}}>
                            <Text style={modalLabelText}>Position</Text>
                            <Picker 
                            itemStyle={{height: vh(18)}}
                            selectedValue={this.state.modal.player.position} 
                            onValueChange={value=>this.formChange('position', value)}>
                                <Picker.Item label="GK" value='1'/>
                                <Picker.Item label="DEF" value='2'/>
                                <Picker.Item label="MID" value='3'/>
                                <Picker.Item label="FWD" value='4'/>
                            </Picker>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: vw(75)}}>
                        <View style={{width: vw(20)}}>
                            <Text style={modalLabelText}>Price</Text>
                            <View style={{...inputFieldSmall, width: vw(13)}}>
                                <TextInput value={this.state.modal.player.price.toString()}
                                onChangeText={value=>this.updatePrice(value)}
                                style={input}
                                />
                            </View>
                        </View>
                        <View style={{width: vw(25)}}>
                            <Text style={modalLabelText}>Availability</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: vh(1)}}>
                                <Switch 
                                value={availability(this.state.modal.player.availability)} 
                                onValueChange={value=>this.formChange('availability', value ? 'a' : 'u')} />
                            </View>
                        </View>
                    </View>
                </View>
                }
                btn={<Button width={vw(35)} clickable modal text="Update Player" func={(player)=>this.updatePlayer(player)}/>}
                closeFcn={()=>this.setState({...this.state, modal: {...this.state.modal, active: false}})}
                />
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateStateClubPlayers: updatedPlayer => dispatch(updateStateClubPlayers(updatedPlayer))
    }
}
 
export default connect(null, mapDispatchToProps)(AdminPlayerEditScreen);