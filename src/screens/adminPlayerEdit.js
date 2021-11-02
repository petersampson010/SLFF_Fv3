import React, { Component } from 'react';
import { ScrollView, View, Picker, Switch } from 'react-native';
import { Input } from 'react-native-elements';
import MyModal from '../components/Modal/myModal';
import PlayersList from '../components/playersList/playersList';
import {vw, vh} from 'react-native-expo-viewport-units';
import { availability, fullName, positionString } from '../functions/reusable';
import { patchPlayer } from '../functions/APIcalls';
import { showMessage } from 'react-native-flash-message';

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
            await patchPlayer(this.state.player);
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
                message: "Fail: Network Issue, please try again later",
                type: "danger"
              });
            console.warn(e);
        }
    }

    render() { 
        return ( 
            <ScrollView>
                <PlayersList
                allSelectedPlayerIds={[]}
                clickFcn={this.editPlayer}
                />
                <MyModal 
                visible={this.state.modal.active}
                closeModalFcn={()=>this.setState({...this.state, modal: {active: false, player: {
                    "player_id": 1,
                    "first_name": "G",
                    "last_name": "H",
                    "position": "1",
                    "price": 1,
                    "availability": "a",
                    "admin_user_id": 1,
                    "created_at": "2020-11-23T13:03:11.328Z",
                    "updated_at": "2020-11-23T13:03:11.328Z"
                    }}})}
                jsx={<View>
                    <Input value={this.state.modal.player.first_name}
                    onChangeText={value=>this.formChange('first_name', value)}
                    label="First Name"
                    autoCapitalize="words"
                    />
                    <Input value={this.state.modal.player.last_name}
                    onChangeText={value=>this.formChange('last_name', value)}
                    label="Last Name"
                    autoCapitalize="words"
                    />
                    <Input value={this.state.modal.player.price.toString()}
                    onChangeText={value=>this.updatePrice(value)}
                    label="Price"
                    />
                    <Picker 
                    selectedValue={this.state.modal.player.position} 
                    onValueChange={value=>this.formChange('position', value)}>
                        <Picker.Item label="GK" value='1'/>
                        <Picker.Item label="DEF" value='2'/>
                        <Picker.Item label="MID" value='3'/>
                        <Picker.Item label="FWD" value='4'/>
                    </Picker>
                    <Switch value={availability(this.state.modal.player.availability)} 
                    onValueChange={value=>this.formChange('availability', value ? 'a' : 'u')} />
                    </View>}
                buttonOptions={[{text: 'Update Player', fcn: this.updatePlayer}, 
            {text: 'Remove Player', fcn: this.removePlayer}]}
                height={vh(60)}
                width={vw(70)}

                />
            </ScrollView>
         );
    }
}

const mapStateToProps = state => {
    return {
    }
}
 
export default AdminPlayerEditScreen;