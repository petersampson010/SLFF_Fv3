import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Input } from 'react-native-elements';  
import { connect } from 'react-redux';
import {vw, vh} from 'react-native-expo-viewport-units';
import { validateGame } from '../../functions/validity';
import DateTimePicker from '@react-native-community/datetimepicker';
import { postGame, patchGame } from '../../functions/APIcalls';
import { showMessage } from 'react-native-flash-message';
import TouchableScale from 'react-native-touchable-scale'
import { setClubFocusGW, addGameState, setModal } from '../../actions';
import { displayDate } from '../../functions/reusable';
import MyModal from '../../components/Modal/MyModal';
import { TouchableOpacity } from 'react-native';
import { gameContainer, gameScore } from './style';
import { headers, standardText } from '../../styles/textStyle';
import { $arylideYellow, $chocolateBlack, $darkBlue, $luminousGreen, $zaGreen, screenContainer } from '../../styles/global';
import { buttonSplit } from '../../components/Button/style';
import Button from '../../components/Button/button';
import { game } from '../../components/Modal/modalSetting';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import StateModal from '../../components/Modal/StateModal';


class AdminHomeScreen extends Component {
    state = { 
        modal: {
            active: false,
        },
        game: {
            update: false,
            dateModalVisible: false,
            opponent: '',
            date: new Date(),
            complete: false
        }
     }

    renderGames = () => {
        let completedGamesSorted = this.props.games.filter(x => x.complete).sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));
        let openGameesSorted = this.props.games.filter(x=>!x.complete).sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));
        let sortedArr = [...openGameesSorted, ...completedGamesSorted];
        return sortedArr.map((game,i) => {
            const gameColour = game.complete ? $chocolateBlack : $darkBlue;
            return <TouchableOpacity key={i} style={{...gameContainer, backgroundColor: gameColour}}
            onPress={()=>{this.setState({...this.state, modal2: {active: true, game}});this.props.setClubFocusGW(game);}}>
                <View>
                    <Text style={{...headers}}>{game.opponent}</Text>
                    <Text style={standardText}>{displayDate(game.date)}</Text>
                </View>
                <View style={gameScore}>
                    <Text style={standardText}>{game.score}</Text>
                </View>
            </TouchableOpacity>
        })
    }

    formChange = (id, value) => {
        this.setState({...this.state, 
        game: {...this.state.game,
            [id]: value
        }})
    }

    addGame = async() => {
        try {
            let res = await postGame(this.state.game, this.props.adminUser.admin_user_id);
            if (res.date) {
                this.props.addGameState(res);
                this.setState({
                    ...this.state,
                    game: {
                        dateModalVisible: false,
                        opponent: '',
                        date: new Date(),
                        complete: false
                    }
                });
                showMessage({
                    message: "Game/Event added",
                    type: 'success'
                })
            }
        } catch(e) {
            showMessage({
                message: "Fail: Network Issue, please try again later",
                type: "danger"
              });
            console.warn(e);
        }
    }   

    updateGame = async() => {
        try {
            let res = await patchGame(this.state.game);
            if (res.date) {
                this.setState({
                    game: {
                        dateModalVisible: false,
                        opponent: '',
                        date: new Date(),
                        complete: false
                    }
                })
                showMessage({
                    message: "Game/Event updated",
                    type: 'success'
                })
            }
        } catch(e) {
            showMessage({
                message: "Fail: Network Issue, please try again later",
                type: "danger"
              });
            console.warn(e);
        }
    }

    openDate = () => {
        console.log('attempting to open date time picker')
        this.setState({...this.state, game: {...this.state.game, dateModalVisible: true}})
    }

    // setgameModal = () => {
    //     const { setModal } = this.props;
    //     setModal({
    //         player: false, 
    //         jsx: <View>
    //             <Input value={this.state.game.opponent} 
    //             style={standardText}
    //             onChange={(el)=>this.formChange('opponent', el.nativeEvent.text)}
    //             placeholder="Fantasy FC"
    //             label="Opposition"
    //             />
    //             <Text style={standardText}>Please select the date the game will be played</Text>
    //             <DateTimePickerModal
    //             isVisible={this.state.game.dateModalVisible}
    //             mode='date'
    //             date={this.state.game.date}
    //             onConfirm={(event, date)=>this.formChange('date', date)}
    //             onCancel={()=>this.setState({game: {...this.state.game, dateModalVisible: false}})}
    //             />
    //             <Text onPress={this.openDate}>Select Date</Text>
    //         </View>,
    //         width: vw(80), height: vh(60), 
    //         btn: <Button clickable text={this.state.game.update ? "Edit Game" : "Submit Game"} func={this.state.game.update ? this.updateGame : this.addGame} width={vw(35)}/>
    //     })
    // }

    render() { 
        return ( 
            <ScrollView style={screenContainer}>
                <View style={buttonSplit}>
                    <Button clickable text='Add Event/Game' func={()=>this.setState({...this.state, modal: {active: true}})} width={vw(40)} />
                    <Button clickable text='Edit Player(s)' func={()=>this.props.navigation.navigate('AdminPlayerEdit')} width={vw(40)} />
                </View>
                <ScrollView>
                    {this.renderGames()}
                </ScrollView>
                <StateModal
                modalActive={this.state.modal.active}
                height={vh(60)}
                width={vw(80)}
                jsx={<View>
                    <Input value={this.state.game.opponent} 
                    style={standardText}
                    onChange={(el)=>this.formChange('opponent', el.nativeEvent.text)}
                    placeholder="Fantasy FC"
                    label="Opposition"
                    />
                    <Text style={standardText}>Please select the date the game will be played</Text>
                    <DateTimePickerModal
                    isVisible={this.state.game.dateModalVisible}
                    mode='date'
                    date={this.state.game.date}
                    onConfirm={date=>{this.formChange('date', date);this.setState({...this.state, game: {...this.state.game, dateModalVisible: false}})}}
                    onCancel={()=>this.setState({...this.state, game: {...this.state.game, dateModalVisible: false}})}
                    />
                    <Text onPress={this.openDate}>Select Date {displayDate(this.state.game.date)}</Text>
                </View>}
                btn={<Button clickable text={this.state.game.update ? "Edit Game" : "Submit Game"} func={this.state.game.update ? this.updateGame : this.addGame} width={vw(35)}/>}/>
                {/* <MyModal 
                visible={this.state.modal2.active}
                height={vh(60)}
                width={vw(70)}
                closeModalFcn={()=>
                    this.setState({...this.state, modal2: {active: false,
                    game: {
                        opponent: '',
                        date: new Date(),
                    }
                    }})
                }
                jsx={this.state.modal2.game.complete ? 
                    <Text>This game has been completed, you are unable to edit the player statistics</Text> 
                    : 
                    <View>
                        <Text style={standardText}>Edit game or update stats</Text><Text style={standardText}>Remember... when entering player stats and completing a game, all changes are final so be sure to double check your entries!</Text>
                    </View>}
                buttonOptions={this.state.modal2.game.complete ? [] : [
                    {
                        text: 'Submit Game Stats', 
                        fcn: ()=>{this.setState({...this.state, modal2: {...this.state.modal2, active: false}});this.props.navigation.navigate('GameEditor')}
                    },
                    {
                        text: 'Edit Game', 
                        fcn: ()=>this.setState({...this.state, modal: {active: true, update: true, game: this.state.modal2.game}, modal2: {...this.state.modal2, active: false}})
                    }
                ]}
                /> */}
            </ScrollView>
         );
    }
}

const mapStateToProps = state => {
    return {
        games: state.club.allGames,
        adminUser: state.club.adminUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setClubFocusGW: game => dispatch(setClubFocusGW(game)),
        addGameState: game => dispatch(addGameState(game)),
        setModal: modalObj => dispatch(setModal(modalObj))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(AdminHomeScreen);