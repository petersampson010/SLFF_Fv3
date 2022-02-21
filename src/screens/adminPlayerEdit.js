import React, { Component, useState } from 'react';
import { ScrollView, View, Switch, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Input } from 'react-native-elements';
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
import { updateGameState, updateStateClubPlayers } from '../actions';
import { connect, useDispatch } from 'react-redux';

const AdminPlayerEditScreen = ({}) => {

    const [modal, updateModal] = useState({
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
    }),
    updateStateClubPlayersFUNC = useDispatch(updatedPlayer => updateStateClubPlayers(updatedPlayer));


    const formChange = (id, entry) => {
        updateModal({...modal,
            player: {
                ...modal.player,
                [id]: entry
            }
        })
    }

    const updatePrice = entry => {
        if (entry.match('(^[0-9]{1,2}$|^$)')) {
            updateModal({...modal,
                player: {
                    ...modal.player,
                    "price": entry
                }
            })
        }
    }

    const editPlayer = player => {
        updateGameState({active: true, player})
    }

    const removePlayer = player => {

    }

    const updatePlayer = async() => {
        try {
            let updatedPlayer = await patchPlayer(modal.player);
            updateStateClubPlayersFUNC(updatedPlayer);
            updateModal({active: false, player: {
                "player_id": 1,
                "first_name": "G",
                "last_name": "H",
                "position": "1",
                "price": 1,
                "availability": "a",
                "admin_user_id": 1,
                "created_at": "2020-11-23T13:03:11.328Z",
                "updated_at": "2020-11-23T13:03:11.328Z"
                }})
        } catch(e) {
            showMessage({
                message: e.response.data,
                type: "danger"
              });
            console.warn(e.response.data);
        }
    }

        return ( 
            <View style={screenContainer}>
                <PlayersList
                clickFcn={editPlayer}
                // jsx={
                // <View>
                //     <Input value={state.modal.player.first_name}
                //     onChangeText={value=>formChange('first_name', value)}
                //     label="First Name"
                //     autoCapitalize="words"
                //     />
                //     <Input value={state.modal.player.last_name}
                //     onChangeText={value=>formChange('last_name', value)}
                //     label="Last Name"
                //     autoCapitalize="words"
                //     />
                //     <Input value={state.modal.player.price.toString()}
                //     onChangeText={value=>updatePrice(value)}
                //     label="Price"
                //     />
                //     <Picker 
                //     selectedValue={state.modal.player.position} 
                //     onValueChange={value=>formChange('position', value)}>
                //         <Picker.Item label="GK" value='1'/>
                //         <Picker.Item label="DEF" value='2'/>
                //         <Picker.Item label="MID" value='3'/>
                //         <Picker.Item label="FWD" value='4'/>
                //     </Picker>
                //     <Switch value={availability(state.modal.player.availability)} 
                //     onValueChange={value=>formChange('availability', value ? 'a' : 'u')} />
                //     </View>
                //     }
                //     bottomButton={
                //         <View>
                //             <Button width={vw(35)} clickable text="Update Player" func={(player)=>updatePlayer(player)}/>
                //         </View>
                //     }
            //     buttonOptions={[{text: 'Update Player', fcn: updatePlayer}, 
            // {text: 'Remove Player', fcn: removePlayer}]}
            //     height={vh(60)}
            //     width={vw(70)}

                />
                <StateModal
                modalActive={modal.active}
                height={vh(50)}
                width={vw(80)}
                jsx={<View>
                    <View style={{flexDirection: 'row', width: vw(75)}}>
                        <View>
                            <View>
                                <Text style={modalLabelText}>First Name</Text>
                                <View style={inputFieldMedium}>
                                    <TextInput value={modal.player.first_name}
                                    onChangeText={value=>formChange('first_name', value)}
                                    autoCapitalize="words"
                                    style={input}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={modalLabelText}>Last Name</Text>
                                <View style={inputFieldMedium}>
                                    <TextInput value={modal.player.last_name}
                                    onChangeText={value=>formChange('last_name', value)}
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
                            selectedValue={modal.player.position} 
                            onValueChange={value=>formChange('position', value)}>
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
                                <TextInput value={modal.player.price.toString()}
                                onChangeText={value=>updatePrice(value)}
                                style={input}
                                />
                            </View>
                        </View>
                        <View style={{width: vw(25)}}>
                            <Text style={modalLabelText}>Availability</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: vh(1)}}>
                                <Switch 
                                value={availability(modal.player.availability)} 
                                onValueChange={value=>formChange('availability', value ? 'a' : 'u')} />
                            </View>
                        </View>
                    </View>
                </View>
                }
                btn={<Button width={vw(35)} clickable modal text="Update Player" func={(player)=>updatePlayer(player)}/>}
                closeFcn={()=>updateModal({...modal, active: false})}
                />
            </View>
         );
}

 
export default AdminPlayerEditScreen;